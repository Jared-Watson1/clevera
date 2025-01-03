// src/pages/Dashboard.tsx

"use client";

import DockComponent from "@/components/ui/my-dock";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/my-sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      {/* Dock Component Fixed at Top */}
      <DockComponent />

      <div className="min-h-screen bg-background text-foreground flex pt-20">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="mt-2 text-lg">Manage your tasks, notes, and more!</p>
          <div className="mt-16 h-[1500px]">
            <p>Scroll down to test sticky dock behavior.</p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
