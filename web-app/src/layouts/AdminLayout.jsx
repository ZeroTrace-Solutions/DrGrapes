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
    <div className="flex h-svh w-full overflow-hidden">
      {/* 1. Chat Sidebar (Far Left Dock) */}
      <ChatSidebar chats={activeChats} />

      {/* 2. Main Admin Sidebar System */}
      <SidebarProvider className="h-full">
        <AppSidebar hasActiveChats={activeChats.length > 0} />

        {/* 3. Main Content Area - Inset design with unified surface */}
        <SidebarInset className="flex flex-col bg-transparent relative h-full min-h-0">
          <AdminHeader />
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 show-scrollbar" data-lenis-prevent>
            <div className="w-full h-full space-y-6 lg:space-y-8">
              <Outlet context={{ activeChats, setActiveChats }} />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
