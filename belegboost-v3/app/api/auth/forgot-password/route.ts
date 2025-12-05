import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { randomUUID } from 'crypto';
import { logger } from '@/lib/logger';
import { withCsrfProtection } from '@/lib/csrf';

export const POST = withCsrfProtection(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // NOTE: User lookup by email is intentionally not org-scoped
    // Users identify themselves by email for password reset
    // The organization context is not required for this operation
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase().trim()),
    });

    // Always return success to prevent email enumeration
    // But only generate token if user exists
    if (user) {
      // Generate reset token
      const resetToken = randomUUID();
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      // Store token and expiry in database
      await db
        .update(users)
        .set({
          passwordResetToken: resetToken,
          passwordResetExpires: resetExpires,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));

      // Log the reset link for development
      // In production, this would be sent via email
      const resetUrl = `${process.env.AUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

      // Only log sensitive data in development mode
      if (process.env.NODE_ENV === 'development') {
        logger.info('Password reset link generated (DEV ONLY)', {
          email,
          resetUrl,
          resetExpires: resetExpires.toISOString()
        });
      } else {
        logger.info('Password reset initiated', {
          email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partial masking
          resetExpires: resetExpires.toISOString()
        });
      }
    } else {
      // Log attempt for non-existent email (for monitoring purposes)
      if (process.env.NODE_ENV === 'development') {
        logger.info('Password reset requested for non-existent email (DEV ONLY)', { email });
      } else {
        logger.info('Password reset requested for non-existent email', {
          email: email.replace(/(.{2}).*(@.*)/, '$1***$2') // Partial masking
        });
      }
    }

    // Always return success response
    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with that email, a password reset link has been sent.',
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error in forgot-password API', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
});
