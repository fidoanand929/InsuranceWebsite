'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '@fontsource/poppins';
import '@fontsource/inter';

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  contact: yup.string()
    .required('Contact information is required')
    .matches(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
      'Please enter a valid email or phone number'
    ),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Replace this URL with your Google Forms submission URL
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdk7sI9CXNV9Yj3cF9GYmFnZpgWeuirdgpln2OjWxgQaTj2VQ/formResponse';
      
      // You'll need to map your form fields to Google Forms field IDs
      const formData = new FormData();
      formData.append('entry.569208055', data.name); // Replace xxxxx with actual field IDs
      formData.append('entry.1002466869', data.contact);
      formData.append('entry.365568036', data.message);

      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-['Inter'] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold font-['Poppins'] text-gray-900 dark:text-white drop-shadow-sm">
            Get in Touch
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your message has been sent successfully. We'll get back to you soon.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    {...register('name')}
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact (Email or Phone)
                </label>
                <div className="mt-1">
                  <input
                    {...register('contact')}
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="Your email or phone number"
                  />
                  {errors.contact && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contact.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="Your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Send Message'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
} 