import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../../contexts/AuthContext";
import { storeToken } from "../../utils/functions/storage";
import { useTheme } from "../../contexts/ThemContext";

WebBrowser.maybeCompleteAuthSession();

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
  return (
    <View
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      <View style={styles.textContainer}>
        <Text style={[{ color: themeColor.primaryText }, styles.title]}>
          Let's get started
        </Text>
        <Text style={[{ color: themeColor.primaryText }, styles.subtitle]}>
          Sign up or log in to see what's happening near you
        </Text>
      </View>

      <View style={styles.linksContainer}>
        <Button
          mode="contained"
          icon="email"
          onPress={handleSignIn}
          style={styles.button}
        >
          Sign in with Email
        </Button>

        <Button
          mode="contained"
          icon="facebook"
          onPress={handleFacebookSignIn}
          style={styles.button}
        >
          Sign in with Facebook
        </Button>

        <Button
          mode="contained"
          icon="google"
          onPress={handleGoogleSignIn}
          style={styles.button}
        >
          Sign in with Google
        </Button>
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  linksContainer: { paddingBottom: 80, rowGap: 8 },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 20,
    maxWidth: 300,
  },
  button: {
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 2,
  },
});

export default SignInScreen;
