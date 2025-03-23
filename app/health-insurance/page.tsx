'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function HealthInsurance() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      {/* Hero Section with Doodle */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-64 w-full mb-8">
            <Image
              src="/images/doodles/health-doodle.svg"
              alt="Health Insurance Doodle"
              fill
              className="object-contain dark:filter dark:brightness-200 transform hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-['Poppins'] drop-shadow-sm">
            Health Insurance
            <motion.span 
              className="block text-purple-600 dark:text-purple-400 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              For Your Peace of Mind
            </motion.span>
          </h1>
          <motion.p 
            className="mt-3 max-w-md mx-auto text-base text-gray-700 dark:text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Secure your family's health with comprehensive medical coverage.
          </motion.p>
        </motion.div>

        {/* Features with Doodles */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="relative group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48 w-full mb-4 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-contain dark:filter dark:brightness-200 transform group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-['Poppins']">{feature.title}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans with Doodle Decorations */}
        <div className="mt-24">
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-['Poppins'] drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Choose Your Perfect Plan
            </motion.h2>
            <div className="relative h-32 w-full my-8">
              <Image
                src="/images/doodles/arrow-doodle.svg"
                alt="Decorative Arrow"
                fill
                className="object-contain dark:filter dark:brightness-200"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute -top-4 -right-4 h-16 w-16">
                  <Image
                    src="/images/doodles/star-doodle.svg"
                    alt="Star Decoration"
                    fill
                    className="object-contain dark:filter dark:brightness-200"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Poppins']">{plan.name}</h3>
                <p className="mt-4 text-gray-700 dark:text-gray-200">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <div className="relative h-6 w-6 mr-2">
                        <Image
                          src="/images/doodles/checkmark-doodle.svg"
                          alt="Checkmark"
                          fill
                          className="object-contain dark:filter dark:brightness-200"
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button 
                  className="mt-8 w-full bg-purple-600 dark:bg-purple-500 text-white rounded-lg py-3 px-4 hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center space-x-8">
          <Link 
            href="/disclaimer" 
            className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors underline hover:no-underline"
          >
            Disclaimer
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors underline hover:no-underline"
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Comprehensive Coverage",
    description: "Wide range of medical treatments, surgeries, and hospitalization coverage.",
    image: "/images/doodles/shield-doodle.svg"
  },
  {
    title: "24/7 Medical Support",
    description: "Round-the-clock medical assistance and claims support.",
    image: "/images/doodles/wrench-doodle.svg"
  },
  {
    title: "Quick Claims Process",
    description: "Hassle-free claims with minimal paperwork and fast processing.",
    image: "/images/doodles/document-doodle.svg"
  }
];

const plans = [
  {
    name: "Basic Plan",
    description: "Perfect for individuals",
    price: "$X",
    features: [
      "Individual coverage",
      "Basic hospitalization",
      "Emergency care",
      "Ambulance services"
    ]
  },
  {
    name: "Family Plan",
    description: "Ideal for families",
    price: "$XX",
    features: [
      "Coverage for 4 members",
      "Comprehensive care",
      "Maternity benefits",
      "Preventive care"
    ]
  },
  {
    name: "Premium Plan",
    description: "Complete protection",
    price: "$XXX",
    features: [
      "Coverage for 6 members",
      "International treatment",
      "Critical illness coverage",
      "Personal health concierge"
    ]
  }
]; 