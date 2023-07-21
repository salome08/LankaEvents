import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemContext";

const HeaderBackButton = () => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      // style={styles.headerIconContainer}
    >
      <Feather name="arrow-left" size={24} color={themeColor.primaryText} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
