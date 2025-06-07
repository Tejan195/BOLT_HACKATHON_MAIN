import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User, Shield, AlertCircle } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (!isSupabaseConfigured()) {
      navigate('/');
      return;
    }

    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (!user && isSupabaseConfigured()) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {!isSupabaseConfigured() && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Demo Mode
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>You're currently in demo mode. Authentication features are not available.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.user_metadata?.full_name || user?.email || 'Demo User'}
                </h2>
                <p className="text-gray-500">{user?.email || 'demo@example.com'}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6 text-primary-600" />
                  <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                </div>
                <div className="mt-4 space-y-4">
                  <button className="block text-sm text-gray-700 hover:text-primary-600" disabled={!isSupabaseConfigured()}>
                    Edit Profile
                  </button>
                  <button className="block text-sm text-gray-700 hover:text-primary-600" disabled={!isSupabaseConfigured()}>
                    Change Password
                  </button>
                  <button className="block text-sm text-gray-700 hover:text-primary-600" disabled={!isSupabaseConfigured()}>
                    Notification Preferences
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary-600" />
                  <h3 className="text-lg font-medium text-gray-900">Security</h3>
                </div>
                <div className="mt-4 space-y-4">
                  <button className="block text-sm text-gray-700 hover:text-primary-600" disabled={!isSupabaseConfigured()}>
                    Two-Factor Authentication
                  </button>
                  <button className="block text-sm text-gray-700 hover:text-primary-600" disabled={!isSupabaseConfigured()}>
                    Connected Devices
                  </button>
                  <button className="block text-sm text-gray-700 hover:text-primary-600" disabled={!isSupabaseConfigured()}>
                    Login History
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {isSupabaseConfigured() ? 'Sign Out' : 'Return to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;