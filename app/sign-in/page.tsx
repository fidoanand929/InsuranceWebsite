'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
              card: 'dark:bg-gray-800',
              headerTitle: 'dark:text-white',
              socialButtonsBlockButton: 'dark:bg-gray-700 dark:text-white dark:border-gray-600',
              formFieldInput: 'dark:bg-gray-700 dark:text-white dark:border-gray-600',
              footerActionLink: 'text-blue-600 hover:text-blue-700 dark:text-blue-400',
            },
          }}
        />
      </div>
    </div>
  );
} 