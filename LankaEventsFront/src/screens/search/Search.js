import React, { useState, useEffect, useMemo } from "react";
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
import _ from "lodash";
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
// - date & location can be null

// If query show query

const EventsList = ({ events }) => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <>
      {events?.length ? (
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={{ marginBottom: 115 }}>
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
      ) : (
        <NoResultScreen />
      )}
    </>
  );
};

const SearchScreen = ({ navigation }) => {
  const { themeColor, isDarkMode } = useTheme();
  const { events } = useEvent();
  const { selectedTown, selectedDate, allFilters, isFilterSelected } =
    useSearch();
  const { loading } = useAuth();
  const insets = useSafeAreaInsets();
  const [filterEvents, setFilterEvents] = useState(events);
  const [filteredEventsLoading, setFilteredEventsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [queryEvents, setQueryEvents] = useState();
  const [loadingQuery, setLoadingQuery] = useState(false);

  console.log("------------render: Search-----------");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // console.log("In useEffect searchQuery");
    if (searchQuery) {
      setLoadingQuery(true);
      const getData = setTimeout(async () => {
        console.log("In setTimeout");
        console.log("Sending request with query:", searchQuery);
        const queryEvents = await eventApi.getFromQuery(searchQuery);
        setQueryEvents(queryEvents);
        setLoadingQuery(false);
      }, 900);

      return () => {
        console.log("before clearTimeout");
        clearTimeout(getData);

        console.log("after clearTimeout");
      };
    } else {
      setLoadingQuery(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("In search useEffect");
    setFilteredEventsLoading(true);
    const getFilteredEvents = async () => {
      const filters = {
        town: selectedTown,
        date: { value: selectedDate.value, data: selectedDate.data },
        categories: allFilters.categories,
        types: allFilters.types,
        free: allFilters.freeEvents,
        sortBy: allFilters.sortBy,
      };

      console.log("Request filtered events");
      const filteredEvents = await eventApi.getFiltered(filters);
      setFilterEvents(filteredEvents);
      setFilteredEventsLoading(false);
    };

    getFilteredEvents();
  }, [selectedTown, selectedDate, allFilters]);

  if (loading || filteredEventsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.searchBackground,
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
          loadingQuery={loadingQuery}
        />
        {!searchQuery && (
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => navigation.navigate("Location")}
          >
            <FontAwesome5
              name="map-marker-alt"
              size={14}
              color={themeColor.searchText}
            />
            <Text
              style={[{ color: themeColor.searchText }, styles.locationText]}
            >
              {selectedTown ? selectedTown : "Sri Lanka"}
            </Text>
            <FontAwesome5
              name="chevron-down"
              size={12}
              color={themeColor.searchText}
            />
          </TouchableOpacity>
        )}
      </View>
      {!searchQuery && (
        <View style={styles.filtersContainer}>
          <Button
            buttonColor={
              isFilterSelected() ? themeColor.blue : themeColor.filterButtonBg
            }
            icon="tune"
            mode="contained-tonal"
            textColor={themeColor.filterButtonText}
            onPress={() => navigation.navigate("Filters")}
          >
            Filters{"  "}
            <FontAwesome5
              name="chevron-down"
              size={12}
              color={themeColor.filterButtonText}
            />
          </Button>
          <Button
            buttonColor={
              selectedDate.value !== "anytime"
                ? themeColor.blue
                : themeColor.filterButtonBg
            }
            icon="calendar-range"
            mode="contained-tonal"
            textColor={themeColor.filterButtonText}
            onPress={() => navigation.navigate("Date")}
          >
            {selectedDate.label} {"  "}
            <FontAwesome5
              name="chevron-down"
              size={12}
              color={themeColor.filterButtonText}
            />
          </Button>
        </View>
      )}
      <EventsList events={searchQuery ? queryEvents : filterEvents} />
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
