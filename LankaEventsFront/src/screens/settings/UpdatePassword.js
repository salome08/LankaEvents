import React, { useState, useEffect, useRef } from "react";
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
import VerificationCodeInput from "../../components/VerificationCodeInput";
import moment from "moment";
import PasswordStrength from "../../components/PasswordStrength";

// Check if password exist
// If so render update password page
// If not render OTP send Page

const OTPScreen = () => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { user, updateUserName } = useAuth();
  const [code, setCode] = useState(["", "", "", "", ""]);

  useEffect(() => {
    // Send email with code on page loading
    userApi.sendEmailOTP();
  }, []);

  useEffect(() => {
    const verifyOTP = async (code) => {
      res = await userApi.verifyOTP(code);
      if (res.ok) navigation.navigate("CreatePassword");
      else console.log(res.message);
    };

    if (code.every((item) => !isNaN(parseInt(item)))) {
      verifyOTP(code.join(""));
    }
  }, [code]);

  return (
    <View>
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
          For your security, the link expires in 2 hours.
        </Text>
      </View>
      <View style={styles.verificationCodeContainer}>
        <VerificationCodeInput code={code} setCode={setCode} />
      </View>
      <View style={styles.linkContainer}>
        <Text style={[{ color: themeColor.blue }, styles.linkText]}>
          Resend verification email
        </Text>
      </View>
    </View>
  );
};

const UpdatePasswordScreen = () => {
  // Current password, Error: This field id required
  // New password, Error: Password needs to be at least 8 characters
  // Confirm new password, Error: Passwords don't match
  // Error after call api: Wrong password

  const { themeColor } = useTheme();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setCconfirmPassword] = useState("");

  const [isCurrentPasswordSecure, setIsCurrentPasswordSecure] = useState(true);
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const [errorCurrentPassword, setErrorCurrentPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const passwordInputs = [
    {
      label: "Current password",
      value: currentPassword,
      setValue: setCurrentPassword,
      isPasswordSecure: isCurrentPasswordSecure,
      setIsPasswordSecure: setIsCurrentPasswordSecure,
      error: errorCurrentPassword,
      setError: setErrorCurrentPassword,
      showPasswordStrength: false,
      errorText: "This field is required",
    },
    {
      label: "New password",
      value: newPassword,
      setValue: setNewPassword,
      isPasswordSecure: isNewPasswordSecure,
      setIsPasswordSecure: setIsNewPasswordSecure,
      error: errorNewPassword,
      setError: setErrorNewPassword,
      showPasswordStrength: true,
      errorText: "Password needs to be at least 8 characters",
    },
    {
      label: "Confirm new password",
      value: confirmPassword,
      setValue: setCconfirmPassword,
      isPasswordSecure: isConfirmPasswordSecure,
      setIsPasswordSecure: setIsConfirmPasswordSecure,
      error: errorConfirmPassword,
      setError: setErrorConfirmPassword,
      showPasswordStrength: false,
      errorText: "Passwords don't match",
    },
  ];

  const handleUpdatePassword = async () => {
    if (currentPassword.length === 0) setErrorCurrentPassword(true);
    if (newPassword.length < 8) setErrorNewPassword(true);
    if (newPassword !== confirmPassword) setErrorConfirmPassword(true);
    else {
      console.log("here");
      await userApi.updatePassword(currentPassword, newPassword);
      console.log("OK update password");
    }
  };

  return (
    <View>
      <View style={styles.inputsContainer}>
        {passwordInputs.map((input, index) => (
          <View key={index}>
            <TextInput
              label={input.label}
              value={input.value}
              selectionColor={themeColor.blue}
              keyboardType="default"
              inputMode="text"
              style={{
                backgroundColor: themeColor.background,
              }}
              error={input.error}
              secureTextEntry={input.isPasswordSecure}
              right={
                <TextInput.Icon
                  icon={input.isPasswordSecure ? "eye-off" : "eye"}
                  iconColor={themeColor.primaryText}
                  size={18}
                  underlayColor="transparent"
                  style={styles.textInputIcon}
                  onPress={() => {
                    input.setIsPasswordSecure(!input.isPasswordSecure);
                  }}
                />
              }
              textColor={themeColor.primaryText}
              underlineColor={themeColor.primaryText}
              activeUnderlineColor={themeColor.blue}
              onChangeText={(text) => {
                input.setError(false);
                input.setValue(text);
              }}
            />

            {input.error ? (
              <Text
                style={[
                  { color: themeColor.red, marginTop: 5 },
                  styles.secondaryText,
                ]}
              >
                {input.errorText}
              </Text>
            ) : (
              input.label === "New password" && (
                <PasswordStrength password={input.value} />
              )
            )}
          </View>
        ))}
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
          onPress={() => handleUpdatePassword()}
        >
          Update password
        </Button>
      </View>
    </View>
  );
};

const UpdatePassword = () => {
  console.log("---------------Render: UpdatePassword------------------");
  const { themeColor } = useTheme();
  const { user } = useAuth();
  const [userHasPassword, setUserHasPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // check if user has password
    const checkUserHasPassword = async () => {
      setLoading(true);
      const { userHasPassword } = await userApi.userHasPassword();
      setUserHasPassword(userHasPassword);
      setLoading(false);
    };

    checkUserHasPassword();
  }, []);

  if (loading || userHasPassword === null) return <Text>Loading...</Text>;

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
          {userHasPassword ? <UpdatePasswordScreen /> : <OTPScreen />}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  verificationCodeContainer: {
    marginTop: 30,
  },
  inputsContainer: {
    marginTop: 50,
    rowGap: 30,
  },
  buttonContainer: {
    marginTop: 30,
    width: "50%",
  },
  linkContainer: {
    alignItems: "center",
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

export default UpdatePassword;
