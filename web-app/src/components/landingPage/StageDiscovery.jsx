import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, ShoppingBag, Users, Map, ArrowRight } from 'lucide-react';
import BlurText from '../ui/BlurText';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

const DiscoveryCard = ({ feat, i, scrollXProgress }) => {
  // Individual card scroll entrance
  const opacity = useTransform(scrollXProgress, [0.1 + (i * 0.05), 0.3 + (i * 0.05)], [0, 1]);
  const y = useTransform(scrollXProgress, [0.1 + (i * 0.05), 0.3 + (i * 0.05)], [40, 0]);
  const scale = useTransform(scrollXProgress, [0.1 + (i * 0.05), 0.3 + (i * 0.05)], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative group overflow-hidden rounded-[32px] border border-outline-variant/20 p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:border-primary/50 ${feat.className}`}
    >
      {/* Background Accent */}
      <div className={`absolute -right-16 -bottom-16 w-48 h-48 blur-[60px] rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${feat.accent}`} />

      <div className="space-y-4 relative z-10">
        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border shadow-lg transition-transform duration-500 group-hover:rotate-6 ${feat.iconBg}`}>
          <feat.icon className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight leading-tight">{feat.title}</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
            {feat.desc}
          </p>
        </div>
      </div>

      {/* <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
        Explore <ArrowRight className="w-3 h-3" />
      </div> */}

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </motion.div>
  );
};

const StageDiscovery = ({ containerRef, setIsLocked, lockRef, isPageLocked }) => {
  const targetRef = useRef(null);
  
  // Local effect to catch the "fully on screen" moment
  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isPageLocked) return;
      
      const scrollLeft = containerRef.current.scrollLeft;
      const viewportWidth = containerRef.current.clientWidth;
      const targetPos = viewportWidth; // Discovery is at index 1
      
      // If we've reached the stage exactly, lock it
      if (Math.abs(scrollLeft - targetPos) < 10) {
        setIsLocked(true);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [containerRef, isPageLocked, setIsLocked]);

  const { scrollXProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const features = [
    {
      title: "Q-Bank Excellence",
      icon: BookOpen,
      desc: "Vast question banks tailored for every medical exam with high-yield explanations.",
      className: "col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-surface-container-high",
      iconBg: "text-primary bg-primary/10 border-primary/20",
      accent: "bg-primary"
    },
    {
      title: "24/7 Shop",
      icon: ShoppingBag,
      desc: "Premium medical equipment at the best costs.",
      className: "col-span-1 row-span-1 bg-surface-container",
      iconBg: "text-secondary bg-secondary/10 border-secondary/20",
      accent: "bg-secondary"
    },
    {
      title: "Relocation",
      icon: Map,
      desc: "Your roadmap to global medical practice.",
      className: "col-span-1 row-span-1 bg-surface-container",
      iconBg: "text-primary bg-primary/10 border-primary/20",
      accent: "bg-primary"
    },
    {
      title: "Global Community",
      icon: Users,
      desc: "Connect, share experience, and train together.",
      className: "col-span-1 md:col-span-2 row-span-1 bg-surface-container-highest",
      iconBg: "text-secondary bg-secondary/10 border-secondary/20",
      accent: "bg-secondary"
    }
  ];

  return (
    <section ref={targetRef} className="w-screen h-full flex flex-col items-center justify-center p-6 md:p-20 bg-transparent space-y-8 md:space-y-12">
      <motion.div
        style={{
          opacity: useTransform(scrollXProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]),
          y: useTransform(scrollXProgress, [0, 0.15], [20, 0])
        }}
        className="text-center space-y-3"
      >
        <div className="flex flex-col items-center">
          <BlurText
            text="Complete"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter -mt-1 md:-mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Ecosystem</span>
          </h2>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-on-surface-variant text-sm md:text-lg max-w-xs md:max-w-none"
        >
          Everything a medical student needs to excel.
        </motion.p>
      </motion.div>

      <div 
        className="block md:hidden w-full h-[60vh] touch-pan-y pointer-events-auto"
        onWheel={(e) => {
          // If we are not locked yet, let it bubble so we can reach the stage
          if (!isPageLocked) return;
          e.stopPropagation();
        }}
      >
        <ScrollStack 
          itemDistance={50} 
          stackPosition="15%" 
          itemScale={0.05}
          className="h-full"
          onStackComplete={() => {
            // Optional: could auto-unlock here, but LandingPage handleWheel 
            // already handles boundary release
          }}
          // Pass the lock ref to the actual scroller
          ref={lockRef}
        >
          {features.map((feat, i) => (
            <ScrollStackItem key={i} itemClassName={feat.className + " !my-4 !h-auto !min-h-[200px] !p-6"}>
              <div className="space-y-4 relative z-10">
                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center border shadow-lg ${feat.iconBg}`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tight leading-tight">{feat.title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed opacity-70">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid max-w-6xl w-full grid-cols-4 gap-5 pr-2">
        {features.map((feat, i) => (
          <DiscoveryCard key={i} feat={feat} i={i} scrollXProgress={scrollXProgress} />
        ))}
      </div>
    </section>
  );
};

export default StageDiscovery;
