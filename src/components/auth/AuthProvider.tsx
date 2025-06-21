import React, { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { SessionManager } from './SessionManager';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Only initialize auth if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  return (
    <SessionManager>
      {children}
    </SessionManager>
  );
};