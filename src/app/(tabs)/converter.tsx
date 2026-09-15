// src/app/(tabs)/converter.tsx
import { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "@/context/ThemeContext";
import { typography } from "@/constants/typography";
import { CATEGORIES } from "@/constants/units";
import { convertValue, formatResult, isValidTemperature } from "@/utils/convert";
import { getSettings, addHistoryEntry, saveSettings } from "@/utils/storage";
import UnitSelectorSheet, { UnitOption } from "@/components/UnitSelectorSheet";
import Toast from "@/components/Toast";
export default function Converter() {
  const { theme } = useTheme();
  const params = useLocalSearchParams<{ category?: string }>();
  const categoryId = params.category || "length";
  const category = CATEGORIES[categoryId] ?? CATEGORIES.length;

  const [fromUnit, setFromUnit] = useState(category.defaultFrom);
  const [toUnit, setToUnit] = useState(category.defaultTo);
  const [inputValue, setInputValue] = useState("100");
  const [decimalPlaces, setDecimalPlaces] = useState(4);
  const [showFromSheet, setShowFromSheet] = useState(false);
  const [showToSheet, setShowToSheet] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [showCopiedModal, setShowCopiedModal] = useState(false);
const [copiedMessage, setCopiedMessage] = useState("");
  // Reset to this category's defaults whenever the user navigates in with a new category
  useEffect(() => {
    setFromUnit(category.defaultFrom);
    setToUnit(category.defaultTo);
    setInputValue("100");
  }, [categoryId]);

  // Load saved decimal precision (2 / 4 / 6) whenever screen gains focus, in case user changed it in Settings
  useFocusEffect(
    useCallback(() => {
      getSettings().then((s) => setDecimalPlaces(s.decimalPlaces));
    }, [])
  );

  // Remember the last visited category
  useEffect(() => {
    saveSettings({ lastCategory: categoryId });
  }, [categoryId]);

  const unitOptions: UnitOption[] = category.units.map((u) => ({ label: u.label, value: u.value }));

  const fromLabel = category.units.find((u) => u.value === fromUnit)?.label ?? fromUnit;
  const toLabel = category.units.find((u) => u.value === toUnit)?.label ?? toUnit;

  // Live conversion — recalculates on every keystroke, no Convert button
  const result = useMemo(() => {
    const num = parseFloat(inputValue);

    if (inputValue.trim() === "" || isNaN(num)) {
      setError(null);
      return "";
    }

    if (category.isTemperature && !isValidTemperature(num, fromUnit)) {
      setError("Below absolute zero — invalid temperature");
      return "";
    }

    setError(null);
    const converted = convertValue(category, num, fromUnit, toUnit);
    if (converted === null) return "";
    return formatResult(converted, decimalPlaces);
  }, [inputValue, fromUnit, toUnit, category, decimalPlaces]);

  // Swap: units flip AND the current result becomes the new input value
  const handleSwap = () => {
    const newInput = result || inputValue;
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(newInput);
  };

  const handleClear = () => {
    setInputValue("");
    setError(null);
  };
const handleCopy = async () => {
  if (!result) return;
  await Clipboard.setStringAsync(result);

  // Log this conversion to history at the moment the user confirms it's worth keeping
  const num = parseFloat(inputValue);
  if (!isNaN(num)) {
    await addHistoryEntry({
      category: category.id,
      inputValue: num,
      fromUnit,
      outputValue: parseFloat(result) || 0,
      toUnit,
    });
  }

  setCopiedMessage(`${result} ${toUnit} copied to clipboard.`);
  setShowCopiedModal(true);
};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[typography.screenTitle, { color: theme.text }]}>
        {category.name} Converter
      </Text>

      {/* FROM */}
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[typography.supportingText, { color: theme.subtext }]}>FROM</Text>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={theme.subtext}
          style={[typography.input, { color: theme.text, marginVertical: 8 }]}
        />
        <Pressable
          style={[styles.unitSelector, { borderColor: theme.border }]}
          onPress={() => setShowFromSheet(true)}
        >
          <Text style={[typography.body, { color: theme.text }]}>{fromLabel}</Text>
          <Ionicons name="chevron-down" size={18} color={theme.subtext} />
        </Pressable>
      </View>

      {/* SWAP */}
      <Pressable
        style={[styles.swapButton, { backgroundColor: theme.primary }]}
        onPress={handleSwap}
      >
        <Ionicons name="swap-vertical" size={22} color="#FFFFFF" />
      </Pressable>

      {/* TO */}
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[typography.supportingText, { color: theme.subtext }]}>TO</Text>
        <Text
          style={[
            typography.conversionResult,
            { color: error ? theme.error : theme.text, marginVertical: 8 },
          ]}
        >
          {error ? "—" : result || "0"}
        </Text>
        <Pressable
          style={[styles.unitSelector, { borderColor: theme.border }]}
          onPress={() => setShowToSheet(true)}
        >
          <Text style={[typography.body, { color: theme.text }]}>{toLabel}</Text>
          <Ionicons name="chevron-down" size={18} color={theme.subtext} />
        </Pressable>
      </View>

      {error && (
        <Text style={[typography.supportingText, { color: theme.error, marginTop: 4 }]}>
          {error}
        </Text>
      )}

      {/* ACTIONS */}
      <View style={styles.actionsRow}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={handleCopy}
          disabled={!result}
        >
          <Ionicons name="copy-outline" size={18} color="#FFFFFF" />
          <Text style={styles.actionText}>Copy Result</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }]}
          onPress={handleClear}
        >
          <Ionicons name="close-circle-outline" size={18} color={theme.text} />
          <Text style={[styles.actionText, { color: theme.text }]}>Clear</Text>
        </Pressable>
      </View>

      <UnitSelectorSheet
        visible={showFromSheet}
        units={unitOptions}
        selectedValue={fromUnit}
        onSelect={(unit) => setFromUnit(unit.value)}
        onClose={() => setShowFromSheet(false)}
      />

      <UnitSelectorSheet
        visible={showToSheet}
        units={unitOptions}
        selectedValue={toUnit}
        onSelect={(unit) => setToUnit(unit.value)}
        onClose={() => setShowToSheet(false)}
      />
      <Toast
  visible={showCopiedModal}
  message={copiedMessage}
  onHide={() => setShowCopiedModal(false)}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 16 },
  unitSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 12,
  },
  swapButton: {
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -14,
    marginBottom: -14,
    zIndex: 1,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});