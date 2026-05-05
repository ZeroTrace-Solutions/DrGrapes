import React from 'react';
import { BadgeCheck } from 'lucide-react';

const ProfileStats = ({ formData }) => {
  return (
    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 backdrop-blur-sm relative overflow-hidden group">
      <div className="relative z-10 space-y-6">
        <BadgeCheck className="size-10 text-primary mb-4" />
        <h3 className="text-2xl font-black uppercase tracking-tighter">System Power User</h3>
        <p className="text-sm font-medium opacity-70">
          Your account has full administrative privileges across all ZeroTrace system modules.
        </p>
        <div className="h-px bg-primary/20 w-full" />
        <div className="space-y-3">
          {[
            { label: 'Role', value: formData.role },
            { label: 'Level', value: formData.level },
            { label: 'Gender', value: formData.gender }
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="opacity-40">{stat.label}</span>
              <span className="text-primary">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-8 -bottom-8 size-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    </div>
  );
};

export default ProfileStats;
