import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventCard from "../components/EventCard";
import eventApi from "../../api/eventApi";
import { useTheme } from "../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useAuth } from "../contexts/AuthContext";
import { useEvent } from "../contexts/EventContext";
import { useSearch } from "../contexts/SearchContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { authenticated, user, loading } = useAuth();
  const { themeColor, isDarkMode } = useTheme();
  const { selectedTown } = useSearch();
  const { events, isLiked, toggleLikeEvent, eventsLoading } = useEvent();
  const [homeEvents, setHomEvents] = useState([]);
  const insets = useSafeAreaInsets();
  console.log("---------Home-----------");

  useEffect(() => {
    const fetchHomeEvents = async () => {
      try {
        // Call your function to fetch liked events from the database
        const fetchedEvents = await eventApi.getHome(selectedTown);
        console.log(fetchedEvents);
        setHomEvents(fetchedEvents); // Set the initial state with the fetched data
        // Get liked events from the api
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching liked events:", error);
        // setLoading(false);
      }
    };
    fetchHomeEvents();
  }, [selectedTown]);
  /*TO DO
  - sections: 
    - Popular in [Town] || Popular Online events || Popular online
    - Online Events
    - Health & Wellness events
    - (From nearby cities)
    - Show 8 and "View more events" => search + category
    - This Weekend
    - Online events
    - Music events
    - Food & Drink events
    - Business & Professional events
    - Performing & Visual Arts events
    - Health & Wellness events
    - free events 

    Online: 
    - Popular Online events
    - This Weekend
    - Business & Professional events
    - Online Conferences
    - Onlines Classes
    - Health & Wellness events
    - Family & Education events
    - Science & Technology events
    - Community & Culture events
    - Free events


    ==> (according to town or online)
    - Get all events sorted by relevance 8 firsts,
    - get 8 firsts online events 
    - get 8 first weekend events 
    - get 8 first free events

    if online : 
    - get 8 first online conferences 
    - get 8 first online classes 
    - get 8 first Business & Professional events

    if town: 
    - get 8 first Music events 
    - get 8 first Food & drink events 
    - get 8 first Health & Wellness events 

*/
  if (!events || eventsLoading || loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={{ paddingTop: 23, marginBottom: 115 }}>
            {homeEvents.map((category, key) => {
              return (
                category.events.length > 0 && (
                  <View key={key}>
                    <Text
                      style={[
                        {
                          color: themeColor.primaryText,
                          paddingTop: insets.top,
                        },
                        styles.label,
                      ]}
                    >
                      {category.label}
                    </Text>
                    {category.events.map((event, key) => (
                      <EventCard event={event} />
                    ))}
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Search")}
                    >
                      <Text
                        style={{
                          color: themeColor.blue,
                          alignSelf: "center",
                          marginTop: 10,
                        }}
                      >
                        View more events
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              );
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
  label: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    // marginTop: 25,
  },
});
