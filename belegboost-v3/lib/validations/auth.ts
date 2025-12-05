import { z } from 'zod';

/**
 * Shared validation schemas for authentication
 *
 * These schemas are used by both frontend and backend to ensure
 * validation rules stay in sync across the application.
 */

// Step 1: Personal information and credentials
export const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

// Step 2: Company and subdomain setup
export const step2Schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  subdomain: z.string()
    .min(3, "Subdomain must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
});

// Combined registration schema for complete validation
export const registerSchema = step1Schema.merge(step2Schema);

// Type inference for TypeScript
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
