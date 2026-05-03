import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const RoleRouter = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const role = user?.role;

    switch (role) {
      case 'ADMIN':
        navigate('/dashboard/admin', { replace: true });
        break;
      case 'SUPPLIER_DELIVERY':
        navigate('/dashboard/supplier/d', { replace: true });
        break;
      case 'SUPPLIER_NO_DELIVERY':
        navigate('/dashboard/supplier/nd', { replace: true });
        break;
      case 'USER':
        navigate('/market', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  }, [user, isAuthenticated, loading, navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0c0f0f] text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black uppercase tracking-tighter">Routing Access</h2>
          <p className="text-xs opacity-40 font-bold uppercase tracking-widest mt-1">Preparing your workspace...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleRouter;
