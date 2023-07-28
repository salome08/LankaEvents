import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme, Appearance } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import AuthProvider from "./src/contexts/AuthContext";
import config from "./config";
import ThemeProvider from "./src/contexts/ThemContext";
import EventProvider from "./src/contexts/EventContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const theme = useColorScheme();
  const colorScheme = Appearance.getColorScheme();
  const apiBaseUrl = config.API_BASE_URL;
  const environment = config.ENV;

  console.log({ environment });
  console.log({ apiBaseUrl });

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <EventProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
