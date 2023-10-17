import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { RadioButton, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../contexts/ThemContext";
import { useSearch } from "../../contexts/SearchContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import DateRangePicker from "../../components/DateRangePicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const easyDates = [
  { label: "Anytime", value: "anytime", data: null },
  { label: "Today", value: "today", data: null },
  { label: "Tomorrow", value: "tomorrow", data: null },
  { label: "This Week", value: "this_week", data: null },
  { label: "This Weekend", value: "this_weekend", data: null },
  { label: "Choose a date...", value: "picker", data: { from: "", to: "" } },
];

const FilterScreen = () => {
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const { selectedDate, setSelectedDate } = useSearch();
  const insets = useSafeAreaInsets();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [pickedFrom, setPickedFrom] = useState(
    selectedDate.data?.from || new Date()
  );
  const [pickedTo, setPickedTo] = useState(selectedDate.data?.to || new Date());

  const handleEasyDateSelect = (selected) => {
    // console.log(selected);
    if (selected.value === "picker") {
      setShowDatePicker(true);
      // setSelectedDate(selected);
    } else {
      setSelectedDate(selected);
      navigation.goBack();
    }
  };

  const applyDateRange = () => {
    console.log("pickedFrom", pickedFrom);
    console.log("pickedTo", pickedTo);
    let selected = {
      label: "Choose a date...",
      value: "picker",
      data: { from: pickedFrom, to: pickedTo },
    };
    setSelectedDate(selected);
    navigation.goBack();

    // Set dates to the context and launch request
  };
  // Function to handle the date picker selection
  // const handleDateSelect = (event, date) => {
  //   if (date) {
  //     console.log(date);
  //     setSelectedDate({
  //       label: moment(date).format("DD MMM YYYY"),
  //       value: date,
  //     });
  //     setPickedDate(date);
  //     setShowDatePicker(false);
  //     navigation.goBack();
  //   }
  // };

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.searchBackground,
          paddingBottom: insets.bottom,
        },
        styles.container,
      ]}
    >
      {/* Dates options */}
      <FlatList
        data={easyDates}
        style={styles.flatList}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={[styles.dateItem]}
              onPress={() => handleEasyDateSelect(item)}
            >
              <Text
                style={[
                  {
                    color:
                      selectedDate.value === item.value
                        ? themeColor.primary
                        : themeColor.primaryText,
                  },
                  styles.dateName,
                ]}
              >
                {item.label}
              </Text>
              {selectedDate.value === item.value && (
                <Icon name="check" size={25} color={themeColor.primary} />
              )}
            </TouchableOpacity>
            {(showDatePicker || selectedDate.value === "picker") &&
              item.value === "picker" && (
                <DateRangePicker
                  pickedFrom={pickedFrom}
                  pickedTo={pickedTo}
                  setPickedFrom={setPickedFrom}
                  setPickedTo={setPickedTo}
                  setShowApplyButton={setShowApplyButton}
                />
              )}
          </>
        )}
        keyExtractor={(item) => item.value}
      />
      {showApplyButton && (
        <View style={styles.buttonContainer}>
          <Button
            style={[
              {
                borderColor: themeColor.primary,
                backgroundColor: themeColor.primaryDark,
              },
              styles.applyButton,
            ]}
            labelStyle={{ fontWeight: "600" }}
            mode="contained"
            onPress={() => applyDateRange()}
          >
            <Text style={[{ color: themeColor.searchText }, styles.applyText]}>
              Apply date range
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flatList: {
    padding: 16,
  },
  optionContainer: {
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  dateName: {
    fontSize: 25,
    fontWeight: 700,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    paddingVertical: 20,
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
});

export default FilterScreen;
