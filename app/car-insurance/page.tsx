'use client';

import React from 'react';
import Link from 'next/link';

export default function CarInsurance() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Car Insurance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-200">
              Comprehensive coverage for your vehicle with 24/7 roadside assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-6xl px-6 pb-24 flex-grow">
        {/* Features Section */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Car Insurance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Comprehensive Coverage',
                description: 'Protection for your vehicle, third-party liability, and personal accident coverage.',
                icon: '🛡️',
                color: 'blue'
              },
              {
                title: '24/7 Roadside Assistance',
                description: 'Round-the-clock emergency support whenever you need it.',
                icon: '🚗',
                color: 'green'
              },
              {
                title: 'Quick Claims Process',
                description: 'Hassle-free and fast claims settlement process.',
                icon: '⚡',
                color: 'purple'
              },
              {
                title: 'No Claim Bonus',
                description: 'Rewards for claim-free years with increased benefits.',
                icon: '💰',
                color: 'indigo'
              },
              {
                title: 'Multiple Vehicle Discount',
                description: 'Special rates when you insure multiple vehicles.',
                icon: '🎁',
                color: 'pink'
              },
              {
                title: 'Flexible Plans',
                description: 'Customizable coverage options to suit your needs.',
                icon: '📋',
                color: 'yellow'
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
                title: 'Basic Coverage',
                price: '$X',
                features: [
                  'Third-party liability',
                  'Personal accident cover',
                  'Basic roadside assistance',
                  '24/7 customer support'
                ]
              },
              {
                title: 'Premium Coverage',
                price: '$XX',
                features: [
                  'All Basic Coverage features',
                  'Comprehensive vehicle protection',
                  'Zero depreciation cover',
                  'Engine protection',
                  'Premium roadside assistance'
                ]
              },
              {
                title: 'Elite Coverage',
                price: '$XXX',
                features: [
                  'All Premium Coverage features',
                  'Return to invoice cover',
                  'No claim bonus protection',
                  'Key replacement cover',
                  'Personal belongings coverage',
                  'Consumables cover'
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
                <p className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
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
                  className="block text-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center space-x-8">
          <Link 
            href="/disclaimer" 
            className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors underline"
          >
            Disclaimer
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors underline"
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
} 