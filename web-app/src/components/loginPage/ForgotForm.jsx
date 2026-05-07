import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

import { validateEmail } from '@shared/utils/validation';

const ForgotForm = ({ onSuccess, onBack }) => {
  const { t, i18n } = useTranslation('loginPage');
  const { forgetPassword } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const isRTL = i18n.language === 'ar';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      setError(emailVal.message);
      return;
    }

    setLocalLoading(true);
    const { error: apiError } = await forgetPassword(email);

    if (!apiError) {
      onSuccess(email);
    } else {
      setError(apiError);
    }
    setLocalLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full max-w-md flex flex-col items-center space-y-12"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
            {t('forgotTitle', { defaultValue: 'Reset Password' })}
          </span>
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-on-surface-variant text-base md:text-lg opacity-60 font-medium max-w-[280px] mx-auto leading-relaxed"
        >
          {t('forgotSubtitle', { defaultValue: 'Enter your email to receive a reset code' })}
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="space-y-6">
          {/* Email Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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
              dir="ltr"
              className={`w-full bg-transparent py-4 ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'} pr-4 outline-none text-xl font-bold tracking-tight text-on-surface placeholder:text-on-surface-variant/20 placeholder:font-medium`}
            />
          </motion.div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs font-bold uppercase tracking-widest text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
                <span className="relative z-10">{t('sendCode', { defaultValue: 'Send Code' })}</span>
                <ArrowRight className={`w-6 h-6 relative z-10 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ForgotForm;
