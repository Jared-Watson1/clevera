// src/pages/Register.tsx
"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase"; // Ensure correct import path
import { doc, setDoc } from "firebase/firestore";
import TextInput from "@/components/ui/TextInput";
import PasswordInput from "@/components/ui/PasswordInput";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
// import { useToast } from "@/hooks/use-toast"; // Correct import path

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //   const { toast } = useToast(); // Destructure toast from useToast

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!agree) {
      //   toast({
      //     variant: "destructive",
      //     title: "Registration Failed",
      //     description: "You must agree to the Terms and Conditions.",
      //   });
      return;
    }

    if (password !== confirmPassword) {
      //   toast({
      //     variant: "destructive",
      //     title: "Registration Failed",
      //     description: "Passwords do not match.",
      //   });
      return;
    }

    setLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update Firebase profile with displayName
      await updateProfile(user, {
        displayName: username,
      });

      // Save user data to Firestore under "users/{uid}"
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        createdAt: new Date(),
      });

      // Create userProfile/profile document
      await setDoc(doc(db, "users", user.uid, "userProfile", "profile"), {
        id: user.uid,
        name: username,
        level: 1,
        experience: 0,
        starredSets: [],
      });

      // Show success toast
      //   toast({
      //     variant: "default",
      //     title: "Registration Successful",
      //     description: "Welcome to Clevera!",
      //   });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Customize error messages based on Firebase error codes
        // let errorMessage = err.message;
        if (err.message.includes("email-already-in-use")) {
          //   errorMessage = "The email address is already in use.";
        } else if (err.message.includes("invalid-email")) {
          //   errorMessage = "The email address is invalid.";
        } else if (err.message.includes("weak-password")) {
          //   errorMessage = "The password is too weak.";
        }

        // toast({
        //   variant: "destructive",
        //   title: "Registration Failed",
        //   description: errorMessage,
        // });
      } else {
        // toast({
        //   variant: "destructive",
        //   title: "Registration Failed",
        //   description: "An unknown error occurred.",
        // });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light1 p-4">
      <div className="bg-light3 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-darkText text-center mb-4">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <TextInput
            label="Username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <TextInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <PasswordInput password={password} setPassword={setPassword} />
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
          />
          <div className="flex items-center mb-4">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 text-primary border-light2 rounded"
              required
            />
            <label htmlFor="agree" className="ml-2 text-sm text-darkText">
              I agree to the{" "}
              <a href="#" className="text-light5 hover:text-light4">
                Terms and Conditions
              </a>
            </label>
          </div>
          <div className="flex justify-end mt-6">
            <InteractiveHoverButton
              type="submit"
              text={loading ? "Registering..." : "Register"}
              disabled={loading}
            />
          </div>
        </form>
        <p className="mt-4 text-center text-darkText">
          Already have an account?{" "}
          <Link to="/login" className="text-light5 hover:text-light4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
