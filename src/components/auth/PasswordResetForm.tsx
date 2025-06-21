import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { toast } from 'sonner';

interface PasswordResetFormProps {
  onBack: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\[\]\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured()) {
      toast.error('Password reset is not available in demo mode.');
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      if (error.message.includes('Email not found')) {
        setError('No account found with this email address');
      } else if (error.message.includes('Email rate limit exceeded')) {
        setError('Too many requests. Please wait before trying again.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
        <p className="text-sm text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <p className="text-xs text-gray-500 mb-6">
          Didn't receive the email? Check your spam folder or try again in a few minutes.
        </p>
        <button
          onClick={onBack}
          className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-600 hover:text-gray-500 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Sign In
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className={`appearance-none block w-full pl-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={loading}
              autoComplete="email"
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !isSupabaseConfigured()}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200 ${
            loading || !isSupabaseConfigured()
              ? 'bg-primary-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98]'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;