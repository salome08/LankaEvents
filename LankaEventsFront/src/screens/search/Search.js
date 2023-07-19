import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { styles } from "../styles";
import { Searchbar, TouchableRipple, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EventCard from "../../components/EventCard";

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

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView>
      <View style={{ padding: 15, paddingTop: 25 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView style={styles2.centeredView}>
            <View style={styles2.modalView}>
              <Text style={styles2.modalText}>Hello World!</Text>
              <Pressable
                style={[styles2.button, styles2.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles2.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </Modal>
        <Pressable
          // onPress={() => console.log("Pressed")}
          onPress={() => setModalVisible(!modalVisible)}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="map-marker" />
            <Text>Colombo</Text>
            <Icon name="chevron-down" />
          </View>
        </Pressable>
      </View>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        // style={{ backgroundColor: "red" }}
        // contentContainerStyle={{
        //   spacin
        // }}
      >
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("Date")}
        >
          Date
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("Filters")}
        >
          Filters
        </Button>
      </View>
      <ListEvents />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles2 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
