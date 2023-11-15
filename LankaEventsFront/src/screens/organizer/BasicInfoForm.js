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
const InputText = ({ label, value, onChangeText, error }) => {
  return (
    <TextInput
      label={label}
      value={value}
      underlineStyle={{ width: 0 }}
      style={{ borderRadius: 4, flex: 1 }}
      onChangeText={onChangeText}
      error={error}
      maxLength={60}
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

const LocationFrom = ({ location, setLocation, errors, setErrors }) => {
  const { themeColor, isDarkMode } = useTheme();
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View style={{ rowGap: 10 }}>
      {/* <View style={{ flexDirection: "row", columnGap: 15 }}>
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
      </View> */}
      {isOnline ? (
        <Subitle>
          Online events have unique pages where you can add links to livestreams
          and more
        </Subitle>
      ) : (
        <>
          <InputText
            label="Venue name *"
            value={location.venueName}
            error={errors.venueName}
            onChangeText={(text) => setLocation({ ...location })}
          />
          <InputText
            label="Address 1 *"
            value={location.address1}
            error={errors.address1}
          />
          <InputText label="Address 2" value={location.address2} />
          <InputText label="City *" value={location.city} error={errors.city} />
          <View
            style={{
              flexDirection: "row",
              columnGap: 8,
            }}
          >
            <InputText label="State/Province" value={location.state} />
            <InputText
              label="Postal Code *"
              value={location.postalCode}
              error={errors.postalCode}
            />
          </View>
          <InputText label="Country" value="Sri Lanka" editable={false} />
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

  // About
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);

  // Location
  const [isOnline, setIsOnline] = useState(false);
  const [venueName, setVenueName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errorVenueName, setErrorVenueName] = useState(false);
  const [errorAddress1, setErrorAddress1] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorPostalCode, setErrorPostalCode] = useState(false);

  // Date & Time
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onSave = () => {
    console.log("title", title);
    if (!title) setErrorTitle(true);
    if (!venueName) setErrorVenueName(true);
    if (!address1) setErrorAddress1(true);
    if (!city) setErrorCity(true);
    if (!postalCode) setErrorPostalCode(true);
    validInfo();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          { paddingBottom: insets.bottom * 1.2 },
          styles.contentContainer,
        ]}
      >
        <TouchableOpacity onPress={validInfo}>
          <Text style={{ color: themeColor.blue }}>{"<"} Events</Text>
        </TouchableOpacity>
        <Subitle>
          Name your event and tell event-goers why they should come. Add details
          that highlight what makes it unique.
        </Subitle>
        <InputText
          label="Event Title *"
          value={title}
          onChangeText={(text) => {
            setErrorTitle(false);
            setTitle(text);
          }}
          error={errorTitle}
        />
        {/* <InputSelect label="Organizer" /> */}
        {/* <Subitle>
          This profile describes a unique organizer and shows all of the events
          on one page.
        </Subitle> */}
        {/* <DropdownMenu /> */}
        <InputSelect label="Type" />
        <InputSelect label="Category" />

        {/* Location */}
        <Title>Location</Title>
        <Subitle>
          Help people in the area discover your event and let attendees know
          where to show up.
        </Subitle>
        {/* select button online events */}
        <View style={{ rowGap: 10 }}>
          {/* <View style={{ flexDirection: "row", columnGap: 15 }}>
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
    </View> */}
          {isOnline ? (
            <Subitle>
              Online events have unique pages where you can add links to
              livestreams and more
            </Subitle>
          ) : (
            <>
              <InputText
                label="Venue name *"
                value={venueName}
                error={errorVenueName}
                onChangeText={(text) => {
                  setErrorVenueName(false);
                  setVenueName(text);
                }}
              />
              <InputText
                label="Address 1 *"
                value={address1}
                error={errorAddress1}
                onChangeText={(text) => {
                  setErrorAddress1(false);
                  setAddress1(text);
                }}
              />
              <InputText
                label="Address 2"
                value={address2}
                onChangeText={(text) => setAddress2(text)}
              />
              <InputText
                label="City *"
                value={city}
                error={errorCity}
                onChangeText={(text) => {
                  setErrorCity(false);
                  setCity(text);
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                }}
              >
                <InputText
                  label="State/Province"
                  value={state}
                  onChangeText={(text) => setState(text)}
                />
                <InputText
                  label="Postal Code *"
                  value={postalCode}
                  error={errorPostalCode}
                  onChangeText={(text) => {
                    setErrorPostalCode(false);
                    setPostalCode(text);
                  }}
                />
              </View>
              <InputText label="Country" value="Sri Lanka" editable={false} />
            </>
          )}
        </View>

        {/* Date & Time  */}
        <Title>Date and time</Title>
        <Subitle>
          Tell event-goers when your event starts and ends so they can make
          plans to attend.
        </Subitle>
        <DateAndTimeForm />
      </ScrollView>
      <View
        style={[
          {
            paddingBottom: insets.bottom * 1.2,
            borderTopColor: themeColor.primaryText,
          },
          styles.buttonContainer,
        ]}
      >
        <Button
          mode="contained"
          theme={{
            colors: {
              primary: themeColor.primaryText,
            },
          }}
          style={{ borderRadius: 4 }}
          onPress={onSave}
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

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    rowGap: 20,
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    rowGap: 10,
    borderTopWidth: 0.2,
  },
});
