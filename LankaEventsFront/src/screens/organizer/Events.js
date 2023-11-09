import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Button,
  ActivityIndicator,
  Card,
  IconButton,
  Menu,
  Divider,
  PaperProvider,
  List,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import VerifyPhoneOtp from "./SignIn/NewOrganizerOtp";
import NewOrganizerSteps from "./SignIn/NewOrganizerSteps";
import CreateEvent from "./CreateEvent";
import Navbar from "../../components/Organizer/Navbar";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

const EventStatussMenu = ({ menu, selected, setSelected }) => {
  const { themeColor, isDarkMode } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const StatusButton = () => {
    return (
      <Button
        mode="contained"
        style={{ backgroundColor: themeColor.blue, width: 180 }}
        labelStyle={{ color: themeColor.white }}
        icon="chevron-down"
        contentStyle={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
        onPress={openMenu}
      >
        {menu[selected].label}
      </Button>
    );
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<StatusButton />}
        anchorPosition="bottom"
        style={{ width: 205, marginTop: 6 }}
      >
        {menu.map((status, index) => (
          <Menu.Item
            key={index}
            theme={{
              colors: {
                onSurfaceVariant: selected === index ? null : "transparent",
              },
            }}
            leadingIcon="check"
            onPress={() => {
              setSelected(index);
              closeMenu();
            }}
            title={status.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const EventActionMenu = ({ event }) => {
  const { themeColor, isDarkMode } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        statusBarHeight={60}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
        anchorPosition="top"
        style={{
          marginBottom: 60,
          paddingBottom: 60,
          // backgroundColor: "red",
        }}
      >
        <Menu.Item onPress={() => {}} title="View" />
        <Menu.Item onPress={() => {}} title="Edit" />
        {/* <Divider />
        <Menu.Item onPress={() => {}} title="Publish" /> */}
        <Divider />
        <Menu.Item onPress={() => {}} title="Delete" />
      </Menu>
    </View>
  );
};

const EventActionMenu2 = ({ event }) => {
  const { themeColor, isDarkMode } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    const options = ["View", "Edit", "Cancel"];
    // const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        // destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // Save
            pickImage();
            break;

          case 1:
            // Delete
            takePhoto();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return <IconButton icon="dots-vertical" onPress={openMenu} />;
};

const EventCard = ({ event }) => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <Card style={{ elevation: 0 }} elevation={1}>
      <Card.Title
        title={event.name}
        subtitle={event.date}
        right={(props) => <EventActionMenu />}
      />
      <Card.Content>
        <Text style={{ color: themeColor.primaryText, fontSize: 13 }}>
          {event.location}
        </Text>
        <Text
          style={{ color: themeColor.primaryText, fontSize: 13, marginTop: 8 }}
        >
          {event.status}
        </Text>
      </Card.Content>
    </Card>
  );
};

const NoEventView = () => {
  const { themeColor, isDarkMode } = useTheme();
  return (
    <View style={{ alignItems: "center", marginTop: 70, rowGap: 20 }}>
      <View
        style={[
          {
            backgroundColor: themeColor.iconContainer,
          },
          styles.noEventIconContainer,
        ]}
      >
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={34}
          color={themeColor.iconWithBg}
        />
      </View>
      <Text style={{ color: themeColor.primaryText, fontSize: 18 }}>
        No events to show
      </Text>
    </View>
  );
};

const Events = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState(1);
  const eventStatusMenu = [
    { label: "Upcoming events", value: "upcoming" },
    { label: "Draft", value: "draft" },
    { label: "Past events", value: "past" },
    { label: "All events", value: "all" },
  ];

  const events = [
    {
      name: "Hello",
      date: "December 6, 2023 at 7:00 PM",
      location: "Online event",
      status: "Draft",
    },
    // {
    //   name: "Party in L.A",
    //   date: "February 12, 2023 at 16:00 PM",
    //   location: "California, L.A",
    //   status: "Ongoing",
    // },
    // {
    //   name: "Yoga class",
    //   date: "December 16, 2023 at 18:00 PM",
    //   location: "Weligama, Hangtime hostel",
    //   status: "Past",
    // },
    // {
    //   name: "Yoga class",
    //   date: "December 16, 2023 at 18:00 PM",
    //   location: "Weligama, Hangtime hostel",
    //   status: "Past",
    // },
    // {
    //   name: "Yoga class",
    //   date: "December 16, 2023 at 18:00 PM",
    //   location: "Weligama, Hangtime hostel",
    //   status: "Past",
    // },
  ];

  return (
    <View style={[{ paddingBottom: insets.bottom * 2 }, styles.container]}>
      <View style={styles.topActionsContainer}>
        <EventStatussMenu
          menu={eventStatusMenu}
          selected={selectedStatus}
          setSelected={setSelectedStatus}
        />
        <IconButton
          icon="plus"
          containerColor={themeColor.primary}
          size={30}
          onPress={() => navigation.navigate("CreateEvent")}
        />
      </View>
      <ScrollView
        style={{
          paddingVertical: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        {events.length ? (
          <View
            style={{ rowGap: 10, paddingHorizontal: 10, paddingBottom: 10 }}
          >
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </View>
        ) : (
          <NoEventView />
        )}
      </ScrollView>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    paddingHorizontal: 10,
  },
  topActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  menuContainer: {
    backgroundColor: "white",
    position: "absolute",
    top: 47,
    paddingVertical: 18,
    rowGap: 20,
    width: 220,
    borderRadius: 3,
  },
  actionMenuContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 30,
    right: 0,
    paddingVertical: 18,
    rowGap: 20,
    width: 220,
    borderRadius: 3,
  },
  eventCardContainer: {
    paddingVertical: 15,
    paddingLeft: 30,
    paddingRight: 15,
    flexDirection: "row",
    position: "relative",
    // marginTop: 23,
    // alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 7,
    // rowGap: 10,
  },
  noEventIconContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    paddingLeft: 20,
  },
});
