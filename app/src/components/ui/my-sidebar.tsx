// src/components/ui/my-sidebar.tsx
"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// Import useTopics hook
import { useTopics } from "@/context/TopicsContext";

// Sidebar Component
export function AppSidebar({
  onSelectTopic,
}: {
  onSelectTopic: (id: string) => void;
}) {
  const { topics, moveSet } = useTopics();

  // Drag-and-drop states
  const [draggingSetId, setDraggingSetId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<
    "above" | "inside" | "below" | null
  >(null);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, setId: string) => {
    e.dataTransfer.setData("setId", setId); // Store the setId in transfer data
    setDraggingSetId(setId); // Track dragging set
  };

  // Handle drag over
  const handleDragOver = (
    e: React.DragEvent,
    topicId: string,
    position: "above" | "inside" | "below"
  ) => {
    e.preventDefault(); // Allow dropping
    setDropTargetId(topicId);
    setDropPosition(position);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetTopicId: string) => {
    const setId = e.dataTransfer.getData("setId"); // Retrieve the setId
    if (setId && draggingSetId) {
      moveSet(setId, undefined, targetTopicId); // Move the set
    }

    // Reset states
    setDropTargetId(null);
    setDropPosition(null);
    setDraggingSetId(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDropTargetId(null);
    setDropPosition(null);
    setDraggingSetId(null);
  };

  return (
    <Sidebar className="w-64">
      {" "}
      {/* Set fixed width */}
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 bg-sidebar text-lg font-bold">
        Menu
      </SidebarHeader>
      {/* Sidebar Content */}
      <SidebarContent>
        {/* Group 1: Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/home" className="flex items-center w-full">
                  <Home className="mr-2" />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/inbox" className="flex items-center w-full">
                  <Inbox className="mr-2" />
                  <span>Inbox</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

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

        {/* Group 2: Topics */}
        <SidebarGroup>
          <SidebarGroupLabel>Topics</SidebarGroupLabel>
          <SidebarMenu>
            {topics.length === 0 ? (
              <SidebarMenuItem>
                <div className="text-gray-500">
                  No topics available. Create one!
                </div>
              </SidebarMenuItem>
            ) : (
              topics.map((topic) => (
                <div key={topic.id}>
                  {/* Topic Header */}
                  <SidebarMenuItem
                    onDragOver={(e) => handleDragOver(e, topic.id, "above")}
                    onDrop={(e) => handleDrop(e, topic.id)}
                    className={`${
                      dropTargetId === topic.id && dropPosition === "above"
                        ? "border-t-2 border-blue-500" // Highlight drop position above
                        : ""
                    }`}
                  >
                    <SidebarMenuButton
                      asChild
                      onClick={() => onSelectTopic(topic.id)} // Select topic
                    >
                      <div className="flex items-center w-full cursor-pointer">
                        <span className="mr-2 text-lg">{topic.emoji}</span>
                        <span>{topic.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Sets inside Topic */}
                  {topic.sets.length === 0 ? (
                    <SidebarMenuItem className="pl-8 text-gray-400">
                      No sets in this topic.
                    </SidebarMenuItem>
                  ) : (
                    topic.sets.map((set) => (
                      <SidebarMenuItem
                        key={set.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, set.id)}
                        onDragOver={(e) =>
                          handleDragOver(e, topic.id, "inside")
                        }
                        onDrop={(e) => handleDrop(e, topic.id)}
                        onDragEnd={handleDragEnd}
                        className={`pl-8 ${
                          dropTargetId === topic.id && dropPosition === "inside"
                            ? "bg-gray-200" // Highlight drop position inside
                            : ""
                        }`}
                      >
                        <SidebarMenuButton asChild>
                          <div className="flex items-center w-full cursor-move">
                            <span className="mr-2 text-lg">📇</span>
                            <span>{set.name}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}

                  {/* Drop Indicator Below Topic */}
                  <SidebarMenuItem
                    onDragOver={(e) => handleDragOver(e, topic.id, "below")}
                    onDrop={(e) => handleDrop(e, topic.id)}
                    className={`${
                      dropTargetId === topic.id && dropPosition === "below"
                        ? "border-b-2 border-blue-500" // Highlight drop position below
                        : ""
                    }`}
                  />
                </div>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* Group 3: Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/settings" className="flex items-center w-full">
                  <Settings className="mr-2" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

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
