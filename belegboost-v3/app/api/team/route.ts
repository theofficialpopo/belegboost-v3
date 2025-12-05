import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { teamMembers } from '@/db/schema/team-members';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

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
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has permission (owner or admin)
    if (session.user.role !== 'owner' && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only owners and admins can manage team members' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = teamMemberSchema.parse(body);

    // Prevent creating owner role unless the current user is an owner
    if (validatedData.role === 'owner' && session.user.role !== 'owner') {
      return NextResponse.json(
        { error: 'Forbidden: Only owners can create other owners' },
        { status: 403 }
      );
    }

    // Create new team member
    const [newMember] = await db.insert(teamMembers).values({
      organizationId: session.user.organizationId,
      name: validatedData.name,
      email: validatedData.email,
      jobTitle: validatedData.jobTitle || null,
      role: validatedData.role,
      avatar: validatedData.avatar || null,
      isPubliclyVisible: validatedData.isPubliclyVisible,
      status: 'invited', // New members start as invited
    }).returning();

    return NextResponse.json({
      success: true,
      data: newMember,
      message: 'Team member invited successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating team member:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH: Update existing team member
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has permission (owner or admin)
    if (session.user.role !== 'owner' && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only owners and admins can manage team members' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = teamMemberSchema.parse(body);

    if (!validatedData.id) {
      return NextResponse.json(
        { error: 'Member ID is required for updates' },
        { status: 400 }
      );
    }

    // Use db-helper to fetch existing member with org-scoped enforcement
    const { getTeamMemberForOrg } = await import('@/lib/db-helpers');
    const existingMember = await getTeamMemberForOrg(
      validatedData.id,
      session.user.organizationId
    );

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Prevent modifying owner role unless the current user is an owner
    if (existingMember.role === 'owner' && session.user.role !== 'owner') {
      return NextResponse.json(
        { error: 'Forbidden: Only owners can modify other owners' },
        { status: 403 }
      );
    }

    // Prevent changing role to owner unless current user is owner
    if (validatedData.role === 'owner' && session.user.role !== 'owner') {
      return NextResponse.json(
        { error: 'Forbidden: Only owners can promote members to owner' },
        { status: 403 }
      );
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

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: 'Team member updated successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating team member:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
