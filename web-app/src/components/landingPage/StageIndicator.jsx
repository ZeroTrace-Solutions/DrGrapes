import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const StageItem = ({ stage, i, total, scrollProgress, onClick }) => {
  const center = i / (total - 1);
  const start = Math.max(0, center - 0.1);
  const end = Math.min(1, center + 0.1);

  const input = start === center ? [center, end] : end === center ? [start, center] : [start, center, end];
  const output = start === center ? [1, 0.3] : end === center ? [0.3, 1] : [0.3, 1, 0.3];

  const opacity = useTransform(scrollProgress, input, output);
  // Highlight active text color
  const color = useTransform(scrollProgress, input, [
    start === center ? "var(--primary)" : "var(--on-surface)",
    "var(--primary)",
    end === center ? "var(--primary)" : "var(--on-surface)"
  ]);

  return (
    <motion.button
      onClick={() => onClick(i)}
      style={{ opacity, color }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Go to ${stage}`}
      className="text-[10px] font-bold tracking-widest uppercase bg-transparent border-none cursor-pointer outline-none transition-colors hover:text-primary"
    >
      {stage}
    </motion.button>
  );
};

const StageIndicator = ({ scrollYProgress, onStageClick }) => {
  const { t, i18n } = useTranslation('landingPage');
  const [showHint, setShowHint] = useState(false);
  const isRTL = i18n.language === 'ar';
  const showHintRef = useRef(false);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      if (showHintRef.current) {
        setShowHint(false);
        showHintRef.current = false;
      }
      
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      
      idleTimerRef.current = setTimeout(() => {
        setShowHint(true);
        showHintRef.current = true;
      }, 10000); // 10 seconds idle
    };

    // Events that indicate activity
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel', 'scroll'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetIdleTimer, { passive: true });
    });

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, []);

  const stages = [
    t('common.stages.intro'),
    t('common.stages.discovery'),
    t('common.stages.mobile'),
    t('common.stages.mission')
  ];

  // Refined width calculation: spring the numeric value, then convert to %
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const springWidth = useSpring(progressPercent, { stiffness: 100, damping: 30 });
  const width = useTransform(springWidth, (val) => `${val}%`);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90vw] md:max-w-2xl px-4 md:px-8 flex flex-col items-center">
      {/* Mobile Scroll Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              x: isRTL ? [5, -5, 5] : [-5, 5, -5],
              y: 0
            }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="md:hidden flex flex-col items-center mb-4 space-y-1 opacity-60 pointer-events-none"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">
              {isRTL ? 'اسحب للاستكشاف' : 'Swipe to Explore'}
            </span>
            <div className="flex items-center gap-8">
              <motion.div animate={{ x: isRTL ? [2, -2, 2] : [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`${isRTL ? '-rotate-90' : 'rotate-90'} opacity-40`}>
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <motion.div animate={{ x: isRTL ? [-2, 2, -2] : [2, -2, 2] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`${isRTL ? 'rotate-90' : '-rotate-90'} opacity-40`}>
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full h-1.5 bg-surface-container rounded-full overflow-hidden backdrop-blur-md border border-outline/10">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-primary-container via-primary to-secondary-container shadow-[0_0_15px_rgba(193,53,132,0.5)]"
          style={{ width }}
        />
      </div>
      <div className="flex justify-between w-full mt-4 px-2">
        {stages.map((stage, i) => (
          <StageItem
            key={stage}
            stage={stage}
            i={i}
            total={stages.length}
            scrollProgress={scrollYProgress}
            onClick={onStageClick}
          />
        ))}
      </div>
    </div>
  );
};

export default StageIndicator;
