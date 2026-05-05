import React from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Link as RouterLink,
  Bell,
  Search,
  BookOpen,
  Bot,
  SquareTerminal,
  Settings2,
  Sparkles,
  BadgeCheck,
  CreditCard,
  ChevronsUpDown,
  Plus,
  MoreHorizontal,
  Folder,
  Forward,
  Trash2,
  Hospital,
  GraduationCap,
  Microscope,
  LibraryBig,
  View,
  Package,
  ListOrdered,
  ShoppingCartIcon,
  Percent,
  DollarSign,
  Logs,
  ShoppingBag
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction
} from '@/components/animate-ui/components/radix/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const DATA = {
  user: {
    name: 'Dr. Grapes',
    email: 'admin@drgrapes.med',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
  contexts: [
    {
      name: 'QB & E-shop',
      logo: ShoppingBag,
    },
    {
      name: 'Community',
      logo: Users,
    }
  ],
  navMain: [
    {
      title: 'System Overview',
      url: '/dashboard/admin/overview',
      icon: View,
      isActive: true,
      items: [],
    },
    {
      title: 'Questions Bank',
      url: '#',
      icon: LibraryBig,
      isActive: true,
      items: [
        { title: 'Levels', url: '/dashboard/admin/questions/levels' },
        { title: 'Modules', url: '/dashboard/admin/questions/modules' },
        { title: 'Subjects', url: '/dashboard/admin/questions/subjects' },
        { title: 'Exams', url: '/dashboard/admin/questions/exams' },
        { title: 'Add questions', url: '/dashboard/admin/questions/add' },
      ],
    },
    {
      title: 'Entities',
      url: '#',
      icon: Users,
      items: [
        { title: 'Users', url: '/dashboard/admin/entities/users' },
        { title: 'Admins', url: '/dashboard/admin/entities/admins' },
        { title: 'Subadmins', url: '/dashboard/admin/entities/subadmins' },
        { title: 'Suppliers (No Delivery)', url: '/dashboard/admin/entities/suppliers-no-delivery' },
        { title: 'Suppliers (Delivery)', url: '/dashboard/admin/entities/suppliers-delivery' },
      ],
    },
    {
      title: 'Products',
      url: '/dashboard/admin/products',
      icon: Package,
      items: [],
    },
    {
      title: 'Orders',
      url: '/dashboard/admin/orders',
      icon: ShoppingCartIcon,
      items: [],
    },
    {
      title: 'Sales',
      url: '/dashboard/admin/sales',
      icon: Percent,
      items: [],
    },
    {
      title: 'Finance',
      url: '#',
      icon: DollarSign,
      items: [
        { title: 'Profit', url: '/dashboard/admin/finance/profit' },
        { title: 'Salaries', url: '/dashboard/admin/finance/salaries' },
        { title: 'Expenses', url: '/dashboard/admin/finance/expenses' },
      ],
    },
    {
      title: 'Logs',
      url: '#',
      icon: Logs,
      items: [
        { title: 'All', url: '/dashboard/admin/logs/all-logs' },
        { title: 'Entities', url: '/dashboard/admin/logs/entities-logs' },
        { title: 'Questions Bank', url: '/dashboard/admin/logs/bank-logs' },
        { title: 'Products', url: '/dashboard/admin/logs/products-logs' },
        { title: 'Orders', url: '/dashboard/admin/logs/orders-logs' },
      ],
    },
  ],
};

const AppSidebar = ({ hasActiveChats }) => {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const [activeContext, setActiveContext] = React.useState(DATA.contexts[0]);

  const isAdmin = user?.role === 'ADMIN';
  const isSupplier = user?.role?.startsWith('SUPPLIER');

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-outline-variant/30 bg-surface-container/80 backdrop-blur-xl"
      animate={{ marginLeft: hasActiveChats ? '80px' : '0' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-on-primary">
                    <activeContext.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold uppercase tracking-tighter">
                      {isAdmin ? 'Admin Panel' : 'Supplier Portal'}
                    </span>
                    <span className="truncate text-[10px] opacity-60 font-bold uppercase tracking-widest">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {isAdmin && (
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-sm border-outline-variant bg-surface-container-high"
                  align="start"
                  side={isMobile ? 'bottom' : 'right'}
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs opacity-60">Portals</DropdownMenuLabel>
                  {DATA.contexts.map((context, index) => (
                    <DropdownMenuItem
                      key={context.name}
                      onClick={() => setActiveContext(context)}
                      className="gap-2 p-2 hover:bg-surface-variant cursor-pointer"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border border-outline-variant">
                        <context.logo className="size-4 shrink-0" />
                      </div>
                      <span className="font-medium">{context.name}</span>
                      <DropdownMenuShortcut className="text-[10px]">⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto show-scrollbar" data-lenis-prevent>
        {/* Admin Specific Platform View */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Platform</SidebarGroupLabel>
            <SidebarMenu>
              {DATA.navMain.map((item) => {
                const hasItems = item.items && item.items.length > 0;

                if (!hasItems) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link to={item.url}>
                          {item.icon && <item.icon className="size-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon className="size-4" />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Supplier Specific View */}
        {isSupplier && (
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Supply Chain</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard className="size-4" />
                  <span>Inventory Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Orders">
                  <BookOpen className="size-4" />
                  <span>Manage Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user?.role === 'SUPPLIER_DELIVERY' && (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Delivery Logistics">
                    <Forward className="size-4" />
                    <span>Delivery Routes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroup>
        )}

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                <MessageSquare className="size-4" />
                <span>Chats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg border border-outline-variant">
                    <AvatarImage src={user?.profile_picture || DATA.user.avatar} alt={user?.fullname} />
                    <AvatarFallback className="rounded-lg bg-surface-variant">
                      {user?.fullname?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold uppercase tracking-tighter">{user?.fullname}</span>
                    <span className="truncate text-[10px] opacity-60">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-outline-variant bg-surface-container-high"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.profile_picture || DATA.user.avatar} alt={user?.fullname} />
                      <AvatarFallback className="rounded-lg bg-surface-variant">
                        {user?.fullname?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.fullname}</span>
                      <span className="truncate text-xs opacity-60">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-outline-variant" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <BadgeCheck className="size-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings2 className="size-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-outline-variant" />
                <DropdownMenuItem className="text-error cursor-pointer" onClick={() => logout()}>
                  <LogOut className="size-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
