import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { t, i18n } = useTranslation('loginPage');
  const { login } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();
  
  const isRTL = i18n.language === 'ar';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    
    const { data, error } = await login(email, password);

    if (data && !error) {
      navigate('/');
    }
    setLocalLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full max-w-md flex flex-col items-center space-y-12"
    >
      {/* Header Section with bold typography */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
            {t('title')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-on-surface-variant text-base md:text-lg opacity-60 font-medium max-w-[280px] mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="space-y-6">
          {/* Email Input - Border Bottom Style */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute left-0 bottom-4 w-full h-px bg-white/10 group-focus-within:bg-primary/50 transition-all duration-500" />
            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 flex items-center gap-4`}>
              <Mail className="w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholders.email')}
              required
              className={`w-full bg-transparent py-4 ${isRTL ? 'pr-12' : 'pl-12'} pr-4 outline-none text-xl font-bold tracking-tight text-on-surface placeholder:text-on-surface-variant/20 placeholder:font-medium`}
            />
          </motion.div>

          {/* Password Input - Border Bottom Style */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute left-0 bottom-4 w-full h-px bg-white/10 group-focus-within:bg-primary/50 transition-all duration-500" />
            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 flex items-center gap-4`}>
              <Lock className="w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('placeholders.password')}
              required
              className={`w-full bg-transparent py-4 ${isRTL ? 'pr-12' : 'pl-12'} pr-4 outline-none text-xl font-bold tracking-tight text-on-surface placeholder:text-on-surface-variant/20 placeholder:font-medium`}
            />
          </motion.div>
        </div>

        <div className={`flex items-center ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 hover:text-primary transition-colors"
          >
            {t('forgotPassword')}
          </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            type="submit"
            variant="outline"
            disabled={localLoading}
            className="w-full h-20 rounded-full uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
            {localLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span className="relative z-10">{t('loginButton')}</span>
                <ArrowRight className={`w-6 h-6 relative z-10 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30"
      >
        {t('noAccount')}{' '}
        <Button
          variant="link"
          className="text-primary hover:text-white transition-colors h-auto p-0 text-[10px] font-black uppercase tracking-[0.3em] ml-2"
        >
          {t('register')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
