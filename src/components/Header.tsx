// src/components/Header.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

type HeaderProps = {
  showBack?: boolean;
};

export default function Header({ showBack = false }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isTablet = width >= 768;

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: theme.headerBg,
          paddingTop: insets.top,
          height: 56 + insets.top,
        },
      ]}
    >
      <View style={styles.innerRow}>
        <View style={styles.leftContainer}>
          {showBack && (
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color={theme.headerTextPrimary} />
            </Pressable>
          )}
        </View>

        <View style={styles.centerContainer}>
          <Text style={[styles.title, { color: theme.headerTextPrimary, fontSize: isTablet ? 26 : 20 }]}>
            Unit
          </Text>
          <Text style={[styles.title, { color: theme.headerTextSecondary, fontSize: isTablet ? 26 : 20 }]}>
            Nest
          </Text>
        </View>

        <View style={styles.rightContainer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.15, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  innerRow: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  leftContainer: { width: 40, alignItems: "flex-start", justifyContent: "center" },
  centerContainer: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  rightContainer: { width: 40 },
  title: { fontWeight: "800", letterSpacing: 0.3 },
});