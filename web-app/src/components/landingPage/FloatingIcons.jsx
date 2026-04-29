import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
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

const FloatingIcons = ({ onNavigate }) => {
  const [hoveredName, setHoveredName] = useState(null);

  const handleItemClick = (item) => {
    if (item.type === 'internal' && onNavigate) {
      onNavigate(item.screen);
    } else if (item.type === 'soon') {
      toast.info(`${item.label} Coming Soon`, {
        description: "We are currently perfecting this module for the next generation of healers.",
        duration: 3000,
      });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="hidden md:block fixed bottom-0 right-0 z-[100] p-4 md:p-10 pointer-events-none">
      <div className="relative flex items-center justify-center pointer-events-auto scale-75 md:scale-100 origin-bottom-right">
        <RadialIntro 
          orbitItems={ITEMS} 
          stageSize={isMobile ? 280 : 350} 
          imageSize={isMobile ? 45 : 55} 
          onItemClick={handleItemClick}
          onItemHover={(item) => setHoveredName(item.name)}
          onItemHoverEnd={() => setHoveredName(null)}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 whitespace-nowrap flex flex-col items-end"
        >
          <motion.span
            key={hoveredName || 'default'}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary text-xs mb-1"
          >
            {hoveredName}
          </motion.span>
          <span className="opacity-50">Ecosystem Hub</span>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingIcons;
