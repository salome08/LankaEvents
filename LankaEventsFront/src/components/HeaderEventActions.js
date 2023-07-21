import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemContext";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo/vector-icons

const HeaderEventActions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { themeColor } = useTheme();
  console.log(route.params?.eventId);

  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log("Like the event by the user");
        }}
      >
        <Ionicons
          name="heart-outline"
          size={20}
          color={themeColor.primaryText}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Show popup actions");
        }}
      >
        <Ionicons
          name="ellipsis-vertical"
          size={18}
          color={themeColor.primaryText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderEventActions;

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    columnGap: 20,
  },
});
