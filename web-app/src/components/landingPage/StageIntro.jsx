import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import logo from '@/assets/dr-grapes-logo.png';
import { Button } from '@/components/ui/button';
import BlurText from '../ui/BlurText';
import { toast } from 'sonner';

import { useTranslation } from 'react-i18next';

const StageIntro = ({ scrollXProgress, onNavigate }) => {
  const { t } = useTranslation('landingPage');
  
  // Local progress (Stage 0 of 4: range [0.0, 0.25])
  const localProgress = useTransform(scrollXProgress, [0, 0.25], [0, 1]);

  const sloganScrollOpacity = useTransform(localProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const sloganY = useTransform(localProgress, [0, 0.8], [0, -40]);

  const ctaScrollOpacity = useTransform(localProgress, [0, 0.8], [1, 0]);
  const ctaScale = useTransform(localProgress, [0, 0.8], [1, 0.95]);

  return (
    <section className="relative w-screen h-full flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        {/* HERO CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-[100] flex flex-col justify-center items-center space-y-10 md:space-y-20 text-center px-6"
        >
          {/* LOGO - Mobile Only */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="md:hidden w-20 h-20 mb-2"
          >
            <img src={logo} alt="Dr. Grapes" className="w-full h-full object-contain" />
          </motion.div>

          {/* SLOGAN */}
          <motion.div
            style={{ opacity: sloganScrollOpacity, y: sloganY }}
            className="space-y-4 md:space-y-8 w-full max-w-lg md:max-w-4xl"
          >
            <div className="space-y-2">
              <BlurText
                text={t('intro.guide')}
                delay={150}
                animateBy="words"
                direction="top"
                className="text-2xl md:text-7xl font-black leading-tight tracking-tighter uppercase"
              />
              <h2 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">{t('intro.journey')}</span>
              </h2>
            </div>
            <div className="w-10 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg mx-auto opacity-50" />
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ opacity: ctaScrollOpacity, scale: ctaScale }}
            className="space-y-6 md:space-y-12 w-full max-w-sm md:max-w-none"
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 justify-center items-center w-full">
              <Button
                size="lg"
                onClick={() => toast.info(t('intro.shopToastTitle'), {
                  description: t('intro.shopToastDesc'),
                  duration: 4000
                })}
                className="rounded-full px-8 py-6 md:px-12 md:py-10 text-lg md:text-2xl font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 h-auto bg-primary text-on-primary hover:bg-primary/90 border-none w-full md:w-auto"
              >
                {t('intro.shopNow')}
              </Button>
              <div className="relative group w-full md:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate && onNavigate(2)}
                  className="rounded-full px-8 py-6 md:px-12 md:py-10 text-lg md:text-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 h-auto border-2 border-primary/30 text-primary opacity-100 cursor-pointer bg-primary/5 w-full md:w-auto"
                >
                  {t('intro.downloadApp')}
                </Button>
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-secondary-container text-on-secondary text-[8px] md:text-[10px] font-black uppercase px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg z-10">{t('intro.comingSoon')}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StageIntro;
