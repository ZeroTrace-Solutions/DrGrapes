import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import activityHub from '@/assets/mobile-app/activity-hub.png';
import community from '@/assets/mobile-app/community.png';
import home from '@/assets/mobile-app/home.png';
import questions from '@/assets/mobile-app/questions.png';
import profile from '@/assets/mobile-app/profile.png';
import appleImg from '@/assets/apple.png';
import googlePlayImg from '@/assets/google-play.png';
import { useTranslation } from 'react-i18next';

const MobileFrame = ({ children, className = "", bezelSize = "12px", width = "320px", height = "640px" }) => (
  <div
    style={{ width, height, borderWidth: bezelSize }}
    className={`bg-surface-container-lowest border-surface-container-highest rounded-[60px] relative shadow-2xl overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-8 bg-surface-container-highest rounded-b-3xl z-20" />
    {children}
  </div>
);




const StageMobile = ({ scrollXProgress }) => {
  const { t } = useTranslation('landingPage');

  // Create local progress (Stage 2 of 4: range [0.5, 0.75])
  const localProgress = useTransform(scrollXProgress, [0.5, 0.75], [0, 1]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Section visibility based on local scroll progress
  const opacity = useTransform(localProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  // STAGGERED TEXT REVEAL
  const headingOpacity = useTransform(localProgress, [0.25, 0.4], [0, 1]);
  const headingX = useTransform(localProgress, [0.25, 0.4], [isMobile ? 0 : 50, 0]);
  const headingY = useTransform(localProgress, [0.25, 0.4], [isMobile ? 20 : 0, 0]);

  const textOpacity = useTransform(localProgress, [0.3, 0.45], [0, 1]);
  const textX = useTransform(localProgress, [0.3, 0.45], [isMobile ? 0 : 50, 0]);
  const textY = useTransform(localProgress, [0.3, 0.45], [isMobile ? 20 : 0, 0]);

  const buttonsOpacity = useTransform(localProgress, [0.35, 0.5], [0, 1]);
  const buttonsY = useTransform(localProgress, [0.35, 0.5], [30, 0]);

  // Phone animations - Fan out automatically on scroll
  const fanProgress = useTransform(localProgress, [0.2, 0.5], [0, 1]);
  const phoneScale = useTransform(localProgress, [0.2, 0.4], [0.8, 1]);
  const phoneRotate = useTransform(localProgress, [0.2, 0.4], [-10, 0]);

  const wireframes = [
    { img: profile, x: -160, rotate: -15, mobileX: -100, mobileRotate: -12 },
    { img: community, x: -80, rotate: -5, mobileX: -50, mobileRotate: -6 },
    { img: questions, x: 80, rotate: 5, mobileX: 50, mobileRotate: 6 },
    { img: activityHub, x: 160, rotate: 15, mobileX: 100, mobileRotate: 12 },
  ];

  return (
    <section className="w-screen h-full flex items-center justify-center p-6 md:p-20 bg-transparent shrink-0">
      <motion.div style={{ opacity }} className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
        {/* Phones Area */}
        <div className="relative order-2 lg:order-1 flex justify-center items-center h-[350px] md:h-[700px] mt-8 lg:mt-0">
          <motion.div className="relative w-full h-full flex items-center justify-center group">
            {wireframes.map((frame, i) => (
              <motion.div
                key={i}
                style={{
                  x: useTransform(fanProgress, [0, 1], [0, isMobile ? frame.mobileX : frame.x]),
                  rotate: useTransform(fanProgress, [0, 1], [0, isMobile ? frame.mobileRotate : frame.rotate]),
                  opacity: useTransform(fanProgress, [0, 0.2], [0, 0.7]),
                  scale: isMobile ? 0.6 : 0.9
                }}
                className="absolute z-10"
              >
                <MobileFrame bezelSize="6px" width={isMobile ? "220px" : "280px"} height={isMobile ? "440px" : "560px"}>
                  <img src={frame.img} className="w-full h-full object-cover" alt="" />
                </MobileFrame>
              </motion.div>
            ))}

            <motion.div
              style={{ scale: phoneScale, rotate: phoneRotate }}
              className="z-20 cursor-pointer"
              role="img"
              aria-label="Interactive mobile phone showing Dr. Grapes app home screen"
            >
              <MobileFrame width={isMobile ? "240px" : "320px"} height={isMobile ? "480px" : "640px"}>
                <img src={home} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10" />
              </MobileFrame>
            </motion.div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full -z-10" />
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="space-y-6 md:space-y-10 order-1 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div style={{ opacity: headingOpacity, scale: headingOpacity }} className="inline-block p-3 md:p-4 bg-primary/10 rounded-[24px] border border-primary/20 shadow-[0_0_20px_rgba(255,175,210,0.12)]">
            <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              style={{ opacity: headingOpacity, x: headingX, y: headingY }}
              className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]"
            >
              <motion.span
                className="block"
                style={{
                  y: useTransform(localProgress, [0.25, 0.35], [50, 0]),
                  opacity: useTransform(localProgress, [0.25, 0.35], [0, 1])
                }}
              >
                {t('mobile.titleLine1')}
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container mt-2"
                style={{
                  y: useTransform(localProgress, [0.3, 0.4], [50, 0]),
                  opacity: useTransform(localProgress, [0.3, 0.4], [0, 1])
                }}
              >
                {t('mobile.titleLine2')}
              </motion.span>
            </motion.h2>
          </div>

          <motion.p style={{ opacity: textOpacity, x: textX, y: textY }} className="text-on-surface-variant text-start text-sm md:text-xl leading-relaxed max-w-lg opacity-90">
            {t('mobile.description')}
          </motion.p>

          <motion.div style={{ opacity: buttonsOpacity, y: buttonsY }} className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-8 w-full sm:w-auto px-4 md:px-0">
            <div className="relative group w-full sm:w-auto">
              <motion.button 
                aria-label={`Download Dr. Grapes on the Apple App Store - ${t('intro.comingSoon')}`}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary-container/10 text-primary rounded-[20px] md:rounded-[24px] font-bold flex items-center justify-center gap-3 md:gap-4 border border-primary/20 opacity-80 cursor-not-allowed"
              >
                <img src={appleImg} className="w-6 h-6 md:w-8 md:h-8 object-contain" alt="Apple" />
                <div className="text-left">
                  <div className="text-[8px] md:text-[10px] font-normal leading-none opacity-60 uppercase">Download on the</div>
                  <div className="text-base md:text-lg font-bold leading-none mt-1">{t('mobile.appStore')}</div>
                </div>
              </motion.button>
              <div className="absolute -top-2 -right-2 bg-primary-container text-on-primary text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-primary/20 whitespace-nowrap">{t('intro.comingSoon')}</div>
            </div>
            <div className="relative group w-full sm:w-auto">
              <motion.button 
                aria-label={`Get Dr. Grapes on Google Play - ${t('intro.comingSoon')}`}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-secondary-container/10 text-secondary rounded-[20px] md:rounded-[24px] font-bold flex items-center justify-center gap-3 md:gap-4 border border-secondary/20 opacity-80 cursor-not-allowed"
              >
                <img src={googlePlayImg} className="w-6 h-6 md:w-8 md:h-8 object-contain" alt="Google Play" />
                <div className="text-left">
                  <div className="text-[8px] md:text-[10px] font-normal leading-none opacity-60 uppercase">GET IT ON</div>
                  <div className="text-base md:text-lg font-bold leading-none mt-1">{t('mobile.googlePlay')}</div>
                </div>
              </motion.button>
              <div className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-secondary/20 whitespace-nowrap">{t('intro.comingSoon')}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StageMobile;
