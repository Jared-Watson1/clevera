// src/components/ui/my-sidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton, // Reintroduced SidebarMenuButton
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
// import { cn } from "@/lib/utils"; // Ensure you have this utility function
// import { buttonVariants } from "@/components/ui/button"; // Ensure correct import path

export function AppSidebar() {
  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 text-lg font-bold">Menu</SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Group 1: Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {/* Home Menu Item */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/home" className="flex items-center w-full">
                  <Home className="mr-2" />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Inbox Menu Item */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/inbox" className="flex items-center w-full">
                  <Inbox className="mr-2" />
                  <span>Inbox</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Search Menu Item */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/search" className="flex items-center w-full">
                  <Search className="mr-2" />
                  <span>Search</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Group 2: Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            {/* Settings Menu Item */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/settings" className="flex items-center w-full">
                  <Settings className="mr-2" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Calendar Menu Item */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/calendar" className="flex items-center w-full">
                  <Calendar className="mr-2" />
                  <span>Calendar</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4 text-sm text-gray-500">
        © 2024 Clevera
      </SidebarFooter>
    </Sidebar>
  );
}
