import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

const OtpForm = ({ email, onSuccess, onBack }) => {
  const { t, i18n } = useTranslation('loginPage');
  const { resendOtp } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const inputs = useRef([]);
  
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      onSuccess(newOtp.join(''));
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every(char => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
      
      // Focus the last input or the next empty one
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputs.current[lastIndex].focus();

      if (newOtp.every(digit => digit !== '')) {
        onSuccess(newOtp.join(''));
      }
    }
    e.preventDefault();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setLocalLoading(true);
    const { error } = await resendOtp(email, 'FORGET_PASSWORD');
    if (!error) {
      setTimer(120);
    }
    setLocalLoading(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full max-w-md flex flex-col items-center space-y-12"
    >
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
            {t('otpTitle', { defaultValue: 'Verify Email' })}
          </span>
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-on-surface-variant text-base md:text-lg opacity-60 font-medium max-w-[280px] mx-auto leading-relaxed"
        >
          {t('otpSubtitle', { defaultValue: 'We sent a code to' })} <br/>
          <span dir="ltr" className="text-primary font-bold lowercase inline-block">{email}</span>
        </motion.p>
      </div>

      <div className="w-full space-y-12">
        <div className="flex justify-between gap-2" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-16 bg-transparent border-b-2 border-white/10 focus:border-primary outline-none text-center text-3xl font-black text-on-surface transition-all"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleResend}
            disabled={timer > 0 || localLoading}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${timer > 0 ? 'text-on-surface-variant/20' : 'text-primary hover:text-white'}`}
          >
            {localLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
            {timer > 0 ? `${t('resendIn', { defaultValue: 'Resend in' })} ${formatTime(timer)}` : t('resendCode', { defaultValue: 'Resend Code' })}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OtpForm;
