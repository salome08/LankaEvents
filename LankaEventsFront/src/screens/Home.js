import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventCardHome from "../components/EventCardHome";
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
  const { selectedTown, setSelectedDate, setAllFilters, setSelectedTown } =
    useSearch();
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
      style={[
        {
          backgroundColor: themeColor.background,
          paddingTop: insets.top,
        },
        styles.container,
      ]}
    >
      <View style={styles.contentContainer}>
        <ScrollView>
          <View
            style={{
              marginBottom: 84,
            }}
          >
            {homeEvents.map((category, key) => {
              return (
                // Show Label + event by category if the category has at least 1 event
                category.events.length > 0 && (
                  <View
                    style={[
                      { borderBottomColor: themeColor.devider2 },
                      styles.categoryContainer,
                    ]}
                    key={key}
                  >
                    <Text
                      style={[
                        {
                          color: themeColor.secondaryText1,
                        },
                        styles.label,
                      ]}
                    >
                      {category.label}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={styles.eventsContainer}>
                        {category.events.map((event, key) => (
                          // Show list of events
                          <EventCardHome event={event} key={key} />
                        ))}
                      </View>
                    </ScrollView>
                    {/* <TouchableOpacity
                      onPress={() => {
                        if (category.labelType === "date")
                          setSelectedDate({
                            label: category.label,
                            value: category.searchValue,
                            data: null,
                          });
                        else if (category.labelType === "category")
                          setAllFilters({
                            categories: category.searchValue,
                            types: [],
                            freeEvents: false,
                            sortBy: "relevance",
                          });
                        else if (category.labelType === "type")
                          setAllFilters({
                            categories: [],
                            types: category.searchValue,
                            freeEvents: false,
                            sortBy: "relevance",
                          });
                        else if (category.labelType === "free")
                          setAllFilters({
                            categories: [],
                            types: [],
                            freeEvents: true,
                            sortBy: "relevance",
                          });
                        else if (category.labelType === "online") {
                          console.log(category);
                          setSelectedTown(category.searchValue);
                        }
                        navigation.navigate("Search");
                      }}
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
                    </TouchableOpacity> */}
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
  categoryContainer: {
    borderBottomWidth: 17,
    paddingBottom: 16,
  },
  eventsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    columnGap: 16,
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
    fontSize: 26,
    fontWeight: "800",
    paddingTop: 40,
    paddingHorizontal: 16,
    marginBottom: 17,
  },
});
