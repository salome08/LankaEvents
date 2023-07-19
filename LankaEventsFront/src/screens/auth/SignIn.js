import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const SignInScreen = () => {
  const handleSignIn = () => {
    // Handle sign-in logic
  };

  const handleFacebookSignIn = () => {
    // Handle Facebook sign-in logic
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic
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
