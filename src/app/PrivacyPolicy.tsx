// src/components/PrivacyPolicy.tsx

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { typography } from "@/constants/typography";

export default function PrivacyPolicy() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.updated}>Last updated: September 2026</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>1. Introduction & No Account Required</Text>
          <Text style={styles.paragraph}>Welcome to UnitNest. We respect your privacy and are committed to protecting your personal data. No account, sign-up, or login is required to use UnitNest; you can open the app and start converting immediately.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>2. Local Calculations & Device Storage</Text>
          <Text style={styles.paragraph}>• Core calculations happen locally on your device rather than being transmitted to a remote server.{"\n"}• Conversion history and app preferences stay strictly on your device storage and are never uploaded to the cloud.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>3. Analytics & Advertising SDKs</Text>
          <Text style={styles.paragraph}>• Analytics: We do not track personal user behavior; any minimal diagnostic data is completely anonymized and used only to improve app performance.{"\n"}• Advertising: UnitNest operates entirely without third-party advertising SDKs, ensuring an ad-free and untracked experience.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>4. Data Deletion Behavior</Text>
          <Text style={styles.paragraph}>Since all conversion history and user settings are saved locally on your device, uninstalling the application or clearing local app data will completely and instantly remove all stored records.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>5. Contact Us</Text>
          <Text style={styles.paragraph}>If you have any questions, feedback, or concerns regarding our privacy practices, please feel free to reach out through our official support channels within the repository.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  updated: {
    fontSize: 13,
    marginBottom: 20,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
});