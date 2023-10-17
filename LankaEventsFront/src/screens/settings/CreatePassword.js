import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import userApi from "../../../api/userApi";

const CreatePassword = () => {
  console.log("---------------Render: CreatePassword------------------");
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { user, updateUserName } = useAuth();
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();

  // const handleOutsidePress = () => {
  //   firstnameInputRef.current.blur();
  //   lastnameInputRef.current.blur();
  // };

  const handleCreatePassword = () => {
    console.log("update name", firstName, lastName);
    navigation.goBack();
    // Update front after a response from the back
    updateUserName(firstName, lastName);
    userApi.updateUserName(firstName, lastName);
  };
  return (
    <ScrollView
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      <TouchableWithoutFeedback accessible={false}>
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
                styles.secondaryText,
              ]}
            >
              {user?.email}
            </Text>
          </View>
          <View style={styles.centerContainer}>
            <Text
              style={[
                { marginTop: 12, color: themeColor.primaryText },
                styles.mainText,
              ]}
            >
              We sent you a link to update your password to{"\n"}
              {user?.email}
            </Text>
            <Text
              style={[
                { marginTop: 12, color: themeColor.primaryText },
                styles.mainText,
              ]}
            >
              For your security, the link expores in 2 hours.
            </Text>
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
                onPress={() => handleCreatePassword()}
              >
                Open email app
              </Button>
            </View>
          </View>
          <View style={styles.linkContainer}>
            <Text style={[{ color: themeColor.blue }, styles.linkText]}>
              Resend verification email
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
  centerContainer: {
    marginTop: 20,
    alignItems: "center",
    rowGap: 10,
  },
  buttonContainer: {
    marginTop: 30,
    width: "50%",
    backgroundColor: "red",
  },
  linkContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: "400",
  },
  mainText: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
  },
  linkText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "center",
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

export default CreatePassword;
