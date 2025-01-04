// src/components/DashboardHome.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useTopics } from "@/context/TopicsContext";
import { useUser } from "@/context/UserContext";
import {
  StarIcon as FilledStarIcon,
  StarIcon as OutlineStarIcon,
} from "lucide-react";

interface Term {
  id: string;
  term: string;
  definition: string;
}

interface Set {
  id: string;
  name: string;
  description?: string;
  terms: Term[];
}

const DashboardHome: React.FC = () => {
  const { topics } = useTopics();
  const { userProfile, toggleStarSet } = useUser();

  const [recentSets, setRecentSets] = useState<Set[]>([]);
  const [starredSets, setStarredSets] = useState<Set[]>([]);

  useEffect(() => {
    if (!userProfile) return;

    const fetchRecentSets = () => {
      // Collect all sets
      const allSets: Set[] = [];
      topics.forEach((topic) => {
        topic.sets.forEach((set) => {
          allSets.push(set);
        });
      });

      // Sort by descending id (assuming higher id is newer)
      const sortedSets = allSets.sort((a, b) => Number(b.id) - Number(a.id));
      setRecentSets(sortedSets.slice(0, 5)); // Top 5 recent sets
    };

    const fetchStarredSets = () => {
      if (userProfile.starredSets.length === 0) {
        setStarredSets([]);
        return;
      }

      const sets: Set[] = [];
      userProfile.starredSets.forEach((setId) => {
        topics.forEach((topic) => {
          const foundSet = topic.sets.find((set) => set.id === setId);
          if (foundSet) {
            sets.push(foundSet);
          }
        });
      });
      setStarredSets(sets);
    };

    fetchRecentSets();
    fetchStarredSets();
  }, [userProfile, topics]);

  const handleStarToggle = async (setId: string) => {
    await toggleStarSet(setId);
    // starredSets will update via UserContext
  };

  if (userProfile === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Welcome and Level Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Welcome back, {userProfile.name}!
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Level {userProfile.level}</p>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-gray-300 rounded-full mr-2">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{
                    width: `${userProfile.experience % 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-700">
                {userProfile.experience % 100}/100 XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Opened Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recently Opened</h3>
        {recentSets.length === 0 ? (
          <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              No recently opened sets. Start by creating a new set!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSets.map((set) => (
              <div
                key={set.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">{set.name}</h4>
                  <p className="text-sm text-gray-500">
                    {/* Optionally, add topic name */}
                  </p>
                </div>
                <button onClick={() => handleStarToggle(set.id)}>
                  {userProfile.starredSets.includes(set.id) ? (
                    <FilledStarIcon className="text-yellow-500 w-6 h-6" />
                  ) : (
                    <OutlineStarIcon className="text-gray-400 w-6 h-6" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Starred Sets Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Starred Sets</h3>
        {starredSets.length === 0 ? (
          <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              You haven't starred any sets yet. Star your favorite sets!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {starredSets.map((set) => (
              <div
                key={set.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">{set.name}</h4>
                  <p className="text-sm text-gray-500">
                    {/* Optionally, add topic name */}
                  </p>
                </div>
                <button onClick={() => handleStarToggle(set.id)}>
                  {userProfile.starredSets.includes(set.id) ? (
                    <FilledStarIcon className="text-yellow-500 w-6 h-6" />
                  ) : (
                    <OutlineStarIcon className="text-gray-400 w-6 h-6" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Placeholder for No Topics */}
      {topics.length === 0 && (
        <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">
            You have no topics. Start by adding a new topic!
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
