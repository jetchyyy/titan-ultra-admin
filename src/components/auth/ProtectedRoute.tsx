import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from './LoginPage';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredEmails?: string[]; // Optional: restrict to specific emails
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredEmails }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  // If not authenticated, show login page
  if (!user) {
    return <LoginPage />;
  }

  // If specific emails are required, check if user's email is allowed
  if (requiredEmails && requiredEmails.length > 0) {
    const isAuthorized = requiredEmails.includes(user.email || '');
    
    if (!isAuthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500/30 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-6">
              You are not authorized to access this admin panel.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Signed in as: <span className="text-white font-semibold">{user.email}</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and authorized, render children
  return <>{children}</>;
};

export default ProtectedRoute;