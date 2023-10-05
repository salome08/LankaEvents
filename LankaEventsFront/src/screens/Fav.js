import * as React from "react";
import moment from "moment";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import EventCard from "../components/EventCard";
import { useEvent } from "../contexts/EventContext";
import eventApi from "../../api/eventApi";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSearch } from "../contexts/SearchContext";

// Handle case not logged, no events liked

const easyDates = [
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This week", value: "this_week" },
  { label: "This weekend", value: "this_weekend" },
];

const LoggedOutFavScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.background,
          paddingTop: insets.top * 1.8,
          paddingBottom: insets.bottom * 3,
        },
        styles.container,
        styles.loggedOutContainer,
      ]}
    >
      <View rowGap={12}>
        <Text style={[{ color: themeColor.primaryText }, styles.title]}>
          See your favorites in one place
        </Text>
        <Text style={[{ color: themeColor.secondaryText2 }, styles.mainText]}>
          Log in to see your favorites
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text
            style={[{ color: themeColor.blue, marginTop: 12 }, styles.mainText]}
          >
            Explore events
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            {
              borderColor: themeColor.primary,
              backgroundColor: themeColor.backgroundButton,
            },
            styles.logButton,
          ]}
          labelStyle={{ fontWeight: "600" }}
          mode="contained"
          onPress={() => navigation.navigate("SignIn")}
        >
          Log in
        </Button>
      </View>
    </View>
  );
};

const NoLikesFavScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();
  const { selectedDate, setSelectedDate } = useSearch();

  return (
    <View style={styles.noLikesContainer}>
      <View style={{ rowGap: 11 }}>
        <Text style={[{ color: themeColor.secondaryText1 }, styles.subTitle]}>
          No liked events yet
        </Text>
        <Text style={[{ color: themeColor.secondaryText3 }, styles.mainText]}>
          Like an event to find it later, receive notifications before it sells
          out, and help us improve recommendations for you.
        </Text>
      </View>
      <View style={{ rowGap: 9 }}>
        <View>
          <Text style={[{ color: themeColor.primaryText }, styles.subTitle2]}>
            Find events
          </Text>
        </View>
        <View
          flexDirection="row"
          flexWrap="wrap"
          style={{ rowGap: 14, columnGap: 14 }}
        >
          {easyDates.map((date, key) => (
            <Button
              key={key}
              mode="contained"
              compact={true}
              buttonColor={themeColor.veryLightBackground}
              textColor={themeColor.secondaryText1}
              contentStyle={{ paddingHorizontal: 9, fontSize: 8 }}
              onPress={() => {
                setSelectedDate(date);
                navigation.navigate("Search");
              }}
            >
              {date.label}
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
};

const FavScreen = ({ navigation }) => {
  const { likedEvents, isLiked, toggleLikeEvent, eventsLoading } = useEvent();
  const { authenticated, user, loading } = useAuth();
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  if (!authenticated) return <LoggedOutFavScreen />;

  likedEvents.map((event) => {
    // console.log(moment(event.date).format("dddd DD MMMM"));
  });
  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={[{ color: themeColor.primaryText }, styles.title]}>
          Favorites
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView>
          {likedEvents.length === 0 ? (
            <NoLikesFavScreen />
          ) : (
            <View style={styles.eventCardContainer}>
              {likedEvents.map((event, key) => {
                return (
                  <View key={key}>
                    {(key === 0 ||
                      (key > 0 &&
                        !moment(likedEvents[key - 1].date).isSame(
                          moment(event.date),
                          "day"
                        ))) && (
                      <View
                        key={event.date}
                        style={[
                          { backgroundColor: themeColor.veryLightBackground },
                          styles.labelDateContainer,
                        ]}
                      >
                        <Text
                          style={[
                            { color: themeColor.primaryText },
                            styles.mainText,
                          ]}
                        >
                          {moment(event.date).format("dddd DD MMMM")}
                        </Text>
                      </View>
                    )}
                    <EventCard key={key} event={event} />
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        <BlurView
          intensity={80}
          tint={isDarkMode ? "dark" : "light"}
          style={styles.blurView}
        />
      </View>
    </View>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    height: 82, // Set the height of the BlurView
    bottom: 0,
  },
  loggedOutContainer: {
    justifyContent: "space-between",
    padding: 16,
  },
  noLikesContainer: {
    flex: 1,
    padding: 16,
    rowGap: 47,
  },
  titleContainer: {
    marginTop: 12,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  labelDateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  eventCardContainer: {
    flex: 1,
    marginBottom: 90,
  },
  title: {
    fontSize: 31,
    fontWeight: "800",
  },
  mainText: {
    fontSize: 15,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 19,
    fontWeight: "600",
  },
  subTitle2: {
    fontSize: 19,
    fontWeight: "700",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 82.1,
    left: 0,
    right: 0,
    padding: 16,
  },
  logButton: {
    borderRadius: 4,
    borderWidth: 2,
  },
});
