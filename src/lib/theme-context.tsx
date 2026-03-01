"use client";

import React, { createContext, useContext, useState } from "react";

// 🌟 消えていた "ThemeColor" の定義を復活させ、エラーを解消します
export type ThemeColor = "neon" | "red" | "blue" | "green" | "purple" | "amber";

const defaultTheme = {
  logoUrl: "/logo-new.png",
  backgroundImage: null,
  backgroundColor: "#ffffff",
  logoSize: 100,
  primaryColor: "neon" as ThemeColor,
};

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [logoUrl, setLogoUrl] = useState(defaultTheme.logoUrl);
  const [backgroundImage, setBackgroundImage] = useState(defaultTheme.backgroundImage);
  const [backgroundColor, setBackgroundColor] = useState(defaultTheme.backgroundColor);
  const [logoSize, setLogoSize] = useState(defaultTheme.logoSize);
  const [primaryColor, setPrimaryColor] = useState(defaultTheme.primaryColor);

  return (
    <ThemeContext.Provider value={{
      logoUrl, setLogoUrl,
      backgroundImage, setBackgroundImage,
      backgroundColor, setBackgroundColor,
      logoSize, setLogoSize,
      primaryColor, setPrimaryColor
    }}>
      <div style={{ 
        backgroundColor: backgroundColor, 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) return { ...defaultTheme, setLogoUrl: () => {}, setBackgroundImage: () => {}, setBackgroundColor: () => {}, setLogoSize: () => {}, setPrimaryColor: () => {} };
  return context;
}
