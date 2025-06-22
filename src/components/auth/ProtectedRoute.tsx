import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { isSupabaseConfigured } from '../../lib/supabase';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  // Get redirect path from location state or default to account
  const from = location.state?.from?.pathname || '/account';

  // If Supabase is not configured, allow access to all pages
  if (!isSupabaseConfigured()) {
    return <>{children}</>;
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If user is logged in but trying to access auth pages, redirect to account
  if (!requireAuth && user && (location.pathname === '/auth' || location.pathname.startsWith('/auth/'))) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;