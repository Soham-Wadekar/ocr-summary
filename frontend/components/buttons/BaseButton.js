import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import DarkenColor from "../utils/DarkenColor";

const BaseButton = ({ label = "", action = () => {}, filled = false, theme }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const backgroundColor = filled ? theme.primary : theme.background;
  const textColor = filled ? theme.background : theme.primary;
  const borderColor = theme.primary;

  const animatedColor = isPressed
    ? DarkenColor(backgroundColor, 0.2)
    : backgroundColor;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={action}>
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: animatedColor,
            borderColor,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    width: 100,
    height: 45,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
