import React, { useState, useEffect } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSearch } from "../contexts/SearchContext";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemContext";

const DateRangePicker = ({
  pickedFrom,
  pickedTo,
  setPickedFrom,
  setPickedTo,
  setShowApplyButton,
}) => {
  const { selectedDate, setSelectedDate } = useSearch();
  const { themeColor, isDarkMode } = useTheme();
  const [showPickerFrom, setShowPickerFrom] = useState(false);
  const [showPickerTo, setShowPickerTo] = useState(false);
  const [isFromPicked, setIsFromPicked] = useState(
    selectedDate?.data?.from ? true : false
  );
  const [isToPicked, setIsToPicked] = useState(
    selectedDate?.data?.to ? true : false
  );
  console.log("----------Render: DateRangePicker--------------");

  // Function to handle the date picker selection
  const handleDateSelectFrom = (event, date) => {
    if (date) {
      setPickedFrom(new Date(date));
      if (!isToPicked) setPickedTo(new Date(date));
      setIsFromPicked(true);
      setShowPickerFrom(false);
      if (!isToPicked) setShowPickerTo(true);
      setShowApplyButton(true);
    }
  };
  const handleDateSelectTo = (event, date) => {
    if (date) {
      setPickedTo(new Date(date));
      setIsToPicked(true);
      setShowPickerTo(false);
      setShowApplyButton(true);
    }
  };

  return (
    <View style={styles.dateRangePickerContainer}>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          onPress={() => {
            setShowPickerFrom(!showPickerFrom);
            setShowPickerTo(false);
          }}
        >
          <Text style={[{ color: themeColor.lightGray }, styles.labelDate]}>
            From:
          </Text>
          <Text
            style={[
              {
                color: showPickerFrom
                  ? themeColor.primaryDark
                  : themeColor.searchText,
              },
              styles.dateText,
            ]}
          >
            {moment(pickedFrom).format("DD MMM YYYY")}
          </Text>
        </TouchableOpacity>
      </View>
      {isFromPicked && (
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowPickerTo(!showPickerTo);
              setShowPickerFrom(false);
            }}
          >
            <Text style={[{ color: themeColor.lightGray }, styles.labelDate]}>
              To:
            </Text>
            <Text
              style={[
                {
                  color: showPickerTo
                    ? themeColor.primaryDark
                    : themeColor.searchText,
                },
                styles.dateText,
              ]}
            >
              {isToPicked
                ? moment(pickedTo).format("DD MMM YYYY")
                : "Choose a date"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {showPickerFrom && (
        <View style={styles.calendarContainer}>
          <DateTimePicker
            value={pickedFrom}
            minimumDate={new Date()}
            display="inline"
            onChange={handleDateSelectFrom}
            themeVariant={isDarkMode ? "dark" : "light"}
            accentColor={themeColor.primaryDark}
          />
        </View>
      )}
      {showPickerTo && (
        <View style={styles.calendarContainer}>
          <DateTimePicker
            value={pickedTo}
            minimumDate={pickedFrom}
            display="inline"
            onChange={handleDateSelectTo}
            themeVariant={isDarkMode ? "dark" : "light"}
            accentColor={themeColor.primaryDark}
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
  },
  datePickerContainer: {},
  calendarContainer: {
    backgroundColor: "rgb(19,19,19)",
    margin: 8,
    borderRadius: 12,
    padding: 3,
    marginBottom: 80,
  },
  dateText: {
    fontSize: 23,
    fontWeight: 700,
  },
  labelDate: {
    fontSize: 15,
    fontWeight: 500,
  },
});
