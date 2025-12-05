import { pgTable, uuid, varchar, integer, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { teamMembers } from './team-members';
import { users } from './users';

export const submissionStatusEnum = pgEnum('submission_status', ['new', 'review', 'exported']);

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  teamMemberId: uuid('team_member_id').references(() => teamMembers.id, { onDelete: 'set null' }),
  reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),

  // Client info (from portal form)
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientNumber: varchar('client_number', { length: 50 }),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),

  // Provider info
  provider: varchar('provider', { length: 100 }).notNull(),
  providerLogo: varchar('provider_logo', { length: 10 }),

  // Period
  dateFrom: timestamp('date_from').notNull(),
  dateTo: timestamp('date_to').notNull(),
  endBalance: varchar('end_balance', { length: 50 }),

  // Status
  status: submissionStatusEnum('status').notNull().default('new'),
  transactionCount: integer('transaction_count').default(0),

  // DATEV integration
  datevAccount: varchar('datev_account', { length: 20 }),
  assignedAdvisor: varchar('assigned_advisor', { length: 10 }),

  // Timestamps
  receivedAt: timestamp('received_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
  index('submissions_org_idx').on(table.organizationId),
  index('submissions_status_idx').on(table.status),
  index('submissions_received_idx').on(table.receivedAt),
  // Composite index for the most common query pattern (org-scoped, filtered by status, ordered by date)
  index('submissions_org_status_received_idx').on(table.organizationId, table.status, table.receivedAt),
]);

export const submissionsRelations = relations(submissions, ({ one }) => ({
  organization: one(organizations, {
    fields: [submissions.organizationId],
    references: [organizations.id],
  }),
  teamMember: one(teamMembers, {
    fields: [submissions.teamMemberId],
    references: [teamMembers.id],
  }),
  reviewer: one(users, {
    fields: [submissions.reviewedBy],
    references: [users.id],
  }),
}));

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
