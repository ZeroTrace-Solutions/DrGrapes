import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings2, 
  Moon, 
  Sun, 
  Palette, 
  Monitor, 
  Bell, 
  Lock, 
  Globe,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const SettingsPage = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative min-h-screen pb-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-8 px-4 md:px-8 lg:px-12"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Settings2 className="size-8 text-primary" />
            System Settings
          </h1>
          <p className="text-sm font-medium opacity-60 uppercase tracking-widest">
            Configure your workspace preferences and appearance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Appearance Section */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-[2.5rem] bg-surface-container/30 backdrop-blur-xl border border-outline-variant/20 shadow-xl space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Palette className="size-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter">Appearance</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-variant/20 border border-outline-variant/30">
                <div className="space-y-1">
                  <Label className="text-sm font-black uppercase tracking-widest">Interface Theme</Label>
                  <p className="text-xs font-medium opacity-60">Switch between light and dark visual styles.</p>
                </div>
                <div className="flex items-center p-1 bg-surface-container rounded-2xl border border-outline-variant/50">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-primary text-on-primary shadow-lg' : 'hover:bg-surface-variant opacity-60'}`}
                  >
                    <Sun className="size-4" />
                    Light
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-primary text-on-primary shadow-lg' : 'hover:bg-surface-variant opacity-60'}`}
                  >
                    <Moon className="size-4" />
                    Dark
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-6 rounded-3xl bg-surface-variant/20 border border-outline-variant/30 group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                       <Monitor className="size-6 opacity-40 group-hover:text-primary transition-colors" />
                       <Sparkles className="size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-black uppercase tracking-tighter text-sm mb-1">System Default</h3>
                    <p className="text-[10px] font-medium opacity-60 uppercase tracking-widest">Auto-sync with OS</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-surface-variant/20 border border-outline-variant/30 group cursor-pointer hover:border-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                       <Palette className="size-6 opacity-40 group-hover:text-secondary transition-colors" />
                       <ChevronRight className="size-4 opacity-40" />
                    </div>
                    <h3 className="font-black uppercase tracking-tighter text-sm mb-1">Accent Colors</h3>
                    <p className="text-[10px] font-medium opacity-60 uppercase tracking-widest">Customize brand tones</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Other Sections Placeholder */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Bell, label: 'Notifications', color: 'text-blue-400' },
              { icon: Lock, label: 'Privacy & Security', color: 'text-green-400' },
              { icon: Globe, label: 'Language', color: 'text-orange-400' }
            ].map((section) => (
              <div key={section.label} className="p-6 rounded-3xl bg-surface-container/20 border border-outline-variant/20 backdrop-blur-md hover:bg-surface-container/40 transition-colors cursor-pointer group">
                <section.icon className={`size-6 mb-4 opacity-60 group-hover:opacity-100 transition-opacity ${section.color}`} />
                <h3 className="font-black uppercase tracking-tighter text-sm">{section.label}</h3>
                <p className="text-[10px] font-medium opacity-40 mt-1 uppercase tracking-widest">Configure</p>
              </div>
            ))}
          </motion.div>
        </div>

        <Separator className="bg-outline-variant/20" />

        <div className="flex items-center justify-between px-4">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Dr. Grapes v1.4.2 Dashboard</p>
           <div className="flex gap-4">
              <Button variant="link" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">Release Notes</Button>
              <Button variant="link" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">Support</Button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
