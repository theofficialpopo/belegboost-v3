/**
 * Database query helpers with built-in multi-tenant enforcement
 *
 * All query helpers in this file automatically enforce organizationId filtering
 * to prevent cross-tenant data access at the application level.
 */

import { db } from '@/db';
import { submissions, teamMembers, exports, organizations } from '@/db/schema';
import { eq, desc, and, SQL, sql, count } from 'drizzle-orm';

/**
 * Higher-order function that wraps any query with organization scope enforcement
 *
 * @param query - The query builder function
 * @param organizationId - The organization ID to scope the query to
 * @returns The scoped query result
 *
 * @example
 * const result = await withOrgScope(
 *   (orgId) => db.query.submissions.findMany({
 *     where: eq(submissions.organizationId, orgId),
 *   }),
 *   organizationId
 * );
 */
export async function withOrgScope<T>(
  query: (organizationId: string) => Promise<T>,
  organizationId: string
): Promise<T> {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required for scoped queries');
  }
  return query(organizationId);
}

/**
 * Get organization by subdomain slug
 *
 * @param slug - The organization subdomain
 * @returns Organization or null if not found
 */
export async function getOrganizationBySlug(slug: string) {
  if (!slug || slug.trim() === '') {
    throw new Error('slug is required');
  }

  return db.query.organizations.findFirst({
    where: eq(organizations.subdomain, slug),
  });
}

/**
 * Get organization ID from subdomain slug
 *
 * @param slug - The organization subdomain
 * @returns Organization ID or null if not found
 */
export async function getOrganizationIdBySlug(slug: string): Promise<string | null> {
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.subdomain, slug),
    columns: { id: true },
  });
  return org?.id || null;
}

// ============================================================================
// SUBMISSIONS QUERIES
// ============================================================================

/**
 * Get all submissions for an organization
 *
 * @param organizationId - The organization ID to scope the query to
 * @param options - Optional query parameters
 * @returns Array of submissions with related data
 */
export async function getSubmissionsForOrg(
  organizationId: string,
  options?: {
    status?: 'new' | 'review' | 'exported';
    limit?: number;
    includeTeamMember?: boolean;
    includeReviewer?: boolean;
    includeFiles?: boolean;
    includeExports?: boolean;
  }
) {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  const conditions: SQL[] = [eq(submissions.organizationId, organizationId)];

  if (options?.status) {
    conditions.push(eq(submissions.status, options.status));
  }

  const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions);

  // PERFORMANCE: Use 'with' clause for eager loading relations in a single query
  // This prevents N+1 queries when accessing related data (teamMember, files, exports, etc.)
  return db.query.submissions.findMany({
    where: whereClause,
    orderBy: desc(submissions.receivedAt),
    limit: options?.limit,
    with: {
      ...(options?.includeTeamMember && { teamMember: true }),
      ...(options?.includeReviewer && { reviewer: true }),
      ...(options?.includeFiles && { files: true }),
      ...(options?.includeExports && { exports: true }),
    },
  });
}

/**
 * Get a single submission by ID with organization scope enforcement
 *
 * @param submissionId - The submission ID
 * @param organizationId - The organization ID to scope the query to
 * @returns Submission or null if not found or belongs to different org
 */
export async function getSubmissionForOrg(
  submissionId: string,
  organizationId: string,
  options?: {
    includeTeamMember?: boolean;
    includeReviewer?: boolean;
    includeFiles?: boolean;
    includeExports?: boolean;
  }
) {
  if (!submissionId || submissionId.trim() === '') {
    throw new Error('submissionId is required');
  }
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  // PERFORMANCE: Use 'with' clause for eager loading relations in a single query
  return db.query.submissions.findFirst({
    where: and(
      eq(submissions.id, submissionId),
      eq(submissions.organizationId, organizationId)
    ),
    with: {
      ...(options?.includeTeamMember && { teamMember: true }),
      ...(options?.includeReviewer && { reviewer: true }),
      ...(options?.includeFiles && { files: true }),
      ...(options?.includeExports && { exports: true }),
    },
  });
}

/**
 * Count submissions for an organization by status
 *
 * @param organizationId - The organization ID to scope the query to
 * @returns Object with counts by status
 */
export async function countSubmissionsByStatusForOrg(organizationId: string) {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  // PERFORMANCE FIX: Use SQL aggregation with conditional counts instead of fetching all rows
  // This executes a single SQL query with COUNT(CASE WHEN...) instead of filtering in JavaScript
  const result = await db
    .select({
      new: count(sql`CASE WHEN ${submissions.status} = 'new' THEN 1 END`),
      review: count(sql`CASE WHEN ${submissions.status} = 'review' THEN 1 END`),
      exported: count(sql`CASE WHEN ${submissions.status} = 'exported' THEN 1 END`),
      total: count(submissions.id),
    })
    .from(submissions)
    .where(eq(submissions.organizationId, organizationId));

  return {
    new: Number(result[0].new),
    review: Number(result[0].review),
    exported: Number(result[0].exported),
    total: Number(result[0].total),
  };
}

// ============================================================================
// TEAM MEMBERS QUERIES
// ============================================================================

/**
 * Get all team members for an organization
 *
 * @param organizationId - The organization ID to scope the query to
 * @param options - Optional query parameters
 * @returns Array of team members
 */
export async function getTeamMembersForOrg(
  organizationId: string,
  options?: {
    status?: 'active' | 'invited';
    role?: 'owner' | 'admin' | 'member';
    publicOnly?: boolean;
  }
) {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  const conditions: SQL[] = [eq(teamMembers.organizationId, organizationId)];

  if (options?.status) {
    conditions.push(eq(teamMembers.status, options.status));
  }

  if (options?.role) {
    conditions.push(eq(teamMembers.role, options.role));
  }

  if (options?.publicOnly) {
    conditions.push(eq(teamMembers.isPubliclyVisible, true));
  }

  const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions);

  return db.query.teamMembers.findMany({
    where: whereClause,
    orderBy: (teamMembers, { asc }) => [asc(teamMembers.createdAt)],
  });
}

/**
 * Get a single team member by ID with organization scope enforcement
 *
 * @param teamMemberId - The team member ID
 * @param organizationId - The organization ID to scope the query to
 * @returns Team member or null if not found or belongs to different org
 */
export async function getTeamMemberForOrg(
  teamMemberId: string,
  organizationId: string
) {
  if (!teamMemberId || teamMemberId.trim() === '') {
    throw new Error('teamMemberId is required');
  }
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  return db.query.teamMembers.findFirst({
    where: and(
      eq(teamMembers.id, teamMemberId),
      eq(teamMembers.organizationId, organizationId)
    ),
  });
}

/**
 * Count active team members for an organization
 *
 * @param organizationId - The organization ID to scope the query to
 * @returns Number of active team members
 */
export async function countActiveTeamMembersForOrg(organizationId: string): Promise<number> {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  const members = await db.query.teamMembers.findMany({
    where: and(
      eq(teamMembers.organizationId, organizationId),
      eq(teamMembers.status, 'active')
    ),
    columns: {
      id: true,
    },
  });

  return members.length;
}

// ============================================================================
// EXPORTS QUERIES
// ============================================================================

/**
 * Get all exports for an organization (via submissions)
 *
 * @param organizationId - The organization ID to scope the query to
 * @param options - Optional query parameters
 * @returns Array of exports with related submission data
 */
export async function getExportsForOrg(
  organizationId: string,
  options?: {
    status?: 'pending' | 'processing' | 'completed' | 'failed';
    format?: 'datev_csv' | 'datev_xml' | 'pdf_report';
    limit?: number;
  }
) {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  // Build conditions for exports query
  const conditions: SQL[] = [];

  if (options?.status) {
    conditions.push(eq(exports.status, options.status));
  }

  if (options?.format) {
    conditions.push(eq(exports.format, options.format));
  }

  // PERFORMANCE FIX: Use eager loading with 'with' clause to join submissions in a single query
  // This prevents N+1 queries by fetching exports and their related submissions together
  const allExports = await db.query.exports.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    orderBy: desc(exports.createdAt),
    limit: options?.limit,
    with: {
      submission: true,  // Eager load submission in the same query
      creator: true,
    },
  });

  // Filter to only include exports whose submissions belong to this organization
  return allExports.filter(exp =>
    exp.submission && exp.submission.organizationId === organizationId
  );
}

/**
 * Get a single export by ID with organization scope enforcement
 *
 * @param exportId - The export ID
 * @param organizationId - The organization ID to scope the query to
 * @returns Export or null if not found or belongs to different org
 */
export async function getExportForOrg(
  exportId: string,
  organizationId: string
) {
  if (!exportId || exportId.trim() === '') {
    throw new Error('exportId is required');
  }
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  // Get the export with its submission
  const exportData = await db.query.exports.findFirst({
    where: eq(exports.id, exportId),
    with: {
      submission: true,
      creator: true,
    },
  });

  // Verify the submission belongs to the organization
  if (!exportData || exportData.submission.organizationId !== organizationId) {
    return null;
  }

  return exportData;
}

/**
 * Count exports for an organization by status
 *
 * @param organizationId - The organization ID to scope the query to
 * @returns Object with counts by status
 */
export async function countExportsByStatusForOrg(organizationId: string) {
  if (!organizationId || organizationId.trim() === '') {
    throw new Error('organizationId is required');
  }

  // PERFORMANCE FIX: Use SQL aggregation with JOIN instead of calling getExportsForOrg
  // This executes a single SQL query with COUNT(CASE WHEN...) instead of filtering in JavaScript
  const result = await db
    .select({
      pending: count(sql`CASE WHEN ${exports.status} = 'pending' THEN 1 END`),
      processing: count(sql`CASE WHEN ${exports.status} = 'processing' THEN 1 END`),
      completed: count(sql`CASE WHEN ${exports.status} = 'completed' THEN 1 END`),
      failed: count(sql`CASE WHEN ${exports.status} = 'failed' THEN 1 END`),
      total: count(exports.id),
    })
    .from(exports)
    .innerJoin(submissions, eq(exports.submissionId, submissions.id))
    .where(eq(submissions.organizationId, organizationId));

  return {
    pending: Number(result[0].pending),
    processing: Number(result[0].processing),
    completed: Number(result[0].completed),
    failed: Number(result[0].failed),
    total: Number(result[0].total),
  };
}
