"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeColor = "neon" | "red" | "blue";
export type Mode = "light" | "dark";

interface ThemeContextType {
  primaryColor: ThemeColor;
  gravityStrength: number;
  backgroundImage: string | null;
  backgroundColor: string; // Hex or generic color
  logoUrl: string | null;
  logoSize: number;
  mode: Mode;
  setPrimaryColor: (color: ThemeColor) => void;
  setGravityStrength: (strength: number) => void;
  setBackgroundImage: (url: string | null) => void;
  setBackgroundColor: (color: string) => void;
  setLogoUrl: (url: string | null) => void;
  setLogoSize: (size: number) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState<ThemeColor>("neon");
  const [gravityStrength, setGravityStrength] = useState<number>(1);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(100);
  const [mode, setMode] = useState<Mode>("dark");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as Mode;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.document.documentElement.classList.contains("light")) {
      setMode("light");
    }
    setMounted(true);
  }, []);

  // Apply theme class to html element when mode changes
  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    localStorage.setItem("theme-mode", mode);
  }, [mode, mounted]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        gravityStrength,
        backgroundImage,
        backgroundColor,
        logoUrl,
        logoSize,
        mode,
        setPrimaryColor,
        setGravityStrength,
        setBackgroundImage,
        setBackgroundColor,
        setLogoUrl,
        setLogoSize,
        setMode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
