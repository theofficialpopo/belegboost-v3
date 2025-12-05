/**
 * Database query helpers with built-in multi-tenant enforcement
 *
 * All query helpers in this file automatically enforce organizationId filtering
 * to prevent cross-tenant data access at the application level.
 */

import { db } from '@/db';
import { submissions, teamMembers, exports, organizations, users } from '@/db/schema';
import { eq, desc, and, SQL, sql, count } from 'drizzle-orm';


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

  // Build conditions for the query - organizationId filter is always required
  const conditions: SQL[] = [eq(submissions.organizationId, organizationId)];

  if (options?.status) {
    conditions.push(eq(exports.status, options.status));
  }

  if (options?.format) {
    conditions.push(eq(exports.format, options.format));
  }

  // PERFORMANCE FIX: Use innerJoin to filter at database level instead of fetching all exports
  // This prevents fetching unnecessary rows by joining with submissions and filtering by organizationId
  // Old approach fetched ALL exports then filtered in JavaScript (90-99% waste at scale)
  let query = db
    .select({
      id: exports.id,
      submissionId: exports.submissionId,
      format: exports.format,
      status: exports.status,
      s3Key: exports.s3Key,
      fileName: exports.fileName,
      fileSizeBytes: exports.fileSizeBytes,
      errorMessage: exports.errorMessage,
      createdAt: exports.createdAt,
      createdBy: exports.createdBy,
      completedAt: exports.completedAt,
      submission: submissions,
      creator: users,
    })
    .from(exports)
    .innerJoin(submissions, eq(exports.submissionId, submissions.id))
    .leftJoin(users, eq(exports.createdBy, users.id))
    .where(and(...conditions))
    .orderBy(desc(exports.createdAt));

  // Apply limit if specified
  if (options?.limit) {
    query = query.limit(options.limit) as any;
  }

  return await query;
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

