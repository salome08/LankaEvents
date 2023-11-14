import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const ErrorDialog = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      // setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isVisible, slideAnim]);

  if (!isVisible) {
    return null; // Return null if dialog should not be visible
  }

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red", // Change the background color or add styles as needed
    padding: 16,
    zIndex: 99999999, // Adjust z-index as needed to show the dialog above other components
  },
  message: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ErrorDialog;
