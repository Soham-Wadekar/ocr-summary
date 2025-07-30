// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Notification Imports
import Toast from "react-native-toast-message";

// Toast Configurations
import { ToastConfig } from "./config/ToastConfig";

// Screens
import TestScreen from "./screens/TestScreen";
import LoadingPage from "./screens/LoadingPage";
import LandingPage from "./screens/LandingPage";
import SignUpPage from "./screens/SignUpPage";
import LoginPage from "./screens/LoginPage";

import { ThemeProvider } from "./hooks/useTheme";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="testScreen" component={TestScreen} /> */}
          <Stack.Screen name="loadingPage" component={LoadingPage} />
          <Stack.Screen name="landingPage" component={LandingPage} />
          <Stack.Screen name="signUpPage" component={SignUpPage} />
          <Stack.Screen name="loginPage" component={LoginPage} />
        </Stack.Navigator>
        <Toast config={ToastConfig} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
