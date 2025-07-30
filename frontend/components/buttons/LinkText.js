// Importing React hooks
import { useState } from "react";

// Importing React Native Components
import { StyleSheet, Pressable, Text, View } from "react-native";

const LinkText = ({
  plainText = "",
  linkedText = "",
  linkAction = () => {},
  linkPos = "start",
  theme,
}) => {
  // Variables
  const [isPressed, setIsPressed] = useState(false);
  return (
    // Link
    <View style={styles.loginText}>
      {linkPos === "end" && (
        <Text style={[styles.text, { color: theme.text }]}>
          {plainText + " "}
        </Text>
      )}
      <Pressable
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={linkAction}
      >
        <Text
          style={[
            styles.link,
            { color: theme.primary },
            isPressed && styles.linkPressed,
          ]}
        >
          {linkedText}
        </Text>
      </Pressable>
      {linkPos === "start" && (
        <Text style={[styles.text, { color: theme.text }]}>
          {" " + plainText}
        </Text>
      )}
    </View>
  );
};

export default LinkText;

// Styles
const styles = StyleSheet.create({
  loginText: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#1b1b1b",
  },
  link: {
    fontSize: 16,
    color: "#0096c7",
    textDecorationLine: "underline",
  },
  linkPressed: {
    color: "#dc3545",
  },
});
