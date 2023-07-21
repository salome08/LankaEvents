import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  Pressable,
} from "react-native";
import EventCard from "../components/EventCard";
import eventApi from "../../api/eventApi";
import axios from "axios";
import { useTheme } from "../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const HomeScreen = ({ navigation }) => {
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await eventApi.getAll();
      setEvents(fetchedEvents);
    };
    if (!events) fetchEvents();
  }, [events]);

  if (!events) {
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
          <View style={{ paddingTop: 23 }}>
            {events.map((e, key) => (
              <Pressable
                onPress={() => navigation.navigate("Event", { eventId: e._id })}
                rippleColor="rgba(0, 0, 0, .32)"
                key={key}
              >
                <EventCard event={e} />
              </Pressable>
            ))}
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
  scrollContainer: {
    flex: 1,
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
