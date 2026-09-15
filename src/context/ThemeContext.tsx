// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "@/constants/theme";
import { getSettings, saveSettings } from "@/utils/storage";
import { ThemeMode } from "@/types/storage";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSettings().then((settings) => {
      setMode(settings.theme);
      setLoaded(true);
    });
  }, []);

  const resolvedIsDark = mode === "system" ? systemScheme === "dark" : mode === "dark";
  const theme = resolvedIsDark ? darkTheme : lightTheme;

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    saveSettings({ theme: newMode }); // persists under the shared "theme" key in your schema
  };

  const toggleTheme = () => setThemeMode(resolvedIsDark ? "light" : "dark");

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDark: resolvedIsDark, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}