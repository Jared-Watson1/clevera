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
import { UserProvider } from "@/context/UserContext";
import { TopicsProvider } from "@/context/TopicsContext";
// import Toaster from "@/components/ui/toaster"; // Ensure toaster is imported for feedback notifications

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
      <div className="min-h-screen flex justify-center items-center bg-light1 text-darkText">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <UserProvider>
      <TopicsProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            {/* <Toaster /> Add Toaster component for consistent notifications */}
          </div>
        </Router>
      </TopicsProvider>
    </UserProvider>
  );
}

export default App;
