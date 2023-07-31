import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { useEvent } from "../../contexts/EventContext";
import { useSearch } from "../../contexts/SearchContext";

const towns = [
  { id: "0", name: "Sri Lanka" },
  { id: "1", name: "Colombo" },
  { id: "2", name: "Hikkaduwa" },
  { id: "3", name: "Unawatuna" },
  { id: "4", name: "Ahangama" },
  { id: "5", name: "Midigama" },
  { id: "6", name: "Weligama" },
  { id: "7", name: "Mirissa" },
  { id: "8", name: "Arugam Bay" },
  { id: "9", name: "Ella" },
  { id: "10", name: "Kandy" },
];

const otherOptions = [
  {
    id: "nearby",
    name: "Nearby",
    description: "Current Location",
    icon: "crosshair",
  },
  {
    id: "online",
    name: "Online events",
    description: "Virtual attendance",
    icon: "youtube",
  },
];

const SelectLocation = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const { selectedTown, setSelectedTown } = useSearch();
  // Function to handle the town selection

  const handleTownSelect = (selected) => {
    setSelectedTown(selected.name);
    navigation.goBack();
  };

  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Find events in..."
          onChangeSearch={onChangeSearch}
          searchQuery={searchQuery}
        />
      </View>

      {/* Online & Nearby options */}
      <View style={styles.otherOptionsContainer}>
        <FlatList
          data={otherOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.townItem]}
              onPress={() => handleTownSelect(item)}
            >
              <View style={styles.specialLocationItem}>
                <View
                  style={[
                    {
                      backgroundColor: themeColor.lightBlue,
                    },
                    styles.iconContainer,
                  ]}
                >
                  <Feather name={item.icon} size={20} color={themeColor.blue} />
                </View>
                <View>
                  <Text
                    style={[
                      {
                        color: themeColor.blue,
                      },
                      styles.otherOptionsName,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      {
                        color: themeColor.gray,
                      },
                      styles.otherOptionsDesc,
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              {selectedTown === item.id && (
                <Icon name="check" size={25} color={themeColor.blue} />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Text style={[{ color: themeColor.primaryText }, styles.heading]}>
        Browsing in
      </Text>

      {/* Town options */}
      <FlatList
        data={towns}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.townItem]}
            onPress={() => handleTownSelect(item)}
          >
            <Text
              style={[
                {
                  color:
                    selectedTown === item.id
                      ? themeColor.primary
                      : themeColor.primaryText,
                },
                styles.townName,
              ]}
            >
              {item.name}
            </Text>
            {selectedTown === item.id && (
              <Icon name="check" size={25} color={themeColor.primary} />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 15,
    marginBottom: 10,
  },
  townItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  specialLocationItem: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  townName: {
    fontSize: 20,
    fontWeight: 700,
  },
  otherOptionsName: {
    fontSize: 17,
    fontWeight: 700,
  },
  otherOptionsDesc: {
    fontSize: 15,
  },
  selectedTown: {},
  otherOptionsContainer: {
    marginBottom: 20,
    marginTop: 12,
  },
});
