import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/animate-ui/components/animate/tooltip';

const ChatSidebar = ({ chats = [] }) => {
  return (
    <AnimatePresence mode="popLayout">
      {chats.length > 0 && (
        <motion.aside
          initial={{ width: 0, opacity: 0, x: -20 }}
          animate={{ width: 80, opacity: 1, x: 0 }}
          exit={{ width: 0, opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-shrink-0 h-full flex flex-col items-center py-6 gap-6 z-20 relative"
        >
          {/* Floating Dock Background */}
          <div className="absolute inset-y-4 left-2 right-2 backdrop-blur-2xl border border-outline-variant/30 rounded-[2rem] -z-10 shadow-2xl" />

          <div className="flex flex-col gap-4">
            {chats.map((chat) => (
              <TooltipProvider key={chat.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl overflow-hidden border-2 border-primary/20 hover:border-primary cursor-pointer transition-all shadow-xl bg-surface-bright"
                    >
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-surface-container-highest border-outline-variant text-on-surface">
                    <p className="font-bold">{chat.name}</p>
                    <p className="text-[10px] opacity-60">Active Chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="mt-auto">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-xl">+</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ChatSidebar;
