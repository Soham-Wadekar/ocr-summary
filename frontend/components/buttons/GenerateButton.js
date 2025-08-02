import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import Toast from "react-native-toast-message";

const GenerateButton = ({
  label = "",
  theme,
  action = () => {},
  disableConditions = {},
}) => {
  const { uploadCount, userBalance, generating } = disableConditions;
  const disabled = uploadCount === 0 || userBalance === 0 || generating;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

    if (!theme) {
    console.warn("Theme is undefined");
    return null;
  }

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

  const checkDisableCondition = () => {
    if (uploadCount === 0) {
      Toast.show({
        type: "info",
        text1: "No Files Uploaded",
        text2: "Please upload at least one file to continue.",
      });
    }
    if (generating) {
      Toast.show({
        type: "info",
        text1: "Generating Discharge Card",
        text2: "We’re processing your documents. This may take a few moments.",
      });
    }
    if (userBalance === 0) {
      Toast.show({
        type: "error",
        text1: "Insufficient Balance!",
        text2: "Please subscribe to access the features.",
      });
    }
  };
  return (
    <Pressable
      onPressIn={!disabled ? buttonPressIn : null}
      onPressOut={!disabled ? buttonPressOut : null}
      onPress={!disabled ? action : checkDisableCondition}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: !disabled ? theme.primary : theme.disabled,
            shadowColor: theme.disabled,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: !disabled ? theme.background : theme.muted },
          ]}
        >
          {label.toUpperCase()}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default GenerateButton;

const styles = StyleSheet.create({
  button: {
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: "center",
    margin: 10
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
