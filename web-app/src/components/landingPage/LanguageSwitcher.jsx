import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      aria-label={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className="fixed top-6 right-6 md:top-10 md:right-10 z-[1000] flex items-center gap-2 px-4 py-2 bg-surface-container-high/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl hover:bg-surface-container-highest/60 transition-all group"
    >
      <Languages className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface">
        {i18n.language === 'en' ? 'العربية' : 'English'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
