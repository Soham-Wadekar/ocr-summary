// Importing React hooks
import { useRef } from "react";

// Importing React Native Components
import { Animated, Pressable, StyleSheet, Text } from "react-native";

const RoundedButton = ({ label = "", action = () => {}, theme }) => {
  // Animation Logic
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const buttonPressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const buttonPressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    // Button
    <Pressable
      onPressIn={buttonPressIn}
      onPressOut={buttonPressOut}
      onPress={action}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: theme.tertiary,
            shadowColor: theme.secondary,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.primary }]}>
          {label.toUpperCase()}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default RoundedButton;

// Styles
const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    borderColor: "#0077c6",
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",

    // Shadow Properties
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
