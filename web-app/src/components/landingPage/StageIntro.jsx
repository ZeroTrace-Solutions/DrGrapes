import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import logo from '@/assets/dr-grapes-logo.png';
import { Button } from '@/components/ui/button';
import BlurText from '../ui/BlurText';
import { toast } from 'sonner';

const StageIntro = ({ scrollYProgress, onNavigate }) => {
  // For 4 stages, the anchors are approximately 0.0, 0.33, 0.66, 1.0
  // Intro exists from 0.0 to 0.25
  const sloganScrollOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const sloganY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  const ctaScrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section className="relative w-screen h-full flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        {/* HERO CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-[100] flex flex-col justify-center items-center space-y-20 text-center"
        >
          {/* SLOGAN */}
          <motion.div
            style={{ opacity: sloganScrollOpacity, y: sloganY }}
            className="space-y-8"
          >
            <BlurText
              text="Your Guide For Your"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-7xl font-black leading-tight tracking-tighter uppercase max-w-4xl"
            />
            <h2 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter uppercase max-w-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Medical Journey</span>
            </h2>
            <div className="w-16 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg mx-auto" />
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ opacity: ctaScrollOpacity, scale: ctaScale }}
            className="space-y-8 md:space-y-12"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
              <Button
                size="lg"
                onClick={() => toast.info("Marketplace Coming Soon", {
                  description: "The Dr. Grapes shop is currently being curated for the best medical supplies.",
                  duration: 4000
                })}
                className="rounded-full px-8 py-6 md:px-12 md:py-10 text-lg md:text-2xl font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 h-auto bg-primary text-white hover:bg-primary/90 border-none w-full md:w-auto"
              >
                Shop Now
              </Button>
              <div className="relative group w-full md:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate && onNavigate(2)}
                  className="rounded-full px-8 py-6 md:px-12 md:py-10 text-lg md:text-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 h-auto border-2 border-primary/30 text-primary opacity-100 cursor-pointer bg-primary/5 w-full md:w-auto"
                >
                  Download App
                </Button>
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-secondary-container text-on-secondary text-[8px] md:text-[10px] font-black uppercase px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg z-10">Soon</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StageIntro;
