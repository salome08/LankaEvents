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
import { Button } from "react-native-paper";
import { useTheme } from "../contexts/ThemContext";
import { useOrganizer } from "../contexts/OrganizerContext";

const TestScreen = () => {
  const { themeColor, isDarkMode } = useTheme();
  const {
    setAuthenticatedU,
    authenticatedU,
    authenticatedO,
    setAuthenticatedO,
  } = useOrganizer();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test Screen</Text>
      <Text>
        logged user: {authenticatedU ? "YES" : "NO"}
        {"\n"}
        logged organizer: {authenticatedO ? "YES" : "NO"}
      </Text>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedO(true);
        }}
      >
        Sign Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedU(true);
        }}
      >
        Sign User
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedO(false);
        }}
      >
        Log out Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          navigation.navigate("Organizer");
        }}
      >
        Go to Home Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          navigation.navigate("NewOrganizerSteps");
        }}
      >
        Go to NewOrganizerSteps
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          navigation.navigate("CreateEvent");
        }}
      >
        Go to CreateEvent
      </Button>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    borderRadius: 4,
  },
});
