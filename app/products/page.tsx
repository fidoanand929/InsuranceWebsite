'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function Products() {
  const financeOptions = [
    {
      title: 'Truck Finance',
      description: 'Flexible financing solutions for commercial trucks, including low interest rates and customizable repayment terms to suit your business.',
      href: '/truck-finance',
      gradient: 'from-emerald-500 to-emerald-700',
      image: '/images/doodles/truck-doodle.svg'
    },
    {
      title: 'Car Finance',
      description: 'Competitive auto loans with quick approval and minimal documentation. Get behind the wheel of your dream car with our hassle-free financing.',
      href: '/car-finance',
      gradient: 'from-blue-500 to-blue-700',
      image: '/images/doodles/car-doodle.svg'
    },
    {
      title: 'Fuel Finance',
      description: 'Innovative fuel credit solutions for businesses and fleet operators. Manage your fuel expenses efficiently with our specialized financing options.',
      href: '/fuel-finance',
      gradient: 'from-amber-500 to-amber-700',
      image: '/images/doodles/fuel-doodle.svg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="flex-1 flex flex-col items-center px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-['Poppins'] drop-shadow-sm">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Financing Solutions
            </span>
          </h1>
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore our range of financing options designed to help you acquire the vehicles and fuel you need with flexible terms and competitive rates.
          </motion.p>
        </motion.div>

        {/* Finance Options */}
        <div className="mt-16 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financeOptions.map((finance, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                <Link
                  href={finance.href}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6 h-full transform hover:-translate-y-2">
                    <div className="relative h-32 w-full mb-4">
                      <Image
                        src={finance.image}
                        alt={finance.title}
                        fill
                        className="object-contain dark:filter dark:brightness-200 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h2 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${finance.gradient} bg-clip-text text-transparent font-['Poppins']`}>
                      {finance.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {finance.description}
                    </p>
                    <motion.span 
                      className="inline-flex items-center text-green-600 dark:text-green-400 group-hover:text-green-500"
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

        {/* Back Button */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="/">
            <motion.button 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 