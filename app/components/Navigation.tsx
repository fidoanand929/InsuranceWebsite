'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">InsureCo</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Car Insurance', href: '/car-insurance' },
              { name: 'Truck Insurance', href: '/truck-insurance' },
              { name: 'Health Insurance', href: '/health-insurance' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  isActive(item.href)
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 pb-3 pt-2">
          {[
            { name: 'Home', href: '/' },
            { name: 'Car Insurance', href: '/car-insurance' },
            { name: 'Truck Insurance', href: '/truck-insurance' },
            { name: 'Health Insurance', href: '/health-insurance' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                isActive(item.href)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 