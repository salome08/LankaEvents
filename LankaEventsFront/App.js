import { BottomTabNavigation } from "./src/navigation/BottomNavigation";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorScheme, Appearance } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import config from "./config";
import ThemeProvider from "./src/contexts/ThemContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const theme = useColorScheme();
  const colorScheme = Appearance.getColorScheme();
  const apiBaseUrl = config.API_BASE_URL;
  const environment = config.ENV;

  console.log({ environment });
  console.log({ apiBaseUrl });
  // console.log("1", theme);
  // console.log("2", colorScheme);
  // theme={theme === "dark" ? DarkTheme : DefaultTheme}
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
