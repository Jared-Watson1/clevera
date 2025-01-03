// src/components/ui/CardWithForm.tsx

"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { cn } from "@/lib/utils";
import { TreeViewElement } from "@/components/ui/file-tree"; // Ensure correct import path

interface CardWithFormProps {
  onClose: () => void;
  onSubmit: (folderName: string, destinationId: string) => void;
  elements: TreeViewElement[];
}

export function CardWithForm({
  onClose,
  onSubmit,
  elements,
}: CardWithFormProps) {
  const [folderName, setFolderName] = React.useState("");
  const [destinationId, setDestinationId] = React.useState("");

  // Function to flatten the tree and get all folders
  const flattenFolders = (elements: TreeViewElement[]): TreeViewElement[] => {
    let folders: TreeViewElement[] = [];
    elements.forEach((el) => {
      if (el.children) {
        folders.push(el);
        folders = folders.concat(flattenFolders(el.children));
      }
    });
    return folders;
  };

  const folders = flattenFolders(elements);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim() === "" || destinationId === "") {
      // Handle validation
      alert("Please enter a folder name and select a destination.");
      return;
    }
    onSubmit(folderName, destinationId);
    onClose();
  };

  return (
    <Card className="w-[350px] bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Create New Folder</CardTitle>
        <CardDescription>Enter the folder details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            {/* Folder Name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                placeholder="Name of the folder"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            {/* Destination */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="destination">Destination</Label>
              <Select
                onValueChange={(value) => setDestinationId(value)}
                value={destinationId}
              >
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create</Button>
      </CardFooter>
    </Card>
  );
}
