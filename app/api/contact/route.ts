import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/schemas';
import { apiErrorHandler } from '@/lib/utils/error-handling';
import { createClient } from '@supabase/supabase-js';
import { rateLimiter } from '@/lib/middleware/rate-limit';
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateRequestMethod,
  validateContentType,
  validateSecurityHeaders,
  securityHeaders
} from '@/lib/utils/security';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    // Validate request method
    validateRequestMethod(request.method, ['POST']);

    // Validate content type
    validateContentType(request.headers.get('content-type'), 'application/json');

    // Validate security headers
    validateSecurityHeaders(request.headers);

    // Apply rate limiting
    const rateLimitResult = await rateLimiter('contact');
    if (rateLimitResult) return rateLimitResult;

    // Parse and validate request body
    const body = await request.json();
    const validatedData = await contactFormSchema.parseAsync({
      ...body,
      name: sanitizeInput(body.name),
      email: validateEmail(body.email),
      phone: validatePhone(body.phone),
      message: sanitizeInput(body.message),
    });

    // Store in Supabase with additional security measures
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          status: 'new',
          created_at: new Date().toISOString(),
          ip_address: request.headers.get('x-forwarded-for') ?? 'unknown',
          user_agent: request.headers.get('user-agent') ?? 'unknown',
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to store contact submission');
    }

    // Send email notification (you can implement this based on your email service)
    // await sendEmailNotification(validatedData);

    const response = NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );

    // Apply security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    const errorResponse = await apiErrorHandler(error);
    
    // Apply security headers to error response
    Object.entries(securityHeaders).forEach(([key, value]) => {
      errorResponse.headers.set(key, value);
    });

    return errorResponse;
  }
}

// Enable edge runtime for better performance and security
export const runtime = 'edge';

// Force dynamic rendering to ensure fresh rate limit checks
export const dynamic = 'force-dynamic'; 