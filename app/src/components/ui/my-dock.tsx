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

import { useTopics } from "@/context/TopicsContext";

// Emojis for random selection
const academicEmojis = [
  "📚",
  "📖",
  "📝",
  "📎",
  "📐",
  "📏",
  "✏️",
  "🖊️",
  "🔬",
  "🧪",
  "🧫",
  "🧬",
  "⚗️",
  "🔭",
  "📡",
  "🗂️",
  "📊",
  "📈",
  "📉",
  "🗃️",
  "📅",
  "📋",
  "💡",
  "🧠",
  "🎓",
  "🏫",
  "🏛️",
  "📜",
  "📔",
  "🔖",
];

const faceEmojis = [
  "😊",
  "😎",
  "🤓",
  "😃",
  "😁",
  "😂",
  "🥳",
  "😇",
  "😉",
  "😌",
  "🤔",
  "🙃",
  "😜",
  "😋",
  "🤩",
  "😏",
  "😶‍🌫️",
  "😕",
  "😲",
  "🥺",
];

const allEmojis = [...academicEmojis, ...faceEmojis]; // Combine both categories

const DockComponent = () => {
  const { topics, addTopic, addSet } = useTopics();

  // State for topics
  const [showCard, setShowCard] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🗂️");
  const [description, setDescription] = useState("");
  const [topicName, setTopicName] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // State for sets
  const [showSetPopup, setShowSetPopup] = useState(false);
  const [setName, setSetName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined
  );

  // Open Set Popup
  const handleNewTopicClick = () => setShowCard(true);

  const handleCloseCard = () => {
    setShowCard(false);
    setTopicName("");
    setDescription("");
    setShowEmojiPicker(false);
  };

  const handleSaveTopic = () => {
    if (topicName.trim() !== "") {
      addTopic({
        id: `${Date.now()}`,
        name: topicName,
        emoji: selectedEmoji,
        description,
        sets: [],
      });
      handleCloseCard();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  // Handlers for Set
  const handleNewSetClick = () => setShowSetPopup(true);

  const handleCloseSetPopup = () => {
    setShowSetPopup(false);
    setSetName("");
    setSelectedTopic(undefined);
  };

  const handleSaveSet = () => {
    if (setName.trim() !== "") {
      if (selectedTopic) {
        // Add to a specific topic
        addSet(setName, selectedTopic);
      } else {
        // Add as a root-level set
        addTopic({
          id: `${Date.now()}`,
          name: setName,
          emoji: "📝", // Flashcard emoji for sets
          description: "",
          sets: [],
        });
      }
      handleCloseSetPopup(); // Close popup
    }
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
                    <DropdownMenuItem onClick={handleNewSetClick}>
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
          <Card className="w-[700px] max-h-[90vh] overflow-y-auto shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>
                Provide details for the new topic.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <span className="text-4xl">{selectedEmoji}</span>
                        <PencilIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change Emoji</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {showEmojiPicker && (
                  <div
                    className="absolute left-[-310px] top-0 bg-white shadow-lg p-4 rounded-lg grid grid-cols-6 gap-4 overflow-y-auto"
                    style={{ height: "300px" }} // Constrain height
                  >
                    {allEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="text-2xl hover:scale-110 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
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
              <Button onClick={handleSaveTopic}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}
      {showSetPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card className="w-[500px] max-h-[90vh] overflow-y-auto shadow-lg bg-white p-6">
            <CardHeader>
              <CardTitle>Create New Set</CardTitle>
              <CardDescription>Choose a topic for this set.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Set Name */}
              <Input
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                placeholder="Set Name"
              />

              {/* Topic Dropdown */}
              <select
                value={selectedTopic || ""}
                onChange={(e) => setSelectedTopic(e.target.value || undefined)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Root (No Topic)</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.emoji} {topic.name}
                  </option>
                ))}
              </select>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={handleCloseSetPopup}>
                Cancel
              </Button>
              <Button onClick={handleSaveSet}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DockComponent;
