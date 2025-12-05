import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { organizations, users } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import {
  getClientIp,
  checkRegistrationRateLimit,
  resetRegistrationRateLimit,
  RateLimitError,
} from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { registerSchema } from '@/lib/validations/auth';
import { validateCsrf } from '@/lib/csrf';
import { badRequest, conflict, serverError } from '@/lib/api-errors';

export async function POST(request: NextRequest) {
  try {
    // Extract IP address for rate limiting
    const clientIp = getClientIp(request.headers);

    // Check rate limit before processing registration
    const rateLimitResult = checkRegistrationRateLimit(clientIp);

    if (!rateLimitResult.success) {
      const retryAfterSeconds = Math.ceil(
        (rateLimitResult.retryAfter || 0) / 1000
      );
      return NextResponse.json(
        {
          error: `Too many registration attempts. Please try again in ${retryAfterSeconds} seconds.`,
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(Math.ceil(rateLimitResult.reset / 1000)),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return badRequest('Validation failed', validationResult.error.flatten());
    }

    const { name, email, password, companyName, subdomain } = validationResult.data;

    // NOTE: Organization lookup by subdomain is intentionally not org-scoped
    // This is the registration flow where we're checking subdomain availability
    // No organization context exists yet for the new user
    const existingOrg = await db.query.organizations.findFirst({
      where: eq(organizations.subdomain, subdomain),
    });

    if (existingOrg) {
      return conflict('Subdomain already taken', 'subdomain');
    }

    // NOTE: User lookup by email is intentionally not org-scoped
    // This is the registration flow checking for duplicate emails across all orgs
    // No organization context exists yet for the new user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return conflict('Email already registered', 'email');
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

    // Successful registration - reset rate limit for this IP
    resetRegistrationRateLimit(clientIp);

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
    logger.error('Registration error', error);

    // Handle database errors
    if (error instanceof Error) {
      // Check for unique constraint violations
      if (error.message.includes('unique constraint')) {
        return conflict('Email or subdomain already exists');
      }
    }

    return serverError('Internal server error. Please try again later.');
  }
}
