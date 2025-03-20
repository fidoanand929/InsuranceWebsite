'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function Home() {
  const insuranceOptions = [
    {
      title: 'Car Insurance',
      description: 'Comprehensive coverage for your vehicle.',
      href: '/car-insurance',
      gradient: 'from-blue-500 to-blue-700',
      image: '/images/doodles/car-doodle.svg'
    },
    {
      title: 'Truck Insurance',
      description: 'Specialized protection for commercial vehicles.',
      href: '/truck-insurance',
      gradient: 'from-indigo-500 to-indigo-700',
      image: '/images/doodles/truck-doodle.svg'
    },
    {
      title: 'Health Insurance',
      description: 'Quality healthcare coverage for you and your family.',
      href: '/health-insurance',
      gradient: 'from-purple-500 to-purple-700',
      image: '/images/doodles/health-doodle.svg'
    }
  ];

  return (
    <div className="h-screen flex flex-col font-['Inter'] overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl font-['Poppins'] drop-shadow-sm">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Welcome to InsureCo
            </span>
          </h1>
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Protecting what matters most with comprehensive insurance solutions.
          </motion.p>
        </motion.div>

        {/* Insurance Options */}
        <div className="mt-16 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insuranceOptions.map((insurance, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                <Link
                  href={insurance.href}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6 h-full transform hover:-translate-y-2">
                    <div className="relative h-32 w-full mb-4">
                      <Image
                        src={insurance.image}
                        alt={insurance.title}
                        fill
                        className="object-contain dark:filter dark:brightness-200 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h2 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${insurance.gradient} bg-clip-text text-transparent font-['Poppins']`}>
                      {insurance.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {insurance.description}
                    </p>
                    <motion.span 
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-500"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Learn more 
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="/contact">
            <motion.button 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 