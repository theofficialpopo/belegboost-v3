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

          // Validate that credentials are strings
          if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
            return null;
          }

          // Check rate limit before processing authentication
          const rateLimitResult = await checkAuthRateLimit(clientIp);

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

          // NOTE: User lookup by email is intentionally not org-scoped
          // Users provide email (not org-specific) during login
          // The organization context is established after authentication
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email),
            with: {
              organization: true,
            },
          });

          // Always perform bcrypt compare to prevent timing attacks
          // Use a dummy hash if user doesn't exist to maintain constant time
          const dummyHash = '$2a$12$K8K8K8K8K8K8K8K8K8K8K.K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8';
          const hashToCompare = user?.passwordHash || dummyHash;

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            hashToCompare
          );

          if (!user || !user.passwordHash || !passwordMatch) {
            // Failed login attempt - rate limit will track this
            return null;
          }

          // Successful login - reset rate limit for this IP
          await resetAuthRateLimit(clientIp);

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
      maxAge: 7 * 24 * 60 * 60, // 7 days (reduced from 30 for security)
    },
    cookies: {
      sessionToken: {
        options: {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        },
      },
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
    callbacks: {
      async jwt({ token, user }) {
        // Only update token with user data on initial sign-in
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
        // Type guard function to validate string values
        const isValidString = (value: unknown): value is string => {
          return typeof value === 'string' && value.length > 0;
        };

        if (session.user) {
          // Use type guards to ensure safe assignment
          session.user.id = isValidString(token.id) ? token.id : '';
          session.user.role = isValidString(token.role) ? token.role : 'member';
          session.user.organizationId = isValidString(token.organizationId) ? token.organizationId : '';
          session.user.organizationSlug = isValidString(token.organizationSlug) ? token.organizationSlug : '';
          session.user.avatar = isValidString(token.avatar) ? token.avatar : undefined;
        }
        return session;
      },
    },
  };
});

// Type augmentation for NextAuth v5
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

// JWT type augmentation - extends the default JWT interface
import type { JWT as DefaultJWT } from '@auth/core/jwt';

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: string;
    organizationId?: string;
    organizationSlug?: string;
    avatar?: string;
  }
}
