// src/constants/theme.ts

type ThemeMode = "light" | "dark";

export const lightTheme = {
  mode: "light" as ThemeMode,

  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  subtext: "#64748B",
  border: "#E2E8F0",

  error: "#EF4444",
  success: "#16A34A",   // ✅ confirmed

  primary: "#6366F1",
  accent: "#2DD4BF",

  headerBg: "#152A4E",
  headerTextPrimary: "#FFFFFF",
  headerTextSecondary: "#7FB2FF",

  tabBarBg: "#FFFFFF",
  tabActive: "#0A84FF",
  tabInactive: "#8E8E93",
};

export const darkTheme = {
  mode: "dark" as ThemeMode,

  background: "#0F172A",
  surface: "#1E293B",
  text: "#F8FAFC",
  subtext: "#94A3B8",
  border: "#334155",

  error: "#FF453A",
  success: "#16A34A",   // same success color kept consistent across themes

  primary: "#6366F1",
  accent: "#2DD4BF",

  headerBg: "#0A1830",
  headerTextPrimary: "#FFFFFF",
  headerTextSecondary: "#7FB2FF",

  tabBarBg: "#0F172A",
  tabActive: "#2DD4BF",
  tabInactive: "#94A3B8",
};

export type Theme = typeof lightTheme;