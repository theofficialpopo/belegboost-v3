import { NextResponse } from 'next/server';

/**
 * Standard error response structure for all API routes
 */
interface ApiErrorResponse {
  error: string;
  details?: unknown;
  field?: string;
}

/**
 * Creates a standardized 400 Bad Request response
 * Use for invalid request data, malformed input, or failed validation
 */
export function badRequest(message: string, details?: unknown) {
  const response: ApiErrorResponse = {
    error: message,
  };

  if (details !== undefined) {
    response.details = details;
  }

  return NextResponse.json(response, { status: 400 });
}

/**
 * Creates a standardized 401 Unauthorized response
 * Use when authentication is required but missing or invalid
 */
export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json(
    { error: message } as ApiErrorResponse,
    { status: 401 }
  );
}

/**
 * Creates a standardized 403 Forbidden response
 * Use when user is authenticated but lacks necessary permissions
 */
export function forbidden(message = 'Forbidden') {
  return NextResponse.json(
    { error: message } as ApiErrorResponse,
    { status: 403 }
  );
}

/**
 * Creates a standardized 404 Not Found response
 * Use when a requested resource does not exist
 */
export function notFound(resource = 'Resource') {
  return NextResponse.json(
    { error: `${resource} not found` } as ApiErrorResponse,
    { status: 404 }
  );
}

/**
 * Creates a standardized 409 Conflict response
 * Use for conflicts like duplicate entries or concurrent modifications
 */
export function conflict(message: string, field?: string) {
  const response: ApiErrorResponse = {
    error: message,
  };

  if (field) {
    response.field = field;
  }

  return NextResponse.json(response, { status: 409 });
}

/**
 * Creates a standardized 500 Internal Server Error response
 * Use for unexpected errors that shouldn't be exposed to clients
 */
export function serverError(
  message = 'Internal server error',
  details?: unknown
) {
  const response: ApiErrorResponse = {
    error: message,
  };

  // Only include details in development or if explicitly provided
  if (details !== undefined && process.env.NODE_ENV === 'development') {
    response.details = details;
  }

  return NextResponse.json(response, { status: 500 });
}

/**
 * Creates a standardized 403 Forbidden response for demo mode
 * Use when a mutation is attempted in demo mode
 */
export function demoModeReadOnly() {
  return NextResponse.json(
    {
      error: 'Demo mode is read-only',
      details: 'Mutations are not allowed in demo mode. Please sign up for a real account.'
    } as ApiErrorResponse,
    { status: 403 }
  );
}

/**
 * Checks if the user is in demo mode
 * Demo users have organizationId that matches the demo organization
 */
export function isDemoMode(organizationId: string | undefined): boolean {
  return organizationId === 'demo-org-id';
}
