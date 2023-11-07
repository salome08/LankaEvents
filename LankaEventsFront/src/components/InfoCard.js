import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemContext";

const NewOrganizerOtp = ({ icon, subtitle, title, color }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View style={[styles.container]}>
      <View
        style={[
          { backgroundColor: color.bg, borderColor: color.border },
          styles.iconContainer,
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={32}
          color="rgb(89, 83, 105)"
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          marginTop: 11,
          color: "rgb(89, 83, 105)",
        }}
      >
        {subtitle}
      </Text>
      <Text
        style={{
          fontSize: 23,
          fontWeight: 700,
          marginTop: 20,
          color: "rgb(89, 83, 105)",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default NewOrganizerOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    width: 310,
    padding: 25,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: "rgb(241, 237, 244)",
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
  },
  // scrollView: {
  //   alignItems: "center",
  //   padding: 16,
  // },
  // buttonsContainer: {
  //   flexDirection: "row",
  // },
  // errorContainer: {
  //   flexDirection: "row",
  //   columnGap: 5,
  //   borderWidth: 2,
  //   borderRadius: 8,
  //   padding: 4,
  //   paddingLeft: 20,
  // },
  // errorIconContainer: {
  //   width: 30,
  //   height: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 20,
  // },
  // errorTextContainer: {
  //   rowGap: 10,
  //   // paddingHorizontal: 10,
  //   padding: 10,
  // },
  // title: {
  //   fontSize: 25,
  //   fontWeight: 700,
  //   textAlign: "center",
  // },
  // mainText: {
  //   fontSize: 18,
  // },
  // errorText: {
  //   fontSize: 16,
  // },
  // button: {
  //   marginTop: 40,
  //   marginBottom: 10,
  //   borderRadius: 4,
  // },
});
