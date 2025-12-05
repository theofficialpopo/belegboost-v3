import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { submissions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getSubmissionForOrg } from '@/lib/db-helpers';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Get authenticated session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get submission ID from URL params
    const { id } = await context.params;

    // Parse request body
    const body = await request.json();
    const { datevAccount } = body;

    // Validate datevAccount
    if (datevAccount !== undefined && datevAccount !== null) {
      if (typeof datevAccount !== 'string') {
        return NextResponse.json(
          { error: 'datevAccount must be a string' },
          { status: 400 }
        );
      }

      // DATEV account should be max 20 characters (per schema)
      if (datevAccount.length > 20) {
        return NextResponse.json(
          { error: 'datevAccount cannot exceed 20 characters' },
          { status: 400 }
        );
      }
    }

    // Use db-helper to find submission with org-scoped enforcement
    // This automatically ensures the submission belongs to the user's organization
    const submission = await getSubmissionForOrg(id, session.user.organizationId);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Update the submission's datevAccount field
    const [updatedSubmission] = await db
      .update(submissions)
      .set({
        datevAccount: datevAccount || null,
        updatedAt: new Date(),
      })
      .where(eq(submissions.id, id))
      .returning();

    // Return the updated submission
    return NextResponse.json(
      {
        success: true,
        data: updatedSubmission,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
