import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import VerifyPhoneOtp from "./SignIn/NewOrganizerOtp";
import NewOrganizerSteps from "./SignIn/NewOrganizerSteps";
import CreateEvent from "./CreateEvent";
import Navbar from "../../components/Organizer/Navbar";

const HomeOrganizer = () => {
  const validatedSteps = true;
  const navigation = useNavigation();
  const route = useRoute();
  // console.log("-----------------HomeOrganizer----------------");
  console.log("route", route);
  // console.log("route.params", route.params);
  const { screen } = route.params;

  // validatedSteps ? <CreateEvent /> : <NewOrganizerSteps />;
  // if (screen === "NewOrganizerSteps") return <NewOrganizerSteps />;
  useEffect(() => {
    console.log("In useeffect HomeOrganizer");
    if (screen === "CreateEvent") navigation.navigate("CreateEvent");
    else if (screen === "NewOrganizerSteps")
      navigation.navigate("NewOrganizerSteps");
  }, [screen]);
  return (
    <View style={styles.container}>
      {/* Top bar menu */}
      <Navbar />
      {/* Organizer Profile */}
      {/* Events */}
      <Text>HomeOrganizer</Text>
      {/* <CreateEvent /> */}
      <TouchableOpacity onPress={() => navigation.navigate("CreateEvent")}>
        <Text>Got to create event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeOrganizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
