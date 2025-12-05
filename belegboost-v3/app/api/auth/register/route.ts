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
import { withCsrfProtection } from '@/lib/csrf';
import { badRequest, conflict, serverError } from '@/lib/api-errors';

export const POST = withCsrfProtection(async (request: NextRequest) => {
  try {
    // Extract IP address for rate limiting
    const clientIp = getClientIp(request.headers);

    // Check rate limit before processing registration
    const rateLimitResult = await checkRegistrationRateLimit(clientIp);

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

    // Hash password with bcryptjs (12 rounds) before transaction
    const passwordHash = await bcrypt.hash(password, 12);

    // Create organization and user in a transaction with uniqueness checks
    // NOTE: Checks are INSIDE transaction to prevent race conditions
    const result = await db.transaction(async (tx) => {
      // Check subdomain availability INSIDE transaction
      // This prevents race condition where two requests check simultaneously
      const existingOrg = await tx.query.organizations.findFirst({
        where: eq(organizations.subdomain, subdomain),
      });

      if (existingOrg) {
        throw new Error('CONFLICT_SUBDOMAIN');
      }

      // Check email availability INSIDE transaction
      const existingUser = await tx.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        throw new Error('CONFLICT_EMAIL');
      }

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
    await resetRegistrationRateLimit(clientIp);

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

    // Handle specific conflict errors from transaction
    if (error instanceof Error) {
      if (error.message === 'CONFLICT_SUBDOMAIN') {
        return conflict('Subdomain already taken', 'subdomain');
      }
      if (error.message === 'CONFLICT_EMAIL') {
        return conflict('Email already registered', 'email');
      }

      // Handle database unique constraint violations (fallback safety net)
      // These should not occur if checks inside transaction work correctly
      if (error.message.includes('unique constraint') || error.message.includes('duplicate key')) {
        // Parse the error to determine which field caused the conflict
        if (error.message.includes('subdomain')) {
          return conflict('Subdomain already taken', 'subdomain');
        }
        if (error.message.includes('email')) {
          return conflict('Email already registered', 'email');
        }
        // Generic conflict if we can't determine the specific field
        return conflict('Email or subdomain already exists');
      }
    }

    return serverError('Internal server error. Please try again later.');
  }
});
