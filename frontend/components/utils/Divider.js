// React Native Imports
import { View, StyleSheet } from "react-native";

// Divider
const Divider = ({ theme = {} }) => {
  return <View style={[styles.line, { backgroundColor: theme.text }]} />;
};

export default Divider;

// Styles
const styles = StyleSheet.create({
  line: {
    height: 2,
    marginVertical: 10,
  },
});
