import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { getEnvVar } from '@/lib/env-validation';

// Connection string from environment with validation
// This will throw a clear error message if DATABASE_URL is not set
const connectionString = getEnvVar('DATABASE_URL');

// Create postgres connection
// For production: max 10 connections, for dev: max 1
const client = postgres(connectionString, {
  max: process.env.NODE_ENV === 'production' ? 10 : 1,
});

// Create drizzle instance with schema
export const db = drizzle(client, { schema });

// Export schema for convenience
export { schema };

// Export types
export type Database = typeof db;
