import React, { useState, useEffect } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSearch } from "../contexts/SearchContext";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../contexts/ThemContext";

const DateRangePicker = () => {
  const { selectedDate, setSelectedDate } = useSearch();
  const { themeColor, isDarkMode } = useTheme();
  const [showPickerFrom, setShowPickerFrom] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [showPickerTo, setShowPickerTo] = useState(false);
  const [pickedFrom, setPickedFrom] = useState();
  const [pickedTo, setPickedTo] = useState();
  console.log("----------Render: DateRangePicker--------------");
  /* TO DO: 
  - show the From on click on choose a date
  - show the To on selected from with the selected from initially
  - disable past dates ( minimumDate)
  - show apply range button when the From is selected
  - on apply range set the dates in the context and lauch request
  - set the choose date pink with V
  - go back 
  - initially get values from the state for the From and To
  - clear date range on another selected option
  - set the design
*/

  console.log("pickedDate", pickedDate);
  console.log("pickedFrom", pickedDate);
  console.log("pickedTo", pickedDate);
  // Function to handle the date picker selection
  const handleDateSelectFrom = (event, date) => {
    if (date) {
      console.log("FROM", date);
      setPickedFrom(date);
      // setSelectedDate({
      //   label: moment(date).format("DD MMM YYYY"),
      //   value: date,
      // });
      // setPickedDate(date);
      // setShowDatePicker(false);
      // navigation.goBack();
    }
  };
  const handleDateSelectTo = (event, date) => {
    if (date) {
      console.log("TO", date);
      // setPickedFrom(date);
      // setSelectedDate({
      //   label: moment(date).format("DD MMM YYYY"),
      //   value: date,
      // });
      // setPickedDate(date);
      // setShowDatePicker(false);
      // navigation.goBack();
    }
  };

  return (
    <View style={styles.dateRangePickerContainer}>
      <View style={styles.datePickerContainer}>
        <Text style={{ color: themeColor.searchText }}>From</Text>
        <DateTimePicker
          value={pickedDate}
          mode="date"
          display="compact"
          onChange={handleDateSelectFrom}
          themeVariant={isDarkMode ? "dark" : "light"}
        />
      </View>
      {pickedFrom && (
        <View style={styles.datePickerContainer}>
          <Text style={{ color: themeColor.searchText }}>To</Text>
          <DateTimePicker
            value={pickedFrom}
            mode="date"
            // display="compact"
            onChange={handleDateSelectTo}
            themeVariant={isDarkMode ? "dark" : "light"}
          />
        </View>
      )}
    </View>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({
  dateRangePickerContainer: {
    flex: 1,
    // backgroundColor: "blue",
    paddingHorizontal: 40,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
