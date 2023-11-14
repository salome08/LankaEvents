import React, { createContext, useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../../contexts/ThemContext";
import { useOrganizer } from "../../contexts/OrganizerContext";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { storeOrganizerToken } from "../../utils/functions/storage";
import SimpleEventsPreview from "../organizer/SimpleEventsPreview";

const AuthButton = ({ icon, label, onPress }) => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <Button
      mode="contained"
      icon={icon !== "email" && icon}
      onPress={onPress}
      labelStyle={{
        color: "white",
      }}
      style={[
        {
          borderWidth: isDarkMode ? 2 : 0,
          borderColor:
            icon === "email" ? themeColor.primary : themeColor.primaryText2,
          backgroundColor:
            icon === "email"
              ? themeColor.backgroundButton
              : icon === "google"
              ? "#0F9D58"
              : icon === "facebook"
              ? "#3b5998"
              : "black",
        },
        styles.button,
      ]}
    >
      {label}
    </Button>
  );
};

const ManageEvents = () => {
  const { themeColor, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { setAuthenticatedU, authenticatedU } = useOrganizer();

  console.log("-----------ManageEvents---------");

  // Show this page if not have organiser id in storage.

  const handleGoogleSignIn = async () => {
    const response = await WebBrowser.openAuthSessionAsync(
      "http://localhost:3000/auth/login/federated/google-organizer",
      "exp://192.168.1.112:19000/Home"
    );
    if (response?.type === "success") {
      if (response.url) {
        // Check if the URL contains the token or other relevant data
        if (response.url.includes("organizerToken")) {
          console.log(response.url);
          // Extract the token from the URL
          const urlParts = response.url.split("#");
          const tokenPart = urlParts[0];
          const tokenKeyValuePairs = tokenPart.split("&");
          const token = tokenKeyValuePairs
            .find((pair) => pair.includes("organizerToken"))
            .split("=")[1];

          console.log("token", token);
          // Token === false if user was not found in db
          if (token === "false") {
            console.log("user not found in db");
            // Display notif error
          } else {
            // Store the token in async storage
            await storeOrganizerToken("organizerToken", token);
            setAuthenticatedU(true);
            // navigation.navigate("SimpleEventsPreview");
          }
          // Update auth state in the context
          // logIn(token);
        }
      }
      console.log("Success google connection");
    } else {
      // Error google account
      console.log("Fail connection");
    }

    // navigation.goBack();
  };

  if (authenticatedU) return <SimpleEventsPreview />;
  return (
    <View
      style={[
        {
          backgroundColor: themeColor.searchBackground,
          paddingTop: insets.top * 2,
        },
        styles.container,
      ]}
    >
      <Text style={[{ color: themeColor.primary }, styles.title]}>
        LankaEvents Logo
      </Text>
      <Text style={[{ color: themeColor.primaryText }, styles.subTitle]}>
        LankaEvents Organizer
      </Text>
      <Text style={[{ color: themeColor.primaryText }, styles.mainText]}>
        Create and Manage your events
      </Text>
      <Text style={[{ color: themeColor.primaryText }, styles.mainText]}>
        Connexion buttons
      </Text>
      <AuthButton
        icon="google"
        label="Sign in with Google"
        onPress={handleGoogleSignIn}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text style={[{ color: themeColor.blue }, styles.mainText]}>
          Go back on Lanka events app{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    rowGap: 30,
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 25,
  },
  mainText: {
    fontSize: 15,
  },
  button: {
    marginBottom: 10,
    borderRadius: 4,
  },
});
