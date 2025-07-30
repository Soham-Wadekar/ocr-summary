import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Centralized toast component
const BaseToast = ({ icon, bgColor, textColor, text1, text2 }) => (
  <View style={[styles.container, { backgroundColor: bgColor }]}>
    <Ionicons name={icon} size={25} color={textColor} style={{ marginRight: 10 }} />
    <View style={{ flex: 1 }}>
      <Text style={[styles.text, { color: textColor }]}>{text1}</Text>
      {text2 ? <Text style={[styles.subText, { color: textColor }]}>{text2}</Text> : null}
    </View>
  </View>
);

// Configured toast types
export const ToastConfig = {
  success: ({ text1, text2 }) =>
    BaseToast({
      icon: "checkmark-circle",
      bgColor: "#198754",
      textColor: "#f8f9fa",
      text1,
      text2,
    }),
  error: ({ text1, text2 }) =>
    BaseToast({
      icon: "close-circle",
      bgColor: "#dc3545",
      textColor: "#f8f9fa",
      text1,
      text2,
    }),
  info: ({ text1, text2 }) =>
    BaseToast({
      icon: "information-circle",
      bgColor: "#5dade2",
      textColor: "#1b1b1b",
      text1,
      text2,
    }),
  warning: ({ text1, text2 }) =>
    BaseToast({
      icon: "warning",
      bgColor: "#ffc107",
      textColor: "#1b1b1b",
      text1,
      text2,
    }),
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    marginTop: 2,
  },
});
