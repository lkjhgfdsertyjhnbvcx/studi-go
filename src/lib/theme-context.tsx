"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemeColor = "neon" | "red" | "blue";

interface ThemeContextType {
  primaryColor: ThemeColor;
  gravityStrength: number;
  backgroundImage: string | null;
  backgroundColor: string; // Hex or generic color
  logoUrl: string | null;
  logoSize: number;
  setPrimaryColor: (color: ThemeColor) => void;
  setGravityStrength: (strength: number) => void;
  setBackgroundImage: (url: string | null) => void;
  setBackgroundColor: (color: string) => void;
  setLogoUrl: (url: string | null) => void;
  setLogoSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState<ThemeColor>("neon");
  const [gravityStrength, setGravityStrength] = useState<number>(1);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(100);

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        gravityStrength,
        backgroundImage,
        backgroundColor,
        logoUrl,
        logoSize,
        setPrimaryColor,
        setGravityStrength,
        setBackgroundImage,
        setBackgroundColor,
        setLogoUrl,
        setLogoSize,
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
