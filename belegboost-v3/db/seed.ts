import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function seed() {
  console.log('Seeding database...');

  // Clean existing data (in reverse order of dependencies)
  console.log('Cleaning existing data...');
  await db.delete(schema.auditLogs);
  await db.delete(schema.exports);
  await db.delete(schema.transactions);
  await db.delete(schema.files);
  await db.delete(schema.submissions);
  await db.delete(schema.teamMembers);
  await db.delete(schema.users);
  await db.delete(schema.organizations);

  // Create demo organization
  console.log('Creating organizations...');
  const [demoOrg] = await db.insert(schema.organizations).values({
    name: 'Mustermann Steuerberatung',
    subdomain: 'mustermann',
    email: 'info@mustermann-stb.de',
    settings: {
      theme: 'emerald',
      defaultDATEVAccount: '1800',
      notificationPrefs: {
        emailOnUpload: true,
        dailySummary: true,
        errorAlerts: true,
      },
    },
    plan: 'professional',
  }).returning();

  // Create users with hashed passwords
  console.log('Creating users...');
  const passwordHash = await hashPassword('demo123');

  const [ownerUser, adminUser, memberUser] = await db.insert(schema.users).values([
    {
      organizationId: demoOrg.id,
      email: 'stefan@mustermann-stb.de',
      passwordHash,
      name: 'Stefan Weber',
      role: 'owner',
      avatar: 'SW',
    },
    {
      organizationId: demoOrg.id,
      email: 'maria@mustermann-stb.de',
      passwordHash,
      name: 'Maria Schmidt',
      role: 'admin',
      avatar: 'MS',
    },
    {
      organizationId: demoOrg.id,
      email: 'thomas@mustermann-stb.de',
      passwordHash,
      name: 'Thomas Müller',
      role: 'member',
      avatar: 'TM',
    },
  ]).returning();

  // Create team members (publicly visible in portal)
  console.log('Creating team members...');
  const [swTeamMember, msTeamMember, tmTeamMember] = await db.insert(schema.teamMembers).values([
    {
      organizationId: demoOrg.id,
      name: 'Stefan Weber',
      jobTitle: 'Steuerberater',
      role: 'owner',
      email: 'stefan@mustermann-stb.de',
      avatar: 'SW',
      status: 'active',
      isPubliclyVisible: true,
    },
    {
      organizationId: demoOrg.id,
      name: 'Maria Schmidt',
      jobTitle: 'Steuerfachangestellte',
      role: 'admin',
      email: 'maria@mustermann-stb.de',
      avatar: 'MS',
      status: 'active',
      isPubliclyVisible: true,
    },
    {
      organizationId: demoOrg.id,
      name: 'Thomas Müller',
      jobTitle: 'Buchhalter',
      role: 'member',
      email: 'thomas@mustermann-stb.de',
      avatar: 'TM',
      status: 'active',
      isPubliclyVisible: false,
    },
  ]).returning();

  // Create submissions
  console.log('Creating submissions...');
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [submission1, submission2, submission3] = await db.insert(schema.submissions).values([
    {
      organizationId: demoOrg.id,
      teamMemberId: swTeamMember.id,
      clientName: 'Tech Solutions GmbH',
      clientNumber: '10234',
      clientEmail: 'buchhaltung@tech-solutions.de',
      provider: 'American Express',
      providerLogo: 'amex',
      dateFrom: new Date('2025-09-01'),
      dateTo: new Date('2025-09-30'),
      endBalance: '4.582,34 €',
      status: 'new',
      transactionCount: 23,
      datevAccount: '1800',
      assignedAdvisor: 'SW',
      receivedAt: oneWeekAgo,
    },
    {
      organizationId: demoOrg.id,
      teamMemberId: msTeamMember.id,
      reviewedBy: adminUser.id,
      clientName: 'Müller & Partner KG',
      clientNumber: '10456',
      clientEmail: 'office@mueller-partner.de',
      provider: 'Wise',
      providerLogo: 'wise',
      dateFrom: new Date('2025-08-01'),
      dateTo: new Date('2025-08-31'),
      endBalance: '12.450,00 €',
      status: 'review',
      transactionCount: 45,
      datevAccount: '1810',
      assignedAdvisor: 'MS',
      receivedAt: twoWeeksAgo,
    },
    {
      organizationId: demoOrg.id,
      teamMemberId: tmTeamMember.id,
      reviewedBy: memberUser.id,
      clientName: 'Schmidt Consulting',
      clientNumber: '10789',
      clientEmail: 'finanzen@schmidt-consulting.de',
      provider: 'Revolut Business',
      providerLogo: 'revolut',
      dateFrom: new Date('2025-07-01'),
      dateTo: new Date('2025-07-31'),
      endBalance: '8.920,50 €',
      status: 'exported',
      transactionCount: 67,
      datevAccount: '1800',
      assignedAdvisor: 'TM',
      receivedAt: oneMonthAgo,
    },
  ]).returning();

  // Create files for submissions
  console.log('Creating files...');
  await db.insert(schema.files).values([
    {
      submissionId: submission1.id,
      originalName: 'amex-september-2025.csv',
      s3Key: `${demoOrg.id}/${submission1.id}/amex-september-2025.csv`,
      mimeType: 'text/csv',
      sizeBytes: 45678,
      parseStatus: 'completed',
    },
    {
      submissionId: submission1.id,
      originalName: 'amex-statement-september.pdf',
      s3Key: `${demoOrg.id}/${submission1.id}/amex-statement-september.pdf`,
      mimeType: 'application/pdf',
      sizeBytes: 234567,
      parseStatus: 'completed',
    },
    {
      submissionId: submission2.id,
      originalName: 'wise-august-2025.csv',
      s3Key: `${demoOrg.id}/${submission2.id}/wise-august-2025.csv`,
      mimeType: 'text/csv',
      sizeBytes: 89012,
      parseStatus: 'completed',
    },
    {
      submissionId: submission3.id,
      originalName: 'revolut-july-2025.csv',
      s3Key: `${demoOrg.id}/${submission3.id}/revolut-july-2025.csv`,
      mimeType: 'text/csv',
      sizeBytes: 123456,
      parseStatus: 'completed',
    },
  ]);

  // Create transactions for submission1
  console.log('Creating transactions...');
  const transactionData = [
    { merchant: 'Uber Technologies Inc.', location: 'San Francisco, US', amount: '39.42', currency: 'EUR', category: 'Transport' },
    { merchant: 'Google Cloud EMEA', location: 'Dublin, IE', amount: '129.00', currency: 'EUR', category: 'Software' },
    { merchant: 'Slack Technologies', location: 'San Francisco, US', amount: '11.15', currency: 'EUR', category: 'Software' },
    { merchant: 'Deutsche Bahn', location: 'Berlin, DE', amount: '84.50', currency: 'EUR', category: 'Transport' },
    { merchant: 'JetBrains s.r.o.', location: 'Prague, CZ', amount: '249.00', currency: 'EUR', category: 'Software' },
    { merchant: 'Starbucks Coffee', location: 'Munich, DE', amount: '4.50', currency: 'EUR', category: 'Verpflegung' },
    { merchant: 'DigitalOcean', location: 'New York, US', amount: '45.00', currency: 'EUR', category: 'Hosting' },
    { merchant: 'GitHub Inc.', location: 'San Francisco, US', amount: '21.00', currency: 'EUR', category: 'Software' },
  ];

  await db.insert(schema.transactions).values(
    transactionData.map((tx, index) => ({
      submissionId: submission1.id,
      transactionDate: new Date(`2025-09-${28 - index}`).toISOString().split('T')[0],
      description: tx.merchant,
      amount: tx.amount,
      currency: tx.currency,
      category: tx.category,
      merchantName: tx.merchant,
      datevAccount: '4900',
      rawData: { location: tx.location },
    }))
  );

  // Create an export for submission3
  console.log('Creating exports...');
  await db.insert(schema.exports).values({
    submissionId: submission3.id,
    createdBy: memberUser.id,
    format: 'datev_csv',
    status: 'completed',
    s3Key: `${demoOrg.id}/exports/${submission3.id}/datev-export.csv`,
    fileName: 'datev-export-schmidt-consulting-juli-2025.csv',
    fileSizeBytes: 15678,
    transactionCount: 67,
    startedAt: oneMonthAgo,
    completedAt: oneMonthAgo,
  });

  // Create audit logs
  console.log('Creating audit logs...');
  await db.insert(schema.auditLogs).values([
    {
      organizationId: demoOrg.id,
      userId: ownerUser.id,
      action: 'login',
      metadata: { browser: 'Chrome 120' },
      ipAddress: '192.168.1.100',
    },
    {
      organizationId: demoOrg.id,
      userId: adminUser.id,
      action: 'submission_reviewed',
      resourceType: 'submission',
      resourceId: submission2.id,
      metadata: { previousStatus: 'new', newStatus: 'review' },
    },
    {
      organizationId: demoOrg.id,
      userId: memberUser.id,
      action: 'export_created',
      resourceType: 'export',
      resourceId: submission3.id,
      metadata: { format: 'datev_csv' },
    },
  ]);

  console.log('Seeding complete!');
  console.log('\nDemo credentials:');
  console.log('  Email: stefan@mustermann-stb.de');
  console.log('  Password: demo123');
  console.log('\nOrganization subdomain: mustermann');

  await client.end();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
