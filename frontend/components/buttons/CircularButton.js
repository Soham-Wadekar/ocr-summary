import { useState, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DarkenColor from "../utils/DarkenColor";

const CircularButton = ({
  icon = "",
  action = () => {},
  size = 40,
  color = "#fff",
  iconColor = "#000",
  alignment = {},
  isEditable = false,
  onChange = {},
  iconSize = size / 2,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  if (isEditable) {
    (icon = onChange.icon),
      (color = onChange.color),
      (iconColor = onChange.iconColor);
  }
  const dynamicColor = isPressed ? DarkenColor(color, 0.2) : color;

  // Animation Logic
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const buttonPressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const buttonPressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={buttonPressIn}
      onPressOut={buttonPressOut}
      onPress={action}
    >
      <Animated.View
        style={[
          styles.button,
          alignment,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: dynamicColor,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Ionicons name={icon} size={iconSize} color={iconColor} />
      </Animated.View>
    </Pressable>
  );
};

export default CircularButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
