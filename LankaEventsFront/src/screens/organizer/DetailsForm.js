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

const DetailsForm = ({ validInfo }) => {
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

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
        <Title>Images</Title>
        <Subitle>
          Add photos to show what your event will be about. You can upload up to
          8 images.
        </Subitle>
        <Button
          mode="outlined"
          theme={{
            colors: {
              primary: themeColor.primaryText,
            },
          }}
          style={{ borderRadius: 4 }}
          onPress={() => setIsOnline(false)}
        >
          Upload image
        </Button>

        <Title>About this event</Title>
        <Title>Summary</Title>
        <Subitle>
          Grab people's attention with a short description about your event.
          Attendees will see this at the top of your event page. (140 characters
          max)
        </Subitle>
        <InputText label="Summary *" />

        <Title>Description</Title>
        <Subitle>
          Add more details about your event and include what people can expect
          if they attend.
        </Subitle>
        <InputText label="Description" />
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
          onPress={() => setIsOnline(false)}
        >
          Cancel
        </Button>
      </View>
    </>
  );
};

export default DetailsForm;

const styles = StyleSheet.create({});
