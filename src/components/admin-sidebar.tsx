'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bug, LayoutDashboard, MessageCircle, ShoppingBag, Users } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/conversations', label: 'Conversations', icon: MessageCircle },
  { href: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Bug className="h-6 w-6" />
                    <span className="sr-only">PestAssist AI</span>
                </Button>
                <span className="text-lg font-semibold text-sidebar-foreground">PestAssist AI</span>
            </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
