
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

import {
  isAuthenticated,
  validateSession,
} from "../../api/authService";

export default function Layout() {
  const navigate = useNavigate();

  // States
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // --- 🔐 AUTHENTICATION & SESSION LOGIC ---

  useEffect(() => {
    // 1. Check authentication on mount
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    // 2. Validate session when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        if (!validateSession()) {
          navigate("/login", { replace: true });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [navigate]);

  // 3. Prevent back button navigation after logout
  useEffect(() => {
    const handlePopState = () => {
      if (!isAuthenticated()) {
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // 4. Session timeout (30 minutes inactivity)
  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        alert("Session expired due to inactivity. Please login again.");
        navigate("/login", { replace: true });
        window.location.href = "/login";
      }, 30 * 60 * 1000);
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate]);

  // --- 📱 RESPONSIVENESS LOGIC ---

  useEffect(() => {
    const checkMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

      if (!mobileView) {
        setOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar Section */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <Header
        open={open}
        setOpen={setOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {/* Main Content Wrapper */}

      <div
        className="flex-1 transition-all duration-500 pt-16"
        style={{
          marginLeft: isMobile ? "0px" : open ? "240px" : "64px",
        }}
      >
        {/* Dynamic Route Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}