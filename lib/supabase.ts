import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js',
    },
  },
  db: {
    schema: 'public',
  },
});

// Fixed admin credentials
const ADMIN_USERNAME = 'administrator';
const ADMIN_PASSWORD = 'password';

export type FileObject = {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: string;
  url: string;
};

export type UserData = {
  id: string;
  username: string;
  role: string;
  created_at: string;
  last_sign_in: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  contact: string;
  message: string;
  created_at: string;
  status: 'new' | 'in_progress' | 'completed';
};

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createAdminSession() {
  try {
    const { data, error } = await supabase
      .from('admin_sessions')
      .insert([
        {
          username: ADMIN_USERNAME,
          created_at: new Date().toISOString(),
          is_active: true
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating admin session:', error);
    return null;
  }
}

export async function checkAdminSession(sessionId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_sessions')
      .select('is_active')
      .eq('id', sessionId)
      .single();

    if (error) throw error;
    return data?.is_active || false;
  } catch (error) {
    console.error('Error checking admin session:', error);
    return false;
  }
}

export async function checkUserRole(userId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data?.role || null;
  } catch (error) {
    console.error('Error checking user role:', error);
    return null;
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await checkUserRole(userId);
  return role === 'admin' || role === 'super_admin';
}

// Types for the quotes table
export interface TruckQuote {
  id: string;
  created_at: string;
  customer_name: string;
  business_name: string;
  contact_number: string;
  email: string;
  vehicle_type: string;
  vehicle_cost: number;
  down_payment: number;
  loan_term: number;
  monthly_revenue: number;
  business_age: number;
  credit_score: number;
  quote_amount: number;
  interest_rate: number;
  monthly_payment: number;
  status: 'pending' | 'approved' | 'rejected';
} 