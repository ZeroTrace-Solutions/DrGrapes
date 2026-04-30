import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import logo from '@/assets/dr-grapes-icon.png';
import ztLogo from '@/assets/zt-solutions-icon.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);


const StageMission = ({ scrollXProgress }) => {
  const { t, i18n } = useTranslation('landingPage');
  const navigate = useNavigate();

  // Create local progress (Stage 3 of 4: range [0.75, 1.0])
  const localProgress = useTransform(scrollXProgress, [0.75, 1.0], [0, 1]);

  // Main visibility: Completes early since this is the final stage
  const opacity = useTransform(localProgress, [0.05, 0.25], [0, 1]);

  const opacityLeft = useTransform(localProgress, [0.1, 0.3], [0, 1]);
  const xLeft = useTransform(localProgress, [0.1, 0.3], [-50, 0]);

  const opacityMid = useTransform(localProgress, [0.15, 0.35], [0, 1]);
  const yMid = useTransform(localProgress, [0.15, 0.35], [50, 0]);

  const opacityRight = useTransform(localProgress, [0.2, 0.4], [0, 1]);
  const xRight = useTransform(localProgress, [0.2, 0.4], [50, 0]);

  const socialLinks = [
    { icon: InstagramIcon, label: t('mission.socials.instagram'), href: "#" },
    { icon: FacebookIcon, label: t('mission.socials.facebook'), href: "#" },
    { icon: Mail, label: t('mission.socials.email'), href: "mailto:support@drgrapes.com" },
  ];

  const legalItems = [
    { id: 'terms', icon: ShieldCheck, label: t('mission.legalItems.terms'), color: "text-secondary" },
    { id: 'privacy', icon: FileText, label: t('mission.legalItems.privacy'), color: "text-secondary" }
  ];

  return (
    <section className="w-screen h-full flex items-center justify-center p-4 md:p-20 bg-transparent relative overflow-hidden shrink-0">
      <motion.div style={{ opacity }} className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center overflow-y-auto md:overflow-visible no-scrollbar pr-1 py-8 md:py-0">

        {/* LEFT SECTION */}
        <motion.div style={{ opacity: opacityLeft, x: xLeft }} className="lg:col-span-5 space-y-6 md:space-y-12 text-center lg:text-left">
          <motion.div
            style={{
              opacity: useTransform(localProgress, [0.15, 0.3], [0, 1]),
              y: useTransform(localProgress, [0.15, 0.3], [20, 0])
            }}
            className="flex flex-col lg:flex-row items-center gap-3 md:gap-4"
          >
            <img src={logo} alt="Dr. Grapes" className="w-auto h-8 md:h-12" />
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">{t('mission.title')}</h2>
          </motion.div>
          <div className="space-y-4 md:space-y-6">
            <motion.p
              style={{
                opacity: useTransform(localProgress, [0.2, 0.35], [0, 1]),
                y: useTransform(localProgress, [0.2, 0.35], [20, 0])
              }}
              className="text-on-surface-variant text-start text-sm md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 opacity-80"
            >
              {t('mission.description')}
            </motion.p>
            <div className="pt-2 md:pt-8">
              <motion.h3
                style={{
                  opacity: useTransform(localProgress, [0.25, 0.4], [0, 1]),
                  scale: useTransform(localProgress, [0.25, 0.4], [0.8, 1]),
                  fontFamily: i18n.language === 'ar' ? "'Marhey', cursive" : "'Dancing Script', cursive"
                }}
                className="text-5xl md:text-8xl text-start text-white font-normal leading-none"
              >
                {t('mission.title')}
              </motion.h3>
            </div>
          </div>
        </motion.div>

        {/* MIDDLE SECTION */}
        <motion.div style={{ opacity: opacityMid, y: yMid }} className="lg:col-span-4 space-y-4 md:space-y-10 flex flex-col items-center lg:items-start">
          <motion.h4
            style={{
              opacity: useTransform(localProgress, [0.2, 0.3], [0, 1]),
              y: useTransform(localProgress, [0.2, 0.3], [-10, 0])
            }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary/60"
          >
            {t('mission.connect')}
          </motion.h4>
          <div className="flex flex-row lg:flex-col justify-center lg:justify-start gap-3 md:gap-4 w-full">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                style={{
                  opacity: useTransform(localProgress, [0.2 + (i * 0.05), 0.35 + (i * 0.05)], [0, 1]),
                  scale: useTransform(localProgress, [0.2 + (i * 0.05), 0.35 + (i * 0.05)], [0.8, 1])
                }}
                whileHover={{ scale: 1.05, x: 10, color: "var(--primary)" }}
                className="flex items-center gap-4 p-3 md:p-4 rounded-xl md:rounded-3xl bg-white/5 border border-white/5 text-on-surface/60 transition-all hover:bg-primary/5 w-auto lg:w-full"
              >
                <link.icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden lg:block text-sm font-bold uppercase tracking-widest">{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* DEVELOPED BY - Desktop Only (Middle) */}
          <div className="hidden md:flex pt-6 md:pt-10 flex-col items-center lg:items-start space-y-4">
            <motion.p
              style={{
                opacity: useTransform(localProgress, [0.35, 0.45], [0, 0.4]),
                y: useTransform(localProgress, [0.35, 0.45], [10, 0])
              }}
              className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white"
            >
              {t('mission.developedBy')}
            </motion.p>
            <motion.div
              style={{
                opacity: useTransform(localProgress, [0.4, 0.5], [0, 1]),
                scale: useTransform(localProgress, [0.4, 0.5], [0.9, 1])
              }}
              dir='ltr'
              className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
              onClick={() => window.open('https://portal.ztsolutions.tech', '_blank')}
            >
              <img src={ztLogo} alt="ZeroTrace Solutions" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-black tracking-tighter uppercase leading-none">ZT</span>
                <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase leading-none opacity-50">Solutions</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div style={{ opacity: opacityRight, x: xRight }} className="lg:col-span-3 space-y-4 md:space-y-8 flex flex-col items-center lg:items-start w-full">
          <motion.h4
            style={{
              opacity: useTransform(localProgress, [0.3, 0.4], [0, 1]),
              y: useTransform(localProgress, [0.3, 0.4], [-10, 0])
            }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-secondary/60"
          >
            {t('mission.legal')}
          </motion.h4>
          <div className="flex flex-row lg:flex-col justify-center lg:justify-start gap-2 md:gap-3 w-full">
            {legalItems.map((item, i) => (
              <motion.button
                key={i}
                style={{
                  opacity: useTransform(localProgress, [0.3 + (i * 0.06), 0.45 + (i * 0.06)], [0, 1]),
                  scale: useTransform(localProgress, [0.3 + (i * 0.06), 0.45 + (i * 0.06)], [0.9, 1])
                }}
                whileHover={{ scale: 1.05, x: 10, color: "var(--secondary)" }}
                onClick={() => navigate(item.id === 'terms' ? '/terms' : '/privacy')}
                className="w-auto lg:w-full text-start px-4 py-2 md:p-4 rounded-full md:rounded-3xl bg-white/5 border border-white/5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/40 hover:bg-secondary/5"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
          <motion.div style={{ opacity: useTransform(localProgress, [0.4, 0.5], [0, 1]), y: useTransform(localProgress, [0.4, 0.5], [20, 0]) }} className="hidden md:block mt-6 md:mt-20 p-5 md:p-8 rounded-[24px] md:rounded-[40px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/5 backdrop-blur-sm w-full text-center whitespace-pre-line">
            <p className="text-[10px] md:text-sm font-medium italic opacity-60">
              {t('mission.quote')}
            </p>
          </motion.div>

          {/* DEVELOPED BY - Mobile Only (Right) */}
          <div className="flex md:hidden pt-6 md:pt-10 flex-col items-center lg:items-start space-y-4">
            <motion.p
              style={{
                opacity: useTransform(localProgress, [0.35, 0.45], [0, 0.4]),
                y: useTransform(localProgress, [0.35, 0.45], [10, 0])
              }}
              className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white"
            >
              {t('mission.developedBy')}
            </motion.p>
            <motion.div
              style={{
                opacity: useTransform(localProgress, [0.4, 0.5], [0, 1]),
                scale: useTransform(localProgress, [0.4, 0.5], [0.9, 1])
              }}
              className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
              onClick={() => window.open('https://portal.ztsolutions.tech', '_blank')}
            >
              <img src={ztLogo} alt="ZeroTrace Solutions" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-black tracking-tighter uppercase leading-none">ZT</span>
                <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase leading-none opacity-50">Solutions</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[180px] rounded-full -z-10" />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 blur-[180px] rounded-full -z-10" />
    </section>
  );
};

export default StageMission;
