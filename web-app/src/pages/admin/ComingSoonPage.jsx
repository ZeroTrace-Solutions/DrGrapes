import React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        <div className="relative bg-surface-container border border-outline-variant p-8 rounded-[2.5rem] shadow-2xl">
          <Construction className="size-20 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {title}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Coming Soon
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg opacity-60 max-w-md mx-auto mb-8 font-medium"
      >
        We're working hard to bring you the best experience for {title.toLowerCase()}. Stay tuned for updates!
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-variant hover:bg-surface-variant/80 transition-colors font-bold uppercase tracking-widest text-sm border border-outline-variant/30"
      >
        <ArrowLeft className="size-4" />
        Go Back
      </motion.button>
    </div>
  );
};

export default ComingSoonPage;
