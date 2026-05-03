import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Role not authorized
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0c0f0f] text-foreground p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-error">Access Denied</h1>
          <p className="opacity-60 max-w-md">
            You do not have the required permissions to access this area. 
            Please contact the administrator if you believe this is a mistake.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 px-8 py-3 bg-surface-container border border-outline-variant rounded-full font-bold hover:bg-surface-variant transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
