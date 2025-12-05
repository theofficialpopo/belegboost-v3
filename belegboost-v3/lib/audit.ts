/**
 * Audit Logging Utility
 *
 * Provides GDPR-compliant audit logging for all sensitive operations.
 * Required by GDPR Article 30 to maintain records of processing activities.
 *
 * Features:
 * - Transaction-safe logging (uses Drizzle transactions)
 * - IP address and user agent tracking
 * - Flexible metadata for context
 * - Type-safe audit action enum
 *
 * @example
 * ```typescript
 * // Within a transaction
 * await db.transaction(async (tx) => {
 *   const [member] = await tx.insert(teamMembers).values({...}).returning();
 *   await logAudit(tx, request, {
 *     organizationId: session.user.organizationId,
 *     userId: session.user.id,
 *     action: 'team_member_invited',
 *     resourceType: 'team_member',
 *     resourceId: member.id,
 *     metadata: { email: member.email, role: member.role }
 *   });
 * });
 *
 * // Without a transaction (standalone)
 * await logAudit(db, request, {
 *   organizationId: session.user.organizationId,
 *   userId: session.user.id,
 *   action: 'settings_changed',
 *   metadata: { setting: 'email_notifications', newValue: true }
 * });
 * ```
 */

import { NextRequest } from 'next/server';
import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { logError } from '@/lib/logger';

// Type for audit actions (imported from schema)
type AuditAction = 'login' | 'logout' | 'submission_created' | 'submission_reviewed' |
  'submission_exported' | 'file_uploaded' | 'file_deleted' | 'team_member_invited' |
  'team_member_removed' | 'settings_changed' | 'export_created' | 'export_downloaded';

// Type for database or transaction - use 'any' to accept any transaction type
// This is safe because we only use .insert() which is available on both db and transactions
type DbOrTransaction = typeof db | any;

/**
 * Audit log data structure
 */
export interface AuditLogData {
  /** Organization ID (required for tenant isolation) */
  organizationId: string;

  /** User ID who performed the action (optional for system actions) */
  userId?: string | null;

  /** Type of action performed */
  action: AuditAction;

  /** Resource type (e.g., 'submission', 'team_member', 'file') */
  resourceType?: string;

  /** Resource ID (e.g., submission UUID, team member UUID) */
  resourceId?: string;

  /** Additional context data (flexible JSON) */
  metadata?: Record<string, unknown>;
}

/**
 * Extract client IP address from request headers
 * Handles various proxy headers in order of precedence:
 * 1. x-forwarded-for (standard)
 * 2. x-real-ip (nginx)
 * 3. cf-connecting-ip (Cloudflare)
 *
 * @param headers - Request headers
 * @returns Client IP address or 'unknown' if not found
 */
export function getClientIp(headers: Headers): string {
  // x-forwarded-for can contain multiple IPs, take the first one (client IP)
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Check for x-real-ip (nginx)
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Check for cf-connecting-ip (Cloudflare)
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  return 'unknown';
}

/**
 * Extract user agent from request headers
 *
 * @param headers - Request headers
 * @returns User agent string or null if not found
 */
export function getUserAgent(headers: Headers): string | null {
  return headers.get('user-agent');
}

/**
 * Log an audit event to the audit_logs table
 *
 * This function MUST be called for all sensitive operations to maintain
 * GDPR compliance. It can be used within a transaction or standalone.
 *
 * @param txOrDb - Database transaction or db instance
 * @param request - Next.js request object (for IP and user agent extraction)
 * @param data - Audit log data
 * @returns Promise that resolves when audit log is created
 *
 * @example
 * ```typescript
 * // Within a transaction
 * await db.transaction(async (tx) => {
 *   // Perform mutation
 *   const [submission] = await tx.insert(submissions).values({...}).returning();
 *
 *   // Log audit event
 *   await logAudit(tx, request, {
 *     organizationId: session.user.organizationId,
 *     userId: session.user.id,
 *     action: 'submission_created',
 *     resourceType: 'submission',
 *     resourceId: submission.id,
 *     metadata: { clientName: submission.clientName, provider: submission.provider }
 *   });
 * });
 * ```
 */
export async function logAudit(
  txOrDb: DbOrTransaction,
  request: NextRequest,
  data: AuditLogData
): Promise<void> {
  try {
    // Extract IP address and user agent from request
    const ipAddress = getClientIp(request.headers);
    const userAgent = getUserAgent(request.headers);

    // Insert audit log entry
    await txOrDb.insert(auditLogs).values({
      organizationId: data.organizationId,
      userId: data.userId || null,
      action: data.action,
      resourceType: data.resourceType || null,
      resourceId: data.resourceId || null,
      metadata: data.metadata || null,
      ipAddress,
      userAgent: userAgent ? userAgent.substring(0, 500) : null, // Truncate to schema limit
      createdAt: new Date(),
    });
  } catch (error) {
    // Log error but don't throw - audit logging should not break the main operation
    // In production, you might want to send this to an error tracking service
    logError('Failed to create audit log entry', error);

    // Optional: Log audit data in development for debugging
    if (process.env.NODE_ENV === 'development') {
      logError('Audit log data', data);
    }
  }
}
