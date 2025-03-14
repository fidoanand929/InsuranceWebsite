'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TruckInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Commercial Truck Insurance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Protect your business with comprehensive truck insurance coverage tailored to your needs.
              From single trucks to entire fleets, we've got you covered.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Truck Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Comprehensive Coverage',
                description: 'Protection for your vehicle, cargo, and liability coverage all in one package.',
                icon: '🛡️',
                color: 'blue'
              },
              {
                title: 'Flexible Plans',
                description: 'Customizable policies that adapt to your specific business needs and budget.',
                icon: '📋',
                color: 'green'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance and claims processing when you need it most.',
                icon: '🕒',
                color: 'purple'
              },
              {
                title: 'Multiple Vehicle Discounts',
                description: 'Save more when you insure multiple trucks under the same policy.',
                icon: '💰',
                color: 'indigo'
              },
              {
                title: 'Quick Claims Process',
                description: 'Streamlined claims handling to get you back on the road faster.',
                icon: '⚡',
                color: 'pink'
              },
              {
                title: 'Nationwide Coverage',
                description: 'Protection that follows you wherever your routes take you.',
                icon: '🗺️',
                color: 'yellow'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`text-4xl mb-4`}>{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 text-${feature.color}-600`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Insurance Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Basic Coverage',
                price: '$X',
                features: [
                  'Liability coverage',
                  'Property damage',
                  'Basic cargo protection',
                  '24/7 roadside assistance'
                ]
              },
              {
                title: 'Premium Coverage',
                price: '$XX',
                features: [
                  'Enhanced liability coverage',
                  'Comprehensive physical damage',
                  'Extended cargo protection',
                  'Medical payments coverage',
                  'Premium roadside assistance'
                ]
              },
              {
                title: 'Fleet Special',
                price: 'Custom',
                features: [
                  'Full fleet coverage',
                  'Maximum liability protection',
                  'Complete cargo insurance',
                  'Driver coverage',
                  'Premium support',
                  'Fleet management tools'
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 block text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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