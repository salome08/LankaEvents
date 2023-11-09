import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  Menu,
  Divider,
  PaperProvider,
  Card,
  IconButton,
} from "react-native-paper";
import { useTheme } from "../contexts/ThemContext";
import { useOrganizer } from "../contexts/OrganizerContext";

const TestNav = () => {
  const { themeColor, isDarkMode } = useTheme();
  const {
    setAuthenticatedU,
    authenticatedU,
    authenticatedO,
    setAuthenticatedO,
  } = useOrganizer();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test Screen</Text>
      <Text>
        logged user: {authenticatedU ? "YES" : "NO"}
        {"\n"}
        logged organizer: {authenticatedO ? "YES" : "NO"}
      </Text>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedO(true);
        }}
      >
        Sign Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedU(true);
        }}
      >
        Sign User
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          setAuthenticatedO(false);
        }}
      >
        Log out Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          navigation.navigate("Organizer");
        }}
      >
        Go to Home Organizer
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          navigation.navigate("NewOrganizerSteps");
        }}
      >
        Go to NewOrganizerSteps
      </Button>
      <Button
        style={[{ backgroundColor: themeColor.primary }, styles.button]}
        mode="contained"
        onPress={() => {
          navigation.navigate("CreateEvent");
        }}
      >
        Go to CreateEvent
      </Button>
    </View>
  );
};

const TestZindex = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test Screen</Text>
      <View
        style={{
          backgroundColor: "green",
          height: 20,
          width: "100%",
          zIndex: 2,
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            width: 20,
            height: 200,
            zIndex: 3,
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "red",
          height: 20,
          zIndex: 2,
          width: "100%",

          position: "relative",
        }}
      />
    </View>
  );
};

const TestMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    // <PaperProvider>
    <View
      style={{
        // paddingTop: 50,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="dots-vertical" onPress={openMenu}>
            Show menu
          </IconButton>
        }
        anchorPosition="bottom"
        style={{ backgroundColor: "yellow" }}
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
    // <TestCard />
    // </PaperProvider>
  );
};

const TestCard = () => {
  return (
    <PaperProvider>
      <Card style={{ marginTop: 40 }}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          right={(props) => (
            // <View style={{ backgroundColor: "red", height: 100, width: 50 }}>
            <TestMenu />
            // </View>
          )}
        />
        <Card.Content>
          <Text>Card title</Text>
          <Text>Card content</Text>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: 40 }}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          right={(props) => (
            // <View style={{ backgroundColor: "red", height: 100, width: 50 }}>
            <TestMenu />
            // </View>
          )}
        />
        <Card.Content>
          <Text>Card title</Text>
          <Text>Card content</Text>
        </Card.Content>
      </Card>
      {/* <TestMenu /> */}
      {/* <TestMenu /> */}
    </PaperProvider>
  );
};

const TestScreen = () => {
  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text>Test Screen</Text>
    // <>
    //   <View style={{ backgroundColor: "blue", height: 700 }}>
    //     <TestCard />
    //   </View>
    //   <View style={{ backgroundColor: "red", height: 50 }} />
    // </>
    <TestNav />
    // {/* <TestZindex /> */}
    // </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    borderRadius: 4,
  },
});
