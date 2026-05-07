import React from 'react';
import { SidebarTrigger } from '@/components/animate-ui/components/radix/sidebar';
import { LayoutDashboard, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-[2rem] bg-surface-container/30 backdrop-blur-sm border border-outline-variant/20 flex flex-col gap-4 relative overflow-hidden group hover:bg-surface-container/50 transition-colors"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-20`}>
      <Icon className={`size-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium opacity-60 uppercase tracking-wider">{label}</span>
      <span className="text-3xl font-black mt-1 tracking-tighter">{value}</span>
    </div>
    <div className="flex items-center gap-2 text-xs font-bold text-primary">
      <TrendingUp className="size-3" />
      <span>{trend} vs last month</span>
    </div>
    {/* Decorative background shape */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${color} opacity-[0.03] group-hover:scale-125 transition-transform duration-500`} />
  </motion.div>
);

const DashboardOverview = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Welcome, <span className="text-primary">{user?.fullname?.split(' ')[0]}</span>
        </h1>
        <p className="text-sm opacity-60 font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          System {user?.role} Portal
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Students" 
          value="12,482" 
          trend="+12%" 
          color="bg-primary" 
        />
        <StatCard 
          icon={MessageSquare} 
          label="Active Chats" 
          value="48" 
          trend="+5%" 
          color="bg-secondary" 
        />
        <StatCard 
          icon={LayoutDashboard} 
          label="Active Sessions" 
          value="1,204" 
          trend="+8.2%" 
          color="bg-tertiary" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Conversion Rate" 
          value="24.8%" 
          trend="+2.1%" 
          color="bg-primary" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-surface-container border border-outline-variant h-[400px] flex items-center justify-center">
          <div className="text-center opacity-40">
             <LayoutDashboard className="size-12 mx-auto mb-4" />
             <p className="font-bold uppercase tracking-widest text-sm">Analytics Visualization Placeholder</p>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant h-[400px]">
           <h3 className="font-black uppercase tracking-tighter mb-6">Recent Activity</h3>
           <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 items-start">
                   <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                   <div>
                      <p className="text-sm font-bold">New student registration</p>
                      <p className="text-xs opacity-60">2 minutes ago</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
