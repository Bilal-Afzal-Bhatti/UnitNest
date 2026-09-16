// src/app/(tabs)/settings.tsx
import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Alert, Share, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import ConfirmModal from "@/components/ConfirmModal";
import { getSettings, saveSettings, clearHistory } from "@/utils/storage";
import { useRouter } from "expo-router";

export default function Settings() {
  const { theme, setThemeMode } = useTheme();
  const [precision, setPrecision] = useState<number>(4); // default: 4 decimals

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  // inside component, replace the old useEffect + updatePrecision:
  useEffect(() => {
    getSettings().then((s) => setPrecision(s.decimalPlaces));
  }, []);
const router =useRouter();
  const updatePrecision = (value: number) => {
    setPrecision(value);
    saveSettings({ decimalPlaces: value });
  };

  // and Clear History now calls:
  // Add state


  // Replace handleClearHistory with:
  const handleClearHistory = () => setShowClearConfirm(true);

  const confirmClearHistory = async () => {
    await clearHistory();
    setShowClearConfirm(false);
  };


  const themeOptions: { label: string; value: "light" | "dark" | "system" }[] = [
    { label: "System Default", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  const precisionOptions = [2, 4, 6];



  const handleShareApp = async () => {
    try {
      await Share.share({
        message: "Check out UnitNest — a simple, fast unit converter app!",
      });
    } catch (err) {
      // silently ignore share cancellation
    }
  };
const gotopolicy = (p0: string) =>{
router.push("/PrivacyPolicy")
}
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open the link.");
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* ---------- Appearance ---------- */}
      <SectionTitle text="Appearance" color={theme.subtext} />
      <SectionCard color={theme.surface}>
        <RowLabel text="Theme" color={theme.text} />
        {themeOptions.map((opt) => (
          <OptionRow
            key={opt.value}
            label={opt.label}
            selected={theme.mode === opt.value}
            onPress={() => setThemeMode(opt.value)}
            textColor={theme.text}
            accentColor={theme.tabActive}
            borderColor={theme.border}
          />
        ))}
      </SectionCard>

      {/* ---------- Result Precision ---------- */}
      <SectionTitle text="Result Precision" color={theme.subtext} />
      <SectionCard color={theme.surface}>
        {precisionOptions.map((val) => (
          <OptionRow
            key={val}
            label={`${val} decimals`}
            selected={precision === val}
            onPress={() => updatePrecision(val)}
            textColor={theme.text}
            accentColor={theme.tabActive}
            borderColor={theme.border}
          />
        ))}
      </SectionCard>

      {/* ---------- General ---------- */}
      <SectionTitle text="General" color={theme.subtext} />
      <SectionCard color={theme.surface}>
        <ActionRow
          icon="trash-outline"
          label="Clear Conversion History"
          onPress={handleClearHistory}
          textColor="#FF453A"
          borderColor={theme.border}
        />
      

      </SectionCard>

 
        <ConfirmModal
          visible={showClearConfirm}
          title="Clear History"
          message="Are you sure you want to delete all conversion history? This cannot be undone."
          confirmLabel="Clear"
          destructive
          onConfirm={confirmClearHistory}
          onCancel={() => setShowClearConfirm(false)}
        />
      {/* ---------- About ---------- */}
      <SectionTitle text="About" color={theme.subtext} />
      <SectionCard color={theme.surface}>
        <RowLabel text="App Version" value="1.0.0" color={theme.text} valueColor={theme.subtext} />
        <ActionRow
          icon="document-text-outline"
          label="Privacy Policy"
          onPress={() => gotopolicy("p")}
          textColor={theme.text}
          borderColor={theme.border}
        />
        
        <ActionRow
          icon="star-outline"
          label="Rate App"
          onPress={() => handleOpenLink("https://play.google.com/store")}
          textColor={theme.text}
          borderColor={theme.border}
        />
        <ActionRow
          icon="share-social-outline"
          label="Share App"
          onPress={handleShareApp}
          textColor={theme.text}
          borderColor={theme.border}
        />
        <ActionRow
          icon="mail-outline"
          label="Contact Support"
          onPress={() => handleOpenLink("mailto:support@unitnest.app")}
          textColor={theme.text}
          borderColor="transparent" // last item, no divider
        />
      </SectionCard>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

/* ---------- Small reusable pieces ---------- */

function SectionTitle({ text, color }: { text: string; color: string }) {
  return <Text style={[styles.sectionTitle, { color }]}>{text}</Text>;
}

function SectionCard({ children, color }: { children: React.ReactNode; color: string }) {
  return <View style={[styles.card, { backgroundColor: color }]}>{children}</View>;
}

function RowLabel({
  text,
  value,
  color,
  valueColor,
}: {
  text: string;
  value?: string;
  color: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color }]}>{text}</Text>
      {value && <Text style={{ color: valueColor ?? color }}>{value}</Text>}
    </View>
  );
}

function OptionRow({
  label,
  selected,
  onPress,
  textColor,
  accentColor,
  borderColor,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  textColor: string;
  accentColor: string;
  borderColor: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, styles.pressableRow, { borderTopColor: borderColor, borderTopWidth: 1 }]}
    >
      <Text style={[styles.rowLabel, { color: textColor }]}>{label}</Text>
      {selected && <Ionicons name="checkmark-circle" size={20} color={accentColor} />}
    </Pressable>
  );
}

function ActionRow({
  icon,
  label,
  onPress,
  textColor,
  borderColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  textColor: string;
  borderColor: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, styles.pressableRow, { borderBottomColor: borderColor, borderBottomWidth: 1 }]}
    >
      <View style={styles.actionLeft}>
        <Ionicons name={icon} size={18} color={textColor} style={{ marginRight: 10 }} />
        <Text style={[styles.rowLabel, { color: textColor }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={textColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  pressableRow: {
    // shared touch target styling
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});