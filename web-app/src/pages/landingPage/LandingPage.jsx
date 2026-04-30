import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Components
import SEO from '@/components/SEO';
import FloatingIcons from '@/components/landingPage/FloatingIcons';
import StageIndicator from '@/components/landingPage/StageIndicator';
import StageIntro from '@/components/landingPage/StageIntro';
import StageDiscovery from '@/components/landingPage/StageDiscovery';
import StageMobile from '@/components/landingPage/StageMobile';
import StageMission from '@/components/landingPage/StageMission';
import { AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef,
    axis: "x",
  });

  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const [isLocked, setIsLocked] = useState(false);
  const lockRef = useRef(null);

  // Sync currentScroll with actual scroll position on language change
  useEffect(() => {
    if (scrollRef.current) {
      targetScroll.current = 0;
      currentScroll.current = 0;
      scrollRef.current.scrollLeft = 0;
    }
  }, [isRTL]);

  useEffect(() => {
    let animationFrame;
    const smoothUpdate = () => {
      if (scrollRef.current) {
        currentScroll.current += (targetScroll.current - currentScroll.current) * 0.15;
        // In modern browsers, RTL scrollLeft is 0 at right and negative to the left
        scrollRef.current.scrollLeft = isRTL ? -currentScroll.current : currentScroll.current;
      }
      animationFrame = requestAnimationFrame(smoothUpdate);
    };
    animationFrame = requestAnimationFrame(smoothUpdate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isRTL]);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      if (isLocked && lockRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = lockRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const isAtTop = scrollTop <= 5;

        if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
          lockRef.current.scrollTop += e.deltaY;
          return;
        }
        setIsLocked(false);
      }

      const sensitivity = 1.2;
      const scrollMax = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      
      targetScroll.current = Math.max(0, Math.min(
        targetScroll.current + e.deltaY * sensitivity,
        scrollMax
      ));
    }
  };

  const scrollToStage = (index) => {
    if (scrollRef.current) {
      targetScroll.current = index * scrollRef.current.clientWidth;
      setIsLocked(false);
    }
  };

  // TOUCH HANDLERS FOR MOBILE
  const lastTouchY = useRef(0);
  const handleTouchStart = (e) => {
    lastTouchY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!scrollRef.current) return;

    const touchY = e.touches[0].clientY;
    const deltaY = lastTouchY.current - touchY;
    lastTouchY.current = touchY;

    handleWheel({
      deltaY: deltaY * 1.8,
      isTouch: true,
      stopPropagation: () => { },
      preventDefault: () => { }
    });
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative bg-background text-on-surface overflow-hidden font-sans selection:bg-primary/30 h-screen w-screen touch-none"
    >
      <SEO 
        title={t('seo.landing.title', 'Home')}
        description={t('seo.landing.description', 'Welcome to Dr. Grapes - The ultimate medical student companion.')}
        keywords={t('seo.landing.keywords', 'medical students, dr grapes, medical tools, medical education')}
      />
      {/* Global Background Layer */}
      <div className="fixed inset-0 bg-[#0c0f0f] z-[-10]" />

      {/* Atmospheric Storytelling Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dynamic primary glow (Magenta) */}
        <motion.div
          style={{
            x: useTransform(scrollXProgress, [0, 1], isRTL ? ['15%', '-40%'] : ['-15%', '40%']),
            y: useTransform(scrollXProgress, [0, 1], ['-10%', '20%']),
          }}
          className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-primary/10 blur-[180px] rounded-full"
        />
        {/* Dynamic secondary glow (Blue) */}
        <motion.div
          style={{
            x: useTransform(scrollXProgress, [0, 1], isRTL ? ['-30%', '30%'] : ['30%', '-30%']),
            y: useTransform(scrollXProgress, [0, 1], ['40%', '70%']),
          }}
          className="absolute top-[30%] -right-[20%] w-[90%] h-[90%] bg-secondary/10 blur-[180px] rounded-full"
        />
        <motion.div
          style={{ opacity: useTransform(scrollXProgress, [0, 0.5, 1], [0.08, 0.15, 0.08]) }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,175,210,0.12),transparent_70%)]"
        />
        {/* Noise Grain Overlay for Premium Feel */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Floating UI reacts to horizontal scroll now */}
      <FloatingIcons
        scrollYProgress={scrollXProgress}
        scrollRef={scrollRef}
        onNavigate={scrollToStage}
      />
      <div className="fixed bottom-0 left-0 right-0 z-[1000] pointer-events-none">
        <div className="pointer-events-auto">
          <StageIndicator
            scrollYProgress={scrollXProgress}
            onStageClick={scrollToStage}
          />
        </div>
      </div>

      {/* Edge Blur Vignette */}
      <div className="fixed inset-y-0 left-0 w-8 md:w-24 z-[200] pointer-events-none backdrop-blur-[4px] md:backdrop-blur-[20px] [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="fixed inset-y-0 right-0 w-8 md:w-24 z-[200] pointer-events-none backdrop-blur-[4px] md:backdrop-blur-[20px] [mask-image:linear-gradient(to_left,black,transparent)]" />

      {/* Edge Dark Vignette for 'swallowing' effect */}
      <div className="fixed inset-y-0 left-0 w-8 md:w-24 z-[150] pointer-events-none bg-gradient-to-r from-[#0c0f0f] to-transparent opacity-20 md:opacity-40" />
      <div className="fixed inset-y-0 right-0 w-8 md:w-24 z-[150] pointer-events-none bg-gradient-to-l from-[#0c0f0f] to-transparent opacity-20 md:opacity-40" />

      {/* NATIVE HORIZONTAL SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden flex no-scrollbar"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageIntro scrollXProgress={scrollXProgress} onNavigate={scrollToStage} />
        </div>
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageDiscovery
            scrollXProgress={scrollXProgress}
          />
        </div>
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageMobile scrollXProgress={scrollXProgress} />
        </div>
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageMission 
            scrollXProgress={scrollXProgress} 
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
