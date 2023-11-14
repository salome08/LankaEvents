import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ErrorDialog = ({ message, isVisible, setIsVisible, type }) => {
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  console.log("-----------ErrorDialog-------------");

  console.log("message", message);

  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isVisible, slideAnim]);

  if (!isVisible) {
    return null; // Return null if dialog should not be visible
  }

  return (
    <Animated.View
      style={[
        {
          backgroundColor: themeColor.background,
          paddingTop: insets.top * 1.3,
        },
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <AntDesign
        name={type === "error" ? "exclamationcircleo" : "infocirlceo"}
        size={18}
        color={type == "error" ? themeColor.flashRed : themeColor.primaryText}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
        <Entypo name="cross" size={18} color={themeColor.secondaryText} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 20,
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "space-between",
    zIndex: 99999, // Adjust z-index as needed to show the dialog above other components
  },
  message: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
});

export default ErrorDialog;
