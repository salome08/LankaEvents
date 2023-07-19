import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import EventCard from "../components/EventCard";

const fakeEvents = [
  "Event1",
  "Event2",
  "Event3",
  "Event4",
  "Event5",
  "Event6",
  "Event7",
  "Event8",
  "Event9",
  "Event10",
];

const ListEvents = () => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ paddingTop: 23 }}>
          {fakeEvents.map((e) => (
            <EventCard event={e} key={e} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const FavScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ rowGap: 18 }}>
      <View>
        <Text style={styles.title}>Favoris</Text>
      </View>
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
      <View>
        <Text>Show list and suggestion if any favs are selected</Text>
      </View>
      <View style={{ rowGap: 18 }}></View>
      <View>
        <Text style={styles.subTitle}>Samedi 15 juillet (Liked events)</Text>
        <ListEvents />
      </View>
    </SafeAreaView>
  );
};

export default FavScreen;

export const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
});
