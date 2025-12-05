# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BelegBoost is a German accounting SaaS application that bridges American Express exports and DATEV accounting software. Built with Next.js 16, React 19, Drizzle ORM, and NextAuth v5.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint

# Database (Drizzle ORM with PostgreSQL)
npm run db:generate  # Generate migrations from schema changes
npm run db:migrate   # Run pending migrations
npm run db:push      # Push schema directly (dev only)
npm run db:studio    # Open Drizzle Studio GUI
npm run db:seed      # Seed database with test data
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router
- **React 19** with Server Components
- **Drizzle ORM** with PostgreSQL
- **NextAuth v5** (credentials provider with JWT sessions)
- **Tailwind CSS v4** via PostCSS
- **Zod** + React Hook Form for validation

### Multi-Tenant Routing
Routes use org subdomains as URL prefixes: `/{slug}/dashboard`, `/{slug}/portal`

Route groups in `app/`:
- `(marketing)/` - Public landing pages (/, /features, /preise, etc.)
- `(auth)/` - Login, signup, forgot-password (standalone layouts)
- `(org)/[slug]/` - Org-scoped routes with organization context
  - `dashboard/` - Protected admin area
  - `portal/` - Client document submission

Demo mode: `/demo/dashboard` bypasses auth with mock data.

### Middleware Auth Flow
`middleware.ts` handles:
- Org route protection (redirects unauthenticated users to /login)
- Cross-org access prevention (redirects to user's own org)
- Post-login redirects for authenticated users on auth pages

### Database Schema
Schemas in `db/schema/*.ts` with relations:
- `organizations` - Multi-tenant orgs with subdomain slugs
- `users` - Linked to organizations, roles (owner/admin/member)
- `submissions` - Client document submissions
- `files`, `transactions`, `exports`, `audit-logs`

### Context Providers
Nested in `app/layout.tsx`:
1. `ThemeProvider` (next-themes) - Light/dark mode
2. `ColorThemeProvider` - Brand colors (emerald/ocean/violet)
3. `AuthProvider` - User session state (supports demo mode)
4. `ToastProvider` - Global notifications

Org-scoped routes add `OrganizationProvider` for org context.

### Path Aliases
`@/*` maps to project root (configured in `tsconfig.json`).

### Type System Pattern
Types derive from runtime constants to prevent drift:
```typescript
// constants/index.ts
export const SUBMISSION_STATUS = { NEW: 'new', REVIEW: 'review', EXPORTED: 'exported' } as const;

// types/index.ts
export type SubmissionStatus = typeof SUBMISSION_STATUS[keyof typeof SUBMISSION_STATUS];
```

### Key Files
- `auth.ts` - NextAuth config with rate limiting
- `middleware.ts` - Route protection and redirects
- `db/index.ts` - Drizzle client setup
- `drizzle.config.mjs` - Migration config
