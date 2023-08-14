import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import authApi from "../../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemContext";
import { useEvent } from "../../contexts/EventContext";
import { useSearch } from "../../contexts/SearchContext";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { color } from "@rneui/base";
const settingsLinks = [
  { title: "Primary city", screen: "Location", showAnonymous: true },
  { title: "Copy events to calendar", screen: "", showAnonymous: true },
  { title: "Manage events", screen: "ManageEvents", showAnonymous: false },
  {
    title: "Manage log in options",
    screen: "LoginOptions",
    showAnonymous: false,
  },
  {
    title: "Account settings",
    screen: "AccountSettings",
    showAnonymous: false,
  },
];
const supportLinks = [
  { title: "Help Center", screen: "HelpCenter", showAnonymous: true },
  {
    title: "Suggest improvements",
    screen: "SuggestImprovements",
    showAnonymous: false,
  },
];
const aboutLinks = [
  { title: "Version", screen: "", version: "1.0.0", showAnonymous: true },
  { title: "Privacy", screen: "Privacy", showAnonymous: true },
  { title: "Terms of service", screen: "TermsOfService", showAnonymous: true },
  { title: "Cookie Policy", screen: "CookiePolicy", showAnonymous: true },
];

const linksByCategories = [
  { title: "Settings", links: settingsLinks },
  { title: "Support", links: supportLinks },
  { title: "About", links: aboutLinks },
];

const PressableLink = ({ title, screen, icon, version }) => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { selectedTown, setSelectedTown } = useSearch();

  return (
    <Pressable
      onPress={() => (screen ? navigation.navigate(screen) : "")}
      style={[
        {
          borderBottomColor: themeColor.devider,
          borderBottomWidth: screen === "CookiePolicy" ? 0 : 1,
        },
        styles.pressableLinkContainer,
      ]}
    >
      <View style={styles.pressableLinkContentContainer}>
        <View style={styles.notificationRowContainer}>
          {icon && (
            <Ionicons
              name="notifications-outline"
              size={22}
              color={themeColor.bottomTabInactive}
            />
          )}
          <Text
            style={[
              {
                color: icon
                  ? themeColor.primaryText
                  : themeColor.secondaryText1,
              },
              styles.mainText,
            ]}
          >
            {title}
          </Text>
        </View>
        {screen == "Location" ? (
          <Text style={[{ color: themeColor.blue }, styles.mainText]}>
            {selectedTown}
          </Text>
        ) : version ? (
          <Text style={[{ color: themeColor.secondaryText2 }, styles.mainText]}>
            {version}
          </Text>
        ) : (
          <Entypo
            name="chevron-right"
            size={17}
            color={themeColor.veryLightGray}
          />
        )}
      </View>
    </Pressable>
  );
};

const SectionUserInfos = () => {
  const { logOut, authenticated, user } = useAuth();
  const navigation = useNavigation();
  const { likedEvents } = useEvent();
  const { themeColor } = useTheme();

  return (
    <>
      {authenticated ? (
        <View alignItems="center">
          <Image
            source={{
              uri: user?.pictureUrl,
            }}
            style={styles.profilePicture}
          />
          <View style={styles.titleContainer}>
            <View style={styles.textTitleContainer}>
              <Text style={[{ color: themeColor.primaryText }, styles.title]}>
                {user?.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icon name="pencil-outline" size={20} color={themeColor.blue} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              { marginTop: 12, color: themeColor.primaryText },
              styles.mainText,
            ]}
          >
            {user?.email}
          </Text>
          <View style={styles?.userActionsInfo}>
            <Text style={[{ color: themeColor.primaryText }, styles.subTitle]}>
              {likedEvents.length}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Likes")}>
              <Text style={{ color: themeColor.blue, marginTop: 8 }}>
                Likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.anonymousUserInfosContainer}>
          <Text style={[{ color: themeColor.primaryText }, styles.subTitle]}>
            Log in to discover the{"\n"}best events
          </Text>
          <Text style={[{ color: themeColor.primaryText }, styles.mainText]}>
            When you sign in, you can see our top picks for you
          </Text>
        </View>
      )}
    </>
  );
};

const AccountScreen = () => {
  const { logOut, authenticated, user } = useAuth();
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const { likedEvents } = useEvent();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <View style={styles.contentContainer}>
        <ScrollView>
          <SectionUserInfos />
          {authenticated && (
            <PressableLink
              title="Notification center"
              screen="NotificationCenter"
              icon
            />
          )}
          <View style={{ marginBottom: authenticated ? 29 : 180 }}>
            {linksByCategories.map((category, key) => {
              return (
                <View key={key}>
                  <Text
                    style={[
                      { color: themeColor.primaryText },
                      styles.categoriesTitle,
                    ]}
                  >
                    {category.title}
                  </Text>
                  {category.links.map(
                    (link, key) =>
                      link.showAnonymous && (
                        <PressableLink
                          key={key}
                          title={link.title}
                          screen={link?.screen}
                          version={link?.version}
                        />
                      )
                  )}
                </View>
              );
            })}
          </View>
          {authenticated && (
            <View style={styles.buttonLogoutContainer}>
              <Button
                style={[
                  {
                    borderColor: themeColor.secondaryText2,
                    backgroundColor: themeColor.backgroundButtonLogout,
                  },
                  styles.logButton,
                ]}
                labelStyle={{
                  color: themeColor.buttonLogoutText,
                  fontWeight: "600",
                }}
                mode="contained"
                onPress={() => logOut()}
              >
                Logout
              </Button>
            </View>
          )}
        </ScrollView>
        {!authenticated && (
          <View
            style={[
              {
                backgroundColor: themeColor.background,
                borderTopColor: themeColor.devider,
              },
              styles.buttonContainer,
            ]}
          >
            <Button
              style={[
                {
                  borderColor: themeColor.primary,
                  backgroundColor: themeColor.backgroundButton,
                },
                styles.logButton,
              ]}
              labelStyle={{ fontWeight: "600" }}
              mode="contained"
              onPress={() => navigation.navigate("SignIn")}
            >
              Log in
            </Button>
          </View>
        )}
        <BlurView
          intensity={80}
          tint={isDarkMode ? "dark" : "light"}
          style={styles.blurView}
        />
      </View>
    </View>
  );
};

export default AccountScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    height: 82, // Set the height of the BlurView
    bottom: 0,
  },
  anonymousUserInfosContainer: {
    paddingHorizontal: 16,
    paddingVertical: 27,
    rowGap: 22,
  },
  categoriesContainer: {
    // marginBottom: 29,
  },
  pressableLinkContainer: {
    paddingHorizontal: 16,
    paddingVertical: 19,
    // borderBottomWidth: 1,
    justifyContent: "center",
  },
  pressableLinkContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 9,
  },
  userActionsInfo: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 27,
    fontWeight: "700",
  },
  categoriesTitle: {
    fontSize: 27,
    marginTop: 32,
    fontWeight: "700",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  mainText: {
    fontSize: 15,
    fontWeight: "400",
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 80,
    marginBottom: 25,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 7,
  },
  textTitleContainer: {
    marginLeft: 27,
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 82.1,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  buttonLogoutContainer: {
    marginBottom: 125,
    padding: 16,
  },
  logButton: {
    borderRadius: 4,
    borderWidth: 2,
  },
});
