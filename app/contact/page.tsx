'use client';

import { useState } from 'react';
import { useValidatedForm } from '@/lib/hooks/useValidatedForm';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/schemas';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { handleSubmit, validateField, errors, isSubmitting } = useValidatedForm<ContactFormData>({
    schema: contactFormSchema,
    onSubmit: async (data) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        setSubmitStatus('success');
      } catch (error) {
        setSubmitStatus('error');
        throw error; // This will be caught by the form's error handler
      }
    },
    onError: () => {
      setSubmitStatus('error');
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => validateField('name', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => validateField('email', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={(e) => validateField('phone', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={(e) => validateField('message', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message[0]}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
                ${isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-green-600 text-white rounded-md"
            >
              Thank you for your message! We'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-600 text-white rounded-md"
            >
              There was an error sending your message. Please try again.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
} 