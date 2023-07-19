import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FavScreen from "../screens/Fav";
import HomeScreen from "../screens/Home";
import AccountScreen from "../screens/account/Account";
import SearchScreen from "../screens/search/Search";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e91e63",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
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
            return <Icon name="account-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
