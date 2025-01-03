// src/pages/Login.tsx
"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import TextInput from "@/components/ui/TextInput";
import PasswordInput from "@/components/ui/PasswordInput";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
// import { useToast } from "@/hooks/use-toast"; // Correct import path

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // const { toast } = useToast(); // Destructure toast from useToast

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Show success toast
      // toast({
      //   variant: "default",
      //   title: "Login Successful",
      //   description: "Welcome back to Clevera!",
      // });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Customize error messages based on Firebase error codes
        // let errorMessage = err.message;
        // if (err.message.includes("user-not-found")) {
        // errorMessage = "No user found with this email.";
        // } else if (err.message.includes("wrong-password")) {
        // errorMessage = "Incorrect password.";
        // } else if (err.message.includes("invalid-email")) {
        // errorMessage = "The email address is invalid.";
        // }
        // toast({
        //   variant: "destructive",
        //   title: "Login Failed",
        //   description: errorMessage,
        // });
      } else {
        // toast({
        //   variant: "destructive",
        //   title: "Login Failed",
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
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@mail.com"
            required
          />
          <PasswordInput password={password} setPassword={setPassword} />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-primary border-light2 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-darkText"
              >
                Remember me
              </label>
            </div>
            <Link to="#" className="text-sm text-light5 hover:text-light4">
              Forgot Password?
            </Link>
          </div>
          <InteractiveHoverButton
            type="submit"
            text={loading ? "Signing In..." : "Sign In"}
            disabled={loading}
            className="w-full mb-4"
          />
        </form>
        <p className="mt-4 text-center text-darkText">
          Don't have an account?{" "}
          <Link to="/register" className="text-light5 hover:text-light4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
