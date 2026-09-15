// src/app/(tabs)/home.tsx
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { typography } from "@/constants/typography";

type CategoryItem = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

// Matches your flow diagram: Home / Categories -> Length, Weight, Temperature, Area, Volume, Speed, Time, Data Storage
const CATEGORIES: CategoryItem[] = [
  { id: "length", name: "Length", icon: "resize", color: "#0A84FF" },
  { id: "weight", name: "Weight", icon: "scale", color: "#FF9F0A" },
  { id: "temperature", name: "Temperature", icon: "thermometer", color: "#FF453A" },
  { id: "area", name: "Area", icon: "square", color: "#30D158" },
  { id: "volume", name: "Volume", icon: "water", color: "#64D2FF" },
  { id: "speed", name: "Speed", icon: "speedometer", color: "#BF5AF2" },
  { id: "time", name: "Time", icon: "time", color: "#FFD60A" },
  { id: "digital", name: "Data Storage", icon: "server", color: "#5E5CE6" },
];

export default function Home() {
  const { theme } = useTheme();

  // Tapping any category card routes to converter with that category —
  // matches the diagram: Length/Weight/.../Data Storage --> Converter
  const handleSelect = (categoryId: string) => {
    router.push({
      pathname: "/(tabs)/converter",
      params: { category: categoryId },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[typography.screenTitle, { color: theme.text, paddingHorizontal: 20, paddingTop: 16 }]}>
        Categories
      </Text>
      <Text style={[typography.body, { color: theme.subtext, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 8 }]}>
        What do you want to convert?
      </Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
              pressed && styles.cardPressed,
            ]}
            onPress={() => handleSelect(item.id)}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${item.color}22` }]}>
              <Ionicons name={item.icon} size={26} color={item.color} />
            </View>
            <Text style={[typography.categoryTitle, { color: theme.text, textAlign: "center" }]}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    width: "48%",
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 22,
    alignItems: "center",
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});