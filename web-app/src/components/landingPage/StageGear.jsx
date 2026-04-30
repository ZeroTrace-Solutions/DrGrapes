import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import eliteStethoscope from '@/assets/elite_stethoscope.png';
import anatomyAtlas from '@/assets/anatomy_atlas.png';
import reflexHammer from '@/assets/reflex_hammer_set.png';

import { useTranslation } from 'react-i18next';

const StageGear = ({ containerRef }) => {
  const { t } = useTranslation('landingPage');
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollXProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollXProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const x = useTransform(scrollXProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const products = [
    { name: t('gear.products.stethoscope'), price: "249", img: eliteStethoscope, color: "from-secondary/30" },
    { name: t('gear.products.atlas'), price: "120", img: anatomyAtlas, color: "from-primary/30" },
    { name: t('gear.products.kit'), price: "85", img: reflexHammer, color: "from-secondary-container/30" }
  ];

  return (
    <section ref={targetRef} className="w-screen h-full flex items-center justify-start p-20 bg-transparent shrink-0">
      <motion.div style={{ opacity, x }} className="flex gap-12 pl-20">
        <div className="w-[400px] flex flex-col justify-center space-y-6">
          <h2 className="text-7xl font-black uppercase leading-[0.9] tracking-tighter">
            {t('gear.titleLine1')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">{t('gear.titleLine2')}</span> <br/>
            {t('gear.titleLine3')}
          </h2>
          <p className="text-on-surface-variant text-body-md">{t('gear.subtitle')}</p>
          <div className="flex gap-2">
            <div className="w-12 h-2 bg-primary-container rounded-full shadow-[0_0_10px_rgba(193,53,132,0.4)]" />
            <div className="w-4 h-2 bg-secondary-container/30 rounded-full" />
            <div className="w-4 h-2 bg-secondary-container/30 rounded-full" />
          </div>
        </div>
        
        <div className="flex gap-8">
          {products.map((product, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -20, scale: 1.02 }}
              style={{ y: useTransform(scrollXProgress, [0.2 + (i * 0.1), 0.4 + (i * 0.1)], [100, 0]) }}
              className="w-[350px] h-[500px] bg-surface-container border border-outline-variant/30 rounded-[32px] p-8 relative overflow-hidden group shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} to-transparent opacity-20 group-hover:opacity-40 transition-all duration-500`} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight">{product.name}</h3>
                  <p className="text-primary font-black text-3xl tracking-tighter drop-shadow-sm">${product.price}</p>
                </div>
                <img src={product.img} className="w-full h-48 object-contain my-8 drop-shadow-2xl transition-transform group-hover:scale-110 duration-500" alt="" />
                <button className="w-full py-4 bg-primary-container text-on-primary hover:bg-primary rounded-2xl transition-all font-black flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20">
                  {t('gear.viewGear')} <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StageGear;
