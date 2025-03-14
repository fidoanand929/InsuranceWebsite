'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to InsureCo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Protecting what matters most with comprehensive insurance solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Insurance Options */}
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Car Insurance',
              description: 'Comprehensive coverage for your vehicle.',
              href: '/car-insurance',
              gradient: 'from-blue-500 to-blue-700'
            },
            {
              title: 'Truck Insurance',
              description: 'Specialized protection for commercial vehicles.',
              href: '/truck-insurance',
              gradient: 'from-indigo-500 to-indigo-700'
            },
            {
              title: 'Health Insurance',
              description: 'Quality healthcare coverage for you and your family.',
              href: '/health-insurance',
              gradient: 'from-purple-500 to-purple-700'
            }
          ].map((insurance, index) => (
            <Link
              key={index}
              href={insurance.href}
              className="block group"
            >
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-200">
                <h2 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${insurance.gradient} bg-clip-text text-transparent`}>
                  {insurance.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {insurance.description}
                </p>
                <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-200">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 