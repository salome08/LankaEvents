import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  Pressable,
} from "react-native";
import EventCard from "../components/EventCard";
import { useTheme } from "@react-navigation/native";

const fakeEvents = [
  {
    title: "Event1",
    description: "The First event of the app !",
    date: Date("23/06/2023"),
    hour: "10:30",
    location: "Arugam bay",
    organizer: "Salome",
  },
  {
    title: "Event2",
    description: "The Second event of the app !",
    date: Date("12/08/2023"),
    hour: "108:30",
    location: "Weligama",
    organizer: "Salome",
  },
];

const ListEvents = ({ navigation }) => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ paddingTop: 23 }}>
          {fakeEvents.map((e, key) => (
            <Pressable
              onPress={() => navigation.navigate("Event", { eventId: e.title })}
              rippleColor="rgba(0, 0, 0, .32)"
              key={key}
            >
              <EventCard event={e} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const HomeScreen = ({ navigation }) => {
  const colors = useTheme().colors;

  return (
    <SafeAreaView
      style={{
        // backgroundColor: colors.card,
        flexGrow: 1,
      }}
    >
      <ListEvents navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
  },
});
