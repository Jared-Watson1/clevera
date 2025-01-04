// src/pages/dashboard.tsx
"use client";

import React, { useState } from "react";
import { useTopics } from "@/context/TopicsContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/my-sidebar";
import DockComponent from "@/components/ui/my-dock";
import TopicDetails from "@/components/TopicDetails";
import NewTopicPopup from "@/components/ui/NewTopicPopup";
import NewSetPopup from "@/components/ui/NewSetPopup";
import DashboardHome from "@/components/DashboardHome";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [showTopicPopup, setShowTopicPopup] = useState(false);
  const [showSetPopup, setShowSetPopup] = useState(false);

  const { user, loading } = useUser();

  // Handle topic selection
  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
  };

  // Handle going back to the main dashboard
  const handleBack = () => {
    setSelectedTopicId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please log in to access your dashboard.</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <AppSidebar onSelectTopic={handleSelectTopic} />
        <div className="flex-1 ml-64">
          {" "}
          {/* Adjust margin to match Sidebar's width */}
          {/* Dock */}
          <DockComponent
            onNewTopic={() => setShowTopicPopup(true)}
            onNewSet={() => setShowSetPopup(true)}
          />
          {/* Main Content */}
          <main className="p-6 mt-20">
            {selectedTopicId ? (
              <TopicDetails topicId={selectedTopicId} onBack={handleBack} />
            ) : (
              <DashboardHome />
            )}
          </main>
        </div>
      </div>

      {/* Popup Components */}
      {showTopicPopup && (
        <NewTopicPopup onClose={() => setShowTopicPopup(false)} />
      )}
      {showSetPopup && <NewSetPopup onClose={() => setShowSetPopup(false)} />}
    </SidebarProvider>
  );
};

export default Dashboard;
