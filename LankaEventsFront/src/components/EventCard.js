import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  useColorScheme,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EventCard = ({ event }) => {
  const theme = useColorScheme();
  const { title, description, date, hour, location, organizer } = event;
  console.log(title);
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
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{organizer}</Text>
        <View justifyContent="space-between" flexDirection="row">
          <Text>ceci est un text d'essay</Text>
          <Icon name="heart-outline" size={18} />
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
