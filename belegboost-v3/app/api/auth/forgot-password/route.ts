import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
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

    // Look up user by email
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
      const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      console.log('Password reset link generated for', email);
      console.log('Reset URL:', resetUrl);
      console.log('Token expires at:', resetExpires.toISOString());
    } else {
      // Log attempt for non-existent email (for monitoring purposes)
      console.log('Password reset requested for non-existent email:', email);
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
    console.error('Error in forgot-password API:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
