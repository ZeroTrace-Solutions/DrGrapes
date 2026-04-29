import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Components
import FloatingIcons from '@/components/landingPage/FloatingIcons';
import StageIndicator from '@/components/landingPage/StageIndicator';
import StageIntro from '@/components/landingPage/StageIntro';
import StageDiscovery from '@/components/landingPage/StageDiscovery';
import StageGear from '@/components/landingPage/StageGear';
import StageMobile from '@/components/landingPage/StageMobile';
import StageMission from '@/components/landingPage/StageMission';

const LandingPage = () => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef,
    axis: "x",
  });

  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const [isLocked, setIsLocked] = useState(false);
  const lockRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    const smoothUpdate = () => {
      if (scrollRef.current) {
        currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1;
        scrollRef.current.scrollLeft = currentScroll.current;
      }
      animationFrame = requestAnimationFrame(smoothUpdate);
    };
    animationFrame = requestAnimationFrame(smoothUpdate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      if (isLocked && lockRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = lockRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const isAtTop = scrollTop <= 5;

        // If scrolling down and not at bottom, or scrolling up and not at top, lock it
        if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
          lockRef.current.scrollTop += e.deltaY;
          return;
        }
        
        // Otherwise, release the lock if we're moving past the boundaries
        setIsLocked(false);
      }

      // Update target scroll position with reduced sensitivity
      targetScroll.current = Math.max(0, Math.min(
        targetScroll.current + e.deltaY * 0.6,
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
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

    // Simulate wheel event for touch
    handleWheel({ deltaY: deltaY * 2, stopPropagation: () => {} });
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative bg-background text-on-surface overflow-hidden font-sans selection:bg-primary/30 h-screen w-screen touch-none"
    >
      {/* Global Background Layer */}
      <div className="fixed inset-0 bg-[#0c0f0f] z-[-10]" />

      {/* Atmospheric Storytelling Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dynamic primary glow (Magenta) */}
        <motion.div
          style={{
            x: useTransform(scrollXProgress, [0, 1], ['-15%', '40%']),
            y: useTransform(scrollXProgress, [0, 1], ['-10%', '20%']),
          }}
          className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-primary/10 blur-[180px] rounded-full"
        />
        {/* Dynamic secondary glow (Blue) */}
        <motion.div
          style={{
            x: useTransform(scrollXProgress, [0, 1], ['30%', '-30%']),
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
      <StageIndicator 
        scrollYProgress={scrollXProgress} 
        onStageClick={scrollToStage} 
      />

      {/* Edge Blur Vignette */}
      <div className="fixed inset-y-0 left-0 w-8 md:w-24 z-[200] pointer-events-none backdrop-blur-[4px] md:backdrop-blur-[20px] [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="fixed inset-y-0 right-0 w-8 md:w-24 z-[200] pointer-events-none backdrop-blur-[4px] md:backdrop-blur-[20px] [mask-image:linear-gradient(to_left,black,transparent)]" />
      
      {/* Edge Dark Vignette for 'swallowing' effect */}
      <div className="fixed inset-y-0 left-0 w-8 md:w-24 z-[150] pointer-events-none bg-gradient-to-r from-[#0c0f0f] to-transparent opacity-20 md:opacity-40" />
      <div className="fixed inset-y-0 right-0 w-8 md:w-24 z-[150] pointer-events-none bg-gradient-to-l from-[#0c0f0f] to-transparent opacity-20 md:opacity-40" />

      {/* NATIVE HORIZONTAL SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden flex no-scrollbar"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageIntro scrollYProgress={scrollXProgress} onNavigate={scrollToStage} />
        </div>
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageDiscovery 
            containerRef={scrollRef} 
            setIsLocked={setIsLocked} 
            lockRef={lockRef} 
            isPageLocked={isLocked}
          />
        </div>
        {/* <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageGear containerRef={scrollRef} />
        </div> */}
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageMobile containerRef={scrollRef} />
        </div>
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageMission containerRef={scrollRef} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
