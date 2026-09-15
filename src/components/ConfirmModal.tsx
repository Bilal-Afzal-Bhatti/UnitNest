// src/components/ConfirmModal.tsx
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { typography } from "@/constants/typography";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[typography.screenTitle, { color: theme.text, marginBottom: 8 }]}>
            {title}
          </Text>
          <Text style={[typography.body, { color: theme.subtext, marginBottom: 20 }]}>
            {message}
          </Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, { backgroundColor: theme.background, borderColor: theme.border, borderWidth: 1 }]}
              onPress={onCancel}
            >
              <Text style={[typography.body, { color: theme.text }]}>{cancelLabel}</Text>
            </Pressable>

            <Pressable
              style={[styles.button, { backgroundColor: destructive ? theme.error : theme.primary }]}
              onPress={onConfirm}
            >
              <Text style={[typography.body, { color: "#FFFFFF", fontWeight: "600" }]}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});