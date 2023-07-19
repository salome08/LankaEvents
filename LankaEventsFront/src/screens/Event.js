import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Event = ({ route }) => {
  const { eventId } = route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{ paddingVertical: 12, rowGap: 27, paddingHorizontal: 14 }}
        >
          <Image
            style={{ width: "100%", height: 200, borderRadius: 20 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
            }}
          />
          <Text style={styles.title}>
            23rd Annual TASTE OF ECUADOR Food Festival & Parade {eventId} !
          </Text>
          <View flexDirection="row">
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Icon name="calendar-blank" size={17} />
              </View>
            </View>
            <View style={{ flex: 8, rowGap: 9 }}>
              <Text style={styles.infoTitle}>Sunday 6 August</Text>
              <Text style={styles.infoDescription}>
                10:00-18:00 Los Angeles Time{" "}
              </Text>
            </View>
          </View>
          <View flexDirection="row">
            <View style={{ flex: 1 }}>
              <View style={styles.iconContainer}>
                <Icon name="map-marker" size={17} />
              </View>
            </View>
            <View style={{ flex: 8, rowGap: 9 }}>
              <Text style={styles.infoTitle}>Placita Olvera</Text>
              <Text style={styles.infoDescription}>
                425 N. Los angeles St, los angeles, CA 90012
              </Text>
            </View>
          </View>
          <Text style={styles.subTitle}>About this event</Text>
          <Text style={styles.infoDescription}>blabla full desc</Text>
          <Text style={styles.subTitle}>Location</Text>
          <Text style={styles.infoDescription}>map view</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Event;

export const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 23,
    fontWeight: "700",
  },
  mainText: {
    fontSize: 15,
    fontWeight: "300",
  },
  iconContainer: {
    backgroundColor: "lightgray",
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontWeight: "800",
  },
  infoDescription: {
    color: "gray",
  },
});
