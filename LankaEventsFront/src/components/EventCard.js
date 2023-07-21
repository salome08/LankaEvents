import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo/vector-icons
import moment from "moment";
import { useTheme } from "../contexts/ThemContext";

const EventCard = ({ event, onLikePress, onOptionsPress }) => {
  const { title, date, location } = event;
  const { themeColor } = useTheme();

  return (
    <View style={styles.container}>
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
          {location}
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onLikePress} style={styles.iconContainer}>
          <Ionicons
            name="heart-outline"
            size={23}
            color={themeColor.primaryText}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
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
