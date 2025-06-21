import React, { useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

export const SessionManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    // Set up session refresh interval (every 50 minutes)
    const refreshInterval = setInterval(async () => {
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
          console.error('Session refresh failed:', error);
          // Don't show error toast for automatic refresh failures
          // The user will be prompted to sign in again when they try to access protected resources
        }
      } catch (error) {
        console.error('Session refresh error:', error);
      }
    }, 50 * 60 * 1000); // 50 minutes

    // Set up session monitoring
    const sessionMonitor = setInterval(async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check failed:', error);
          return;
        }

        // Check if session is about to expire (within 5 minutes)
        if (session?.expires_at) {
          const expiresAt = new Date(session.expires_at * 1000);
          const now = new Date();
          const timeUntilExpiry = expiresAt.getTime() - now.getTime();
          const fiveMinutes = 5 * 60 * 1000;

          if (timeUntilExpiry < fiveMinutes && timeUntilExpiry > 0) {
            // Attempt to refresh the session
            const { error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
              console.error('Pre-emptive session refresh failed:', refreshError);
            }
          }
        }
      } catch (error) {
        console.error('Session monitoring error:', error);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      clearInterval(refreshInterval);
      clearInterval(sessionMonitor);
    };
  }, []);

  // Handle session expiry
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser]);

  return <>{children}</>;
};