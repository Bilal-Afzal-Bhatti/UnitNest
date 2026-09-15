import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

const SPLASH_DURATION = 3000; // reset from 10000 -> 3 seconds

const TITLE_WORDS = ["Unit", "Nest"];

export default function Index() {
  const [fontsLoaded, fontError] = useFonts({ Pacifico_400Regular });

  const mainLogoTranslateX = useRef(new Animated.Value(-150)).current;
  const mainLogoOpacity = useRef(new Animated.Value(0)).current;
  const subLogoTranslateX = useRef(new Animated.Value(150)).current;
  const subLogoOpacity = useRef(new Animated.Value(0)).current;

  const wordAnims = useRef(
    TITLE_WORDS.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(10),
    }))
  ).current;

  useEffect(() => {
    // ✅ only wait for font if it's actually still loading AND hasn't errored
    if (!fontsLoaded && !fontError) return;

    const wordAnimations = wordAnims.map((anim) =>
      Animated.parallel([
        Animated.timing(anim.opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(anim.translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
      ])
    );

    Animated.sequence([
      Animated.parallel([
        Animated.timing(mainLogoTranslateX, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(mainLogoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(subLogoTranslateX, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(subLogoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.stagger(150, wordAnimations),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [fontsLoaded, fontError]);

  // ✅ proceed even if the font failed — just fall back to the system font
  if (!fontsLoaded && !fontError) return null;

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require("../../assets/app_images/app_logo.jpg")}
        style={[
          styles.appLogo,
          { opacity: mainLogoOpacity, transform: [{ translateX: mainLogoTranslateX }] },
        ]}
        resizeMode="contain"
      />

      <Animated.Image
        source={require("../../assets/app_images/sub logo.jpg")}
        style={[
          styles.subLogo,
          { opacity: subLogoOpacity, transform: [{ translateX: subLogoTranslateX }] },
        ]}
        resizeMode="contain"
      />

      <View style={styles.titleRow}>
        {TITLE_WORDS.map((word, index) => (
          <Animated.Text
            key={word + index}
            style={[
              styles.title,
              { color: index === 0 ? "#152A4E" : "#2E7CF6" },
              // ✅ fall back to a normal font if Pacifico failed to load
              fontError ? { fontFamily: undefined } : null,
              {
                opacity: wordAnims[index].opacity,
                transform: [{ translateY: wordAnims[index].translateY }],
              },
            ]}
          >
            {word}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  appLogo: { width: 200, height: 200, marginBottom: 16 },
  subLogo: { width: 130, height: 130, marginBottom: 24 },
  titleRow: { flexDirection: "row" },
  title: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "Pacifico_400Regular",
  },
});