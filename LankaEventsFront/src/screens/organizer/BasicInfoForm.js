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
import { useOrganizer } from "../../contexts/OrganizerContext";
import organizerApi from "../../../api/organizerApi";
import moment from "moment";
import eventFilters from "../../utils/constants/eventFilters";

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

const DropdownSelect = ({
  label,
  value,
  icon,
  menuList,
  mode,
  selected,
  setSelected,
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  console.log("selected", selected);

  const onSelect = (index) => {
    if (mode === "multiple") {
      if (selected.includes(menuList[index])) {
        setSelected(selected.filter((item) => item !== menuList[index]));
      } else setSelected([...selected, menuList[index]]);
    } else if (mode === "single") {
      setSelected([menuList[index]]);
      closeMenu();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Menu
        statusBarHeight={60}
        visible={visible}
        onDismiss={closeMenu}
        style={{
          width: 200,
          maxHeight: 200,
          right: 0,
        }}
        anchor={
          <InputSelect
            label={label}
            icon={icon}
            onPressIn={openMenu}
            value={selected[0]}
          />
        }
        anchorPosition="top"
      >
        <ScrollView>
          {menuList.map((item, index) => (
            <Menu.Item
              key={index}
              theme={{
                colors: {
                  onSurfaceVariant:
                    mode === "multiple"
                      ? null
                      : selected.includes(menuList[index])
                      ? null
                      : "transparent",
                },
              }}
              leadingIcon={
                mode === "multiple"
                  ? selected.includes(menuList[index])
                    ? "checkbox-marked-outline"
                    : "checkbox-blank-outline"
                  : "check"
              }
              onPress={() => {
                onSelect(index);
              }}
              title={item}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

const DropdownDate = ({
  label,
  date,
  dateString,
  setDate,
  setDateString,
  minimumDate,
}) => {
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
          minimumDate={minimumDate || new Date()}
          mode="date"
          display={"inline" || "calendar"}
          onChange={onChangeDate}
          timeZoneName={"Europe/Paris"}
          // themeVariant={isDarkMode ? "dark" : "light"}
          // accentColor={themeColor.primaryDark}
        />
      </Menu>
    </View>
  );
};

const DateAndTimeForm = () => {
  const { themeColor, isDarkMode } = useTheme();
  const getTime = (hour) => {
    let today = new Date();
    today.setHours(hour, 0, 0, 0);
    let isoString = today.toISOString().substring(0, 23) + "Z";
    return new Date(isoString);
  };
  const [dateStringStart, setDateStringStart] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dateStart, setDateStart] = useState(getTime(7));
  const [dateEnd, setDateEnd] = useState(null);
  const [dateStringEnd, setDateStringEnd] = useState(null);

  const [dateTimeStart, setDateTimeStart] = useState(getTime(7));
  const [dateTimeEnd, setDateTimeEnd] = useState(getTime(10));
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);

  console.log("dateStart", dateStart);
  console.log("dateEnd", dateEnd);

  const handleTimeChange = (mode, selectedTime) => {
    const selectedHour = selectedTime.getHours();
    const selectedMin = selectedTime.getMinutes();
    if (mode === "start") {
      setDateTimeStart(selectedTime);
      setTimeStart(`${selectedHour}:${selectedMin}`);
    } else if (mode === "end") {
      setDateTimeEnd(selectedTime);
      setTimeEnd(`${selectedHour}:${selectedMin}`);
    }
  };

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
        <DateTimePicker
          value={dateTimeStart}
          mode="time"
          onChange={(event, selectedTime) =>
            handleTimeChange("start", selectedTime)
          }
          style={{ width: 90 }}
        />
      </View>
      <View style={{ flexDirection: "row", columnGap: 5 }}>
        <DropdownDate
          label="Event Ends *"
          date={dateEnd || dateStart}
          minimumDate={dateStart}
          dateString={dateStringEnd || dateStringStart}
          setDate={setDateEnd}
          setDateString={setDateStringEnd}
        />
        <DateTimePicker
          value={dateTimeEnd}
          mode="time"
          onChange={handleTimeChange}
          style={{ width: 90 }}
          // timeZoneName={"Europe/France"}
        />
      </View>
    </View>
  );
};

const BasicInfoForm = ({ event, validInfo }) => {
  const { themeColor, isDarkMode } = useTheme();
  const { addEvent, updateEvent } = useOrganizer();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // About
  const [title, setTitle] = useState(event?.title || "");
  const [types, setTypes] = useState(event?.types || []);
  const [categories, setCategories] = useState(event?.categories || []);
  const [errorTitle, setErrorTitle] = useState(false);

  // Location
  const [isOnline, setIsOnline] = useState(event?.online || false);
  const [venueName, setVenueName] = useState(event?.location.venueName || "");
  const [address1, setAddress1] = useState(event?.location.address1 || "");
  const [address2, setAddress2] = useState(event?.location.address2 || "");
  const [city, setCity] = useState(event?.location.city || "");
  const [state, setState] = useState(event?.location.state || "");
  const [postalCode, setPostalCode] = useState(
    event?.location.postalCode || ""
  );
  const [errorVenueName, setErrorVenueName] = useState(false);
  const [errorAddress1, setErrorAddress1] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorPostalCode, setErrorPostalCode] = useState(false);

  // Date & Time
  const [startDate, setStartDate] = useState(event?.startDate || "");
  const [endDate, setEndDate] = useState(event?.endDate || "");
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");

  const onSave = async () => {
    console.log("title", title);
    if (!title) setErrorTitle(true);
    if (!venueName) setErrorVenueName(true);
    if (!address1) setErrorAddress1(true);
    if (!city) setErrorCity(true);
    if (!postalCode) setErrorPostalCode(true);
    else {
      console.log("Send Form");
      const data = {
        title,
        types,
        categories,
        location: {
          venueName,
          address1,
          address2,
          city,
          state,
          postalCode,
        },
      };
      if (event) {
        const updatedEvent = await organizerApi.updateEvent(event._id, data);
        updateEvent(updatedEvent);
      } else {
        const newEvent = await organizerApi.createEvent(data);
        addEvent(newEvent);
      }
      validInfo();
      navigation.goBack();
    }
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
        {/* <InputSelect label="Type" /> */}
        <DropdownSelect
          label="Type"
          menuList={eventFilters.types}
          mode="single"
          selected={types}
          setSelected={setTypes}
        />
        <DropdownSelect
          label="Category"
          menuList={eventFilters.categories}
          mode="multiple"
          selected={categories}
          setSelected={setCategories}
        />

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
          Close
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
