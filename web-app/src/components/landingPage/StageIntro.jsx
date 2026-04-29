import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import logo from '@/assets/dr-grapes-logo.png';

const StageIntro = ({ scrollYProgress }) => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // For 4 stages, the anchors are approximately 0.0, 0.33, 0.66, 1.0
  // Intro exists from 0.0 to 0.25
  const sloganScrollOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const sloganY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  
  const ctaScrollOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.32], [0, 1, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.2, 0.28], [0.95, 1]);

  return (
    <section className="relative w-screen h-full flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        <AnimatePresence>
          {!isIntroComplete && (
            <motion.div 
              key="welcome-shield"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, filter: "blur(15px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 z-[300] flex flex-col items-center justify-center space-y-10 bg-background"
            >
              <img src={logo} className="h-32 w-auto object-contain drop-shadow-[0_0_40px_rgba(255,175,210,0.3)]" alt="Dr. Grapes" />
              <div className="space-y-4 text-center">
                <h2 className="text-xl font-bold text-secondary tracking-[0.8em] uppercase opacity-60">Welcome to</h2>
                <h1 className="text-8xl font-black tracking-tighter uppercase text-white leading-none drop-shadow-2xl">DR. GRAPES</h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntroComplete ? 1 : 0 }}
          style={{ opacity: sloganScrollOpacity, y: sloganY }} 
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-[100] flex flex-col justify-center items-center space-y-8 text-center pointer-events-none"
        >
          <h2 className="text-7xl font-black leading-tight tracking-tighter uppercase max-w-4xl">
            Your Guide For Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Medical Journey</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntroComplete ? 1 : 0 }}
          style={{ opacity: ctaScrollOpacity, scale: ctaScale, zIndex: 200 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 flex flex-col justify-center items-center space-y-12"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-6xl font-black tracking-tight leading-[0.95] max-w-4xl uppercase">
              Precision tools for the <br/><span className="text-primary">next generation</span> <br/>of healers.
            </h2>
          </div>
          <div className="flex gap-8">
            <button className="group relative bg-primary-container text-on-primary rounded-full px-12 py-8 text-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl border-none cursor-pointer overflow-hidden">
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <div className="relative group">
              <button className="border-2 border-secondary-container/50 text-secondary bg-transparent rounded-full px-12 py-8 text-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 hover:bg-secondary-container/10 opacity-70 cursor-not-allowed">Download App</button>
              <div className="absolute -top-3 -right-3 bg-secondary-container text-on-secondary text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">Soon</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StageIntro;
