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
import AccountSettings from "../screens/settings/AccountSettings";
import LoginOptions from "../screens/settings/LoginOptions";
import ManageEvents from "../screens/settings/ManageEvents";
import CitySelection from "../screens/settings/CitySelection";
import HelpCenter from "../screens/support/HelpCenter";
import SuggestImprovements from "../screens/support/SuggestImprovements";
import SignIn from "../screens/auth/SignIn";
import Event from "../screens/Event";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      {/* Home */}
      <Stack.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />

      {/* Event */}
      <Stack.Screen name="Event" component={Event} />

      {/* Search */}
      <Stack.Screen name="Date" component={SelectDate} />
      <Stack.Screen name="Filters" component={SelectFilters} />

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
      <Stack.Screen name="AccountSettings" component={AccountSettings} />

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
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
