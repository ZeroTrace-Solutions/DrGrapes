import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import activityHub from '@/assets/mobile-app/activity-hub.png';
import community from '@/assets/mobile-app/community.png';
import home from '@/assets/mobile-app/home.png';
import questions from '@/assets/mobile-app/questions.png';
import profile from '@/assets/mobile-app/profile.png';

const MobileFrame = ({ children, className = "", bezelSize = "12px", width = "320px", height = "640px" }) => (
  <div 
    style={{ width, height, borderWidth: bezelSize }} 
    className={`bg-surface-container-lowest border-surface-container-highest rounded-[60px] relative shadow-2xl overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-8 bg-surface-container-highest rounded-b-3xl z-20" />
    {children}
  </div>
);

const AppleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.67-1.48 3.671-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
  </svg>
);

const GooglePlayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.26 2.26 0 0 1-.61-1.571V3.385c0-.628.216-1.201.609-1.571zM15.584 13.79l-3.238-3.237L3.61 1.814a2.222 2.222 0 0 1 1.868-.276l13.14 7.509a2.247 2.247 0 0 1 .536 4.743l-3.57 2.01zm3.57-2.01l-13.14 7.509a2.22 2.22 0 0 1-1.868-.276l8.72-8.72 3.238 3.237.05.05 3 1.7a2.247 2.247 0 0 1 0 3.99z"/>
  </svg>
);

const StageMobile = ({ containerRef }) => {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });
  
  // Section visibility based on local scroll progress
  const opacity = useTransform(scrollXProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  // STAGGERED TEXT REVEAL
  const headingOpacity = useTransform(scrollXProgress, [0.25, 0.4], [0, 1]);
  const headingX = useTransform(scrollXProgress, [0.25, 0.4], [50, 0]);

  const textOpacity = useTransform(scrollXProgress, [0.3, 0.45], [0, 1]);
  const textX = useTransform(scrollXProgress, [0.3, 0.45], [50, 0]);

  const buttonsOpacity = useTransform(scrollXProgress, [0.35, 0.5], [0, 1]);
  const buttonsY = useTransform(scrollXProgress, [0.35, 0.5], [30, 0]);

  // Phone animations
  const phoneScale = useTransform(scrollXProgress, [0.2, 0.4], [0.8, 1]);
  const phoneRotate = useTransform(scrollXProgress, [0.2, 0.4], [-10, 0]);

  const wireframes = [
    { img: profile, x: -160, rotate: -15, delay: 0.1 },
    { img: community, x: -80, rotate: -5, delay: 0.2 },
    { img: questions, x: 80, rotate: 5, delay: 0.3 },
    { img: activityHub, x: 160, rotate: 15, delay: 0.4 },
  ];

  return (
    <section ref={targetRef} className="w-screen h-full flex items-center justify-center p-20 bg-transparent shrink-0">
      <motion.div style={{ opacity }} className="max-w-7xl w-full grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative order-2 lg:order-1 flex justify-center items-center h-[700px]">
          <motion.div className="relative w-full h-full flex items-center justify-center group" whileHover="hover">
            {wireframes.map((frame, i) => (
              <motion.div
                key={i}
                variants={{ hover: { x: frame.x * 1.5, opacity: 1, rotate: frame.rotate, scale: 0.9 } }}
                initial={{ x: 0, opacity: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: frame.delay }}
                className="absolute z-10"
              >
                <MobileFrame bezelSize="6px" width="280px" height="560px">
                  <img src={frame.img} className="w-full h-full object-cover" alt="" />
                </MobileFrame>
              </motion.div>
            ))}
            <motion.div style={{ scale: phoneScale, rotate: phoneRotate }} variants={{ hover: { scale: 0.9, y: -20 } }} className="z-20 cursor-pointer">
              <MobileFrame>
                <img src={home} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10" />
              </MobileFrame>
            </motion.div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 group-hover:bg-primary/20 transition-all duration-700" />
          </motion.div>
        </div>
        
        <div className="space-y-10 order-1 lg:order-2">
          <motion.div style={{ opacity: headingOpacity, scale: headingOpacity }} className="inline-block p-4 bg-primary/10 rounded-[24px] border border-primary/20 shadow-[0_0_20px_rgba(255,175,210,0.1)]">
            <Smartphone className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h2 style={{ opacity: headingOpacity, x: headingX }} className="text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            Study <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container">Anywhere.</span>
          </motion.h2>
          <motion.p style={{ opacity: textOpacity, x: textX }} className="text-on-surface-variant text-xl leading-relaxed max-w-lg">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary font-bold">Dr. Grapes</span> app features 10,000+ MCQs, surgical videos, and a dedicated resident community.
          </motion.p>
          <motion.div style={{ opacity: buttonsOpacity, y: buttonsY }} className="flex flex-wrap gap-4 pt-8">
            <div className="relative group">
              <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-primary-container/10 text-primary rounded-[24px] font-bold flex items-center gap-4 border border-primary/20 opacity-80 cursor-not-allowed transition-all">
                <AppleIcon className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-[10px] font-normal leading-none opacity-60">Download on the</div>
                  <div className="text-lg font-bold leading-none mt-1">App Store</div>
                </div>
              </motion.button>
              <div className="absolute -top-3 -right-3 bg-primary-container text-on-primary text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-primary/20 whitespace-nowrap">Coming Soon</div>
            </div>
            <div className="relative group">
              <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-secondary-container/10 text-secondary rounded-[24px] font-bold flex items-center gap-4 border border-secondary/20 opacity-80 cursor-not-allowed transition-all">
                <GooglePlayIcon className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-[10px] font-normal leading-none opacity-60">GET IT ON</div>
                  <div className="text-lg font-bold leading-none mt-1">Google Play</div>
                </div>
              </motion.button>
              <div className="absolute -top-3 -right-3 bg-secondary-container text-on-secondary text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-secondary/20 whitespace-nowrap">Coming Soon</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StageMobile;
