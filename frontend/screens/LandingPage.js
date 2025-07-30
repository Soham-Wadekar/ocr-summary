import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  AppLogo,
  AppLogoDark,
  AppName,
  AppTagline,
  CompanyLogoBackground,
} from "../config/AppConfig";
import { useTheme } from "../hooks/useTheme";

import RoundedButton from "../components/buttons/RoundedButton";

const LandingPage = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogin = () => {
    navigation.navigate("loginPage");
  };

  const handleSignUp = () => {
    navigation.navigate("signUpPage");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.viewContainer}>
        <ImageBackground
          source={{
            uri: CompanyLogoBackground,
          }}
          resizeMethod="cover"
          style={styles.imageBg}
        >
          <View style={styles.imageOverlay} />
          <View
            style={[
              styles.contentBox,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Image
              source={{
                uri:
                  theme.name === "light"
                    ? AppLogo
                    : AppLogoDark,
              }}
              style={styles.logo}
            />
            <Text style={[styles.header, { color: theme.primary }]}>
              {AppName}
            </Text>
            <Text style={[styles.tagline, { color: theme.secondary }]}>
              {AppTagline}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View
        style={[styles.btnContainer, { backgroundColor: theme.background }]}
      >
        <RoundedButton label="Login" action={handleLogin} theme={theme} />
        <Text style={[styles.text, { color: theme.text }]}>or</Text>
        <RoundedButton label="Sign Up" action={handleSignUp} theme={theme} />
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    flex: 0.6,
    width: "100%",
    marginTop: StatusBar.currentHeight,
  },
  imageBg: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  contentBox: {
    width: "70%",
    height: "60%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
  },
  btnContainer: {
    flex: 0.4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
