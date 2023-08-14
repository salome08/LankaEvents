import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo/vector-icons
import { useNavigation, useRoute } from "@react-navigation/native";
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

const EventCard = ({ event, onOptionsPress }) => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { isLiked, toggleLikeEvent, eventsLoading } = useEvent();
  const { authenticated } = useAuth();
  const { title, date, location } = event;
  const liked = isLiked(event._id);

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
      style={[{ backgroundColor: themeColor.background }, styles.container]}
      onPress={() =>
        navigation.navigate("Event", {
          event,
        })
      }
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={[{ color: themeColor.primary }, styles.date]}>
          {moment(date).format("dddd DD MMMM [at] HH:mm")}
        </Text>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[{ color: themeColor.primaryText }, styles.title]}
        >
          {title}
        </Text>
        <Text style={[{ color: themeColor.secondaryText }, styles.location]}>
          {location.town}
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => onLikePress()}
          style={styles.iconContainer}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={23}
            color={liked ? themeColor.primary : themeColor.primaryText}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onOptionsPress} style={styles.iconContainer}>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={themeColor.primaryText}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    // borderRadius: 3,
  },
  content: {
    flex: 1,
    rowGap: 3,
  },
  iconsContainer: {
    justifyContent: "space-between",
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
  },
  location: {
    fontSize: 13,
  },
  iconContainer: {
    marginLeft: 16,
    alignItems: "flex-end",
  },
});

export default EventCard;
