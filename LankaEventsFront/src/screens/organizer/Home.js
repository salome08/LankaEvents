import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, ActivityIndicator, Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import VerifyPhoneOtp from "./SignIn/NewOrganizerOtp";
import NewOrganizerSteps from "./SignIn/NewOrganizerSteps";
import CreateEvent from "./CreateEvent";
import Navbar from "../../components/Organizer/Navbar";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useOrganizer } from "../../contexts/OrganizerContext";

const OrganizerCard = () => {
  const { themeColor, isDarkMode } = useTheme();
  const { profile, events } = useOrganizer();
  const navigation = useNavigation();
  const nbEvents = 2;
  const nbFollowers = 0;

  const StartProfile = () => {
    return (
      <View style={{ rowGap: 20 }}>
        <Text style={[{ color: themeColor.primaryText }, styles.title]}>
          First, create your profile:
        </Text>
        <Button
          labelStyle={{ color: themeColor.primaryText, fontSize: 15 }}
          style={[{ backgroundColor: themeColor.primary }, styles.button]}
          onPress={() => navigation.navigate("CreateEvent")}
        >
          Create profile
        </Button>
      </View>
    );
  };

  const ExistingProfile = () => {
    return (
      <>
        <View style={styles.profileIconContainer}>
          <Text>S</Text>
        </View>
        <View style={{ rowGap: 20 }}>
          <Text style={[{ color: themeColor.primaryText }, styles.title]}>
            {profile.name}
          </Text>
          <View style={{ flexDirection: "row", columnGap: 8 }}>
            <Text style={[{ color: themeColor.primaryText }, styles.subtitle2]}>
              {events.length || "--"} Total events
            </Text>
            <Text style={[{ color: themeColor.primaryText }, styles.subtitle2]}>
              {nbFollowers || "--"} Total followers
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => console.log("actions")}>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={themeColor.primaryText}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.cardContainerOrganizer}>
      {profile.name ? <ExistingProfile /> : <StartProfile />}
    </View>
  );
};
const EventsCard = ({ setCurrentPage }) => {
  const { themeColor, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { events } = useOrganizer();
  const nextEvent =
    events.filter((event) => event.status === "draft")[0] || null;

  const StartEvent = () => {
    return (
      <View
        style={[
          { backgroundColor: themeColor.veryLightBackground },
          styles.startContainer,
        ]}
      >
        <View
          style={[
            { backgroundColor: themeColor.iconContainer },
            styles.editIconContainer,
          ]}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color={themeColor.blue}
          />
        </View>
        <Text style={[{ color: themeColor.primaryText }, styles.title2]}>
          Start from scratch
        </Text>
        <Text
          style={[
            { color: themeColor.primaryText, textAlign: "center" },
            styles.subtitle,
          ]}
        >
          Add all your event details, create new tickets, and set up recurring
          events
        </Text>
        <Button
          mode="outlined"
          labelStyle={{ color: themeColor.primaryText, fontSize: 15 }}
          style={styles.button}
          onPress={() => navigation.navigate("CreateEvent")}
        >
          Create event
        </Button>
      </View>
    );
  };

  const NextEvent = () => {
    return (
      <Card style={{ padding: 10, elevation: 0 }} elevation={1}>
        <Card.Title
          title={nextEvent.title}
          subtitle={
            <>
              <Text style={{ fontWeight: 700 }}>{nextEvent.status}</Text>{" "}
              {nextEvent.date}
            </>
          }
        />
        <Card.Content>
          <Button
            mode="contained"
            labelStyle={{ color: themeColor.white, fontSize: 15 }}
            style={[
              { backgroundColor: themeColor.primary, marginTop: 10 },
              styles.button,
            ]}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            Continue editing
          </Button>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.cardContainerEvents}>
      <Text style={[{ color: themeColor.primaryText }, styles.title]}>
        Your next event
      </Text>
      <TouchableOpacity onPress={() => setCurrentPage("Events")}>
        <Text style={[{ color: themeColor.blue, fontSize: 15 }]}>
          Go to Events
        </Text>
      </TouchableOpacity>
      {nextEvent ? <NextEvent /> : <StartEvent />}
    </View>
  );
};

const Home = ({ setCurrentPage }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Organizer Profile */}
      <OrganizerCard />
      {/* Events */}
      <EventsCard setCurrentPage={setCurrentPage} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 30,
    paddingHorizontal: 16,
    // backgroundColor: "blue",
  },
  cardContainerOrganizer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardContainerEvents: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 30,
    rowGap: 15,
  },
  profileIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  startContainer: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginTop: 23,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    rowGap: 20,
  },
  nextEventContainer: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginTop: 23,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 7,
    rowGap: 20,
  },
  editIconContainer: {
    borderRadius: 50,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
  },
  title2: {
    fontSize: 18,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 14,
  },
  subtitle2: {
    fontSize: 11,
  },
  button: {
    borderRadius: 4,
    // width: 105,
    // height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
