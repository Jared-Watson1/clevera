// src/context/TopicsContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { db } from "@/firebase";
import { useUser } from "@/context/UserContext";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  //   updateDoc,
  deleteDoc,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";

// Define Term Interface
interface Term {
  id: string;
  term: string;
  definition: string;
}

// Define Set Interface
interface Set {
  id: string;
  name: string;
  description?: string;
  terms: Term[];
}

// Define Topic Interface
interface Topic {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  sets: Set[];
}

// Define Context Type
interface TopicsContextType {
  topics: Topic[];
  addTopic: (topic: Omit<Topic, "id" | "sets">) => Promise<void>;
  addSet: (
    setName: string,
    topicId: string,
    description?: string
  ) => Promise<void>;
  moveSet: (
    setId: string,
    sourceTopicId: string,
    destinationTopicId: string
  ) => Promise<void>;
}

export const TopicsContext = createContext<TopicsContextType>({
  topics: [],
  addTopic: async () => {},
  addSet: async () => {},
  moveSet: async () => {},
});

// Provider Component
export const TopicsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [topics, setTopics] = useState<Topic[]>([]);

  // To store unsubscribe functions for sets
  const [setsUnsubscribes, setSetsUnsubscribes] = useState<Unsubscribe[]>([]);

  // Listen for real-time updates on topics
  useEffect(() => {
    if (!user) {
      setTopics([]);
      // Clean up any existing sets listeners
      setsUnsubscribes.forEach((unsubscribe) => unsubscribe());
      setSetsUnsubscribes([]);
      return;
    }

    // Reference to user's topics collection
    const topicsRef = collection(db, "users", user.uid, "topics");

    // Listen for real-time updates on topics
    const unsubscribeTopics = onSnapshot(topicsRef, (snapshot) => {
      const newTopics: Topic[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        name: docSnap.data().name,
        emoji: docSnap.data().emoji,
        description: docSnap.data().description || "",
        sets: [], // Initial empty sets, to be filled by sets listeners
      }));

      setTopics(newTopics);
    });

    return () => {
      unsubscribeTopics();
      // Clean up sets listeners
      setsUnsubscribes.forEach((unsubscribe) => unsubscribe());
      setSetsUnsubscribes([]);
    };
  }, [user]);

  // Listen for real-time updates on sets for each topic
  useEffect(() => {
    // Clean up existing sets listeners
    setsUnsubscribes.forEach((unsubscribe) => unsubscribe());
    setSetsUnsubscribes([]);

    if (!user) {
      return;
    }

    // For each topic, set up a listener for its sets
    const newUnsubscribes: Unsubscribe[] = topics.map((topic) => {
      const setsRef = collection(
        db,
        "users",
        user.uid,
        "topics",
        topic.id,
        "sets"
      );
      return onSnapshot(setsRef, (snapshot) => {
        const updatedSets: Set[] = snapshot.docs.map((setDoc) => ({
          id: setDoc.id,
          name: setDoc.data().name,
          description: setDoc.data().description || "",
          terms: [], // Terms can be fetched when needed
        }));

        setTopics((prevTopics) =>
          prevTopics.map((t) => {
            if (t.id === topic.id) {
              return { ...t, sets: updatedSets };
            }
            return t;
          })
        );
      });
    });

    setSetsUnsubscribes(newUnsubscribes);

    return () => {
      newUnsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [topics, user]);

  // Add a new topic
  const addTopic = async (topic: Omit<Topic, "id" | "sets">) => {
    if (!user) return;

    const topicsRef = collection(db, "users", user.uid, "topics");
    await addDoc(topicsRef, {
      name: topic.name,
      emoji: topic.emoji,
      description: topic.description || "",
    });
    // The onSnapshot listener will update topics
  };

  // Add a new set
  const addSet = async (
    setName: string,
    topicId: string,
    description: string = ""
  ) => {
    if (!user) return;

    const setsRef = collection(
      db,
      "users",
      user.uid,
      "topics",
      topicId,
      "sets"
    );
    await addDoc(setsRef, {
      name: setName,
      description,
    });
    // The sets onSnapshot listener will update the sets for this topic
  };

  // Move a set between topics
  const moveSet = async (
    setId: string,
    sourceTopicId: string,
    destinationTopicId: string
  ) => {
    if (!user || !setId) return;

    const setDocRef = doc(
      db,
      "users",
      user.uid,
      "topics",
      sourceTopicId,
      "sets",
      setId
    );
    const setSnap = await getDoc(setDocRef);
    if (!setSnap.exists()) {
      console.warn("Set does not exist.");
      return;
    }
    const setData = setSnap.data();

    // Add the set to destination
    const destinationSetsRef = collection(
      db,
      "users",
      user.uid,
      "topics",
      destinationTopicId,
      "sets"
    );
    await addDoc(destinationSetsRef, {
      name: setData.name,
      description: setData.description || "",
    });

    // Delete the set from source
    await deleteDoc(setDocRef);
  };

  return (
    <TopicsContext.Provider value={{ topics, addTopic, addSet, moveSet }}>
      {children}
    </TopicsContext.Provider>
  );
};

// Custom Hook
export const useTopics = () => useContext(TopicsContext);
