import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo/vector-icons
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import moment from "moment";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { useTheme } from "../contexts/ThemContext";
import { useEvent } from "../contexts/EventContext";
import { useAuth } from "../contexts/AuthContext";
import eventApi from "../../api/eventApi";
import FreeTag from "./FreeTag";

const handleShare = async () => {
  try {
    const result = await Sharing.shareAsync({
      message: "Hello, Expo Sharing!",
    });
    if (result.action === Sharing.sharedAction) {
      // The content was successfully shared.
      console.log("Content shared successfully.");
    } else if (result.action === Sharing.dismissedAction) {
      // The sharing was dismissed by the user.
      console.log("Sharing was dismissed by the user.");
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

const EventCardHome = ({ event, onOptionsPress }) => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { isLiked, toggleLikeEvent, eventsLoading } = useEvent();
  const { authenticated } = useAuth();
  const { title, date, location, price } = event;
  const liked = isLiked(event._id);
  const priceValue = parseFloat(price["$numberDecimal"]);
  console.log(event);
  console.log("----------event card---------");
  const onLikePress = async () => {
    if (authenticated) {
      await eventApi.addLike(event._id);
      // add the event in the context
      toggleLikeEvent(event);
    } else navigation.navigate("SignIn");
  };

  if (!event || eventsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Pressable
      style={[
        { backgroundColor: themeColor.searchBackground },
        styles.container,
      ]}
      onPress={() =>
        navigation.navigate("Event", {
          event,
        })
      }
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
          }}
          style={styles.image}
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => onLikePress()}
            style={[
              { backgroundColor: themeColor.background },
              styles.iconContainer,
            ]}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? themeColor.primary : themeColor.primaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={[
              { backgroundColor: themeColor.background },
              styles.iconContainer,
            ]}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color={themeColor.primaryText}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {priceValue === 0 && <FreeTag />}
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[{ color: themeColor.primaryText }, styles.title]}
        >
          {title}
        </Text>
        <Text style={[{ color: themeColor.primaryText }, styles.date]}>
          {moment(date).format("dddd DD MMMM [at] HH:mm")}
        </Text>
        <Text style={[{ color: themeColor.secondaryText }, styles.location]}>
          {location.town}
        </Text>
        {priceValue !== 0 && (
          <Text style={[{ color: themeColor.secondaryText }, styles.location]}>
            US$ {priceValue}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: 300,
    height: 350,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    borderRadius: 4,
    overflow: "hidden",
  },
  contentContainer: {
    minHeight: "42%",
    padding: 15,
    rowGap: 7,
  },
  iconsContainer: {
    position: "absolute",
    bottom: 7,
    right: 0,
    flexDirection: "row",
  },
  iconContainer: {
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
  },
  location: {
    fontSize: 14,
  },
});

export default EventCardHome;
