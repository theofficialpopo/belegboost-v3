---
status: pending
priority: p2
issue_id: "014"
tags: [architecture, authentication, refactoring]
dependencies: []
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
- [ ] AuthProvider removed or simplified
- [ ] Components use useSession() directly
- [ ] Demo mode handled separately
- [ ] All auth flows still work
- [ ] Tests pass
- [ ] Build passes

## Work Log
### 2025-12-05 - Code Review Discovery
**By:** Claude Code Review System
**Actions:** Identified dual authentication state pattern
