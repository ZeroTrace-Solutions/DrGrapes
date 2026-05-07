import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, AtSign, CalendarDays, Pencil, Save, Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PersonalInfoForm = ({ formData, setFormData, isEditing, handleUpdate }) => {
  return (
    <div className="p-8 rounded-[2rem] bg-surface-container/20 border border-outline-variant/20 backdrop-blur-sm shadow-xl">
      <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
        <Settings2 className="size-5 text-primary" />
        Personal Information
      </h2>

      <form onSubmit={handleUpdate} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Full Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
              <Input
                disabled={!isEditing}
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="bg-surface-variant/30 border-outline-variant/50 h-14 pl-12 rounded-2xl focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
              />
              {isEditing && <Pencil className="absolute right-4 top-1/2 -translate-y-1/2 size-3 opacity-20" />}
            </div>
          </div>

          <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Username</Label>
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
              <Input
                disabled={!isEditing}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-surface-variant/30 border-outline-variant/50 h-14 pl-12 rounded-2xl focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
              <Input
                disabled
                value={formData.email}
                className="bg-surface-variant/20 border-outline-variant/50 h-14 pl-12 rounded-2xl opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Date of Birth</Label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
              <Input
                type="date"
                disabled={!isEditing}
                value={formData.DateOfBirth.split('T')[0]}
                onChange={(e) => setFormData({ ...formData, DateOfBirth: e.target.value })}
                className="bg-surface-variant/30 border-outline-variant/50 h-14 pl-12 rounded-2xl focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="pt-4">
            <Button type="submit" className="w-full md:w-auto px-12 h-14 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/20">
              <Save className="size-4" />
              Save Changes
            </Button>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfoForm;
