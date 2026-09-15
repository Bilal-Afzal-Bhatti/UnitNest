// src/types/storage.ts — TYPES ONLY, nothing else
export type ThemeMode = "light" | "dark" | "system";

export type AppSettings = {
  theme: ThemeMode;
  decimalPlaces: number;
  lastCategory: string;
};

export type ConversionRecord = {
  id: string;
  category: string
  inputValue: number;
  fromUnit: string;
  outputValue: number;
  toUnit: string;
  createdAt: string; // ISO string
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  decimalPlaces: 4,
  lastCategory: "length",
};