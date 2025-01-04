// src/context/UserContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Define UserProfile Interface
interface UserProfile {
  id: string;
  name: string;
  level: number;
  experience: number;
  starredSets: string[]; // Array of set IDs
}

// Define Context Type
interface UserContextProps {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  toggleStarSet: (setId: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  userProfile: null,
  loading: true,
  toggleStarSet: async () => {},
});

// Provider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (currentUser: FirebaseUser) => {
    const uid = currentUser.uid;
    const userDocRef = doc(db, "users", uid, "userProfile", "profile");
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as UserProfile);
    } else {
      // If no profile exists, create one
      const newProfile: UserProfile = {
        id: uid,
        name: currentUser.displayName || "New User",
        level: 1,
        experience: 0,
        starredSets: [],
      };
      await setDoc(userDocRef, newProfile);
      setUserProfile(newProfile);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Toggle star set
  const toggleStarSet = async (setId: string) => {
    if (!user || !userProfile) return;

    const userDocRef = doc(db, "users", user.uid, "userProfile", "profile");

    let updatedStarredSets: string[] = [];
    if (userProfile.starredSets.includes(setId)) {
      // Unstar the set
      updatedStarredSets = userProfile.starredSets.filter((id) => id !== setId);
    } else {
      // Star the set
      updatedStarredSets = [...userProfile.starredSets, setId];
    }

    // Update Firestore
    await updateDoc(userDocRef, {
      starredSets: updatedStarredSets,
    });

    // Update local state
    setUserProfile({ ...userProfile, starredSets: updatedStarredSets });
  };

  return (
    <UserContext.Provider value={{ user, userProfile, loading, toggleStarSet }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUser = () => useContext(UserContext);
