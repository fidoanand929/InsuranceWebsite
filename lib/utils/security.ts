import { createHash } from 'crypto';
import { z } from 'zod';

// Input sanitization for text fields
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim(); // Remove leading/trailing whitespace
}

// Hash sensitive data
export function hashData(data: string): string {
  return createHash('sha256')
    .update(data)
    .digest('hex');
}

// Validate and sanitize email
export function validateEmail(email: string): string {
  const sanitized = email.toLowerCase().trim();
  if (!z.string().email().safeParse(sanitized).success) {
    throw new Error('Invalid email format');
  }
  return sanitized;
}

// Validate and sanitize phone numbers
export function validatePhone(phone: string): string {
  const sanitized = phone.replace(/[^\d+\-\s()]/g, '').trim();
  if (!/^[0-9+\-\s()]{10,15}$/.test(sanitized)) {
    throw new Error('Invalid phone number format');
  }
  return sanitized;
}

// Request validation
export function validateRequestMethod(method: string, allowedMethods: string[]): void {
  if (!allowedMethods.includes(method.toUpperCase())) {
    throw new Error(`Method ${method} not allowed`);
  }
}

// Validate Content-Type
export function validateContentType(contentType: string | null, expectedType: string): void {
  if (!contentType || !contentType.includes(expectedType)) {
    throw new Error(`Invalid Content-Type. Expected ${expectedType}`);
  }
}

// Check for common security headers
export function validateSecurityHeaders(headers: Headers): void {
  const requiredHeaders = ['x-csrf-token', 'content-type'];
  for (const header of requiredHeaders) {
    if (!headers.has(header)) {
      throw new Error(`Missing required header: ${header}`);
    }
  }
}

// Rate limiting configuration by endpoint
export const rateLimitConfig = {
  contact: { limit: 10, window: '1 m' },
  auth: { limit: 5, window: '1 m' },
  api: { limit: 100, window: '1 m' }
} as const; 