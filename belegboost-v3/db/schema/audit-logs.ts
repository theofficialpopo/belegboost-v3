import { pgTable, uuid, varchar, timestamp, jsonb, index, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { users } from './users';

export const auditActionEnum = pgEnum('audit_action', [
  'login',
  'logout',
  'submission_created',
  'submission_reviewed',
  'submission_exported',
  'file_uploaded',
  'file_deleted',
  'team_member_invited',
  'team_member_removed',
  'settings_changed',
  'export_created',
  'export_downloaded',
]);

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),

  // Action details
  action: auditActionEnum('action').notNull(),
  resourceType: varchar('resource_type', { length: 50 }), // 'submission', 'file', 'team_member', etc.
  resourceId: uuid('resource_id'),

  // Additional context
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  ipAddress: varchar('ip_address', { length: 45 }), // Supports IPv6
  userAgent: varchar('user_agent', { length: 500 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => [
  index('audit_logs_org_idx').on(table.organizationId),
  index('audit_logs_user_idx').on(table.userId),
  index('audit_logs_action_idx').on(table.action),
  index('audit_logs_created_idx').on(table.createdAt),
]);

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [auditLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
