import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AIGeneratedContentWarning = ({ theme }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={24} color={theme.primary} />
      <View style={styles.textWrapper}>
        <Text style={[styles.text, { color: theme.text }]}>
          This discharge summary was generated using{" "}
          <Text style={[styles.keyword, { color: theme.primary }]}>
            artificial intelligence (AI)
          </Text>
          . Please{" "}
          <Text style={[styles.keyword, { color: theme.primary }]}>
            review all information carefully
          </Text>{" "}
          before using it for clinical decisions.{"\n"}
          <Text style={[styles.keyword, { color: theme.primary }]}>
            AI may not capture all patient-specific nuances or medical standards.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AIGeneratedContentWarning;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#0077c6",
    borderRadius: 10,
    padding: 12,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  keyword: {
    fontWeight: "bold",
  },
});
