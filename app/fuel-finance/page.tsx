'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChartBarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function FuelFinance() {
  const features = [
    {
      title: 'Flexible Payment Options',
      description: 'Choose from various payment plans that suit your business needs',
      icon: CurrencyDollarIcon
    },
    {
      title: 'Real-time Tracking',
      description: 'Monitor your fuel expenses and consumption patterns',
      icon: ChartBarIcon
    },
    {
      title: 'Growth Analysis',
      description: 'Understand your fuel usage trends and optimize costs',
      icon: ArrowTrendingUpIcon
    }
  ];

  const plans = [
    {
      title: 'Basic Fuel Plan',
      description: 'Simple fuel financing for small businesses and independent operators.',
      features: ['Monthly billing cycle', 'Online account management', 'Basic reporting tools'],
      gradient: 'from-amber-500 to-amber-700'
    },
    {
      title: 'Fleet Manager',
      description: 'Comprehensive fuel management solution for growing businesses with multiple vehicles.',
      features: ['Detailed expense tracking', 'Customizable spending limits', 'Enhanced savings options'],
      gradient: 'from-orange-500 to-orange-700',
      featured: true
    },
    {
      title: 'Enterprise Solutions',
      description: 'Advanced fuel financing and management system for large-scale operations.',
      features: ['Dedicated account manager', 'Integration with ERP systems', 'Custom reporting dashboard'],
      gradient: 'from-red-500 to-red-700'
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
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Fuel Financing Solutions
                </span>
              </h1>
              <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-8">
                Optimize your fuel expenses and improve cash flow with our innovative fuel financing options designed for businesses of all sizes.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
                <Link href="/fuel-finance/estimate-savings">
                  <motion.button
                    className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 font-semibold shadow-lg hover:shadow-xl border border-amber-200 dark:border-gray-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Estimate Savings
                  </motion.button>
                </Link>
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
                  src="/images/doodles/fuel-doodle.svg"
                  alt="Fuel Finance"
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
              Why Choose Our Fuel Financing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our specialized fuel management solutions help businesses streamline operations, reduce costs, and improve efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
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
              Select the fuel management solution that fits your operational needs and budget requirements.
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
                    ? 'bg-gradient-to-b from-orange-500 to-orange-700 text-white -mt-4 shadow-xl' 
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
                <p className={`mb-6 ${plan.featured ? 'text-orange-100' : 'text-gray-600 dark:text-gray-300'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg 
                        className={`h-5 w-5 mr-2 ${plan.featured ? 'text-orange-200' : 'text-amber-500 dark:text-amber-400'}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.featured ? 'text-orange-100' : 'text-gray-600 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    plan.featured 
                      ? 'bg-white text-orange-600' 
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 text-white'
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
      <div className="py-16 px-6 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-['Poppins'] mb-4">
              Ready to Optimize Your Fuel Management?
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-8">
              Our fuel financing experts can help you design a custom solution that maximizes efficiency and minimizes costs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 rounded-xl bg-white text-orange-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
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