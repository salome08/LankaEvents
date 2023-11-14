import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import moment from "moment";

const Title = ({ children }) => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <Text
      style={{ color: themeColor.primaryText, fontSize: 22, fontWeight: 600 }}
    >
      {children}
    </Text>
  );
};

const Subitle = ({ children }) => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <Text
      style={{ color: themeColor.primaryText, fontSize: 16, fontWeight: 300 }}
    >
      {children}
    </Text>
  );
};
const InputText = ({ label, value }) => {
  return (
    <TextInput
      label={label}
      value={value}
      underlineStyle={{ width: 0 }}
      style={{ borderRadius: 4, flex: 1 }}
    />
  );
};

const InputSelect = ({ label, value, icon, onPressIn, onPressOut }) => {
  return (
    <TextInput
      label={label}
      value={value}
      editable={false}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      right={<TextInput.Icon icon={icon || "chevron-down"} />}
      underlineStyle={{ width: 0 }}
      style={{ borderRadius: 4 }}
    />
  );
};

const DropdownDate = ({ label, date, dateString, setDate, setDateString }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onChangeDate = (event, selectedDate) => {
    setDateString(moment(selectedDate).format("YYYY-MM-DD"));
    setDate(selectedDate);
    closeMenu();
  };

  return (
    <View style={{ flex: 1 }}>
      <Menu
        statusBarHeight={60}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <InputSelect
            label={label}
            icon="calendar"
            onPressIn={openMenu}
            value={dateString}
          />
        }
        anchorPosition="top"
      >
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          mode="date"
          display={"inline" || "calendar"}
          onChange={onChangeDate}
          // onChange={(val) => setDateStart(new Date(val))}
          // themeVariant={isDarkMode ? "dark" : "light"}
          // accentColor={themeColor.primaryDark}
        />
      </Menu>
    </View>
  );
};

const LocationFrom = () => {
  const { themeColor, isDarkMode } = useTheme();
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View style={{ rowGap: 10 }}>
      <View style={{ flexDirection: "row", columnGap: 15 }}>
        <Button
          mode={isOnline ? "outlined" : "contained"}
          theme={{
            colors: {
              primary: themeColor.primaryText,
            },
          }}
          style={{ borderRadius: 4 }}
          onPress={() => setIsOnline(false)}
        >
          Venue
        </Button>
        <Button
          mode={isOnline ? "contained" : "outlined"}
          theme={{
            colors: {
              primary: themeColor.primaryText,
            },
          }}
          style={{ borderRadius: 4 }}
          onPress={() => setIsOnline(true)}
        >
          Online event
        </Button>
      </View>
      {isOnline ? (
        <Subitle>
          Online events have unique pages where you can add links to livestreams
          and more
        </Subitle>
      ) : (
        <>
          <InputText label="Venue name *" />
          <InputText label="Address 1 *" />
          <InputText label="Address 2" />
          <InputText label="City *" />
          <View
            style={{
              flexDirection: "row",
              columnGap: 8,
            }}
          >
            <InputText label="State/Province" />
            <InputText label="Postal Code *" />
          </View>
          <InputText label="Country *" value="Sri Lanka" editable={false} />
        </>
      )}
    </View>
  );
};

const DateAndTimeForm = () => {
  const { themeColor, isDarkMode } = useTheme();
  const [dateStringStart, setDateStringStart] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateStringEnd, setDateStringEnd] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  return (
    <View style={{ rowGap: 10 }}>
      <View style={{ flexDirection: "row", columnGap: 5 }}>
        <DropdownDate
          label="Event Starts *"
          date={dateStart}
          dateString={dateStringStart}
          setDate={setDateStart}
          setDateString={setDateStringStart}
        />
        <DateTimePicker value={dateStart} mode="time" />
      </View>
      <View style={{ flexDirection: "row", columnGap: 5 }}>
        <DropdownDate
          label="Event Ends *"
          date={dateEnd}
          dateString={dateStringEnd}
          setDate={setDateEnd}
          setDateString={setDateStringEnd}
        />
        <DateTimePicker value={dateStart} mode="time" />
      </View>
    </View>
  );
};
const BasicInfoForm = ({ validInfo }) => {
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          rowGap: 20,
          paddingBottom: insets.bottom * 1.2,
        }}
      >
        <TouchableOpacity onPress={validInfo}>
          <Text style={{ color: themeColor.blue }}>{"<"} Events</Text>
        </TouchableOpacity>
        <Subitle>
          Name your event and tell event-goers why they should come. Add details
          that highlight what makes it unique.
        </Subitle>
        <InputText label="Event Title *" />
        <InputSelect label="Organizer" />
        <Subitle>
          This profile describes a unique organizer and shows all of the events
          on one page.
        </Subitle>
        {/* <DropdownMenu /> */}
        <InputSelect label="Type" />
        <InputSelect label="Category" />

        <Title>Location</Title>
        <Subitle>
          Help people in the area discover your event and let attendees know
          where to show up.
        </Subitle>
        <LocationFrom />

        <Title>Date and time</Title>
        <Subitle>
          Tell event-goers when your event starts and ends so they can make
          plans to attend.
        </Subitle>
        <DateAndTimeForm />
      </ScrollView>
      <View
        style={{
          paddingVertical: 20,
          paddingBottom: insets.bottom * 1.2,
          paddingHorizontal: 16,
          rowGap: 10,
          borderTopWidth: 0.2,
          borderTopColor: themeColor.primaryText,
        }}
      >
        <Button
          mode="contained"
          theme={{
            colors: {
              primary: themeColor.primaryText,
            },
          }}
          style={{ borderRadius: 4 }}
          onPress={validInfo}
        >
          Save
        </Button>
        <Button
          mode="outlined"
          theme={{
            colors: {
              primary: themeColor.primaryText,
            },
          }}
          style={{ borderRadius: 4 }}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
      </View>
    </>
  );
};

export default BasicInfoForm;

const styles = StyleSheet.create({});
