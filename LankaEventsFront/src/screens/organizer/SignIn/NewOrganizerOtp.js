import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemContext";
import { useAlert } from "../../../contexts/AlertContext";
import { useOrganizer } from "../../../contexts/OrganizerContext";
import { Button, ActivityIndicator } from "react-native-paper";
import VerificationCodeInput from "../../../components/VerificationCodeInput";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import userApi from "../../../../api/userApi";
import ErrorDialog from "../../../components/ErrorDialog";

const Step0 = ({ setStep }) => {
  const {
    setAuthenticatedO,
    setAuthenticatedU,
    authenticatedO,
    authenticatedU,
  } = useOrganizer();
  const { themeColor, isDarkMode } = useTheme();
  const { showError } = useAlert();
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.title}>
        First, let's verify it's you with a secure code
      </Text>
      <Text style={styles.mainText}>
        We will send a one-time verification code to your email address
      </Text>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setStep(1);
        }}
      >
        Send code
      </Button>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ alignItems: "center", marginTop: 10 }}
      >
        <Text style={[{ color: themeColor.blue }, styles.mainText]}>
          Cancel
        </Text>
      </TouchableOpacity>

      {/* <Text>
        logged user: {authenticatedU ? "YES" : "NO"}
        {"\n"}
        logged organizer: {authenticatedO ? "YES" : "NO"}
      </Text>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedO(true);
        }}
      >
        Sign Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedU(true);
        }}
      >
        Sign User
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedO(false);
        }}
      >
        Log out Organizer
      </Button> */}
    </View>
  );
};

const Step1 = ({ setStep }) => {
  const { themeColor, isDarkMode } = useTheme();
  const { showError, test } = useAlert();
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const fullCodeTyped = code.every((item) => !isNaN(parseInt(item)));
  const {
    setAuthenticatedO,
    setAuthenticatedU,
    authenticatedO,
    authenticatedU,
  } = useOrganizer();

  const onPressBack = () => {
    setStep(0);
    setCode(["", "", "", "", ""]);
  };

  const onPressSubmit = async () => {
    // showError("test");
    try {
      // Verify OTP
      // const res = await userApi.verifyOTP(code);
      // // console.log("res", res);
      // if ok:
      // Show confirmation Screen
      setStep(2);
      // create organizer
      // Show confirmation page
      await userApi.createOrganizerAccount();
      setAuthenticatedO(true);
      // redirect Organizer tab + steps
      setTimeout(() => {
        // console.log("Organizer Created");
        navigation.navigate("Organizer", { screen: "NewOrganizerSteps" });
      }, 2000);
      // else:
      // Show error message
      // else console.log(res.message);
    } catch (error) {
      showError(error);
      setCode(["", "", "", "", ""]);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Enter the verification code</Text>
      <Text style={styles.mainText}>
        We sent a 5-digit verification code to the email address you provided.
      </Text>
      <View style={{ marginTop: 20 }}>
        <VerificationCodeInput code={code} setCode={setCode} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={[
            {
              backgroundColor: themeColor.backgroundColor,
            },
            styles.button,
          ]}
          labelStyle={{ color: themeColor.blue, fontWeight: 700 }}
          mode="contained"
          onPress={onPressBack}
        >
          Back
        </Button>
        <Button
          style={[
            {
              backgroundColor: fullCodeTyped
                ? themeColor.primary
                : themeColor.eventSecondaryBg,
            },
            styles.button,
          ]}
          mode="contained"
          onPress={onPressSubmit}
          disabled={!fullCodeTyped}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

const Step2 = () => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View style={styles.step3Container}>
      <ActivityIndicator animating={true} color="rgb(77,224,160)" size={100} />
      <Text style={styles.title}>
        Your email was verified! Now let's start planning your event...
      </Text>
    </View>
  );
};

const NewOrganizerOtp = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();
  const {
    setAuthenticatedO,
    setAuthenticatedU,
    authenticatedO,
    authenticatedU,
  } = useOrganizer();
  const [step, setStep] = useState(0);

  return (
    <View
      style={[
        {
          paddingTop: insets.top * 2,
          paddingBottom: insets.bottom,
          backgroundColor: "rgb(252, 252, 252)",
        },
        styles.container,
      ]}
    >
      {step === 0 && <Step0 setStep={setStep} />}
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 />}
    </View>
  );
};

export default NewOrganizerOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    rowGap: 80,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  errorContainer: {
    flexDirection: "row",
    columnGap: 5,
    borderWidth: 2,
    borderRadius: 8,
    padding: 4,
    paddingLeft: 20,
  },
  errorIconContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  errorTextContainer: {
    rowGap: 10,
    // paddingHorizontal: 10,
    padding: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
  },
  mainText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 4,
  },
});
