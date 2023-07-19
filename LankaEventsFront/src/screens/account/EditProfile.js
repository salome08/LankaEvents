import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const saveProfile = async () => {
    try {
      const response = await axios.put(
        "https://your-api-endpoint.com/api/users/profile",
        { name, email }
      );

      // Handle the response or show a success message
      console.log("Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Save" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EditProfile;
