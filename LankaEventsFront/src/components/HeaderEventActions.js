import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo/vector-icons
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import eventApi from "../../api/eventApi";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemContext";
import { useEvent } from "../contexts/EventContext";

const HeaderEventActions = () => {
  console.log("in HeaderEventActions");
  const navigation = useNavigation();
  const route = useRoute();
  const { authenticated, user } = useAuth();
  const { themeColor } = useTheme();
  const { event } = route.params;
  const { isLiked, toggleLikeEvent } = useEvent();
  const liked = isLiked(event._id);

  const onLikePress = async () => {
    if (authenticated) {
      await eventApi.addLike(event._id);
      toggleLikeEvent(event);
    } else navigation.navigate("SignIn");
  };

  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={onLikePress}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={20}
          color={liked ? themeColor.primary : themeColor.primaryText}
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
