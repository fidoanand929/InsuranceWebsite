'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HealthInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Health Insurance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-200">
              Secure your family's health with comprehensive medical coverage.
              Get access to the best healthcare facilities and peace of mind.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Get a Quote
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* Features Section */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Health Insurance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Comprehensive Coverage',
                description: 'Wide range of medical treatments, surgeries, and hospitalization coverage.',
                icon: '🏥',
                color: 'purple'
              },
              {
                title: 'Cashless Claims',
                description: 'Get treatment at network hospitals without paying upfront.',
                icon: '💳',
                color: 'pink'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock medical assistance and claims support.',
                icon: '🕒',
                color: 'blue'
              },
              {
                title: 'Family Coverage',
                description: 'Protect your entire family under a single policy.',
                icon: '👨‍👩‍👧‍👦',
                color: 'green'
              },
              {
                title: 'No Claim Bonus',
                description: 'Get rewarded with increased coverage for claim-free years.',
                icon: '🎁',
                color: 'yellow'
              },
              {
                title: 'Preventive Care',
                description: 'Coverage for regular health check-ups and vaccinations.',
                icon: '🩺',
                color: 'indigo'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 text-${feature.color}-600 dark:text-${feature.color}-400`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Insurance Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Basic Plan',
                price: '$X',
                features: [
                  'Individual coverage',
                  'Basic hospitalization',
                  'Emergency care',
                  'Ambulance services'
                ]
              },
              {
                title: 'Family Plan',
                price: '$XX',
                features: [
                  'Coverage for 4 family members',
                  'Comprehensive hospitalization',
                  'Maternity benefits',
                  'Preventive care',
                  'Specialist consultations'
                ]
              },
              {
                title: 'Premium Plan',
                price: '$XXX',
                features: [
                  'Coverage for 6 family members',
                  'International treatment',
                  'Critical illness coverage',
                  'Alternative treatments',
                  'Regular health check-ups',
                  'Personal health concierge'
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 