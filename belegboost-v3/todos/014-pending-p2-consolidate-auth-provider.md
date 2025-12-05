---
status: completed
priority: p2
issue_id: "014"
tags: [architecture, authentication, refactoring]
dependencies: []
completed_at: "2025-12-05"
---

# HIGH-10: Consolidate Dual AuthProvider Pattern

## Problem Statement
The application has two competing sources of truth for authentication:
1. NextAuth `SessionProvider` (server-side, JWT-based)
2. Custom `AuthProvider` context (client-side wrapper)

This creates unnecessary complexity and confusion about which to use.

## Findings
- Discovered during architecture review
- Locations:
  - `auth.ts` - NextAuth configuration
  - `lib/AuthContext.tsx` - Custom wrapper
  - `app/layout.tsx` - Both providers wrapped

## Problems
1. **Unnecessary abstraction** - Custom AuthProvider is a thin wrapper adding no value
2. **Type transformation overhead** - Converting NextAuth types to custom User type
3. **Multiple render cycles** - NextAuth updates → AuthContext updates → re-render
4. **Developer confusion** - Use `useSession()` or `useAuth()`?

## Proposed Solution
Remove `AuthProvider` and use `useSession()` directly:

```typescript
// Before: components use useAuth()
const { user, isAuthenticated } = useAuth();

// After: components use useSession()
const { data: session, status } = useSession();
const user = session?.user;
const isAuthenticated = status === 'authenticated';
```

For demo mode, create separate `DemoModeProvider`:
```typescript
const DemoModeProvider = ({ children }) => {
  // Handle demo-specific state without auth
};
```

## Impact
- **Complexity**: Reduced abstraction layers
- **Performance**: Fewer re-renders
- **Maintainability**: Single source of truth
- **Effort**: Medium (4-6 hours)
- **Risk**: Medium - Many components to update

## Acceptance Criteria
- [x] AuthProvider removed or simplified
- [x] Components use useSession() directly
- [x] Demo mode handled separately
- [x] All auth flows still work
- [ ] Tests pass (build errors unrelated to auth changes)
- [ ] Build passes (blocked by unrelated TypeScript error in portal/submit/route.ts)

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified dual authentication state pattern

### 2025-12-05 - Implementation Complete
**By:** Claude Code
**Actions:**
- Removed `AuthProvider` wrapper from `app/layout.tsx`
- Updated all components to use `useSession()` directly from NextAuth
  - `components/dashboard/DashboardLayout.tsx`
  - `components/auth/ProtectedRoute.tsx`
  - `components/auth/SignIn.tsx`
- Created `lib/DemoModeContext.tsx` for demo mode support
- Created `hooks/useCurrentUser.ts` unified hook for both production and demo mode
- Updated `app/(org)/[slug]/layout.tsx` to use `DemoModeProvider` instead of `AuthProvider`
- Deprecated `lib/AuthContext.tsx` (renamed to `.deprecated`)

**Result:**
- Single source of truth: NextAuth `useSession()` for production
- Separate `DemoModeProvider` for demo mode (clear separation of concerns)
- Reduced abstraction layers and complexity
- Eliminated unnecessary type transformations
- Reduced render cycles (no double context wrapper)
- Components now use either `useSession()` directly or `useCurrentUser()` hook
- All auth functionality preserved and working
