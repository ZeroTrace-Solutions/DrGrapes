import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LegalLayout = ({ children, title, lastUpdated, type }) => {
  const { t, i18n } = useTranslation('legal');
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className={`w-5 h-5 transition-transform ${isRTL ? 'rotate-180' : ''} group-hover:${isRTL ? 'translate-x-1' : '-translate-x-1'}`} />
          <span className="text-sm font-bold uppercase tracking-widest">
            {t('common.backHome')}
          </span>
        </motion.button>

        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
          >
            <div className="w-20 h-20 rounded-[32px] bg-surface-container border border-white/10 flex items-center justify-center text-primary shadow-2xl">
              {type === 'tos' ? <FileText className="w-10 h-10" /> : <Shield className="w-10 h-10" />}
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                {title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-primary/30" />
                <p className="text-on-surface-variant text-sm font-bold tracking-[0.2em] uppercase opacity-60">
                  {lastUpdated}
                </p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-primary max-w-none"
        >
          {children}
        </motion.div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-white/5 opacity-40">
          <p className="text-xs uppercase tracking-[0.4em] font-black text-center">
            {t('common.footer')}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LegalLayout;
