// src/components/ui/NewSetPopup.tsx
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
import { useTopics } from "@/context/TopicsContext";

interface NewSetPopupProps {
  onClose: () => void;
}

const NewSetPopup: React.FC<NewSetPopupProps> = ({ onClose }) => {
  const { topics, addSet } = useTopics();

  // States
  const [setName, setSetName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  // Save handler
  const handleSaveSet = async () => {
    if (setName.trim() !== "" && selectedTopic) {
      await addSet(setName, selectedTopic, description);
      onClose();
    } else {
      // Optionally, show an error message
      alert("Please provide a set name and select a topic.");
    }
  };

  return (
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
            required
          />

          {/* Topic Dropdown */}
          {topics.length > 0 ? (
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.emoji} {topic.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-red-500">
              No topics available. Please create a topic first.
            </div>
          )}

          {/* Description */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Set Description (optional)..."
          />
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveSet}
            disabled={setName.trim() === "" || selectedTopic === ""}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewSetPopup;
