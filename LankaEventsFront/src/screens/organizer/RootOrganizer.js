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
import { useTheme } from "../../contexts/ThemContext";
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
  const { themeColor, isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    console.log("In useeffect RootOrganizer");
    if (route.params && route.params.screen) {
      const { screen } = route.params;
      if (screen === "CreateEvent") navigation.navigate("CreateEvent");
      else if (screen === "NewOrganizerSteps")
        navigation.navigate("NewOrganizerSteps");
    }
  }, [route.params]);
  return (
    <PaperProvider>
      <View
        style={[{ backgroundColor: themeColor.background }, styles.container]}
      >
        {/* Top bar menu */}
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <View style={styles.contentContainer}>
          {currentPage === "Home" && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === "Events" && <Events />}
          {/* {currentPage === "Logout" && console.log("log out organizer")} */}
        </View>
      </View>
    </PaperProvider>
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
