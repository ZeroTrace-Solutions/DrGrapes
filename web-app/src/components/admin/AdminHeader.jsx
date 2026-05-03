import React from 'react';
import { 
  SidebarTrigger 
} from '@/components/animate-ui/components/radix/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const AdminHeader = ({ breadcrumbs = [] }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-outline-variant/20 px-6 bg-surface-container/40 backdrop-blur-md sticky top-0 z-30 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 hover:bg-surface-variant transition-colors" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-outline-variant" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className="uppercase tracking-widest text-[10px] font-black opacity-40 hover:opacity-100 transition-opacity">
                Dr. Grapes
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block opacity-20" />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase tracking-tighter text-sm font-black text-primary">
                Dashboard
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AdminHeader;
