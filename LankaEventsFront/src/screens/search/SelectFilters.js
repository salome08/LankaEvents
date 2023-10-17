import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, SegmentedButtons, Chip } from "react-native-paper";
import filters from "../../utils/constants/eventFilters";
import { useTheme } from "../../contexts/ThemContext";
import { useSearch } from "../../contexts/SearchContext";

const SelectFilters = () => {
  console.log("--------render: SelectFilters------------------");
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const { allFilters, setAllFilters } = useSearch();
  const [selectedCategories, setSelectedCategories] = useState(
    allFilters.categories
  );
  const [selectedTypes, setSelectedTypes] = useState(allFilters.types);
  const [freeEvents, setFreeEvents] = useState(allFilters.freeEvents);
  const [sortBy, setSortBy] = useState(allFilters.sortBy);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleSelectedCategory = (category) => {
    setLoading(true);
    setSelectedCategories((prevSelectedCategories) => {
      return prevSelectedCategories.some((e) => e === category)
        ? prevSelectedCategories.filter((e) => e !== category)
        : [...prevSelectedCategories, category];
    });
  };

  const toggleSelectedType = (type) => {
    setLoading(true);
    setSelectedTypes((prevSelectedCTypes) => {
      return prevSelectedCTypes.some((e) => e === type)
        ? prevSelectedCTypes.filter((e) => e !== type)
        : [...prevSelectedCTypes, type];
    });
  };

  const toggleClearAll = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setFreeEvents(false);
    setSortBy("relevance");
  };

  const toggleApplyFilters = () => {
    // Aplly all filters
    // categories, types, free events, sort
    setAllFilters({
      categories: selectedCategories,
      types: selectedTypes,
      freeEvents: freeEvents,
      sortBy: sortBy,
    });
    navigation.goBack();
  };

  useEffect(() => {
    const categoriesNb = selectedCategories.length;
    const typesNb = selectedTypes.length;
    const sortNb = sortBy === "relevance" ? 0 : 1;
    const freeEventsNb = freeEvents ? 1 : 0;
    setNumberOfFilters(categoriesNb + typesNb + sortNb + freeEventsNb);
    setLoading(false);
  }, [selectedCategories, selectedTypes, sortBy, freeEvents]);

  // console.log(selectedCategories);
  // console.log(selectedTypes);
  if (loading) return <Text>Loading...</Text>;

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.searchBackground,
        },
        styles.container,
      ]}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={[{ color: themeColor.searchText }, styles.labelText]}>
          Categories
        </Text>
        <View style={styles.filtersContainer}>
          {filters.categories.map((category, key) => {
            let limit = showAllCategories ? 50 : 10;
            return (
              key < limit && (
                <Chip
                  key={key}
                  onPress={() => toggleSelectedCategory(category)}
                  style={{
                    backgroundColor: themeColor.filterButtonBg,
                    borderRadius: 30,
                  }}
                  textStyle={{ color: themeColor.filterButtonText }}
                  selected={selectedCategories.find((e) => e === category)}
                  selectedColor={themeColor.blue}
                >
                  {category}
                </Chip>
              )
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => setShowAllCategories(!showAllCategories)}
        >
          <Text style={{ color: themeColor.blue }}>
            {showAllCategories ? "Show less categories" : "Show all categories"}
          </Text>
        </TouchableOpacity>
        <Text style={[{ color: themeColor.searchText }, styles.labelText]}>
          Event type
        </Text>
        <View style={styles.filtersContainer}>
          {filters.types.map((type, key) => {
            let limit = showAllTypes ? 50 : 10;
            return (
              key < limit && (
                <Chip
                  key={key}
                  onPress={() => toggleSelectedType(type)}
                  style={{
                    backgroundColor: themeColor.filterButtonBg,
                    borderRadius: 30,
                  }}
                  textStyle={{ color: themeColor.filterButtonText }}
                  selected={selectedTypes.find((e) => e === type)}
                  selectedColor={themeColor.blue}
                >
                  {type}
                </Chip>
              )
            );
          })}
        </View>
        <TouchableOpacity onPress={() => setShowAllTypes(!showAllTypes)}>
          <Text style={{ color: themeColor.blue }}>
            {showAllTypes ? "Show less event types" : "Show all event types"}
          </Text>
        </TouchableOpacity>
        <View style={styles.otherFiltersContainer}>
          <Text style={[{ color: themeColor.searchText }, styles.labelText]}>
            Price
          </Text>
          <View style={styles.freeEventsContainer}>
            <Text
              style={[{ color: themeColor.searchText }, styles.freeEventsText]}
            >
              Only free events
            </Text>
            <Switch
              trackColor={{
                false: themeColor.veryLightBackground,
                true: themeColor.blue,
              }}
              onValueChange={() => setFreeEvents(!freeEvents)}
              value={freeEvents}
            />
          </View>
          <Text style={[{ color: themeColor.searchText }, styles.labelText]}>
            Sort by
          </Text>
          <SegmentedButtons
            value={sortBy}
            onValueChange={setSortBy}
            style={styles.segmentedButton}
            density="small"
            theme={{
              colors: {
                // selected background
                secondaryContainer: themeColor.veryLightBackground,
                // selected text
                onSecondaryContainer: themeColor.searchText,
                // border
                outline: themeColor.veryLightGray,
                // not selected text
                onSurface: themeColor.searchText,
              },
            }}
            buttons={[
              {
                value: "relevance",
                label: "Relevance",
                showSelectedCheck: true,
                onPress: () => {},
              },
              {
                value: "date",
                label: "Date",
                showSelectedCheck: true,
              },
            ]}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            {
              borderColor: themeColor.searchText,
              backgroundColor: themeColor.filterButtonBg,
            },
            styles.applyButton,
          ]}
          labelStyle={{ fontWeight: "600" }}
          mode="contained"
          onPress={() => toggleApplyFilters()}
        >
          <Text style={[{ color: themeColor.searchText }, styles.applyText]}>
            Apply filters {numberOfFilters > 0 && `(${numberOfFilters})`}
          </Text>
        </Button>
        {numberOfFilters > 0 && (
          <View alignItems="center">
            <TouchableOpacity onPress={() => toggleClearAll()}>
              <Text style={[{ color: themeColor.blue }, styles.clearText]}>
                Clear all
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectFilters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 20,
    paddingBottom: 50,
  },
  labelText: {
    fontSize: 15,
    marginTop: 35,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20,
    columnGap: 8,
    rowGap: 10,
  },
  otherFiltersContainer: {
    paddingHorizontal: 10,
  },
  freeEventsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  freeEventsText: {
    fontSize: 19,
    fontWeight: 600,
  },
  segmentedButton: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.1,
    paddingHorizontal: 18,
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  applyButton: {
    borderRadius: 4,
    borderWidth: 1,
  },
  applyText: {
    fontSize: 15,
    fontWeight: 700,
  },
  clearText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: 600,
  },
});
