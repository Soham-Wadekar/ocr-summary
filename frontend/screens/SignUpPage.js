// Necessary Imports
import { useState } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import TextInputField from "../components/inputFields/TextInput";
import RoundedButton from "../components/buttons/RoundedButton";
import LinkText from "../components/buttons/LinkText";
import { AppLogo, AppLogoDark } from "../config/AppConfig";
import useApi from "../hooks/useApi";
import { useTheme } from "../hooks/useTheme";

const SignUpPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  // Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { error, data, request } = useApi();

  const handleLoginRequest = () => {
    navigation.navigate("loginPage");
  };

  // Validation Logic
  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$&]).{8,}$/;

    if (!username) {
      errors.username = "Username is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must have at least 1 uppercase letter, 1 symbol (@,#,$,&) and be 8+ characters long";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Logic
  const handleSubmit = async () => {
    console.log("button pressed")
    if (validateForm()) {
      try {
        const response = await request("signup", "POST", {
          username,
          email,
          password,
        });

        Toast.show({
          type: "success",
          text1: "Created an account!",
          text2: "You can now log in",
          visibilityTime: 3000,
        });

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        navigation.navigate("loginPage");
        console.log("Action done!")
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          text2: error.message,
          visibilityTime: 3000,
        });
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri:
              theme.name === "light"
                ? AppLogo
                : AppLogoDark,
          }}
          style={styles.logo}
        />
        <Text style={[styles.header, { color: theme.primary }]}>Sign Up</Text>
      </View>
      <View style={styles.form}>
        <TextInputField
          text={username}
          setText={setUsername}
          error={errors.username}
          label="Username"
          placeholder="John Doe"
          theme={theme}
        />
        <TextInputField
          text={email}
          setText={setEmail}
          error={errors.email}
          label="Email"
          type="email-address"
          theme={theme}
        />
        <TextInputField
          text={password}
          setText={setPassword}
          error={errors.password}
          label="Password"
          type="password"
          theme={theme}
        />
        <TextInputField
          text={confirmPassword}
          setText={setConfirmPassword}
          error={errors.confirmPassword}
          label="Confirm Password"
          type="password"
          theme={theme}
        />
      </View>
      <View style={styles.btnContainer}>
        <RoundedButton label="Sign Up" action={handleSubmit} theme={theme} />

        <LinkText
          plainText="Already a Member?"
          linkedText="Login"
          linkAction={handleLoginRequest}
          linkPos="end"
          theme={theme}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpPage;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    padding: 30,
    alignItems: "flex-start",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
