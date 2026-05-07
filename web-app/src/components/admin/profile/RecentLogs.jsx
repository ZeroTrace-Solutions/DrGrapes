import React from 'react';
import { Bell, KeyRound, Settings2, Activity } from 'lucide-react';

const RecentLogs = () => {
  return (
    <div className="p-8 rounded-[2rem] bg-surface-container/20 border border-outline-variant/20 backdrop-blur-sm shadow-xl">
      <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
        <Bell className="size-5 text-primary" />
        Recent Logs
      </h2>
      <div className="space-y-6">
        {[
          { action: 'Password Changed', time: '5 mins ago', icon: KeyRound },
          { action: 'Settings Updated', time: '2 hours ago', icon: Settings2 },
          { action: 'Login from London', time: 'Yesterday', icon: Activity }
        ].map((log, i) => (
          <div key={i} className="flex gap-4 items-start group cursor-pointer">
            <div className="p-2 rounded-xl bg-surface-variant/50 group-hover:bg-primary/20 transition-colors">
              <log.icon className="size-3 opacity-60" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-tighter">{log.action}</p>
              <p className="text-[9px] opacity-40 font-bold">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLogs;
