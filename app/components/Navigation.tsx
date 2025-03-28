'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import NavDropdown from './NavDropdown';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const insuranceItems = [
    {
      title: 'Car Insurance',
      href: '/car-insurance',
      description: 'Comprehensive coverage for your vehicle'
    },
    {
      title: 'Truck Insurance',
      href: '/truck-insurance',
      description: 'Specialized protection for commercial vehicles'
    },
    {
      title: 'Health Insurance',
      href: '/health-insurance',
      description: 'Quality healthcare coverage for you and your family'
    }
  ];

  const productItems = [
    {
      title: 'Car Finance',
      href: '/car-finance',
      description: 'Flexible financing options for your dream car'
    },
    {
      title: 'Truck Finance',
      href: '/truck-finance',
      description: 'Commercial vehicle financing solutions'
    },
    {
      title: 'Fuel Finance',
      href: '/fuel-finance',
      description: 'Smart fuel financing for your business'
    }
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                FinanceHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavDropdown title="Insurance" items={insuranceItems} />
            <NavDropdown title="Products" items={productItems} />
            
            <Link
              href="/emi-calculator"
              className={`px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                pathname === '/emi-calculator' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              EMI Calculator
            </Link>
            
            <Link
              href="/contact"
              className={`px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Contact
            </Link>

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 ml-3 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300">
              Insurance
            </div>
            {insuranceItems.map((item, index) => (
              <Link
                key={`insurance-${index}`}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 mt-4">
              Products
            </div>
            {productItems.map((item, index) => (
              <Link
                key={`product-${index}`}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="/emi-calculator"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              EMI Calculator
            </Link>

            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block px-4 py-2 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 