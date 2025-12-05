import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { submissions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getSubmissionForOrg } from '@/lib/db-helpers';
import { logger } from '@/lib/logger';
import { unauthorized, badRequest, notFound, serverError, isDemoMode, demoModeReadOnly } from '@/lib/api-errors';
import { withCsrfProtection } from '@/lib/csrf';
import { logAudit } from '@/lib/audit';

export const PATCH = withCsrfProtection(async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    // Get authenticated session
    const session = await auth();
    if (!session?.user) {
      return unauthorized();
    }

    // Prevent mutations in demo mode
    if (isDemoMode(session.user.organizationId)) {
      return demoModeReadOnly();
    }

    // Get submission ID from URL params
    const { id } = await context.params;

    // Parse request body
    const body = await request.json();
    const { datevAccount } = body;

    // Validate datevAccount
    if (datevAccount !== undefined && datevAccount !== null) {
      if (typeof datevAccount !== 'string') {
        return badRequest('datevAccount must be a string');
      }

      // DATEV account should be max 20 characters (per schema)
      if (datevAccount.length > 20) {
        return badRequest('datevAccount cannot exceed 20 characters');
      }
    }

    // Use db-helper to find submission with org-scoped enforcement
    // This automatically ensures the submission belongs to the user's organization
    const submission = await getSubmissionForOrg(id, session.user.organizationId);

    if (!submission) {
      return notFound('Submission');
    }

    // Update the submission's datevAccount field and log audit event in a transaction
    // SECURITY: Include explicit organizationId check to enforce tenant isolation
    const updatedSubmission = await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(submissions)
        .set({
          datevAccount: datevAccount || null,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(submissions.id, id),
            eq(submissions.organizationId, session.user.organizationId)
          )
        )
        .returning();

      if (!updated) {
        throw new Error('Failed to update submission');
      }

      // Log audit event for GDPR compliance
      await logAudit(tx, request, {
        organizationId: session.user.organizationId,
        userId: session.user.id,
        action: 'settings_changed',
        resourceType: 'submission',
        resourceId: id,
        metadata: {
          field: 'datevAccount',
          oldValue: submission.datevAccount,
          newValue: datevAccount || null,
          submissionClientName: submission.clientName,
        },
      });

      return updated;
    });

    // Return the updated submission
    return NextResponse.json(
      {
        success: true,
        data: updatedSubmission,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error updating submission', error);
    return serverError();
  }
});
