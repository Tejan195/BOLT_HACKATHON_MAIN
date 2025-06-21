import React, { useState } from 'react';
import { Shield, Key, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { toast } from 'sonner';

const AccountSecurity: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);

  const handlePasswordChange = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Password change is not available in demo mode.');
      return;
    }

    try {
      setLoading(true);
      
      // In a real implementation, you would redirect to a password change form
      // or open a modal with the password change form
      toast.info('Password change functionality would be implemented here.');
      
    } catch (error: any) {
      console.error('Password change error:', error);
      toast.error('Failed to initiate password change');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutAllDevices = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Session management is not available in demo mode.');
      return;
    }

    try {
      setLoading(true);
      
      // Sign out from all sessions
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) throw error;
      
      toast.success('Signed out from all devices successfully');
      
    } catch (error: any) {
      console.error('Sign out all devices error:', error);
      toast.error('Failed to sign out from all devices');
    } finally {
      setLoading(false);
    }
  };

  const securityFeatures = [
    {
      icon: Key,
      title: 'Password Security',
      description: 'Change your password regularly and use a strong, unique password',
      action: 'Change Password',
      onClick: handlePasswordChange,
      status: 'Good',
      statusColor: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      action: 'Enable 2FA',
      onClick: () => toast.info('2FA setup would be implemented here'),
      status: 'Recommended',
      statusColor: 'text-yellow-600'
    },
    {
      icon: Smartphone,
      title: 'Active Sessions',
      description: 'Manage devices that are currently signed in to your account',
      action: 'View Sessions',
      onClick: () => toast.info('Session management would be implemented here'),
      status: 'Monitor',
      statusColor: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Login History',
      description: 'Review recent login activity and locations',
      action: 'View History',
      onClick: () => toast.info('Login history would be implemented here'),
      status: 'Available',
      statusColor: 'text-gray-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Security Recommendations
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Use a strong, unique password for your account</li>
                <li>Enable two-factor authentication for added security</li>
                <li>Regularly review your account activity</li>
                <li>Sign out from devices you no longer use</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {securityFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {feature.description}
                  </p>
                  <div className="mt-2">
                    <span className={`text-sm font-medium ${feature.statusColor}`}>
                      Status: {feature.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={feature.onClick}
                disabled={loading || !isSupabaseConfigured()}
                className="ml-4 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {feature.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-900 mb-4">
          Emergency Actions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-red-900">
                Sign Out All Devices
              </h4>
              <p className="text-sm text-red-700">
                Immediately sign out from all devices if you suspect unauthorized access
              </p>
            </div>
            <button
              onClick={handleSignOutAllDevices}
              disabled={loading || !isSupabaseConfigured()}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : 'Sign Out All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;