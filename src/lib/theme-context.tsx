"use client";

import React, { createContext, useContext, useState } from "react";

// デザインのデフォルト設定
const defaultTheme = {
  logoUrl: "/logo-new.png",
  backgroundImage: null,
  backgroundColor: "#ffffff",
  logoSize: 100,
};

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [logoUrl, setLogoUrl] = useState(defaultTheme.logoUrl);
  const [backgroundImage, setBackgroundImage] = useState(defaultTheme.backgroundImage);
  const [backgroundColor, setBackgroundColor] = useState(defaultTheme.backgroundColor);
  const [logoSize, setLogoSize] = useState(defaultTheme.logoSize);

  // 🌟 どんなに読み込み中でも、children（中身）を絶対に表示する！
  return (
    <ThemeContext.Provider value={{
      logoUrl, setLogoUrl,
      backgroundImage, setBackgroundImage,
      backgroundColor, setBackgroundColor,
      logoSize, setLogoSize
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
  if (!context) return defaultTheme;
  return context;
}
