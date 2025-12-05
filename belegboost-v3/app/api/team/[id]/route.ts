import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { teamMembers } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getTeamMemberForOrg } from '@/lib/db-helpers';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
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

    // Delete the member (hard delete)
    await db
      .delete(teamMembers)
      .where(
        and(
          eq(teamMembers.id, id),
          eq(teamMembers.organizationId, session.user.organizationId)
        )
      );

    return NextResponse.json(
      { success: true, message: 'Mitarbeiter erfolgreich gelöscht' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Mitarbeiters' },
      { status: 500 }
    );
  }
}
