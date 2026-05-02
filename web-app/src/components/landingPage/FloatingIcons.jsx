import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { RadialIntro } from '@/components/ui/radial-intro';
import grapesIcon from '@/assets/dr-grapes-icon.png';
import { Info, ShoppingCart, Smartphone, User, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FloatingIcons = ({ onNavigate }) => {
  const { t, i18n } = useTranslation('landingPage');
  const [hoveredName, setHoveredName] = useState(null);
  const navigate = useNavigate();

  const ITEMS = [
    {
      id: 0,
      name: t('common.hub.items.home'),
      src: grapesIcon,
      type: 'internal',
      screen: 0
    },
    {
      id: 1,
      name: t('common.hub.items.market'),
      src: ShoppingCart,
      type: 'soon',
      label: t('common.hub.items.market')
    },
    {
      id: 2,
      name: t('common.hub.items.app'),
      src: Smartphone,
      type: 'internal',
      screen: 2 // StageMobile
    },
    {
      id: 3,
      name: i18n.language === 'en' ? 'العربية' : 'English',
      src: Languages,
      type: 'language'
    },
    {
      id: 4,
      name: t('common.hub.items.login'),
      src: User,
      type: 'route',
      path: '/login'
    },
    {
      id: 5,
      name: t('common.hub.items.contact'),
      src: Info,
      type: 'internal',
      screen: 3 // StageMission
    }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'internal' && onNavigate) {
      onNavigate(item.screen);
    } else if (item.type === 'route') {
      navigate(item.path);
    } else if (item.type === 'language') {
      const newLang = i18n.language === 'en' ? 'ar' : 'en';
      i18n.changeLanguage(newLang);
    } else if (item.type === 'soon') {
      toast.info(t('common.hub.toastTitle', { label: item.label }), {
        description: t('common.hub.toastDesc'),
        duration: 3000,
      });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Desktop Hub */}
      {!isMobile && (
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
              className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 whitespace-nowrap flex flex-col items-end"
            >
              <motion.span
                key={hoveredName || 'default'}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary text-xs mb-1"
              >
                {hoveredName}
              </motion.span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Mobile Standalone Language Toggle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="md:hidden fixed top-6 right-6 z-[200]"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => i18n.changeLanguage(i18n.language.startsWith('en') ? 'ar' : 'en')}
          aria-label={i18n.language.startsWith('en') ? 'Switch to Arabic' : 'Switch to English'}
          className="w-14 h-14 rounded-full glass flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,175,210,0.2)] border border-primary/30 text-primary active:bg-primary/10 transition-colors"
        >
          <Languages className="w-5 h-5 mb-0.5" />
          <span className={`font-black uppercase tracking-tighter ${i18n.language.startsWith('en') ? 'text-xs' : 'text-[8px]'}`}>
            {i18n.language.startsWith('en') ? 'ع' : 'EN'}
          </span>
        </motion.button>
      </motion.div>
    </>
  );
};

export default FloatingIcons;
