import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "../../src/navigation/BottomNavigation";
import EditProfile from "../screens/account/EditProfile";
import Likes from "../screens/account/Likes";
import NotificationCenter from "../screens/account/NotificationCenter";
import CookiePolicy from "../screens/legal/CookiePolicy";
import Privacy from "../screens/legal/Privacy";
import TermsOfService from "../screens/legal/TermsOfService";
import SelectDate from "../screens/search/SelectDate";
import SelectFilters from "../screens/search/SelectFilters";
import SelectLocation from "../screens/search/SelectLocation";
import AccountSettings from "../screens/settings/AccountSettings";
import LoginOptions from "../screens/settings/LoginOptions";
import ManageEvents from "../screens/settings/ManageEvents";
import CitySelection from "../screens/settings/CitySelection";
import HelpCenter from "../screens/support/HelpCenter";
import SuggestImprovements from "../screens/support/SuggestImprovements";
import SignIn from "../screens/auth/SignIn";
import Event from "../screens/Event";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemContext";
import HeaderBackButton from "../components/HeaderBackButton";
import HeaderEventActions from "../components/HeaderEventActions";
import UpdateName from "../screens/settings/UpdateName";
import UpdatePassword from "../screens/settings/UpdatePassword";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { themeColor } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderBackButton />,
        headerStyle: {
          backgroundColor: themeColor.background, // Set your desired header color here
        },
      }}
    >
      {/* Home */}
      <Stack.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />

      {/* Event */}
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          headerRight: () => <HeaderEventActions />,
          headerTitle: "",
        }}
      />

      {/* Search */}
      <Stack.Screen
        name="Date"
        component={SelectDate}
        options={{
          headerTitle: "When do you want to go out?",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: themeColor.searchText,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: themeColor.searchBackground,
          },
        }}
      />
      <Stack.Screen
        name="Filters"
        component={SelectFilters}
        options={{
          headerTitle: "Filters",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: themeColor.searchText,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: themeColor.searchBackground,
          },
        }}
      />
      <Stack.Screen
        name="Location"
        component={SelectLocation}
        options={{ presentation: "modal", headerShown: false }}
      />

      {/* Favoris */}

      {/* Profile*/}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="NotificationCenter" component={NotificationCenter} />

      {/* Settings */}
      <Stack.Screen
        name="CitySelection"
        component={CitySelection}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="ManageEvents" component={ManageEvents} />
      <Stack.Screen name="LoginOptions" component={LoginOptions} />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          headerTitle: "Account settings",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          headerTintColor: themeColor.searchText,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: themeColor.background,
          },
        }}
      />
      <Stack.Screen
        name="UpdateName"
        component={UpdateName}
        options={{
          presentation: "formSheet",
          headerTitle: "Update your name",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          headerTintColor: themeColor.searchText,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: themeColor.background,
          },
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{
          presentation: "formSheet",
          headerTitle: "Update password",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          headerTintColor: themeColor.searchText,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: themeColor.background,
          },
        }}
      />

      {/* Support */}
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen
        name="SuggestImprovements"
        component={SuggestImprovements}
      />

      {/* Legal */}
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="CookiePolicy" component={CookiePolicy} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} />

      {/* Auth */}
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
