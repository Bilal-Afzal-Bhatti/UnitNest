// src/app/(tabs)/history.tsx
import { useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { getHistory } from "@/utils/storage";
import { ConversionRecord } from "@/types/storage";
import { useTheme } from "@/context/ThemeContext";

export default function History() {
  const { theme } = useTheme();
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  // ✅ re-fetch every time this screen becomes visible — not just once on first mount
  useFocusEffect(
    useCallback(() => {
      getHistory().then(setHistory);
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ color: theme.subtext }}>No conversions yet.</Text>}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <Text style={{ color: theme.text }}>
              {item.inputValue} {item.fromUnit} → {item.outputValue} {item.toUnit}
            </Text>
            <Text style={{ color: theme.subtext, fontSize: 12 }}>
              {item.category} • {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}