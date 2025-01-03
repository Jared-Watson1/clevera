// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace the following with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGsIweq9ipmMSr2fsY-W1-FR8YEznh6no",
  authDomain: "clevera-1.firebaseapp.com",
  projectId: "clevera-1",
  storageBucket: "clevera-1.firebasestorage.app",
  messagingSenderId: "351748657593",
  appId: "1:351748657593:web:2ef0b1908844ef10bc6668",
  measurementId: "G-MGWM95KNKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
