import { pgTable, uuid, varchar, boolean, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { teamRoleEnum } from './users';

export const memberStatusEnum = pgEnum('member_status', ['active', 'invited']);

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  jobTitle: varchar('job_title', { length: 255 }),
  role: teamRoleEnum('role').notNull().default('member'),
  email: varchar('email', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 10 }), // Initials like "SW"
  status: memberStatusEnum('status').notNull().default('invited'),
  isPubliclyVisible: boolean('is_publicly_visible').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
  index('team_members_org_idx').on(table.organizationId),
]);

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [teamMembers.organizationId],
    references: [organizations.id],
  }),
}));

export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
