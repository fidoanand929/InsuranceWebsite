'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function CarFinance() {
  const features = [
    {
      title: 'Competitive Rates',
      description: 'Get access to industry-leading interest rates starting as low as 3.99% APR.',
      icon: '💰'
    },
    {
      title: 'Flexible Terms',
      description: 'Choose from a variety of loan terms ranging from 12 to 84 months to fit your budget.',
      icon: '📅'
    },
    {
      title: 'Quick Approval',
      description: 'Our streamlined process allows for decisions within 24 hours of application.',
      icon: '⚡'
    },
    {
      title: 'Minimal Documentation',
      description: 'Simple paperwork requirements to get you on the road faster.',
      icon: '📝'
    }
  ];

  const plans = [
    {
      title: 'Standard Loan',
      description: 'Traditional auto financing with fixed monthly payments.',
      features: ['Fixed interest rates', 'Terms up to 72 months', 'No prepayment penalties'],
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Premium Loan',
      description: 'Enhanced financing options with added benefits for luxury vehicles.',
      features: ['Competitive rates', 'Extended warranty options', 'Gap insurance included'],
      gradient: 'from-indigo-500 to-indigo-700',
      featured: true
    },
    {
      title: 'Lease-to-Own',
      description: 'Flexible program that combines leasing benefits with eventual ownership.',
      features: ['Lower monthly payments', 'Upgrade options', 'Purchase at end of term'],
      gradient: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-['Poppins'] mb-6 drop-shadow-sm">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Car Finance Solutions
                </span>
              </h1>
              <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-8">
                Drive your dream car today with our flexible financing options designed to fit your budget and lifestyle.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
                <motion.button
                  className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold shadow-lg hover:shadow-xl border border-blue-200 dark:border-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Calculate EMI
                </motion.button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-64 md:h-96 w-full"
              >
                <Image
                  src="/images/doodles/car-doodle.svg"
                  alt="Car Finance"
                  fill
                  className="object-contain dark:filter dark:brightness-200"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-['Poppins'] mb-4 text-gray-900 dark:text-white">
              Why Choose Our Car Financing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We offer comprehensive financing solutions with competitive rates and flexible terms to help you drive your dream car today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-['Poppins'] mb-4 text-gray-900 dark:text-white">
              Financing Plans
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the plan that best fits your needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.featured 
                    ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 text-white -mt-4 shadow-xl' 
                    : 'bg-white dark:bg-gray-800 shadow-lg'
                } p-6 hover:shadow-xl transition-all duration-300`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white font-bold py-1 px-4 text-sm">
                    POPULAR
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.title}
                </h3>
                <p className={`mb-6 ${plan.featured ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg 
                        className={`h-5 w-5 mr-2 ${plan.featured ? 'text-indigo-200' : 'text-blue-500 dark:text-blue-400'}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.featured ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    plan.featured 
                      ? 'bg-white text-indigo-600' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-['Poppins'] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Our finance experts are ready to help you find the perfect financing solution for your new car.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Online
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Back Navigation */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/products">
            <motion.button 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Products
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
} 