import { View, Text, StyleSheet, Button } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../hooks/useTheme";
import BaseButton from "../components/buttons/BaseButton";

const ToastPress = (type = "") => {
  Toast.show({
    type: type,
    text1: `${type}: Main Text`,
    text2: `${type}: Sub Text`,
    topOffset: 40,
    swipeable: true,
  });
};

const TestScreen = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>Page has loaded</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button title="error" onPress={() => ToastPress("error")} />
        <Button title="info" onPress={() => ToastPress("info")} />
        <Button title="success" onPress={() => ToastPress("success")} />
        <Button title="warning" onPress={() => ToastPress("warning")} />
      </View>
      <Button title="Change Theme" onPress={toggleTheme} />
      <BaseButton label="Press" theme={theme} />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },
});
