import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LoginOptions = ({ navigation }) => {
  const handleEmailLogin = () => {
    // Navigate to the Email Login screen
    navigation.navigate("EmailLogin");
  };

  const handleSocialLogin = () => {
    // Navigate to the Social Login screen
    navigation.navigate("SocialLogin");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginOptionButton}
        onPress={handleEmailLogin}
      >
        <Text style={styles.loginOptionText}>Email Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginOptionButton}
        onPress={handleSocialLogin}
      >
        <Text style={styles.loginOptionText}>Social Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  loginOptionButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    alignItems: "center",
  },
  loginOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LoginOptions;
