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
import { getOrganizerToken, getToken } from "../../utils/functions/storage";

const NoEventsScreen = ({ title }) => {
  const { themeColor, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { logOrganizer } = useOrganizer();

  const handleCreateEvent = async () => {
    const organizerId = await logOrganizer();
    if (!organizerId) {
      console.log("user has no organizer account");
      navigation.goBack();
      navigation.navigate("NewOrganizerOtp");
    } else {
      // If Organizer id: Go create event page
      navigation.navigate("Organizer", { screen: "CreateEvent" });
    }
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
  const { setAuthenticatedU, events, setEvents } = useOrganizer();
  const navigation = useNavigation();
  // const [events, setEvents] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      // Decode token organizer
      const token = await getOrganizerToken("organizerToken");
      const { id } = JWT.decode(token, "YOUR_JWT_SECRET");

      if (id) {
        const events = await organizerApi.getEvents();
        setEvents(events);
      }
    };
    getToken();
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
        <EventsList
          title="ongoing"
          events={
            events ? events.filter((event) => event.status === "ongoing") : []
          }
        />
        <EventsList
          title="past"
          events={
            events ? events.filter((event) => event.status === "past") : []
          }
        />
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
