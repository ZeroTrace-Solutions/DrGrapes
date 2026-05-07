import React from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/dr-grapes-logo.png';
import { useTranslation } from 'react-i18next';

const Preloader = () => {
  const { t } = useTranslation('landingPage');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.5,
        filter: "blur(40px) contrast(120%)",
        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
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
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, type: "spring", damping: 15 }}
        className="h-60 w-auto object-contain drop-shadow-[0_0_40px_rgba(255,175,210,0.3)]"
        alt="Dr. Grapes"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        dir="ltr"
        className="flex overflow-hidden py-4 bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_25px_rgba(255,175,210,0.4)]"
      >
        {"Dr. Grapes".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 150
                }
              },
            }}
            className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
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
