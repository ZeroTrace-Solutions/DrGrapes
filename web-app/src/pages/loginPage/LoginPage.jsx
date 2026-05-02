import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LoginForm from '@/components/loginPage/LoginForm';
import logo from '@/assets/dr-grapes-logo.png';
import SEO from '@/components/SEO';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { t, i18n } = useTranslation('loginPage');
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      <SEO 
        title={t('seo.title')}
        description={t('seo.description')}
      />

      {/* Atmospheric Background - Matching Landing Page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ 
            x: isRTL ? [20, -20, 20] : [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-primary/10 rounded-full blur-[150px] opacity-40"
        />
        <motion.div
          animate={{ 
            x: isRTL ? [-20, 20, -20] : [20, -20, 20],
            y: [10, -10, 10]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[20%] w-[90%] h-[90%] bg-secondary/10 rounded-full blur-[150px] opacity-30"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} z-50 flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors font-black uppercase tracking-widest text-xs group`}
      >
        <ArrowLeft className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
        {t('backHome')}
      </Link>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 mb-4"
        >
          <img src={logo} alt="Dr. Grapes" className="w-full h-full object-contain" />
        </motion.div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer Links */}
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">
          <Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
          <Link to="/" state={{ scrollToStage: 3 }} className="hover:text-primary transition-colors">{t('footer.contact')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
