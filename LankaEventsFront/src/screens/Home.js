import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import EventCard from "../components/EventCard";
import eventApi from "../../api/eventApi";
import { useTheme } from "../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useAuth } from "../contexts/AuthContext";
import { useEvent } from "../contexts/EventContext";

const HomeScreen = ({ navigation }) => {
  const { authenticated, user, loading } = useAuth();
  const { themeColor, isDarkMode } = useTheme();
  const { events, isLiked, toggleLikeEvent, eventsLoading } = useEvent();
  const insets = useSafeAreaInsets();

  console.log("---------Home-----------");

  if (!events || eventsLoading || loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={{ paddingTop: 23, marginBottom: 115 }}>
            {events.map((event, key) => {
              return <EventCard key={key} event={event} />;
            })}
          </View>
        </ScrollView>
        <BlurView
          intensity={80}
          tint={isDarkMode ? "dark" : "light"}
          style={styles.blurView}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
