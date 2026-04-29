import React from 'react';
import { motion } from 'framer-motion';
import { RadialIntro } from '@/components/ui/radial-intro';
import grapesIcon from '@/assets/dr-grapes-icon.png';
import { Info, ShoppingCart, Smartphone, User } from 'lucide-react';

const ITEMS = [
  {
    id: 0,
    name: 'Home',
    src: grapesIcon,
    type: 'internal',
    screen: 0
  },
  {
    id: 1,
    name: 'Market',
    src: ShoppingCart,
    type: 'soon',
    label: 'Marketplace'
  },
  {
    id: 2,
    name: 'App',
    src: Smartphone,
    type: 'internal',
    screen: 2 // StageMobile
  },
  {
    id: 3,
    name: 'Login',
    src: User,
    type: 'soon',
    label: 'User Portal'
  },
  {
    id: 4,
    name: 'Contact',
    src: Info,
    type: 'internal',
    screen: 3 // StageMission
  }
];

const FloatingIcons = ({ scrollRef }) => {
  const handleItemClick = (item) => {
    if (item.type === 'internal' && scrollRef?.current) {
      const viewportWidth = window.innerWidth;
      scrollRef.current.scrollTo({
        left: item.screen * viewportWidth,
        behavior: 'smooth'
      });
    } else if (item.type === 'soon') {
      alert(`${item.label} is coming soon! Stay tuned.`);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[100] p-10 pointer-events-none">
      <div className="relative flex items-center justify-center pointer-events-auto">
        <RadialIntro 
          orbitItems={ITEMS} 
          stageSize={350} 
          imageSize={55} 
          onItemClick={handleItemClick}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 whitespace-nowrap"
        >
          Ecosystem Hub
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingIcons;
