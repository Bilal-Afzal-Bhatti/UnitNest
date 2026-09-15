// src/components/Toast.tsx
import { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, Platform } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { typography } from "@/constants/typography";

type ToastProps = {
  visible: boolean;
  message: string;
  onHide: () => void;
  duration?: number; // ms
};

export default function Toast({ visible, message, onHide, duration = 1800 }: ToastProps) {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => onHide());
    }, duration);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: theme.surface,   // ✅ same surface color as cards/modals
          borderColor: theme.border,        // ✅ consistent border, matches rest of app
          borderWidth: 1,
          opacity,
        },
      ]}
      pointerEvents="none"
    >
      <Text style={[typography.body, { color: theme.text, textAlign: "center" }]}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    }),
  },
});