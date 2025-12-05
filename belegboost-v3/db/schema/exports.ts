import { pgTable, uuid, varchar, integer, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { submissions } from './submissions';
import { users } from './users';

export const exportStatusEnum = pgEnum('export_status', ['pending', 'processing', 'completed', 'failed']);
export const exportFormatEnum = pgEnum('export_format', ['datev_csv', 'datev_xml', 'pdf_report']);

export const exports = pgTable('exports', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),

  // Export details
  format: exportFormatEnum('format').notNull().default('datev_csv'),
  status: exportStatusEnum('status').notNull().default('pending'),

  // File info (once generated)
  s3Key: varchar('s3_key', { length: 500 }),
  fileName: varchar('file_name', { length: 255 }),
  fileSizeBytes: integer('file_size_bytes'),

  // Processing info
  transactionCount: integer('transaction_count'),
  errorMessage: varchar('error_message', { length: 1000 }),

  // Timestamps
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => [
  index('exports_submission_idx').on(table.submissionId),
  index('exports_created_by_idx').on(table.createdBy),
  index('exports_status_idx').on(table.status),
]);

export const exportsRelations = relations(exports, ({ one }) => ({
  submission: one(submissions, {
    fields: [exports.submissionId],
    references: [submissions.id],
  }),
  creator: one(users, {
    fields: [exports.createdBy],
    references: [users.id],
  }),
}));

export type Export = typeof exports.$inferSelect;
export type NewExport = typeof exports.$inferInsert;
