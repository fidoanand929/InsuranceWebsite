'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HealthInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-6xl py-12 sm:py-16">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">← Back to Home</Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Health Insurance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare coverage for you and your family, ensuring peace of mind and quality medical care.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Choose Our Health Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Comprehensive Coverage',
                description: 'Wide range of medical treatments and procedures covered',
                color: 'blue',
              },
              {
                title: 'Cashless Hospitalization',
                description: 'Network of 5000+ hospitals for hassle-free treatment',
                color: 'indigo',
              },
              {
                title: 'Family Coverage',
                description: 'Protection for your entire family under one policy',
                color: 'purple',
              },
              {
                title: 'Preventive Care',
                description: 'Regular health check-ups and wellness programs',
                color: 'blue',
              },
              {
                title: 'Quick Claims',
                description: 'Fast and efficient claims processing',
                color: 'indigo',
              },
              {
                title: 'No Claim Bonus',
                description: 'Rewards for claim-free years',
                color: 'purple',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className={`text-xl font-semibold mb-3 text-${feature.color}-600`}>{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Coverage Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-100">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Essential Care</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Basic hospitalization coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Emergency medical services
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Annual health check-up
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Premium Care</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  All Essential Care features
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  International coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Maternity coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Wellness programs
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 