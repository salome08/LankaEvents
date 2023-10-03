import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../contexts/ThemContext";

const FreeTag = () => {
  const { themeColor } = useTheme();

  return (
    <View>
      <View
        style={[{ borderColor: themeColor.veryLightGray }, styles.tagContainer]}
      >
        <Text>Free</Text>
      </View>
    </View>
  );
};

export default FreeTag;

const styles = StyleSheet.create({
  tagContainer: {
    width: 40,
    height: 22,
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
