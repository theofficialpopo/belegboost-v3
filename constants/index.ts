
export const SUBMISSION_STATUS = {
  NEW: 'new',
  REVIEW: 'review',
  EXPORTED: 'exported',
} as const;

export const TEAM_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export const THEMES = ['emerald', 'ocean', 'violet'] as const;
export const MODES = ['light', 'dark', 'system'] as const;
