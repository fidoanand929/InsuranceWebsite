'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...');
        
        // First, try to get the current timestamp from Supabase
        const { data: timeData, error: timeError } = await supabase
          .from('truck_quotes')
          .select('created_at')
          .limit(1);

        if (timeError) {
          console.error('Connection test error:', timeError);
          setError(timeError.message);
          setStatus('error');
          return;
        }

        console.log('Connection test response:', timeData);
        setStatus('success');
      } catch (err) {
        console.error('Connection test failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('error');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        
        {status === 'loading' && (
          <div className="text-blue-600">
            Testing connection to Supabase...
          </div>
        )}

        {status === 'success' && (
          <div className="text-green-600">
            ✓ Successfully connected to Supabase!
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-600">
            ✗ Connection failed: {error}
            <div className="mt-2 text-sm text-gray-600">
              Please check:
              <ul className="list-disc list-inside mt-1">
                <li>Supabase credentials in .env.local</li>
                <li>Database is running</li>
                <li>Network connectivity</li>
                <li>Table permissions (RLS policies)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 