'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestConnection() {
  const [status, setStatus] = useState<{
    connection: boolean;
    tables: {
      users: boolean;
      contact_submissions: boolean;
      storage: boolean;
    };
    error?: string;
  }>({
    connection: false,
    tables: {
      users: false,
      contact_submissions: false,
      storage: false,
    }
  });

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase.from('users').select('count').single();
      if (error) throw error;
      setStatus(prev => ({ ...prev, connection: true }));

      // Test users table
      const { data: usersTest } = await supabase.from('users').select('*').limit(1);
      setStatus(prev => ({
        ...prev,
        tables: { ...prev.tables, users: true }
      }));

      // Test contact_submissions table
      const { data: contactTest } = await supabase.from('contact_submissions').select('*').limit(1);
      setStatus(prev => ({
        ...prev,
        tables: { ...prev.tables, contact_submissions: true }
      }));

      // Test storage bucket
      const { data: storageTest } = await supabase.storage.getBucket('uploads');
      setStatus(prev => ({
        ...prev,
        tables: { ...prev.tables, storage: true }
      }));

    } catch (error: any) {
      setStatus(prev => ({
        ...prev,
        error: error.message
      }));
    }
  };

  const createTables = async () => {
    try {
      // Create users table if it doesn't exist
      const { error: usersError } = await supabase.rpc('create_users_table');
      if (usersError) throw usersError;

      // Create contact_submissions table if it doesn't exist
      const { error: contactError } = await supabase.rpc('create_contact_submissions_table');
      if (contactError) throw contactError;

      // Create storage bucket if it doesn't exist
      const { error: storageError } = await supabase.storage.createBucket('uploads', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      
      await testConnection();
    } catch (error: any) {
      setStatus(prev => ({
        ...prev,
        error: error.message
      }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
        <CardDescription>Verify database connection and required tables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p>
            Connection Status:{' '}
            <span className={status.connection ? 'text-green-500' : 'text-red-500'}>
              {status.connection ? 'Connected' : 'Not Connected'}
            </span>
          </p>
          <p>
            Users Table:{' '}
            <span className={status.tables.users ? 'text-green-500' : 'text-red-500'}>
              {status.tables.users ? 'Available' : 'Not Available'}
            </span>
          </p>
          <p>
            Contact Submissions Table:{' '}
            <span className={status.tables.contact_submissions ? 'text-green-500' : 'text-red-500'}>
              {status.tables.contact_submissions ? 'Available' : 'Not Available'}
            </span>
          </p>
          <p>
            Storage Bucket:{' '}
            <span className={status.tables.storage ? 'text-green-500' : 'text-red-500'}>
              {status.tables.storage ? 'Available' : 'Not Available'}
            </span>
          </p>
          {status.error && (
            <p className="text-red-500">Error: {status.error}</p>
          )}
        </div>
        <div className="space-x-4">
          <Button onClick={testConnection}>Test Connection</Button>
          <Button variant="outline" onClick={createTables}>Create Missing Tables</Button>
        </div>
      </CardContent>
    </Card>
  );
} 