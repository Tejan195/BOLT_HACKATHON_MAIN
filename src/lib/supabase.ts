import { createClient } from '@supabase/supabase-js';
import { securityHeaders } from './security';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: securityHeaders,
    fetch: (url, options = {}) => {
      // Add CSRF token to requests if needed
      const csrfToken = localStorage.getItem('csrf_token');
      if (csrfToken) {
        options.headers = {
          ...options.headers,
          'X-CSRF-Token': csrfToken
        };
      }
      return fetch(url, options);
    }
  }
});