import { pgTable, uuid, varchar, numeric, date, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { submissions } from './submissions';

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),

  // Transaction data from parsed file
  transactionDate: date('transaction_date').notNull(),
  postingDate: date('posting_date'),
  description: varchar('description', { length: 500 }).notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('EUR'),

  // Categorization
  category: varchar('category', { length: 100 }),
  merchantName: varchar('merchant_name', { length: 255 }),
  merchantCategory: varchar('merchant_category', { length: 100 }),

  // DATEV mapping
  datevAccount: varchar('datev_account', { length: 20 }),
  datevCostCenter: varchar('datev_cost_center', { length: 20 }),
  datevTaxCode: varchar('datev_tax_code', { length: 10 }),

  // Original data preservation
  rawData: jsonb('raw_data').$type<Record<string, unknown>>(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => [
  index('transactions_submission_idx').on(table.submissionId),
  index('transactions_date_idx').on(table.transactionDate),
]);

export const transactionsRelations = relations(transactions, ({ one }) => ({
  submission: one(submissions, {
    fields: [transactions.submissionId],
    references: [submissions.id],
  }),
}));

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
