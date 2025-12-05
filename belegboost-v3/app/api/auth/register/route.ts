import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { organizations, users } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  subdomain: z.string()
    .min(3, 'Subdomain must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens allowed'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password, companyName, subdomain } = validationResult.data;

    // Check if subdomain is already taken
    const existingOrg = await db.query.organizations.findFirst({
      where: eq(organizations.subdomain, subdomain),
    });

    if (existingOrg) {
      return NextResponse.json(
        { error: 'Subdomain already taken', field: 'subdomain' },
        { status: 409 }
      );
    }

    // Check if email is already registered
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered', field: 'email' },
        { status: 409 }
      );
    }

    // Hash password with bcryptjs (12 rounds)
    const passwordHash = await bcrypt.hash(password, 12);

    // Create organization and user in a transaction
    const result = await db.transaction(async (tx) => {
      // Create organization first
      const [newOrg] = await tx
        .insert(organizations)
        .values({
          name: companyName,
          subdomain: subdomain,
          email: email,
          settings: {},
          plan: 'starter',
        })
        .returning();

      if (!newOrg) {
        throw new Error('Failed to create organization');
      }

      // Create user linked to the organization
      const [newUser] = await tx
        .insert(users)
        .values({
          organizationId: newOrg.id,
          email: email,
          passwordHash: passwordHash,
          name: name,
          role: 'owner', // First user is the owner
        })
        .returning();

      if (!newUser) {
        throw new Error('Failed to create user');
      }

      return { organization: newOrg, user: newUser };
    });

    // Return success response with organization slug
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: {
          organizationId: result.organization.id,
          subdomain: result.organization.subdomain,
          userId: result.user.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    // Handle database errors
    if (error instanceof Error) {
      // Check for unique constraint violations
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'Email or subdomain already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
