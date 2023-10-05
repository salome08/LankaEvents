import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../../contexts/AuthContext";
import { storeToken } from "../../utils/functions/storage";
import { useTheme } from "../../contexts/ThemContext";

WebBrowser.maybeCompleteAuthSession();

const AuthButton = ({ icon, label, onPress }) => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <Button
      mode="contained"
      icon={icon !== "email" && icon}
      onPress={onPress}
      labelStyle={{
        color: "white",
      }}
      style={[
        {
          borderWidth: isDarkMode ? 2 : 0,
          borderColor:
            icon === "email" ? themeColor.primary : themeColor.primaryText2,
          backgroundColor:
            icon === "email"
              ? themeColor.backgroundButton
              : icon === "google"
              ? "#0F9D58"
              : icon === "facebook"
              ? "#3b5998"
              : "black",
        },
        styles.button,
      ]}
    >
      {label}
    </Button>
  );
};

const SignInScreen = () => {
  const navigation = useNavigation();
  const { logIn } = useAuth();
  const { themeColor, isDarkMode } = useTheme();

  const handleGoogleSignIn = async () => {
    const response = await WebBrowser.openAuthSessionAsync(
      "http://localhost:3000/auth/login/federated/google",
      "exp://192.168.1.112:19000/Home"
    );
    if (response?.type === "success") {
      if (response.url) {
        // Check if the URL contains the token or other relevant data
        if (response.url.includes("access_token")) {
          // Extract the token from the URL
          const urlParts = response.url.split("#");
          const tokenPart = urlParts[0];
          const tokenKeyValuePairs = tokenPart.split("&");
          const token = tokenKeyValuePairs
            .find((pair) => pair.includes("access_token"))
            .split("=")[1];

          // Store the token in async storage
          await storeToken(token);

          // Update auth state in the context
          logIn(token);
        }
      }
    }

    navigation.goBack();
    // await authApi.signInWithGoogle();
  };

  const handleSignIn = () => {
    // Handle sign-in logic
  };

  const handleFacebookSignIn = () => {
    // Handle Facebook sign-in logic
  };
  const handleAppleSignIn = () => {
    // Handle Facebook sign-in logic
  };
  return (
    <View
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      <View style={styles.textContainer}>
        <Text style={[{ color: themeColor.primaryText }, styles.title]}>
          Let's Get Started !
        </Text>
        <Text style={[{ color: themeColor.primaryText }, styles.subtitle]}>
          Sign up or log in to see what's happening near you
        </Text>
      </View>

      <View style={styles.linksContainer}>
        <AuthButton
          icon="email"
          label="Continue with email address"
          onPress={handleSignIn}
        />
        <AuthButton
          icon="facebook"
          label="Sign in with Facebook"
          onPress={handleFacebookSignIn}
        />
        <AuthButton
          icon="google"
          label="Sign in with Google"
          onPress={handleGoogleSignIn}
        />
        <AuthButton
          icon="apple"
          label="Sign in with Apple"
          onPress={handleAppleSignIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  textContainer: {
    paddingTop: 50,
  },
  linksContainer: { paddingBottom: 110, rowGap: 8 },
  title: {
    fontSize: 35,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 20,
    maxWidth: 300,
  },
  button: {
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default SignInScreen;
