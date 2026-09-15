// src/components/Header.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderProps = {
  showBack?: boolean;
};

export default function Header({ showBack = false }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: insets.top,
          height: 56 + insets.top,
        },
      ]}
    >
      <View style={styles.innerRow}>
        {/* Left section: Back Button */}
        <View style={styles.leftContainer}>
          {showBack && (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              hitSlop={10}
            >
              <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#FFFFFF" />
            </Pressable>
          )}
        </View>

        {/* Center section: "Unit" + "Nest" — same two-tone colors as splash screen */}
        <View style={styles.centerContainer}>
          <Text style={[styles.title, { color: "#FFFFFF", fontSize: isTablet ? 26 : 20 }]}>
            Unit
          </Text>
          <Text style={[styles.title, { color: "#7FB2FF", fontSize: isTablet ? 26 : 20 }]}>
            Nest
          </Text>
        </View>

        {/* Right spacer to balance left width */}
        <View style={styles.rightContainer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#0066CC",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  innerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    width: 40,
  },
  title: {
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});