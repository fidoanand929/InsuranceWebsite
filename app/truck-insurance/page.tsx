'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TruckInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-400 to-green-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-6xl py-12 sm:py-16">
          <Link href="/" className="text-green-600 hover:text-green-700 mb-8 inline-block">← Back to Home</Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Truck Insurance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Specialized protection for your commercial vehicles with comprehensive coverage and cargo security.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Choose Our Truck Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Commercial Coverage',
                description: 'Comprehensive protection for your entire fleet of commercial vehicles',
                color: 'green',
              },
              {
                title: '24/7 Roadside Support',
                description: 'Round-the-clock assistance for your trucks anywhere in India',
                color: 'blue',
              },
              {
                title: 'Cargo Protection',
                description: 'Coverage for goods in transit with real-time tracking',
                color: 'indigo',
              },
              {
                title: 'Driver Coverage',
                description: 'Insurance coverage for drivers and support staff',
                color: 'purple',
              },
              {
                title: 'National Permit',
                description: 'Assistance with permits and documentation',
                color: 'green',
              },
              {
                title: 'Flexible Plans',
                description: 'Customized coverage based on your fleet size',
                color: 'blue',
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
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-100">
              <h3 className="text-2xl font-bold mb-4 text-green-600">Standard Commercial Cover</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Third-party liability coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Basic cargo protection
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  24/7 roadside assistance
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-700">Premium Fleet Cover</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  All Standard Cover features
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Enhanced cargo protection
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Driver & staff insurance
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Fleet management tools
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 