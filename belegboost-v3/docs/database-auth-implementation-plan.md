# BelegBoost Database & Authentication Implementation Plan

## Overview

Implement PostgreSQL database with Drizzle ORM and Auth.js authentication for BelegBoost, a German accounting SaaS that converts financial transactions to DATEV format. All infrastructure hosted on Hetzner Cloud Germany for GDPR compliance.

## Current State

- Next.js 16 + React 19 frontend (complete)
- Mock authentication via React Context (`lib/AuthContext.tsx`)
- Mock data in `lib/data.ts`
- Types defined in `types/index.ts`
- Dashboard with submissions, team management, settings views
- 4-step client portal upload wizard

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Authentication | Email/Password only | Simple, no OAuth app setup needed |
| File Storage | Hetzner Object Storage | Native S3-compatible, ~€3/100GB |
| Multi-tenancy | Path-based first | `/org/[slug]/dashboard` - easier dev, migrate to subdomains later |
| Background Jobs | Include Redis/BullMQ now | Async DATEV exports from the start |

## Target Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ROOT DOMAIN (belegboost.de)                 │
│  Marketing Site + Auth (signup/signin creates Organization)        │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                       Path-based routing (subdomains later)
                                  │
┌─────────────────────────────────────────────────────────────────────┐
│              PATH-BASED: /org/[slug]/...                           │
│   CLIENT PORTAL (Public)          ADVISOR DASHBOARD (Protected)    │
│   /org/[slug]/portal              /org/[slug]/dashboard            │
│   - Upload wizard                 - Submissions inbox              │
│   - Contact                       - Team management                │
└─────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                │
│  PostgreSQL (Drizzle)     Hetzner Object Storage    Redis          │
│  - Organizations          - Uploaded files          - BullMQ jobs  │
│  - Users                  - DATEV exports           - Rate limiting│
│  - Submissions            - 30-day retention                       │
│  - Transactions                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Database Setup

### Dependencies
```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit @types/pg tsx
```

### New File Structure
```
db/
├── index.ts              # Database connection
├── schema/
│   ├── index.ts          # Re-export all schemas
│   ├── organizations.ts  # Multi-tenant organizations
│   ├── users.ts          # Auth users
│   ├── team-members.ts   # Team (advisors visible in portal)
│   ├── submissions.ts    # Client submissions
│   ├── files.ts          # Uploaded file metadata
│   ├── transactions.ts   # Parsed transactions
│   ├── exports.ts        # DATEV export records
│   └── audit-logs.ts     # Audit trail
├── migrations/           # Auto-generated
└── seed.ts               # Dev seed data
drizzle.config.ts         # Drizzle configuration
```

### Database Schema

**Organizations** (multi-tenant root)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | varchar(255) | Company name |
| subdomain | varchar(63) | Unique, URL-safe |
| email | varchar(255) | Primary contact |
| settings | jsonb | Theme, logo, prefs |
| plan | enum | starter/professional/enterprise |
| created_at | timestamp | |

**Users** (maps to existing `User` type)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| organization_id | uuid | FK to organizations |
| email | varchar(255) | Unique |
| password_hash | varchar(255) | bcrypt |
| name | varchar(255) | |
| role | enum | owner/admin/member |
| avatar | varchar(255) | URL |
| last_login | timestamp | |

**Team Members** (maps to existing `TeamMember` type)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| organization_id | uuid | FK |
| name | varchar(255) | |
| job_title | varchar(255) | |
| role | enum | owner/admin/member |
| email | varchar(255) | |
| avatar | varchar(10) | Initials "SW" |
| status | enum | active/invited |
| is_publicly_visible | boolean | Show in portal |

**Submissions** (maps to `Submission` + `PortalFormData`)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| organization_id | uuid | FK |
| team_member_id | uuid | FK, assigned advisor |
| reviewed_by | uuid | FK to users |
| client_name | varchar(255) | Company |
| client_number | varchar(50) | Optional |
| client_email | varchar(255) | |
| provider | varchar(100) | AMEX, Wise, etc. |
| provider_logo | varchar(10) | "AM", "WI" |
| date_from | timestamp | Period start |
| date_to | timestamp | Period end |
| end_balance | varchar(50) | |
| status | enum | new/review/exported |
| transaction_count | integer | |
| datev_account | varchar(20) | |
| assigned_advisor | varchar(10) | Initials |
| received_at | timestamp | |
| expires_at | timestamp | 30-day retention |

**Files** (uploaded documents)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| submission_id | uuid | FK |
| original_name | varchar(255) | |
| s3_key | varchar(500) | Storage path |
| mime_type | varchar(100) | |
| size_bytes | integer | |
| parse_status | enum | pending/processing/completed/failed |
| parse_errors | jsonb | Error messages |

**Transactions** (parsed from files)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| submission_id | uuid | FK |
| file_id | uuid | FK |
| booking_date | timestamp | |
| description | varchar(500) | |
| amount | decimal(15,2) | |
| currency | varchar(3) | EUR default |
| account_number | varchar(20) | DATEV account |
| contra_account | varchar(20) | |
| raw_data | jsonb | Original parsed data |
| flagged | boolean | Needs review |

**Exports** (DATEV export records)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| submission_id | uuid | FK |
| created_by | uuid | FK to users |
| s3_key | varchar(500) | Export file location |
| status | enum | pending/completed/failed |
| transaction_count | integer | |
| errors | jsonb | |
| completed_at | timestamp | |

**Audit Logs**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| organization_id | uuid | FK |
| user_id | uuid | FK |
| action | varchar(50) | create/update/delete/export |
| resource_type | varchar(50) | submission/team_member/etc |
| resource_id | uuid | |
| changes | jsonb | Before/after |
| ip_address | varchar(45) | |
| created_at | timestamp | |

### Environment Variables
```env
# Database (Hetzner Managed PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/belegboost

# Auth.js
AUTH_SECRET=<32-char-random-string>
AUTH_URL=https://belegboost.de

# S3/MinIO (Hetzner Object Storage)
S3_ENDPOINT=https://fsn1.your-objectstorage.com
S3_ACCESS_KEY=xxx
S3_SECRET_KEY=xxx
S3_BUCKET=belegboost-uploads
S3_REGION=eu-central-1
```

---

## Phase 2: Authentication (Auth.js)

### Dependencies
```bash
npm install next-auth@beta @auth/drizzle-adapter bcryptjs
npm install -D @types/bcryptjs
```

### New Files
```
auth.ts                   # Main Auth.js config
auth.config.ts            # Edge-compatible config
middleware.ts             # Route protection + subdomain routing
app/api/auth/[...nextauth]/route.ts
lib/auth/
├── session.ts            # Session helpers
└── actions.ts            # Server actions (register, etc.)
```

### Key Implementation

**auth.config.ts** (edge-compatible)
- Pages config: `/login`, `/signup`
- Callbacks: `authorized`, `jwt`, `session`
- Add `organizationId` and `role` to session

**auth.ts** (full config)
- DrizzleAdapter for database sessions
- Credentials provider with bcrypt password verification
- JWT session strategy

**Updated AuthContext**
- Wrap `next-auth/react` SessionProvider
- Keep same API: `useAuth()` returns `{ user, isAuthenticated, isLoading, login, logout }`
- `login()` now takes email + password

**Updated SignIn/SignUp components**
- Add password field
- Call `signIn('credentials', { email, password })`

---

## Phase 3: Multi-tenancy (Path-Based)

### Route Structure
```
app/
├── (marketing)/          # Root domain pages
│   ├── page.tsx          # Landing
│   ├── login/
│   └── signup/
└── org/
    └── [slug]/           # Organization-specific routes
        ├── layout.tsx    # Fetches org, provides context
        ├── portal/       # Public client portal
        │   └── page.tsx  # Upload wizard
        └── dashboard/    # Protected advisor dashboard
            ├── page.tsx
            ├── team/
            └── settings/
```

### Middleware Logic (`middleware.ts`)
```
1. Check if path starts with /org/[slug]/dashboard
2. If yes: require authentication
3. Verify user belongs to organization (via session.organizationId)
4. If no auth or wrong org: redirect to /login?from=...
```

### OrganizationContext
- Layout at `app/org/[slug]/layout.tsx` fetches org by slug
- Passes to client OrganizationProvider
- `useOrganization()` hook for child components

### Future Migration to Subdomains
When ready, update middleware to:
1. Detect subdomain from hostname
2. Rewrite to `/org/[subdomain]/...` internally
3. No route changes needed

---

## Phase 4: Data Layer & API

### Service Layer (`lib/services/`)
```typescript
// submission-service.ts
SubmissionService.findAll(organizationId)
SubmissionService.findById(id, organizationId)
SubmissionService.create(data)
SubmissionService.updateStatus(id, status, reviewedBy)

// team-service.ts
TeamService.findAll(organizationId)
TeamService.findPublicMembers(organizationId)
TeamService.create(data)
TeamService.update(id, data)

// file-service.ts
uploadToS3(file, orgId, submissionId)
getSignedDownloadUrl(key)
deleteFromS3(key)
```

### API Routes
```
app/api/
├── submissions/
│   ├── route.ts              # GET all, POST create
│   └── [id]/
│       ├── route.ts          # GET, PATCH, DELETE
│       └── export/route.ts   # POST generate DATEV
├── team/
│   └── route.ts              # GET all, POST create
├── files/
│   └── upload/route.ts       # POST multipart upload
└── portal/
    └── submit/route.ts       # POST public submission
```

### Server Actions (`lib/actions/`)
```typescript
// portal-actions.ts
createPortalSubmission(orgSubdomain, formData)

// submission-actions.ts
updateSubmissionStatus(id, status)
assignDATEVAccount(id, account)

// team-actions.ts
inviteTeamMember(email, role)
updateTeamMember(id, data)
```

### Dashboard Component Updates

Replace mock data imports:
```typescript
// Before
import { SUBMISSIONS } from '@/lib/data';

// After
const [submissions, setSubmissions] = useState([]);
useEffect(() => {
  fetch('/api/submissions').then(r => r.json()).then(setSubmissions);
}, []);
```

---

## Phase 5: File Storage (S3/MinIO)

### Dependencies
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Upload Flow
1. Portal form submits to `/api/portal/submit`
2. Server action receives FormData with files
3. Upload to S3 with key: `{orgId}/{submissionId}/{timestamp}-{filename}`
4. Store metadata in `files` table
5. Return signed URL for download

### Hetzner Object Storage
- S3-compatible API
- Use `forcePathStyle: true` in S3Client config
- Region: `eu-central-1` or `fsn1`

---

## Phase 6: Background Jobs (Redis + BullMQ)

### Dependencies
```bash
npm install bullmq ioredis
```

### New Files
```
lib/
├── queue/
│   ├── index.ts           # Queue setup
│   ├── connection.ts      # Redis connection
│   └── workers/
│       ├── export.ts      # DATEV export worker
│       └── cleanup.ts     # File cleanup worker (30-day retention)
```

### Queue Implementation
```typescript
// lib/queue/index.ts
import { Queue } from 'bullmq';
import { connection } from './connection';

export const exportQueue = new Queue('datev-export', { connection });
export const cleanupQueue = new Queue('file-cleanup', { connection });

// Add job
await exportQueue.add('generate', { submissionId, userId });
```

### Worker Process
```typescript
// lib/queue/workers/export.ts
import { Worker } from 'bullmq';
import { connection } from '../connection';
import { generateDATEVExport } from '@/lib/datev/generator';

const worker = new Worker('datev-export', async (job) => {
  const { submissionId, userId } = job.data;

  // Update status to processing
  await updateExportStatus(submissionId, 'processing');

  // Generate DATEV file
  const result = await generateDATEVExport(submissionId);

  // Upload to S3
  const s3Key = await uploadToS3(result.buffer, ...);

  // Update status to completed
  await updateExportStatus(submissionId, 'completed', { s3Key });

  return { success: true, s3Key };
}, { connection });
```

### API Integration
```typescript
// POST /api/submissions/[id]/export
const job = await exportQueue.add('generate', { submissionId, userId });
return { jobId: job.id, status: 'queued' };

// GET /api/exports/[jobId]/status
const job = await exportQueue.getJob(jobId);
return { status: job.progress, result: job.returnvalue };
```

---

## Hetzner Cloud Infrastructure

### Recommended Setup
| Resource | Spec | Monthly Cost |
|----------|------|--------------|
| CPX21 VPS | 3 vCPU, 4GB RAM | ~€8 |
| Managed PostgreSQL | 2GB | ~€15 |
| Object Storage | 100GB | ~€3 |
| Managed Redis | 1GB | ~€5 |
| **Total** | | **~€31/month** |

### Docker Compose (Production)
```yaml
version: '3.8'

services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - AUTH_SECRET=${AUTH_SECRET}
      - S3_ENDPOINT=${S3_ENDPOINT}
      - S3_ACCESS_KEY=${S3_ACCESS_KEY}
      - S3_SECRET_KEY=${S3_SECRET_KEY}
      - S3_BUCKET=${S3_BUCKET}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - worker

  worker:
    build: .
    command: node lib/queue/workers/start.js
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - S3_ENDPOINT=${S3_ENDPOINT}
      - S3_ACCESS_KEY=${S3_ACCESS_KEY}
      - S3_SECRET_KEY=${S3_SECRET_KEY}
      - S3_BUCKET=${S3_BUCKET}
      - REDIS_URL=${REDIS_URL}

  # PostgreSQL via Hetzner Managed (external)
  # Redis via Hetzner Managed (external)
  # Object Storage via Hetzner (external)
```

### Environment Variables (Complete)
```env
# Database (Hetzner Managed PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/belegboost

# Auth.js
AUTH_SECRET=<32-char-random-string>
AUTH_URL=https://belegboost.de

# S3 (Hetzner Object Storage)
S3_ENDPOINT=https://fsn1.your-objectstorage.com
S3_ACCESS_KEY=xxx
S3_SECRET_KEY=xxx
S3_BUCKET=belegboost-uploads
S3_REGION=eu-central-1

# Redis (Hetzner Managed Redis)
REDIS_URL=redis://:password@host:6379
```

### DNS Setup
```
belegboost.de        A    <server-ip>
```

Use Caddy for automatic SSL with Let's Encrypt.

---

## Critical Files to Modify

| File | Changes |
|------|---------|
| `types/index.ts` | Align with DB schema, add Organization type |
| `lib/AuthContext.tsx` | Replace mock with Auth.js SessionProvider |
| `lib/data.ts` | Delete after migration (mock data) |
| `constants/index.ts` | Enums must match PostgreSQL enums exactly |
| `hooks/usePortalForm.ts` | Connect submit() to server action |
| `components/dashboard/views/Overview.tsx` | Fetch from API |
| `components/dashboard/views/Team.tsx` | Fetch from API |
| `app/layout.tsx` | Add SessionProvider |

---

## Implementation Order

### Week 1: Database Foundation
- [ ] Install Drizzle ORM dependencies
- [ ] Create `db/schema/*.ts` files (all 8 tables)
- [ ] Setup `drizzle.config.ts`
- [ ] Generate and run migrations
- [ ] Create seed script with mock data

### Week 2: Authentication
- [ ] Install Auth.js + bcryptjs dependencies
- [ ] Create `auth.ts` and `auth.config.ts`
- [ ] Setup API route `app/api/auth/[...nextauth]/route.ts`
- [ ] Update `AuthContext.tsx` to wrap Auth.js
- [ ] Update SignIn/SignUp with password field
- [ ] Add `middleware.ts` for route protection

### Week 3: Path-Based Multi-tenancy
- [ ] Create `app/org/[slug]/` route structure
- [ ] Move portal to `/org/[slug]/portal`
- [ ] Move dashboard to `/org/[slug]/dashboard`
- [ ] Create `OrganizationContext` and provider
- [ ] Update middleware for org-based auth

### Week 4: Data Layer & API
- [ ] Build service layer (`lib/services/`)
- [ ] Create API routes for submissions, team
- [ ] Create server actions for portal submission
- [ ] Update dashboard components to fetch from API
- [ ] Delete mock data file

### Week 5: File Storage
- [ ] Install AWS S3 SDK
- [ ] Setup S3 client for Hetzner Object Storage
- [ ] Create file upload API route
- [ ] Update portal form to submit files
- [ ] Add signed URL generation for downloads

### Week 6: Background Jobs & Deployment
- [ ] Install BullMQ + ioredis
- [ ] Create export worker
- [ ] Create cleanup worker (30-day retention)
- [ ] Setup Hetzner VPS with Docker
- [ ] Configure Managed PostgreSQL + Redis
- [ ] Setup Object Storage bucket
- [ ] Deploy and test

---

## Type Mapping Reference

| Frontend Type | Database Table | Key Differences |
|---------------|----------------|-----------------|
| `User` | `users` | +organizationId, +passwordHash |
| `TeamMember` | `team_members` | +organizationId |
| `Submission` | `submissions` | +organizationId, dates split |
| `PortalFormData` | `submissions` + `files` | Files in separate table |
| `TeamRole` | `team_role` enum | Same values |
| `SubmissionStatus` | `submission_status` enum | Same values |
