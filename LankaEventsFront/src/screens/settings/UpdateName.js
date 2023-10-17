import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import userApi from "../../../api/userApi";

const UpdateName = () => {
  console.log("---------------Render: UpdateName------------------");
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { user, updateUserName } = useAuth();
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();

  const handleOutsidePress = () => {
    firstnameInputRef.current.blur();
    lastnameInputRef.current.blur();
  };

  const handleUpdateName = () => {
    console.log("update name", firstName, lastName);
    navigation.goBack();
    // Update front after a response from the back
    updateUserName(firstName, lastName);
    userApi.updateUserName(firstName, lastName);
  };
  return (
    <View
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: user?.pictureUrl,
              }}
              style={styles.profilePicture}
            />
          </View>

          <View style={styles.textTitleContainer}>
            <Text style={[{ color: themeColor.primaryText }, styles.title]}>
              {user?.name}
            </Text>
            <Text
              style={[
                { marginTop: 12, color: themeColor.primaryText },
                styles.mainText,
              ]}
            >
              {user?.email}
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              label="First name"
              ref={firstnameInputRef}
              value={firstName}
              selectionColor={themeColor.blue}
              style={{
                backgroundColor: themeColor.background,
              }}
              textColor={themeColor.primaryText}
              showSoftInputOnFocus={false}
              underlineColor={themeColor.primaryText}
              activeUnderlineColor={themeColor.blue}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              label="Last name"
              ref={lastnameInputRef}
              value={lastName}
              selectionColor={themeColor.blue}
              style={{
                backgroundColor: themeColor.background,
              }}
              textColor={themeColor.primaryText}
              showSoftInputOnFocus={false}
              underlineColor={themeColor.primaryText}
              activeUnderlineColor={themeColor.blue}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: themeColor.background,
                borderTopColor: themeColor.devider,
              },
              styles.buttonContainer,
            ]}
          >
            <Button
              style={[
                {
                  borderColor: themeColor.primary,
                  backgroundColor: themeColor.backgroundButton,
                },
                styles.updateButton,
              ]}
              labelStyle={{ fontWeight: "600" }}
              mode="contained"
              onPress={() => handleUpdateName()}
            >
              Update name
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  textTitleContainer: {
    alignItems: "center",
  },
  inputsContainer: {
    marginTop: 40,
    rowGap: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 82.1,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  mainText: {
    fontSize: 12,
    fontWeight: "400",
  },
  profilePicture: {
    width: 60,
    height: 60,
    marginTop: 20,
    borderRadius: 80,
    marginBottom: 25,
  },
  updateButton: {
    borderRadius: 4,
    borderWidth: 2,
  },
});

export default UpdateName;
