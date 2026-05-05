import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Camera, 
  Pencil, 
  ShieldCheck, 
  AtSign, 
  Calendar, 
  Activity, 
  LogOut 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const ProfileHeader = ({ formData, isEditing, setIsEditing, logout, user, itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-surface-container/30 backdrop-blur-xl border border-outline-variant/20 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <Avatar className="size-32 md:size-40 rounded-3xl border-4 border-surface-container shadow-xl">
            <AvatarImage src={user?.profile_picture} />
            <AvatarFallback className="bg-surface-variant text-4xl font-black">
              <User className="size-16" />
            </AvatarFallback>
          </Avatar>
          <button className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-primary text-on-primary hover:scale-110 transition-transform shadow-lg border-4 border-surface-container">
            <Camera className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-black uppercase tracking-tighter">
                {formData.fullname}
              </h1>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 flex items-center gap-1.5">
                <ShieldCheck className="size-3" />
                {formData.role} • {formData.level}
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-on-surface-variant/60 font-bold uppercase tracking-widest text-xs">
              <AtSign className="size-3" />
              {formData.username}
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="px-5 py-3 rounded-2xl bg-surface-variant/50 border border-outline-variant/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              Joined May 2026
            </div>
            <div className="px-5 py-3 rounded-2xl bg-surface-variant/50 border border-outline-variant/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
              <Activity className="size-4 text-secondary" />
              48 Active Sessions
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[180px]">
          <Button
            variant={isEditing ? "outline" : "default"}
            className="w-full rounded-2xl h-12 font-black uppercase tracking-widest gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : <><Pencil className="size-4" /> Edit Profile</>}
          </Button>
          <Button
            variant="ghost"
            className="w-full rounded-2xl h-12 font-black uppercase tracking-widest text-error hover:bg-error/10"
            onClick={logout}
          >
            <LogOut className="size-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
