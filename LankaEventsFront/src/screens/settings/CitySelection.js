import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CitySelection = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleSaveCity = () => {
    if (selectedCity) {
      // Save the selected city to your app's storage or send it to the server
      console.log("Selected city:", selectedCity);
      navigation.goBack(); // Go back to the previous screen
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.cityButton,
          selectedCity === "New York" && styles.selectedCityButton,
        ]}
        onPress={() => handleCitySelect("New York")}
      >
        <Text
          style={[
            styles.cityText,
            selectedCity === "New York" && styles.selectedCityText,
          ]}
        >
          New York
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.cityButton,
          selectedCity === "London" && styles.selectedCityButton,
        ]}
        onPress={() => handleCitySelect("London")}
      >
        <Text
          style={[
            styles.cityText,
            selectedCity === "London" && styles.selectedCityText,
          ]}
        >
          London
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.cityButton,
          selectedCity === "Paris" && styles.selectedCityButton,
        ]}
        onPress={() => handleCitySelect("Paris")}
      >
        <Text
          style={[
            styles.cityText,
            selectedCity === "Paris" && styles.selectedCityText,
          ]}
        >
          Paris
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, !selectedCity && styles.disabledSaveButton]}
        onPress={handleSaveCity}
        disabled={!selectedCity}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cityButton: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  selectedCityButton: {
    backgroundColor: "#007bff",
  },
  cityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedCityText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  disabledSaveButton: {
    backgroundColor: "#ccc",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CitySelection;
