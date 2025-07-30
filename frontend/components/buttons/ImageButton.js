import { useRef } from "react";
import { Animated, Pressable, Image } from "react-native";

const ImageButton = ({ imageUri = "", size = 40, action = () => {} }) => {
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
    <Pressable
      onPressIn={buttonPressIn}
      onPressOut={buttonPressOut}
      onPress={action}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      </Animated.View>
    </Pressable>
  );
};

export default ImageButton;
