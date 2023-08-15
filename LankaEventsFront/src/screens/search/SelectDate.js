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

const easyDates = [
  { label: "Anytime", value: "anytime" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "this_week" },
  { label: "This Weekend", value: "this_weekend" },
  { label: "Choose a date...", value: "picker" },
];

const FilterScreen = () => {
  const { selectedDate, setSelectedDate } = useSearch();
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const { themeColor, isDarkMode } = useTheme();

  const handleEasyDateSelect = (selected) => {
    if (selected.value === "picker") {
      setShowDatePicker(true);
    } else {
      setSelectedDate(selected);
      navigation.goBack();
    }
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
        { backgroundColor: themeColor.searchBackground },
        styles.container,
      ]}
    >
      {/* Dates options */}
      <FlatList
        data={easyDates}
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
            {showDatePicker && item.value === "picker" && <DateRangePicker />}
          </>
        )}
        keyExtractor={(item) => item.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
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
});

export default FilterScreen;
