// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { auth } from "./firebase";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
// import { Toaster } from "@/components/ui/toaster"; // Ensure correct import path

function PrivateRoute({ element }: { element: JSX.Element }) {
  const [user, setUser] = useState<FirebaseUser | null>(() => auth.currentUser); // Initialize with current user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return user ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {/* <Toaster /> Add Toaster here */}
    </Router>
  );
}

export default App;
