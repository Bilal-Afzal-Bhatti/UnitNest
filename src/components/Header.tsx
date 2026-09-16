// src/components/Header.tsx
import React from "react";
import { View, Pressable, StyleSheet, Platform, useWindowDimensions, Image } from "react-native"; // Import Image
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
          <Image
            source={require("@/assets/app_images/sub logo.jpg")}
            style={[
          styles.subLogo
        
        ]}
            resizeMode="contain"
          />
         
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
  subLogo: { width: 100, height: 100, marginBottom: 10 },
});