import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomTabNavigation } from "./src/navigation/BottomNavigation";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorScheme, Appearance } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import config from "./config";

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
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
