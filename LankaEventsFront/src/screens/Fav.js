import * as React from "react";
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

// Handle case not logged, no events liked

const LoggedOutFavScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <Text>See your favorites in one place</Text>
      <Text>Log in to see your favorits</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Text>Log in to see your favorits</Text>
      </TouchableOpacity>
      <Button mode="contained" onPress={() => navigation.navigate("SignIn")}>
        Login
      </Button>
    </View>
  );
};

const NoLikesFavScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <View style={{ rowGap: 18 }}>
        <Text variant="headlineMedium">There are no events Like yet!</Text>
        <Text variant="">Like an event and find it later.</Text>
      </View>
      <View style={{ rowGap: 18 }}>
        <Text style={styles.subTitle}>Find some events</Text>
      </View>
      <View
        flexDirection="row"
        flexWrap="wrap"
        style={{ rowGap: 4, columnGap: 3 }}
      >
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("Searchtab")}
        >
          Today
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("Searchtab")}
        >
          Tomorrow
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("Searchtab")}
        >
          This week
        </Button>
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

  if (authenticated && likedEvents.lenght === 0) return <NoLikesFavScreen />;

  return (
    <View
      style={[
        { backgroundColor: themeColor.background, paddingTop: insets.top },
        styles.container,
      ]}
    >
      <View>
        <Text style={styles.title}>Favoris</Text>
      </View>

      <View>
        <Text>Show list and suggestion if any favs are selected</Text>
      </View>
      <View style={{ rowGap: 18 }}></View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={{ paddingTop: 23 }}>
            {likedEvents.map((event, key) => {
              return <EventCard key={key} event={event} />;
            })}
          </View>
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
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
