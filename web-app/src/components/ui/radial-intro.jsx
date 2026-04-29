import * as React from 'react';
import { LayoutGroup, motion, useAnimate } from 'framer-motion';

const transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: 'spring',
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: "linear",
  repeat: Infinity,
};

function RadialIntro({
  orbitItems,
  stageSize = 320,
  imageSize = 60,
  onItemClick
}) {
  const step = 360 / orbitItems.length;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const arms = Array.from(root.querySelectorAll('[data-arm]'));
    const imgs = Array.from(root.querySelectorAll('[data-arm-image]'));
    const stops = [];

    // image lift-in
    const liftInTimeout = setTimeout(() => {
      animate(imgs, { top: 0 }, transition);
    }, 250);

    // build sequence for orbit placement
    const orbitPlacementSequence = [
      ...arms.map(el => [
        el,
        { rotate: Number(el.dataset.angle || 0) },
        { ...transition, at: 0 },
      ]),
      ...imgs.map(img => {
        const arm = img.closest('[data-arm]');
        const angle = arm ? Number(arm.dataset.angle || 0) : 0;
        return [
          img,
          { rotate: -angle, opacity: 1 },
          { ...transition, at: 0 }
        ];
      }),
    ];

    // play placement sequence
    const placementTimeout = setTimeout(() => {
      animate(orbitPlacementSequence);
    }, 700);

    // start continuous spin for arms and images
    const spinTimeout = setTimeout(() => {
      arms.forEach((el) => {
        const angle = Number(el.dataset.angle || 0);
        const ctrl = animate(el, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      imgs.forEach((img) => {
        const arm = img.closest('[data-arm]');
        const angle = arm ? Number(arm.dataset.angle || 0) : 0;
        const ctrl = animate(img, { rotate: [-angle, -angle - 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => {
      clearTimeout(liftInTimeout);
      clearTimeout(placementTimeout);
      clearTimeout(spinTimeout);
      stops.forEach((stop) => stop());
    };
  }, [animate, orbitItems.length, scope]);

  return (
    <LayoutGroup>
      <motion.div
        ref={scope}
        className="relative overflow-visible"
        style={{ width: stageSize, height: stageSize }}
      >
        {orbitItems.map((item, i) => {
          const isIcon = typeof item.src !== 'string';
          const Content = isIcon ? item.src : 'img';
          
          return (
            <motion.div
              key={item.id}
              data-arm
              className="absolute inset-0"
              style={{ zIndex: orbitItems.length - i }}
              data-angle={i * step}
            >
              <motion.div
                data-arm-image
                onClick={() => onItemClick?.(item)}
                className="rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-4 hover:ring-primary/20 transition-all active:scale-90"
                style={{
                  width: imageSize,
                  height: imageSize,
                  opacity: i === 0 ? 1 : 0,
                  top: "100%",
                  backgroundColor: isIcon ? "rgba(255, 175, 210, 0.1)" : "white",
                  border: isIcon ? "1px solid rgba(255, 175, 210, 0.2)" : "2px solid rgba(255, 175, 210, 0.1)",
                  padding: isIcon ? "12px" : "0"
                }}
              >
                {isIcon ? (
                  <Content className="w-full h-full text-primary" />
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.name} 
                    className="w-full h-full object-contain" 
                    draggable={false} 
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}

export { RadialIntro };
