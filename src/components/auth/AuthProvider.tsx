import React, { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { SessionManager } from './SessionManager';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      // Only initialize auth if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        if (mounted) {
          setLoading(false);
        }
        return;
      }

      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Initialize auth
    initializeAuth();

    // Set up auth state listener only if Supabase is configured
    let subscription: any = null;
    
    if (isSupabaseConfigured()) {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      });
      
      subscription = authSubscription;
    }

    // Cleanup function
    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [setUser, setLoading]);

  return (
    <SessionManager>
      {children}
    </SessionManager>
  );
};