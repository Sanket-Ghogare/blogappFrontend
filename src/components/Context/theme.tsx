import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  themeMode: "light" | "dark";
  darkTheme: () => void;
  lightTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("themeMode");
    return (stored === "dark" || stored === "light") ? stored : "light";
  });

  const darkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("themeMode", "dark");
    document.documentElement.classList.add("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("themeMode", "light");
    document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
