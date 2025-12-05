/**
 * Environment Variable Validation
 *
 * This module ensures that all required environment variables are present
 * at application startup. It throws an error if any required variables are missing.
 *
 * SECURITY: This prevents the application from running with missing secrets,
 * which could lead to security vulnerabilities or runtime errors.
 */

interface EnvConfig {
  /** Required environment variables that MUST be present */
  required: string[];
  /** Optional environment variables that have fallback behavior */
  optional: string[];
}

/**
 * Environment variable configuration for the application
 */
const ENV_CONFIG: EnvConfig = {
  required: [
    // Database
    'DATABASE_URL',

    // Authentication (NextAuth.js v5)
    'AUTH_SECRET',
    'AUTH_URL',
  ],
  optional: [
    // Storage (R2/S3) - Falls back to placeholder in development
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',

    // CSRF Protection - Has sensible defaults
    'ALLOWED_ORIGINS',

    // Demo Mode - Defaults to false in production
    'ENABLE_DEMO_MODE',

    // Redis - Optional for background jobs and rate limiting
    'REDIS_URL',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',

    // Node environment
    'NODE_ENV',
  ],
};

/**
 * Validation result for a single environment variable
 */
interface ValidationResult {
  /** Name of the environment variable */
  name: string;
  /** Whether the variable is present */
  present: boolean;
  /** Whether the variable is required */
  required: boolean;
  /** The value (masked if it's a secret) */
  value?: string;
}

/**
 * Check if an environment variable name indicates it's a secret
 */
function isSecretVar(name: string): boolean {
  const secretKeywords = ['SECRET', 'KEY', 'TOKEN', 'PASSWORD', 'HASH'];
  return secretKeywords.some(keyword => name.toUpperCase().includes(keyword));
}

/**
 * Mask sensitive environment variable values for logging
 */
function maskValue(name: string, value: string): string {
  if (isSecretVar(name)) {
    // Show first 4 and last 4 characters for secrets
    if (value.length > 8) {
      return `${value.slice(0, 4)}...${value.slice(-4)}`;
    }
    return '***';
  }
  return value;
}

/**
 * Validate that all required environment variables are present
 *
 * @throws {Error} If any required environment variables are missing
 * @returns {ValidationResult[]} Array of validation results for all variables
 */
export function validateEnvironment(): ValidationResult[] {
  const results: ValidationResult[] = [];
  const missing: string[] = [];

  // Check required variables
  for (const name of ENV_CONFIG.required) {
    const value = process.env[name];
    const present = Boolean(value && value.trim() !== '');

    results.push({
      name,
      present,
      required: true,
      value: value ? maskValue(name, value) : undefined,
    });

    if (!present) {
      missing.push(name);
    }
  }

  // Check optional variables (for logging purposes)
  for (const name of ENV_CONFIG.optional) {
    const value = process.env[name];
    const present = Boolean(value && value.trim() !== '');

    results.push({
      name,
      present,
      required: false,
      value: value ? maskValue(name, value) : undefined,
    });
  }

  // If any required variables are missing, throw an error
  if (missing.length > 0) {
    const errorMessage = [
      'Missing required environment variables:',
      ...missing.map(name => `  - ${name}`),
      '',
      'Please ensure these variables are set in your .env file.',
      'See .env.example for reference.',
    ].join('\n');

    throw new Error(errorMessage);
  }

  return results;
}

/**
 * Validate environment and log the results
 * This is a convenience function that validates and logs in a single call
 *
 * @param silent - If true, skip logging (useful for tests)
 * @returns {ValidationResult[]} Array of validation results
 */
export function validateAndLogEnvironment(silent = false): ValidationResult[] {
  const results = validateEnvironment();

  if (!silent) {
    const isDev = process.env.NODE_ENV === 'development';
    const env = process.env.NODE_ENV || 'unknown';

    console.log(`[ENV] Environment: ${env}`);
    console.log('[ENV] Required variables:');

    const required = results.filter(r => r.required);
    for (const result of required) {
      const status = result.present ? '✓' : '✗';
      const value = result.present && isDev ? ` (${result.value})` : '';
      console.log(`[ENV]   ${status} ${result.name}${value}`);
    }

    const optionalPresent = results.filter(r => !r.required && r.present);
    if (optionalPresent.length > 0) {
      console.log('[ENV] Optional variables configured:');
      for (const result of optionalPresent) {
        const value = isDev ? ` (${result.value})` : '';
        console.log(`[ENV]   ✓ ${result.name}${value}`);
      }
    }
  }

  return results;
}

/**
 * Check if a specific environment variable is present
 *
 * @param name - Name of the environment variable
 * @returns {boolean} True if the variable is present and not empty
 */
export function hasEnvVar(name: string): boolean {
  const value = process.env[name];
  return Boolean(value && value.trim() !== '');
}

/**
 * Get an environment variable value with validation
 *
 * @param name - Name of the environment variable
 * @param defaultValue - Default value if not present (makes it optional)
 * @returns {string} The environment variable value
 * @throws {Error} If the variable is missing and no default is provided
 */
export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (!value || value.trim() === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(
      `Environment variable ${name} is required but not set. See .env.example for reference.`
    );
  }

  return value;
}

/**
 * Validate environment on module load in production
 * In development, we allow missing optional variables
 */
if (process.env.NODE_ENV === 'production') {
  // In production, validate immediately
  validateAndLogEnvironment();
} else if (process.env.NODE_ENV === 'development') {
  // In development, just validate required variables
  try {
    validateAndLogEnvironment(true); // Silent mode, we'll log later
  } catch (error) {
    console.error('[ENV] Environment validation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    console.error('\nPlease check your .env file and ensure all required variables are set.');
  }
}
