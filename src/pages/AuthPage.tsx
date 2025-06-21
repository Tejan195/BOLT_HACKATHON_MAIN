import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import AuthForm from '../components/auth/AuthForm';
import PasswordResetForm from '../components/auth/PasswordResetForm';

type AuthView = 'signin' | 'signup' | 'reset-password';

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentView, setCurrentView] = useState<AuthView>('signin');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthStore();

  // Get redirect path from location state or default to account
  const from = location.state?.from?.pathname || '/account';

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleAuthSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleModeChange = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setCurrentView(mode);
  };

  const handleShowPasswordReset = () => {
    setCurrentView('reset-password');
  };

  const handleBackToSignIn = () => {
    setCurrentView('signin');
    setAuthMode('signin');
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
            src="/VisionAid.png" 
            alt="VisionAid Logo" 
            className="h-12 w-auto"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {currentView === 'reset-password' 
            ? 'Reset your password'
            : authMode === 'signin' 
              ? 'Sign in to your account' 
              : 'Create your account'
          }
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {currentView === 'reset-password'
            ? 'Enter your email to receive a password reset link'
            : authMode === 'signin' 
              ? 'Welcome back! Please sign in to continue.' 
              : 'Join VisionAid to access personalized accessibility features.'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {!isSupabaseConfigured() && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Demo Mode
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Authentication is currently in demo mode. You can explore the app without signing in.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'reset-password' ? (
            <PasswordResetForm onBack={handleBackToSignIn} />
          ) : (
            <>
              <AuthForm 
                mode={authMode}
                onModeChange={handleModeChange}
                onSuccess={handleAuthSuccess}
              />

              {/* Forgot Password Link - Only show on sign in */}
              {authMode === 'signin' && isSupabaseConfigured() && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleShowPasswordReset}
                    className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </>
          )}

          {!isSupabaseConfigured() && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-gray-500 transition-colors"
              >
                Continue exploring without signing in
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Features Preview */}
      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
            Why create an account?
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <h4 className="font-medium text-gray-900">Save Preferences</h4>
              <p className="text-sm text-gray-600">Keep your accessibility settings across devices</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <h4 className="font-medium text-gray-900">Track Progress</h4>
              <p className="text-sm text-gray-600">Monitor your vision exercise improvements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <h4 className="font-medium text-gray-900">Sync Data</h4>
              <p className="text-sm text-gray-600">Access your data from any device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;