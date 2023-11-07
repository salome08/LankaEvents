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
import { Button, Title, Paragraph } from "react-native-paper";
import authApi from "../../../api/authApi";
import organizerApi from "../../../api/organizerApi";
import { useAuth } from "../../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemContext";
import { useEvent } from "../../contexts/EventContext";
import { useSearch } from "../../contexts/SearchContext";
import { useOrganizer } from "../../contexts/OrganizerContext";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TabBarView from "../../components/TabBarView";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { storeOrganizerToken } from "../../utils/functions/storage";
import JWT from "expo-jwt";

const NoEventsScreen = ({ title }) => {
  const { themeColor, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { setAuthenticatedO } = useOrganizer();

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
            return null;
          } else {
            // Store the token in async storage
            await storeOrganizerToken(token);
            return token;
          }
          // Update auth state in the context
          // logIn(token);
        }
      }
      console.log("Success google connection");
    } else {
      // Error google account
      console.log("Fail connection");
      return null;
    }

    // navigation.goBack();
  };
  const handleCreateEvent = async () => {
    // const { setAuthenticatedO } = useOrganizer();
    // const navigation = useNavigation();

    // Sign Organizer Account
    // Google Organizer signIn
    const token = await handleGoogleSignIn();
    // get token into storage
    // if signIn success:

    if (token) {
      // decode token from storage
      const decodedToken = JWT.decode(token, "YOUR_JWT_SECRET");
      const { organizerId } = decodedToken;
      // If no organizer Id:
      // Go page send number phone
      if (!organizerId) {
        console.log("user has no organizer account");
        navigation.navigate("VerifyPhoneOtp");
      } else {
        // If Organizer id:
        // Go create event page
        console.log("user organizer Id: ", organizerId);
        setAuthenticatedO(true);
        navigation.navigate("Organizer", { screen: "CreateEvent" });
      }
    } else {
      console.log("Error connection");
    }

    // If sign In fail error notification
  };

  return (
    <View style={styles.noEventsContainer}>
      <View style={styles.iconContainer}>
        <AntDesign name="calendar" size={40} color={themeColor.primaryText} />
      </View>
      <Text style={[{ color: themeColor.primaryText }, styles.mainText]}>
        You have no {title} events
      </Text>
      <Button
        style={[
          {
            backgroundColor: themeColor.primary,
          },
          styles.button,
        ]}
        labelStyle={{ fontWeight: "600" }}
        mode="contained"
        onPress={handleCreateEvent}
      >
        Create event
      </Button>
    </View>
  );
};

const EventsList = ({ title, events }) => {
  const { themeColor, isDarkMode } = useTheme();

  if (!events.length) return <NoEventsScreen title={title} />;
  return (
    <View style={{ flex: 1, backgroundColor: themeColor.background }}>
      {events.map((event, key) => {
        return (
          <View key={key}>
            <Text style={{ color: themeColor.primaryText }}>{event.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

const SimpleEventsPreview = () => {
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const { setAuthenticatedU } = useOrganizer();
  const navigation = useNavigation();

  useEffect(() => {
    const getEvents = async () => {
      const events = await organizerApi.getEvents();
      console.log("events", events);
    };

    getEvents();
  }, []);

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.background,
          paddingBottom: insets.bottom * 2,
        },
        styles.container,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setAuthenticatedU(false);
          navigation.navigate("Profile");
        }}
      >
        <Text style={[{ color: themeColor.blue }, styles.logOut]}>Log out</Text>
      </TouchableOpacity>
      <TabBarView>
        <EventsList title="ongoing" events={[]} />
        <EventsList title="past" events={[]} />
      </TabBarView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={[{ color: themeColor.blue }, styles.mainText]}>
            Go back on Lanka events app
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SimpleEventsPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    alignItems: "center",
    rowGap: 30,
  },
  noEventsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  iconContainer: {
    width: 95,
    height: 95,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "white",
  },
  mainText: {
    fontSize: 15,
    textAlign: "center",
  },
  logOut: {
    alignSelf: "flex-end",
    padding: 20,
    fontSize: 15,
  },
  button: {
    borderRadius: 4,
    borderWidth: 2,
    width: "50%",
  },
});
