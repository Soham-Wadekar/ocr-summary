import { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import {
  AppLogo,
  AppLogoDark,
  AppName,
  AppTagline,
  CompanyLogo,
  CompanyName,
} from "../config/AppConfig";
import { useTheme } from "../hooks/useTheme";

const LoadingPage = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  // Navigation after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("landingPage");
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* App Logo + Name */}
      <View style={[styles.logoContainer, { backgroundColor: theme.card }]}>
        <Image
          source={{
            uri: theme.name === "light" ? AppLogo : AppLogoDark,
          }}
          style={styles.logo}
        />
        <Text style={[styles.appName, { color: theme.primary }]}>
          {AppName}
        </Text>
        <Text style={[styles.tagline, { color: theme.secondary }]}>
          {AppTagline}
        </Text>
      </View>

      {/* Loader */}
      <ActivityIndicator
        size="large"
        color={theme.secondary}
        style={styles.loader}
      />

      {/* Company Footer */}
      <View style={styles.footer}>
        <Text style={[styles.poweredBy, { color: theme.muted }]}>
          Powered by
        </Text>
        <View style={styles.companyRow}>
          <Image
            source={{
              uri: CompanyLogo,
            }}
            style={styles.companyLogo}
          />
          <Text style={[styles.companyName, { color: theme.text }]}>
            {CompanyName}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "75%",
    borderRadius: 20,
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
  },
  loader: {
    transform: [{ scale: 2 }],
  },
  footer: {
    alignItems: "center",
  },
  poweredBy: {
    fontSize: 14,
    marginBottom: 5,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    height: 30,
    width: 30,
    marginRight: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "500",
  },
});
