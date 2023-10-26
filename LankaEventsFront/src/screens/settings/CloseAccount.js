import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemContext";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import userApi from "../../../api/userApi";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const radio_props = [
  { label: "I do not recall signing up for LankaEvents", value: 0 },
  { label: "The site is too dificult to use", value: 1 },
  { label: "I do not want my information saved by LankaEvents", value: 2 },
  {
    label: "I am not interested in managing my attendance at any events",
    value: 3,
  },
  { label: "I am not attending any events", value: 4 },
  { label: "Other (Please explain)", value: 5 },
];

const CloseAccount = () => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { user, logOut } = useAuth();
  const [reasonValue, setReasonValue] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [closeInput, setCloseInput] = useState("");
  const [otherInput, setOtherInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState(user ? user.email : null);

  console.log("--------- CloseAccount ----------");

  const handleCloseAccount = async () => {
    // Handle Errors:
    // 1. check form: (Empty or other + empty) popup "Please tell us why you are leaving."
    if (!reasonValue || (reasonValue === radio_props.length - 1 && !otherInput))
      Alert.alert("Please tell us why you are leaving.", "", [{ text: "OK" }]);
    // 2. check close box. Popup "Please enter “CLOSE“ in the text box below."
    else if (!closeInput || closeInput !== "CLOSE")
      Alert.alert('Please enter "CLOSE" in the text box below.', "", [
        { text: "OK" },
      ]);
    // 3. check password box. Popup "Please enter your password in the text box below."
    else if (!passwordInput.trim())
      Alert.alert("Please enter your password in the text box below.", "", [
        { text: "OK" },
      ]);
    // 4. Send call to api
    else {
      // If error response, set PasswordError & reset all fields
      console.log("send api", email);
      const res = await userApi.closeAccount(email, passwordInput.trim());
      logOut();
      if (!res.ok) {
        setPasswordError(true);
        setAttempts(attempts + 1);
        setReasonValue(null);
        setEmail(res.email);
        setOtherInput("");
        setCloseInput("");
        setPasswordInput("");
      } else if (res.ok) {
        navigation.navigate("Profile");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {passwordError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            The password you entered didn't match our records.
          </Text>
        </View>
      )}
      <Text style={styles.mainText}>
        Thank you for using LankaEvents. If there is anything we can do to keep
        you with us, please let us know.{"\n"}
      </Text>
      <Text style={styles.mainText}>
        Please take a moment to let us know why you are leaving:
      </Text>
      <View style={styles.radioContainer}>
        <RadioForm
          key={attempts}
          radio_props={radio_props}
          initial={-1}
          buttonColor="gray"
          onPress={(value) => {
            setReasonValue(value);
          }}
          labelColor="rgb(10,0,55)"
        />
        <TextInput
          style={styles.input}
          value={otherInput}
          onChangeText={setOtherInput}
        />
      </View>
      <Text style={styles.mainText}>
        Please enter "CLOSE" and your password to confirm that you wish to close
        your account
      </Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={[styles.mainText, styles.secondaryText]}>
            Type "CLOSE":
          </Text>
          <TextInput
            style={styles.input}
            value={closeInput}
            onChangeText={setCloseInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.mainText, styles.secondaryText]}>
            Type your password:
          </Text>
          <TextInput
            style={styles.input}
            value={passwordInput}
            passwordRules={true}
            onChangeText={setPasswordInput}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            {
              // borderColor: themeColor.primary,
              backgroundColor: themeColor.primary,
            },
            styles.button,
          ]}
          labelStyle={{ fontWeight: "600" }}
          mode="contained"
          onPress={handleCloseAccount}
        >
          <Text style={styles.buttonText}>Close Account</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default CloseAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  radioContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    rowGap: 16,
  },
  inputContainer: {},
  errorContainer: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    marginBottom: 15,
    borderBottomColor: "rgb(200,200,220)",
  },
  buttonContainer: {
    marginTop: 12,
    paddingHorizontal: 5,
    paddingBottom: 100,
  },
  input: {
    height: 40,
    marginTop: 2,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    borderColor: "rgb(200,200,220)",
  },
  mainText: {
    fontSize: 17,
    color: "rgb(10,0,55)",
    letterSpacing: 0.2,
  },
  secondaryText: {
    fontSize: 15,
  },
  errorText: {
    color: "red",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  button: {
    borderRadius: 4,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 600,
  },
});
