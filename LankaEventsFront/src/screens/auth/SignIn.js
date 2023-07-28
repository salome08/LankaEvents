import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../../contexts/AuthContext";
import { storeToken } from "../../utils/functions/storage";

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const navigation = useNavigation();
  const { logIn } = useAuth();

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
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginBottom: 10,
  },
});

export default SignInScreen;
