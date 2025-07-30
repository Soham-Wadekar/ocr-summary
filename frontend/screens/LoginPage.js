// Necessary Imports
import { useState } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TextInputField from "../components/inputFields/TextInput";
import RoundedButton from "../components/buttons/RoundedButton";
import LinkText from "../components/buttons/LinkText";
import { useTheme } from "../hooks/useTheme";
import { AppLogo, AppLogoDark } from "../config/AppConfig";
import useApi from "../hooks/useApi";

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { error, data, request } = useApi();

  // Validation Logic
  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$&]).{8,}$/;

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

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Logic
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await request("login", "POST", {
          email,
          password,
        });

        await AsyncStorage.setItem("userToken", response.token);
        await AsyncStorage.setItem("userName", response.user);
        await AsyncStorage.setItem("userId", String(response.id));

        if (response.ok) {
          setEmail("");
          setPassword("");
          setErrors({});
        }

        Toast.show({
          type: "success",
          text1: "Login Successful!",
          visibilityTime: 3000,
        });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "homePage" }],
          })
        );

      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Login Failed!",
          text2: "Invalid username or password",
          visibilityTime: 3000,
        });
      }
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    console.log("Forgot Password Clicked"); // TODO: Updated with real function
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100,
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
        <Text style={[styles.header, { color: theme.primary }]}>Login</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
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
      </View>

      <View style={styles.btnContainer}>
        <RoundedButton label="Login" action={handleSubmit} theme={theme} />
        <LinkText
          plainText="Forgot Password?"
          linkedText="Click Here"
          linkAction={handleForgotPassword}
          linkPos="end"
          theme={theme}
        />
      </View>
    </ScrollView>
  );
};

export default LoginPage;

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
    alignItems: "center",
  },
});
