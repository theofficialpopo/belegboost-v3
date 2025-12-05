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

// Extracted magic numbers
export const TOAST_DEFAULTS = {
  DURATION: 5000,
  MAX_TOASTS: 5,
} as const;

export const AUTH_SIMULATION_DELAY = 800; // milliseconds
