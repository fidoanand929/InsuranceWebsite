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

// Security headers configuration
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.dev https://*.clerk.accounts.dev; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.clerk.dev; " +
    "img-src 'self' data: https: blob: https://*.clerk.dev; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "frame-src 'self' https://*.clerk.dev; " +
    "connect-src 'self' https://*.clerk.dev https://clerk.clerk.dev wss://*.clerk.dev https://*.clerk.accounts.dev; " +
    "frame-ancestors 'none'; " +
    "form-action 'self'; " +
    "base-uri 'self'; " +
    "object-src 'none'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Resource-Policy': 'same-origin'
};

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