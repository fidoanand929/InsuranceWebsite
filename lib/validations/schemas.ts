import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must not exceed 5MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type),
      'Only PDF, JPEG, and PNG files are allowed'
    ),
});

// Insurance application schema
export const insuranceApplicationSchema = z.object({
  applicantDetails: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().regex(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number'),
  }),
  vehicleDetails: z.object({
    make: z.string().min(2, 'Vehicle make is required'),
    model: z.string().min(2, 'Vehicle model is required'),
    year: z.number()
      .int()
      .min(1900, 'Year must be after 1900')
      .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
    registrationNumber: z.string().min(2, 'Registration number is required'),
  }).optional(),
  insuranceType: z.enum(['car', 'truck', 'health']),
  coverageDetails: z.object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
    coverageType: z.enum(['basic', 'standard', 'premium']),
    addons: z.array(z.string()).optional(),
  }),
});

// Admin login schema
export const adminLoginSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and numbers'),
});

// Type inference helpers
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type InsuranceApplicationData = z.infer<typeof insuranceApplicationSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>; 