import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { teamMembers } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getTeamMemberForOrg } from '@/lib/db-helpers';
import { logger } from '@/lib/logger';
import { withCsrfProtection } from '@/lib/csrf';
import { isDemoMode, demoModeReadOnly } from '@/lib/api-errors';
import { logAudit } from '@/lib/audit';

export const DELETE = withCsrfProtection(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    // Prevent mutations in demo mode
    if (isDemoMode(session.user.organizationId)) {
      return demoModeReadOnly();
    }

    // Check if user has permission (owner or admin)
    const userRole = session.user.role;
    if (userRole !== 'owner' && userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Keine Berechtigung zum Löschen von Mitarbeitern' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Use db-helper to verify member exists and belongs to the user's organization
    const member = await getTeamMemberForOrg(id, session.user.organizationId);

    if (!member) {
      return NextResponse.json(
        { error: 'Mitarbeiter nicht gefunden' },
        { status: 404 }
      );
    }

    // Prevent deleting owners
    if (member.role === 'owner') {
      return NextResponse.json(
        { error: 'Der Inhaber kann nicht gelöscht werden' },
        { status: 400 }
      );
    }

    // Delete the member and log audit event in a transaction
    await db.transaction(async (tx) => {
      // Delete the member (hard delete)
      await tx
        .delete(teamMembers)
        .where(
          and(
            eq(teamMembers.id, id),
            eq(teamMembers.organizationId, session.user.organizationId)
          )
        );

      // Log audit event for GDPR compliance
      await logAudit(tx, request, {
        organizationId: session.user.organizationId,
        userId: session.user.id,
        action: 'team_member_removed',
        resourceType: 'team_member',
        resourceId: id,
        metadata: {
          email: member.email,
          name: member.name,
          role: member.role,
          removedBy: session.user.email,
        },
      });
    });

    return NextResponse.json(
      { success: true, message: 'Mitarbeiter erfolgreich gelöscht' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error deleting team member', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Mitarbeiters' },
      { status: 500 }
    );
  }
});
