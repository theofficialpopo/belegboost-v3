import { pgTable, uuid, varchar, integer, timestamp, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { submissions } from './submissions';

export const parseStatusEnum = pgEnum('parse_status', ['pending', 'processing', 'completed', 'failed']);

export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  s3Key: varchar('s3_key', { length: 500 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  parseStatus: parseStatusEnum('parse_status').notNull().default('pending'),
  parseErrors: jsonb('parse_errors').$type<string[]>().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => [
  index('files_submission_idx').on(table.submissionId),
]);

export const filesRelations = relations(files, ({ one }) => ({
  submission: one(submissions, {
    fields: [files.submissionId],
    references: [submissions.id],
  }),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
