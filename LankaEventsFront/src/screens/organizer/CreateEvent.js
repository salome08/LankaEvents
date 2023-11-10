import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  ActivityIndicator,
  Menu,
  Divider,
  IconButton,
  PaperProvider,
  Icon,
  TextInput,
  Chip,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import VerifyPhoneOtp from "./SignIn/NewOrganizerOtp";
import NewOrganizerSteps from "./SignIn/NewOrganizerSteps";
import TabBarView from "../../components/TabBarView";

const BasicInfo = ({ validInfo }) => {
  const { themeColor, isDarkMode } = useTheme();

  const DropdownMenu = () => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
      <View>
        <Menu
          statusBarHeight={60}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<TextInput label="Organizer" onPressIn={openMenu} />}
          anchorPosition="top"
        >
          <Menu.Item onPress={() => {}} title="View" />
          <Menu.Item onPress={() => {}} title="Edit" />
          <Divider />
        </Menu>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={validInfo}>
        <Text style={{ color: themeColor.blue }}>{"<"} Events</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={validInfo}>
        <Text>Valide</Text>
      </TouchableOpacity> */}
      <Text>
        Name your event and tell event-goers why they should come. Add details
        that highlight what makes it unique.
      </Text>
      <TextInput label="Event Title *" />
      <TextInput
        label="Organizer"
        right={<TextInput.Icon icon="chevron-down" />}
      />
      <Text>
        This profile describes a unique organizer and shows all of the events on
        one page.
      </Text>
      {/* <DropdownMenu /> */}
      <TextInput
        label="Type"
        right={<TextInput.Icon icon="chevron-down" />}
        editable={false}
      />
      <TextInput
        label="Category"
        right={<TextInput.Icon icon="chevron-down" />}
        editable={false}
      />

      <Text>Tags</Text>
      <Text>
        Improve discoverability of your event by adding tags relevant to the
        subject matter.
      </Text>
      <View style={{ borderWidth: 2, height: 150 }}>
        <Text>Press Enter to add a tag</Text>
        <TextInput placeholder="Add search keywords to your event" />
        <Chip closeIcon>Hello</Chip>
      </View>
      <Text>Location</Text>
      <Text>
        Help people in the area discover your event and let attendees know where
        to show up.
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button>Venue</Button>
        <Button>Online event</Button>
        <Button>To be announced</Button>
      </View>
      <Text>
        Online events have unique pages where you can add links to livestreams
        and more
      </Text>
      <Text>Date and time</Text>
      <Text>
        Tell event-goers when your event starts and ends so they can make plans
        to attend.
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button>Single Event</Button>
        <Button>Recurring Event</Button>
      </View>
    </View>
  );
};

const Details = () => {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

const Publish = () => {
  return (
    <View>
      <Text>Publish</Text>
    </View>
  );
};

const CreateEvent = () => {
  const tabs = [
    [{ title: "Basic Info", component: BasicInfo }],
    [
      { title: "Basic Info", component: BasicInfo },
      { title: "Details", component: Details },
      { title: "Publish", component: Publish },
    ],
  ];
  const tabsConfig = {
    START: 0,
    FULL: 1,
  };
  const [config, setConfig] = useState(tabsConfig.START);

  const validInfo = () => setConfig(tabsConfig.FULL);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TabBarView DynamicConfig={config}>
          {tabs[config].map((tab, idx) => {
            const Component = tab.component;
            return (
              <Component key={idx} title={tab.title} validInfo={validInfo} />
            );
          })}
        </TabBarView>
      </View>
    </PaperProvider>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
