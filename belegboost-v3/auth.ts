import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import {
  getClientIp,
  checkAuthRateLimit,
  resetAuthRateLimit,
  RateLimitError,
} from '@/lib/rate-limit';

export const { handlers, auth, signIn, signOut } = NextAuth((req) => {
  // Extract IP address from request for rate limiting
  let clientIp = 'unknown';
  if (req) {
    clientIp = getClientIp(req.headers);
  }

  return {
    providers: [
      Credentials({
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Check rate limit before processing authentication
          const rateLimitResult = checkAuthRateLimit(clientIp);

          if (!rateLimitResult.success) {
            const retryAfterSeconds = Math.ceil(
              (rateLimitResult.retryAfter || 0) / 1000
            );
            throw new RateLimitError(
              `Too many login attempts. Please try again in ${retryAfterSeconds} seconds.`,
              rateLimitResult.retryAfter || 0,
              rateLimitResult.limit
            );
          }

          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email as string),
            with: {
              organization: true,
            },
          });

          if (!user || !user.passwordHash) {
            // Failed login attempt - rate limit will track this
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );

          if (!passwordMatch) {
            // Failed login attempt - rate limit will track this
            return null;
          }

          // Successful login - reset rate limit for this IP
          resetAuthRateLimit(clientIp);

          // Update last login
          await db
            .update(users)
            .set({ lastLogin: new Date() })
            .where(eq(users.id, user.id));

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            organizationId: user.organizationId,
            organizationSlug: user.organization.subdomain,
            avatar: user.avatar || undefined,
          };
        },
      }),
    ],
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role;
          token.organizationId = user.organizationId;
          token.organizationSlug = user.organizationSlug;
          token.avatar = user.avatar;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user && token) {
          // Safely assign token properties with fallbacks
          session.user.id = typeof token.id === 'string' ? token.id : '';
          session.user.role = typeof token.role === 'string' ? token.role : 'member';
          session.user.organizationId = typeof token.organizationId === 'string' ? token.organizationId : '';
          session.user.organizationSlug = typeof token.organizationSlug === 'string' ? token.organizationSlug : '';
          session.user.avatar = typeof token.avatar === 'string' ? token.avatar : undefined;
        }
        return session;
      },
    },
  };
});

// Type augmentation for Auth.js
declare module 'next-auth' {
  interface User {
    role: string;
    organizationId: string;
    organizationSlug: string;
    avatar?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      organizationId: string;
      organizationSlug: string;
      avatar?: string;
    };
  }
}

// JWT types are handled internally by next-auth
