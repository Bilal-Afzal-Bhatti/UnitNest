// src/components/UnitSelectorSheet.tsx
import { useState, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { typography } from "@/constants/typography";

export type UnitOption = {
  label: string; // e.g. "Meter (m)"
  value: string; // e.g. "meter" — unique key used for selection/comparison
};

type UnitSelectorSheetProps = {
  visible: boolean;
  title?: string; // defaults to "Select Unit"
  units: UnitOption[];
  selectedValue: string;
  onSelect: (unit: UnitOption) => void;
  onClose: () => void;
};

export default function UnitSelectorSheet({
  visible,
  title = "Select Unit",
  units,
  selectedValue,
  onSelect,
  onClose,
}: UnitSelectorSheetProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  // Live filter as user types — case-insensitive match on label
  const filteredUnits = useMemo(() => {
    if (!query.trim()) return units;
    return units.filter((u) => u.label.toLowerCase().includes(query.trim().toLowerCase()));
  }, [query, units]);

  const handleSelect = (unit: UnitOption) => {
    onSelect(unit);
    setQuery(""); // reset search for next time it opens
    onClose();
  };

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose} // Android back button support
    >
      {/* Dimmed backdrop — tapping it closes the sheet */}
      <Pressable style={styles.backdrop} onPress={handleClose}>
        {/* Prevent backdrop press from firing when tapping inside the sheet itself */}
        <Pressable
          style={[
            styles.sheet,
            { backgroundColor: theme.surface, paddingBottom: insets.bottom || 16 },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Drag handle indicator */}
          <View style={[styles.handle, { backgroundColor: theme.border }]} />

          {/* Header row */}
          <View style={styles.headerRow}>
            <Text style={[typography.screenTitle, { color: theme.text }]}>{title}</Text>
            <Pressable onPress={handleClose} hitSlop={10}>
              <Ionicons name="close" size={24} color={theme.subtext} />
            </Pressable>
          </View>

          {/* Search field */}
          <View style={[styles.searchBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Ionicons name="search" size={18} color={theme.subtext} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search units"
              placeholderTextColor={theme.subtext}
              style={[typography.body, styles.searchInput, { color: theme.text }]}
              autoCorrect={false}
            />
          </View>

          {/* Unit list */}
          <FlatList
            data={filteredUnits}
            keyExtractor={(item) => item.value}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={[typography.body, { color: theme.subtext, textAlign: "center", padding: 20 }]}>
                No units found.
              </Text>
            }
            renderItem={({ item }) => {
              const isSelected = item.value === selectedValue;
              return (
                <Pressable
                  onPress={() => handleSelect(item)}
                  style={[styles.unitRow, { borderBottomColor: theme.border }]}
                >
                  <Text
                    style={[
                      typography.body,
                      { color: isSelected ? theme.primary : theme.text },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
                  )}
                </Pressable>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: "75%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 10,
      },
      android: { elevation: 10 },
    }),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    padding: 0,
  },
  list: {
    marginTop: 4,
  },
  unitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});