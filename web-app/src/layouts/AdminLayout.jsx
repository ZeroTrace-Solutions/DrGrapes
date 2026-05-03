import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/animate-ui/components/radix/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/admin/AppSidebar';
import ChatSidebar from '@/components/admin/ChatSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminLayout = () => {
  // Dummy state for chats to demonstrate conditional column
  const [activeChats, setActiveChats] = useState([
    { id: 1, name: 'Support', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support' },
    { id: 2, name: 'Medical Group', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Medical' }
  ]);

  return (
    <div className="flex h-svh w-full bg-[#0c0f0f] overflow-hidden selection:bg-primary/30">
      {/* 1. Chat Sidebar (Far Left Dock) */}
      <ChatSidebar chats={activeChats} />

      {/* 2. Main Admin Sidebar System */}
      <SidebarProvider>
        <AppSidebar hasActiveChats={activeChats.length > 0} />
        
        {/* 3. Main Content Area - Inset design with unified surface */}
        <SidebarInset className="flex flex-col bg-transparent relative">
          <AdminHeader />
          <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-8">
              <Outlet context={{ activeChats, setActiveChats }} />
            </div>
          </div>
          
          {/* Subtle Ambient Glows for the Dashboard */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
