import React from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/dr-grapes-logo.png';
import { useTranslation } from 'react-i18next';

const Preloader = () => {
  const { t } = useTranslation('landingPage');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(15px)", y: -50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center space-y-10 bg-[#0c0f0f]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4 text-center"
      >
        <h2 className="text-xl font-bold text-secondary tracking-[0.8em] uppercase opacity-60">{t('preloader.welcome')}</h2>
      </motion.div>
      <motion.img 
        src={logo} 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
        className="h-60 w-auto object-contain drop-shadow-[0_0_40px_rgba(255,175,210,0.3)]" 
        alt="Dr. Grapes" 
      />
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
        className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-40"
      />
    </motion.div>
  );
};

export default Preloader;
