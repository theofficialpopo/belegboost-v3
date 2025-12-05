import { pgTable, uuid, varchar, jsonb, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const planEnum = pgEnum('plan', ['starter', 'professional', 'enterprise']);

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  subdomain: varchar('subdomain', { length: 63 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull(),
  settings: jsonb('settings').$type<{
    theme?: 'emerald' | 'ocean' | 'violet';
    logoUrl?: string;
    defaultDATEVAccount?: string;
    notificationPrefs?: {
      emailOnUpload?: boolean;
      dailySummary?: boolean;
      errorAlerts?: boolean;
    };
  }>().default({}),
  plan: planEnum('plan').notNull().default('starter'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
