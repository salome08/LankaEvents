import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FavScreen from "../screens/Fav";
import HomeScreen from "../screens/Home";
import AccountScreen from "../screens/account/Account";
import SearchScreen from "../screens/search/Search";
import { useTheme } from "../contexts/ThemContext";
import { useOrganizer } from "../contexts/OrganizerContext";
import RootOrganizer from "../screens/organizer/RootOrganizer";
import VerifyPhoneOtp from "../screens/organizer/SignIn/NewOrganizerOtp";
import TestScreen from "../screens/TestScreen";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import NewOrganizerSteps from "../screens/organizer/SignIn/NewOrganizerSteps";
import CreateEvent from "../screens/organizer/CreateEvent";

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const OrganizerStack = createNativeStackNavigator();

const OrganizerStackNavigation = () => {
  return (
    <OrganizerStack.Navigator
    // screenOptions={{
    //   headerLeft: () => <HeaderBackButton />,
    //   headerStyle: {
    //     backgroundColor: themeColor.background, // Set your desired header color here
    //   },
    // }}
    >
      {/* Test */}
      <OrganizerStack.Screen
        name="HomeOrganizer"
        component={HomeOrganizer}
        options={{ headerShown: false }}
      />
      <OrganizerStack.Screen
        name="NewOrganizerSteps"
        component={NewOrganizerSteps}
        options={{ headerShown: false }}
      />
      {/* <OrganizerStack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{ presentation: "modal", headerShown: false }}
      /> */}
    </OrganizerStack.Navigator>
  );
};

// const OrganizerRoot = () => {
//   return (
//     <Drawer.Navigator useLegacyImplementation>
//       <Stack.Screen
//         name="NewOrganizerSteps"
//         component={NewOrganizerSteps}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CreateEvent"
//         component={CreateEvent}
//         options={{ presentation: "modal", headerShown: false }}
//       />
//     </Drawer.Navigator>
//   );
// };

export const BottomTabNavigation = () => {
  const { themeColor } = useTheme();
  const { authenticatedO } = useOrganizer();

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: themeColor.primary,
            tabBarInactiveTintColor: themeColor.secondaryText,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              backgroundColor: themeColor.bottomTab,
              borderTopColor: themeColor.bottomTabBorder,
              borderTopWidth: 0.9,
              height: 82,
            },
          }}
        >
          <Tab.Screen
            name="HomeScreen"
            // component={TestScreen}
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Icon name="home-outline" size={size} color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Icon name="magnify" size={size} color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="Favoris"
            component={FavScreen}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Icon name="heart-outline" size={size} color={color} />;
              },
            }}
          />

          <Tab.Screen
            name="Profile"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ color, size }) => {
                return (
                  <Icon name="account-outline" size={size} color={color} />
                );
              },
            }}
          />

          {authenticatedO && (
            <Tab.Screen
              name="Organizer"
              component={RootOrganizer}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="creation" size={size} color={color} />;
                },
              }}
            />
          )}
        </Tab.Navigator>
      </View>
    </PaperProvider>
  );
};
