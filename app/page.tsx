'use client';

import React from 'react';
import InsuranceCard from './components/InsuranceCard';

export default function Home() {
  const insuranceTypes = [
    {
      title: 'Car Insurance',
      description: 'Comprehensive coverage for your vehicle with 24/7 roadside assistance',
      imagePath: '/images/car-insurance.jpg',
      link: '/car-insurance',
      gradient: 'bg-gradient-to-br from-blue-500/80 to-blue-700/80',
    },
    {
      title: 'Truck Insurance',
      description: 'Specialized protection for commercial vehicles and cargo',
      imagePath: '/images/truck-insurance.jpg',
      link: '/truck-insurance',
      gradient: 'bg-gradient-to-br from-green-500/80 to-green-700/80',
    },
    {
      title: 'Health Insurance',
      description: 'Quality healthcare coverage for you and your family',
      imagePath: '/images/health-insurance.jpg',
      link: '/health-insurance',
      gradient: 'bg-gradient-to-br from-indigo-500/80 to-indigo-700/80',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-6xl py-12 sm:py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Protect What Matters Most
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Comprehensive insurance solutions tailored to your needs. Choose from our range of coverage options and secure your peace of mind today.
          </p>
        </div>
      </div>

      {/* Insurance Cards Grid */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insuranceTypes.map((insurance, index) => (
            <InsuranceCard key={index} {...insurance} />
          ))}
        </div>

        {/* Features Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Fast Claims',
                description: 'Quick and hassle-free claims processing',
                icon: '⚡',
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer assistance',
                icon: '🔄',
              },
              {
                title: 'Flexible Plans',
                description: 'Customizable coverage options',
                icon: '📋',
              },
              {
                title: 'Best Rates',
                description: 'Competitive premiums and great value',
                icon: '💰',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 