"use client";

import React, { useState } from "react";
import { MenuIcon, HomeIcon, PencilIcon, BellIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/ui/dock";

// Import dropdown components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Import card components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Emojis for random selection
const emojis = ["😊", "🎉", "📚", "🚀", "🌟", "🔥", "💡", "⚡"];

const DockComponent = () => {
  const [showCard, setShowCard] = useState(false); // State to show/hide the card
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]; // Default emoji
  const [topicName, setTopicName] = useState(""); // Topic name
  const [description, setDescription] = useState(""); // Topic description

  // Open the card when "New Topic" is clicked
  const handleNewTopicClick = () => {
    setShowCard(true);
  };

  // Close the card
  const handleCloseCard = () => {
    setShowCard(false);
    setTopicName("");
    setDescription("");
  };

  return (
    <div>
      {/* Dock Bar */}
      <div className="fixed top-0 w-full flex justify-center z-50 ">
        <div className="relative w-full max-w-5xl p-4">
          <TooltipProvider>
            <Dock
              direction="middle"
              iconSize={60}
              iconMagnification={50}
              iconDistance={80}
              className="rounded-xl bg-background"
            >
              {/* Sidebar Trigger */}
              <DockIcon size={48} magnification={55} distance={80}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger asChild>
                      <button
                        aria-label="Menu"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full"
                        )}
                      >
                        <MenuIcon className="size-5" />
                      </button>
                    </SidebarTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Menu</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              {/* Home Button */}
              <DockIcon size={48} magnification={55} distance={80}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      aria-label="Home"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <HomeIcon className="size-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Home</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <Separator orientation="vertical" className="h-full" />

              {/* Pencil Button with Dropdown Menu */}
              <DockIcon size={48} magnification={55} distance={80}>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <button
                          aria-label="Edit"
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-12 rounded-full"
                          )}
                        >
                          <PencilIcon className="size-5" />
                        </button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem onClick={handleNewTopicClick}>
                      New Topic
                      <span className="ml-auto text-xs text-gray-500">⌘N</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      New Set
                      <span className="ml-auto text-xs text-gray-500">⌘⇧N</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DockIcon>

              {/* Bell Button */}
              <DockIcon size={48} magnification={55} distance={80}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      aria-label="Notifications"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <BellIcon className="size-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <Separator orientation="vertical" className="h-full" />

              {/* Light/Dark Mode Toggle */}
              <DockIcon size={48} magnification={55} distance={80}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ModeToggle />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Theme</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </Dock>
          </TooltipProvider>
        </div>
      </div>

      {/* Popup Card */}
      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card className="w-[400px] shadow-lg bg-white">
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>
                Provide details for the new topic.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{emoji}</span>
                <Input
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="Topic Name"
                />
              </div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description..."
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={handleCloseCard}>
                Cancel
              </Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DockComponent;
