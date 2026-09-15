// src/utils/storage.ts — FUNCTIONS ONLY
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppSettings, ConversionRecord, DEFAULT_SETTINGS } from "@/types/storage";

const SETTINGS_KEY = "unitnest_settings";
const HISTORY_KEY = "unitnest_history";

// ---------- Settings ----------
export async function getSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

// ---------- Conversion History ----------
export async function getHistory(): Promise<ConversionRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ConversionRecord[];
  } catch {
    return [];
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function addHistoryEntry(entry: Omit<ConversionRecord, "id" | "createdAt">) {
  const history = await getHistory();

  const newEntry: ConversionRecord = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  const updated = [newEntry, ...history].slice(0, 100);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return newEntry;
}

export async function clearHistory() {
  await AsyncStorage.removeItem(HISTORY_KEY);
}