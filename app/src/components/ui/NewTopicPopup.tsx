// src/components/ui/NewTopicPopup.tsx
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useTopics } from "@/context/TopicsContext";

interface NewTopicPopupProps {
  onClose: () => void;
}

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

const NewTopicPopup: React.FC<NewTopicPopupProps> = ({ onClose }) => {
  const { addTopic } = useTopics();

  // States
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🗂️");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Save handler
  const handleSave = async () => {
    if (topicName.trim() !== "") {
      await addTopic({
        name: topicName,
        emoji: selectedEmoji,
        description,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-[700px] max-h-[90vh] overflow-y-auto shadow-lg bg-white p-6">
        <CardHeader>
          <CardTitle>Create New Topic</CardTitle>
          <CardDescription>Provide details for the new topic.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Emoji and Input */}
          <div className="flex items-center space-x-4 relative">
            <div className="relative flex items-center justify-center">
              {/* Emoji Display */}
              <span className="text-5xl">{selectedEmoji}</span>

              {/* Pencil Icon for Editing */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-sm cursor-pointer"
              >
                <PencilIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Topic Name Input */}
            <Input
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Topic Name"
            />
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bg-white shadow-lg p-4 rounded-lg grid grid-cols-6 gap-4 overflow-y-auto max-h-[200px]">
              {academicEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setSelectedEmoji(emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description..."
          />
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewTopicPopup;
