import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FavScreen from "../screens/Fav";
import HomeScreen from "../screens/Home";
import AccountScreen from "../screens/account/Account";
import SearchScreen from "../screens/search/Search";
import { useTheme } from "../contexts/ThemContext";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  const { themeColor } = useTheme();

  return (
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
    </View>
  );
};
