import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import authApi from "../../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";

// import { styles } from "./styles";

const settingsLinks = [
  { title: "Primary city", screen: "CitySelection" },
  { title: "Copy events to calendar", screen: "" },
  { title: "Manage events", screen: "ManageEvents" },
  { title: "Manage log in options", screen: "LoginOptions" },
  { title: "Account settings", screen: "AccountSettings" },
];
const supportLinks = [
  { title: "Help Center", screen: "HelpCenter" },
  { title: "Suggest improvements", screen: "SuggestImprovements" },
];
const aboutLinks = [
  { title: "Version", screen: "" },
  { title: "Privacy", screen: "Privacy" },
  { title: "Terms of service", screen: "TermsOfService" },
  { title: "Cookie Policy", screen: "CookiePolicy" },
];

const linksByCategories = [
  { title: "Settings", links: settingsLinks },
  { title: "Support", links: supportLinks },
  { title: "About", links: aboutLinks },
];

const AccountScreen = ({ navigation }) => {
  const { logOut, authenticated } = useAuth();

  const PressableLink = ({ title, screen }) => {
    return (
      <Pressable
        onPress={() => (screen ? navigation.navigate(screen) : "")}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Text style={styles.mainText}>{title}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ rowGap: 18, paddingHorizontal: 14 }}>
      <ScrollView>
        <View alignItems="center" rowGap={28}>
          <View
            // Picture
            style={{
              width: 80,
              height: 80,
              marginTop: 40,
              borderRadius: 40,
              backgroundColor: "#e91e63",
            }}
          />
          <View flexDirection="row" alignItems="center">
            <Text style={styles.title}>Salomé Hazan</Text>
            <Pressable
              onPress={() => navigation.navigate("EditProfile")}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Icon name="pencil-outline" size={24} />
            </Pressable>
          </View>
          <View alignItems="center">
            <Text style={styles.subTitle}>3 (number of likes, case 0)</Text>
            <Pressable
              onPress={() => navigation.navigate("Likes")}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <Text style={{ color: "lightblue" }}>Likes</Text>
            </Pressable>
          </View>
        </View>
        <View flexDirection="row" alignItems="center" columnGap={7}>
          <Icon name="pencil-outline" size={24} />
          <PressableLink
            title="Notification center"
            screen="NotificationCenter"
          />
        </View>
        <View rowGap={10}>
          {linksByCategories.map((category, key) => {
            return (
              <View rowGap={10} key={key}>
                <Text style={styles.subTitle}>{category.title}</Text>
                {category.links.map((link, key) => (
                  <PressableLink
                    key={key}
                    title={link.title}
                    screen={link.screen}
                  />
                ))}
              </View>
            );
          })}
        </View>
        <View>
          {authenticated ? (
            <Button mode="contained" onPress={() => logOut()}>
              Logout
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={() => navigation.navigate("SignIn")}
            >
              Login
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

export const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  mainText: {
    fontSize: 15,
    fontWeight: "300",
  },
});
