import React, { useRef } from 'react';
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

  const handleWheel = (e) => {
    if (scrollRef.current) {
      // Redirect vertical scroll to horizontal
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="relative bg-background text-on-surface overflow-hidden font-sans selection:bg-primary/30 h-screen w-screen"
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
      <FloatingIcons scrollYProgress={scrollXProgress} scrollRef={scrollRef} />
      <StageIndicator scrollYProgress={scrollXProgress} />

      {/* NATIVE HORIZONTAL SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="relative z-10 h-full w-full overflow-x-auto overflow-y-hidden flex no-scrollbar"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageIntro scrollYProgress={scrollXProgress} />
        </div>
        <div className="flex-shrink-0 w-screen h-full overflow-hidden">
          <StageDiscovery containerRef={scrollRef} />
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
