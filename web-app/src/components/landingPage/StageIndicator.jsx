import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';

const StageItem = ({ stage, i, total, scrollProgress }) => {
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
    <motion.span style={{ opacity, color }} className="text-[10px] font-bold tracking-widest uppercase">
      {stage}
    </motion.span>
  );
};

const StageIndicator = ({ scrollYProgress }) => {
  const stages = ['Intro', 'Discovery', 'Mobile', 'Mission'];

  // Refined width calculation: spring the numeric value, then convert to %
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const springWidth = useSpring(progressPercent, { stiffness: 100, damping: 30 });
  const width = useTransform(springWidth, (val) => `${val}%`);

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-8">
      <div className="relative h-1.5 bg-surface-container rounded-full overflow-hidden backdrop-blur-md border border-outline/10">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-primary-container via-primary to-secondary-container shadow-[0_0_15px_rgba(193,53,132,0.5)]"
          style={{ width }}
        />
      </div>
      <div className="flex justify-between mt-4 px-2">
        {stages.map((stage, i) => (
          <StageItem
            key={stage}
            stage={stage}
            i={i}
            total={stages.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default StageIndicator;
