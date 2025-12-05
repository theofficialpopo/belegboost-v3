/**
 * Simple logger utility for API routes
 * - Development: logs to console with timestamp
 * - Production: sanitizes sensitive data before logging
 */

type LogLevel = 'info' | 'warn' | 'error';

const isDevelopment = process.env.NODE_ENV === 'development';

// Sensitive field patterns to sanitize
const SENSITIVE_FIELDS = [
  'password',
  'passwordHash',
  'token',
  'resetToken',
  'passwordResetToken',
  'accessToken',
  'refreshToken',
  'apiKey',
  'secret',
  'authorization',
];

const SENSITIVE_PATTERNS = [
  /email/i,
  /ssn/i,
  /creditcard/i,
  /card/i,
];

/**
 * Check if a field name contains sensitive data
 */
function isSensitiveField(key: string): boolean {
  const lowerKey = key.toLowerCase();

  // Check exact matches
  if (SENSITIVE_FIELDS.some(field => lowerKey.includes(field))) {
    return true;
  }

  // Check pattern matches
  if (SENSITIVE_PATTERNS.some(pattern => pattern.test(key))) {
    return true;
  }

  return false;
}

/**
 * Sanitize sensitive data from objects
 */
function sanitize(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => sanitize(item));
  }

  // Handle objects
  if (typeof data === 'object') {
    // Handle Error objects specially
    if (data instanceof Error) {
      return {
        name: data.name,
        message: data.message,
        stack: isDevelopment ? data.stack : '[REDACTED]',
      };
    }

    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (isSensitiveField(key)) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitize(value);
      }
    }
    return sanitized;
  }

  // Primitive values pass through
  return data;
}

/**
 * Format log message with timestamp
 */
function formatMessage(level: LogLevel, message: string, data?: any): string {
  const timestamp = new Date().toISOString();
  const levelStr = level.toUpperCase().padEnd(5);

  if (data !== undefined) {
    const sanitizedData = isDevelopment ? data : sanitize(data);
    return `[${timestamp}] ${levelStr} ${message} ${JSON.stringify(sanitizedData)}`;
  }

  return `[${timestamp}] ${levelStr} ${message}`;
}

/**
 * Log info message
 */
export function logInfo(message: string, data?: any): void {
  const formatted = formatMessage('info', message, data);
  console.log(formatted);
}

/**
 * Log warning message
 */
export function logWarn(message: string, data?: any): void {
  const formatted = formatMessage('warn', message, data);
  console.warn(formatted);
}

/**
 * Log error message
 */
export function logError(message: string, error?: any): void {
  const formatted = formatMessage('error', message, error);
  console.error(formatted);
}

/**
 * Default export with all log methods
 */
export const logger = {
  info: logInfo,
  warn: logWarn,
  error: logError,
};
