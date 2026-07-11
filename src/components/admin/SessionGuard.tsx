"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

export default function SessionGuard() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = () => {
    document.cookie = "admin_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.error("Session expired. Please log in again.");
    setTimeout(() => {
      window.location.href = "/en";
    }, 1500);
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, TIMEOUT_MS);
  };

  useEffect(() => {
    // Start the timer
    resetTimer();

    // Reset timer on any user activity
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null; // Renders nothing, just manages the session
}
