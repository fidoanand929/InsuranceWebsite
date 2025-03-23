'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignIn } from "@clerk/nextjs";
import { motion } from 'framer-motion';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <SignIn
          afterSignInUrl={redirectTo || '/'}
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm normal-case",
              footerActionLink: "text-blue-600 hover:text-blue-700",
            },
          }}
        />
      </motion.div>
    </div>
  );
} 