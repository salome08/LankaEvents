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
import PasswordStrength from "../../components/PasswordStrength";

const CreatePassword = () => {
  console.log("---------------Render: CreatePassword------------------");
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const handleCreatePassword = () => {
    console.log("handleCreatePassword", password);
    // Update front after a response from the back
    // userApi.updateUserName(firstName, lastName);
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
          <View style={styles.inputContainer}>
            <TextInput
              label="Password"
              value={password}
              selectionColor={themeColor.blue}
              keyboardType="default"
              inputMode="text"
              style={{
                backgroundColor: themeColor.background,
              }}
              secureTextEntry={isPasswordSecure}
              right={
                <TextInput.Icon
                  icon={isPasswordSecure ? "eye-off" : "eye"}
                  iconColor={themeColor.primaryText}
                  size={18}
                  underlayColor="transparent"
                  style={styles.textInputIcon}
                  onPress={() => {
                    isPasswordSecure
                      ? setIsPasswordSecure(false)
                      : setIsPasswordSecure(true);
                  }}
                />
              }
              textColor={themeColor.primaryText}
              underlineColor={themeColor.primaryText}
              activeUnderlineColor={themeColor.blue}
              onChangeText={(text) => setPassword(text)}
            />
            <PasswordStrength password={password} />
          </View>
          <View style={styles.centerContainer}>
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
                Sign in
              </Button>
            </View>
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
  inputContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: "400",
  },
  textInputIcon: {
    position: "absolute",
    top: 0,
    left: 0,
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
