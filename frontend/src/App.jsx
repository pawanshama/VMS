import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Registered from "./pages/registered";
import CreateEvent from "./pages/createEvent";
import NewLogEvent from "./pages/newLogEvent";
import CreatedEvent from "./pages/createdEvent";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <NewLogEvent /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/create_event" element={authUser ? authUser.responsibility? <CreateEvent /> :<Navigate to="/" /> : <Navigate to="/" />} />
        <Route path="/created/time/operation" element={authUser ? authUser.responsibility? <CreatedEvent /> :<Navigate to="/" /> : <Navigate to="/" />} />
        <Route path="/signup" element={authUser ? authUser.responsibility? <SignUpPage /> : <Navigate to="/" /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/registered" element={authUser ? <Registered /> : <Navigate to="/login" />} />
        {/* <Route path="/created/time/operation" element={authUser ? <CreatedEvent /> : <Navigate to="/login" />} /> */}
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
