'use client';

import React from 'react';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-6xl py-12 sm:py-16">
          <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 inline-block">← Back to Home</Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get in touch with our team for any questions about our insurance services.
            </p>
          </div>
        </div>
      </div>

      {/* Content will be added later */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center text-gray-600 dark:text-gray-300">
          Contact form and additional information will be added here.
        </div>
      </div>
    </div>
  );
} 