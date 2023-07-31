import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TouchableRipple, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import EventCard from "../../components/EventCard";
import eventApi from "../../../api/eventApi";
import { BlurView } from "expo-blur";
import { useEvent } from "../../contexts/EventContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemContext";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import SearchBar from "../../components/SearchBar";

// TODO:
// - Sort by relevance / date
// - Filters
// - date & location can be null
// - Search with searchBar
const SearchScreen = ({ navigation }) => {
  const { themeColor, isDarkMode } = useTheme();
  const { events } = useEvent();
  const { selectedTown, selectedDate } = useSearch();
  const { loading } = useAuth();
  const insets = useSafeAreaInsets();
  const [filterEvents, setFilterEvents] = useState(events);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEventsLoading, setFilteredEventsLoading] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  console.log("------------Search-----------");
  useEffect(() => {
    console.log("In search useEffect");
    const getFilteredEvents = async () => {
      const filters = {
        town: selectedTown,
        date: selectedDate.value,
      };

      setFilteredEventsLoading(true);
      const filteredEvents = await eventApi.getFiltered(filters);
      setFilterEvents(filteredEvents);
      setFilteredEventsLoading(false);
    };

    if (selectedTown || selectedDate) {
      if (selectedTown === "Sri Lanka" && selectedDate.value === "anytime")
        setFilterEvents(events);
      else getFilteredEvents();
    }
  }, [selectedTown, selectedDate]);

  if (loading || filteredEventsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.background,
          paddingTop: insets.top * 1.5,
        },
        styles.container,
      ]}
    >
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search for..."
          onChangeSearch={onChangeSearch}
          searchQuery={searchQuery}
        />
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => navigation.navigate("Location")}
        >
          <FontAwesome5
            name="map-marker-alt"
            size={14}
            color={themeColor.primaryText}
          />
          <Text
            style={[{ color: themeColor.primaryText }, styles.locationText]}
          >
            {selectedTown ? selectedTown : "Sri Lanka"}
          </Text>
          <FontAwesome5
            name="chevron-down"
            size={12}
            color={themeColor.primaryText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filtersContainer}>
        <Button
          buttonColor={themeColor.lightBlue}
          icon="tune"
          mode="contained-tonal"
          onPress={() => navigation.navigate("Filters")}
        >
          Filters{"  "}
          <FontAwesome5
            name="chevron-down"
            size={12}
            color={themeColor.primaryText}
          />
        </Button>
        <Button
          buttonColor={themeColor.lightBlue}
          icon="calendar-range"
          mode="contained-tonal"
          onPress={() => navigation.navigate("Date")}
        >
          <Text>
            {selectedDate.label} {"  "}
          </Text>
          <FontAwesome5
            name="chevron-down"
            size={12}
            color={themeColor.primaryText}
          />
        </Button>
      </View>
      {filterEvents.length ? (
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={{ marginBottom: 115 }}>
              {filterEvents.map((event, key) => {
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
      ) : (
        <NoResultScreen />
      )}
    </View>
  );
};

const NoResultScreen = () => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View style={styles.noResultContainer}>
      <View
        style={[
          { backgroundColor: themeColor.veryLightBackground },
          styles.noResultIcon,
        ]}
      >
        <FontAwesome5
          name="search"
          size={30}
          color={themeColor.veryLightGray}
        />
      </View>
      <Text style={styles.noResultText1}>No results found</Text>
      <Text style={{ color: themeColor.gray }}>
        Expand your search and try again
      </Text>
    </View>
  );
};

export default SearchScreen;

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
  searchBarContainer: {
    paddingHorizontal: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    columnGap: 8,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 15,
  },
  noResultContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  noResultIcon: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultText1: {
    fontSize: 18,
    fontWeight: "600",
  },
});
