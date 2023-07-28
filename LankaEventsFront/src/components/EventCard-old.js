import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemContext";

const EventCard = ({ event }) => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const { title, description, date, hour, location, organizer } = event;
  return (
    <View
      // Card
      style={{
        flexDirection: "row",
        paddingTop: 18,
        width: "100%",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
          }}
        />
      </View>
      <View
        // Title and description
        style={{
          paddingTop: 3,
          paddingLeft: 7,
          paddingRight: 12,
          flex: 2,
        }}
      >
        <Text style={styles.date}>
          {moment(date).format("dddd DD MMMM [at] HH:mm")}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{organizer}</Text>
        <View justifyContent="space-between" flexDirection="row">
          <Text>{description}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigation.navigate("SignIn");
              // onLikePress();
              // add this user to the likes of this event
            }}
          >
            <Icon name="heart-outline" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  date: {
    fontSize: 15,
    color: "#e91e63",
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "600",
  },
  author: { fontSize: 12, marginTop: 5 },
});
