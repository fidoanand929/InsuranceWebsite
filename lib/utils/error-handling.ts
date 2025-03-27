import { ZodError } from 'zod';

// Custom error classes
export class ValidationError extends Error {
  constructor(message: string, public errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

// Error handler for API routes
export async function apiErrorHandler(error: unknown) {
  if (error instanceof ZodError) {
    return new Response(JSON.stringify({
      error: 'Validation Error',
      details: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (error instanceof ValidationError) {
    return new Response(JSON.stringify({
      error: error.message,
      details: error.errors
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (error instanceof AuthenticationError) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (error instanceof AuthorizationError) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  console.error('Unexpected error:', error);
  return new Response(JSON.stringify({
    error: 'Internal Server Error'
  }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Client-side error handler
export function handleClientError(error: unknown): { message: string; errors?: Record<string, string[]> } {
  if (error instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    error.errors.forEach(err => {
      const path = err.path.join('.');
      if (!errors[path]) errors[path] = [];
      errors[path].push(err.message);
    });
    return {
      message: 'Validation failed',
      errors
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'An unexpected error occurred' };
}

// Type guard for API error responses
export function isApiError(response: any): response is { error: string; details?: any } {
  return response && typeof response.error === 'string';
} 