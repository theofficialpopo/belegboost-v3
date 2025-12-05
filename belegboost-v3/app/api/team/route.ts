import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { teamMembers } from '@/db/schema/team-members';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { unauthorized, forbidden, badRequest, notFound, serverError, isDemoMode, demoModeReadOnly, conflict } from '@/lib/api-errors';
import { withCsrfProtection } from '@/lib/csrf';
import { logAudit } from '@/lib/audit';

// Validation schema for team member data
const teamMemberSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  jobTitle: z.string().optional(),
  role: z.enum(['owner', 'admin', 'member']),
  avatar: z.string().max(10).optional(),
  isPubliclyVisible: z.boolean().default(false),
});

// POST: Create new team member
export const POST = withCsrfProtection(async (request: NextRequest) => {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return unauthorized();
    }

    // Prevent mutations in demo mode
    if (isDemoMode(session.user.organizationId)) {
      return demoModeReadOnly();
    }

    // Check if user has permission (owner or admin)
    if (session.user.role !== 'owner' && session.user.role !== 'admin') {
      return forbidden('Only owners and admins can manage team members');
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = teamMemberSchema.parse(body);

    // Prevent creating owner role unless the current user is an owner
    if (validatedData.role === 'owner' && session.user.role !== 'owner') {
      return forbidden('Only owners can create other owners');
    }

    // Check for existing team member with same email in this organization
    const existingMemberWithEmail = await db.query.teamMembers.findFirst({
      where: and(
        eq(teamMembers.organizationId, session.user.organizationId),
        eq(teamMembers.email, validatedData.email)
      ),
    });

    if (existingMemberWithEmail) {
      return conflict('A team member with this email already exists in your organization', 'email');
    }

    // Create new team member and log audit event in a transaction
    const result = await db.transaction(async (tx) => {
      const [newMember] = await tx.insert(teamMembers).values({
        organizationId: session.user.organizationId,
        name: validatedData.name,
        email: validatedData.email,
        jobTitle: validatedData.jobTitle || null,
        role: validatedData.role,
        avatar: validatedData.avatar || null,
        isPubliclyVisible: validatedData.isPubliclyVisible,
        status: 'invited', // New members start as invited
      }).returning();

      if (!newMember) {
        throw new Error('Failed to create team member');
      }

      // Log audit event for GDPR compliance
      await logAudit(tx, request, {
        organizationId: session.user.organizationId,
        userId: session.user.id,
        action: 'team_member_invited',
        resourceType: 'team_member',
        resourceId: newMember.id,
        metadata: {
          email: newMember.email,
          name: newMember.name,
          role: newMember.role,
          invitedBy: session.user.email,
        },
      });

      return newMember;
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Team member invited successfully',
    }, { status: 201 });

  } catch (error) {
    logger.error('Error creating team member', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return badRequest('Validation error', error.issues);
    }

    // Handle database unique constraint violations (fallback safety net)
    // This should not occur if the pre-check works correctly
    if (error instanceof Error && (error.message.includes('unique constraint') || error.message.includes('duplicate key'))) {
      if (error.message.includes('team_members_org_email_unique')) {
        return conflict('A team member with this email already exists in your organization', 'email');
      }
    }

    return serverError();
  }
});

// PATCH: Update existing team member
export const PATCH = withCsrfProtection(async (request: NextRequest) => {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return unauthorized();
    }

    // Prevent mutations in demo mode
    if (isDemoMode(session.user.organizationId)) {
      return demoModeReadOnly();
    }

    // Check if user has permission (owner or admin)
    if (session.user.role !== 'owner' && session.user.role !== 'admin') {
      return forbidden('Only owners and admins can manage team members');
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = teamMemberSchema.parse(body);

    if (!validatedData.id) {
      return badRequest('Member ID is required for updates');
    }

    // Use db-helper to fetch existing member with org-scoped enforcement
    const { getTeamMemberForOrg } = await import('@/lib/db-helpers');
    const existingMember = await getTeamMemberForOrg(
      validatedData.id,
      session.user.organizationId
    );

    if (!existingMember) {
      return notFound('Team member');
    }

    // Prevent modifying owner role unless the current user is an owner
    if (existingMember.role === 'owner' && session.user.role !== 'owner') {
      return forbidden('Only owners can modify other owners');
    }

    // Prevent changing role to owner unless current user is owner
    if (validatedData.role === 'owner' && session.user.role !== 'owner') {
      return forbidden('Only owners can promote members to owner');
    }

    // Check if email is being changed and if it conflicts with another member
    if (validatedData.email !== existingMember.email) {
      const conflictingMember = await db.query.teamMembers.findFirst({
        where: and(
          eq(teamMembers.organizationId, session.user.organizationId),
          eq(teamMembers.email, validatedData.email)
        ),
      });

      if (conflictingMember) {
        return conflict('A team member with this email already exists in your organization', 'email');
      }
    }

    // Update team member
    const [updatedMember] = await db
      .update(teamMembers)
      .set({
        name: validatedData.name,
        email: validatedData.email,
        jobTitle: validatedData.jobTitle || null,
        role: validatedData.role,
        avatar: validatedData.avatar || null,
        isPubliclyVisible: validatedData.isPubliclyVisible,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(teamMembers.id, validatedData.id),
          eq(teamMembers.organizationId, session.user.organizationId)
        )
      )
      .returning();

    if (!updatedMember) {
      return serverError('Failed to update team member');
    }

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: 'Team member updated successfully',
    }, { status: 200 });

  } catch (error) {
    logger.error('Error updating team member', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return badRequest('Validation error', error.issues);
    }

    // Handle database unique constraint violations (fallback safety net)
    // This should not occur if the pre-check works correctly
    if (error instanceof Error && (error.message.includes('unique constraint') || error.message.includes('duplicate key'))) {
      if (error.message.includes('team_members_org_email_unique')) {
        return conflict('A team member with this email already exists in your organization', 'email');
      }
    }

    return serverError();
  }
});
