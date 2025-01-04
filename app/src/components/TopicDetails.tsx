"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useTopics } from "@/context/TopicsContext";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Pie, PieChart, Label } from "recharts";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";

// Props interface
interface TopicDetailsProps {
  topicId: string;
  onBack: () => void;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({ topicId, onBack }) => {
  const { topics } = useTopics();

  // Find the selected topic
  const topic = topics.find((t) => t.id === topicId);

  // If topic is not found
  if (!topic) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-darkText">Topic Not Found</h1>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  // Simulated data for topic-level terms
  const totalTerms = topic.sets.reduce(
    (total) => total + Math.floor(Math.random() * 50) + 10,
    0
  );

  const knownTerms = Math.floor(totalTerms * 0.6); // 60% known (simulated)
  const learningTerms = Math.floor(totalTerms * 0.3); // 30% learning
  const unknownTerms = totalTerms - knownTerms - learningTerms; // Remaining unknown

  // Pie chart data
  const chartData = [
    { name: "Known", value: knownTerms, fill: "#10B981" }, // Green
    { name: "Learning", value: learningTerms, fill: "#3B82F6" }, // Blue
    { name: "Unknown", value: unknownTerms, fill: "#EF4444" }, // Red
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Topic Header */}
      <div className="flex items-center space-x-4">
        <span className="text-6xl">{topic.emoji}</span>
        <div>
          <h1 className="text-4xl font-bold text-darkText">{topic.name}</h1>
        </div>
      </div>

      {/* Pie Chart - Progress Overview */}
      <Card className="mx-auto w-full max-w-lg shadow-lg bg-light3 border border-border rounded-lg hover:shadow-xl transition-shadow">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl font-semibold text-darkText">
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center pb-0">
          <ChartContainer
            className="mx-auto aspect-square max-h-[300px] min-h-[300px]"
            config={{}}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {Math.floor((knownTerms / totalTerms) * 100)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Mastered
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topic.sets.length > 0 ? (
          topic.sets.map((set) => {
            const setTotalTerms = Math.floor(Math.random() * 50) + 10;
            const setKnownTerms = Math.floor(setTotalTerms * 0.6);
            const setLearningTerms = Math.floor(setTotalTerms * 0.3);
            const setUnknownTerms =
              setTotalTerms - setKnownTerms - setLearningTerms;
            const setMasteryProgress = Math.floor(
              (setKnownTerms / setTotalTerms) * 100
            );

            return (
              <Card
                key={set.id}
                className="shadow-lg bg-light3 border border-border rounded-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative p-4">
                  {/* Pencil Icon */}
                  <PencilIcon className="absolute top-4 right-4 w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-500" />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-bold text-darkText">
                    {set.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between px-4 pb-2">
                  <AnimatedCircularProgressBar
                    max={100}
                    min={0}
                    value={setMasteryProgress}
                    gaugePrimaryColor="rgb(79 70 229)"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                  />
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {setTotalTerms} Terms
                    </p>
                    <p className="text-sm text-gray-500">
                      Known: {setKnownTerms}, Learning: {setLearningTerms},
                      Unknown: {setUnknownTerms}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <Button variant="outline">Edit Set</Button>
                  <Button>Practice</Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full">No sets available.</p>
        )}
      </div>
    </div>
  );
};

export default TopicDetails;
