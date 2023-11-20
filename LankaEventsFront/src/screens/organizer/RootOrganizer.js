import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, ActivityIndicator, PaperProvider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import organizerApi from "../../../api/organizerApi";
import { useTheme } from "../../contexts/ThemContext";
import { useOrganizer } from "../../contexts/OrganizerContext";
import VerifyPhoneOtp from "./SignIn/NewOrganizerOtp";
import NewOrganizerSteps from "./SignIn/NewOrganizerSteps";
import CreateEvent from "./CreateEvent";
import Navbar from "../../components/Organizer/Navbar";
import Home from "./Home";
import Events from "./Events";

const RootOrganizer = () => {
  console.log("-----------------RootOrganizer----------------");
  const navigation = useNavigation();
  const route = useRoute();
  const { profile, setProfile, events, setEvents } = useOrganizer();
  const { themeColor, isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState("Home");
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    console.log("In useeffect RootOrganizer");
    if (route.params && route.params.screen) {
      const { screen } = route.params;
      if (screen === "CreateEvent") navigation.navigate("CreateEvent");
      else if (screen === "NewOrganizerSteps")
        setCurrentPage("NewOrganizerSteps");
      // navigation.navigate("NewOrganizerSteps");
    }
  }, [route.params]);

  useEffect(() => {
    const getOrganizer = async () => {
      // Call api to get organizer
      const profile = await organizerApi.getOrganizer();
      setProfile(profile);
      if (!events) {
        const events = await organizerApi.getEvents();
        setEvents(events);
      }
      // Set currentPage to steps if not validated
    };

    getOrganizer();
  }, []);

  if (!profile || !events) return <Text>Loading...</Text>;

  return (
    <View
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      {/* Top bar menu */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "NewOrganizerSteps" ? (
        <NewOrganizerSteps setCurrentPage={setCurrentPage} />
      ) : (
        <View style={styles.contentContainer}>
          {currentPage === "Home" && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === "Events" && <Events organizer={organizer} />}
        </View>
      )}
    </View>
  );
};

export default RootOrganizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    // paddingHorizontal: 16,
    paddingVertical: 30,
    // backgroundColor: "blue",
  },
});
