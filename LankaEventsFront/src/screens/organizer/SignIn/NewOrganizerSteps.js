import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../../contexts/ThemContext";
import { Button, ActivityIndicator } from "react-native-paper";
import VerificationCodeInput from "../../../components/VerificationCodeInput";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DropDownPicker from "../../../components/DropDownPicker";
import InfoCard from "../../../components/InfoCard";

const Step0 = () => {
  const insets = useSafeAreaInsets();

  const cards = [
    {
      icon: "ticket-confirmation-outline",
      subtitle: "Host standout events",
      title: "Create, manage, and promote events, all in one place",
      color: { bg: "rgb(223, 236, 230)", border: "rgb(236, 245, 243)" },
    },
    {
      icon: "lightning-bolt-outline",
      subtitle: "Pay for what you need",
      title: "Flexible pricing based on event size and frequency",
      color: { bg: "rgb(225, 230, 253)", border: "rgb(242, 242, 255)" },
    },
    {
      icon: "globe-model",
      subtitle: "Reach the right people",
      title: "Grow your community on Sri Lanka's largest events marketplace",
      color: { bg: "rgb(248, 219, 225)", border: "rgb(253, 236, 241)" },
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>
        Here's how we'll make your event awesome:
      </Text>
      <View
        style={{ rowGap: 15, marginTop: 50, marginBottom: insets.bottom * 3 }}
      >
        {cards.map((card, key) => (
          <InfoCard
            key={key}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            color={card.color}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const Step1 = ({ numberOfEvents, setNumberOfEvents }) => {
  const [items, setItems] = useState([
    { label: "Just one event", value: "1" },
    { label: "2-5 events", value: "2" },
    { label: "5-10 events", value: "5" },
    { label: "10-25 events", value: "10" },
    { label: "More than 25 events", value: "more" },
    { label: "I'm not sure yet", value: "not_sure" },
  ]);
  const { themeColor, isDarkMode } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.subtitle}>Tell us a little about your events</Text>
      <Text style={[styles.title2]}>
        How many events do you plan to organize in the next year?
      </Text>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          value={numberOfEvents}
          items={items}
          setValue={setNumberOfEvents}
          setItems={setItems}
          placeholder="Number of events"
        />
      </View>
    </View>
  );
};

const Step2 = ({ numberOfPeople, setNumberOfPeople }) => {
  const [items, setItems] = useState([
    { label: "Up to 25 people", value: "25" },
    { label: "Up to 100 people", value: "100" },
    { label: "Up to 250 people", value: "250" },
    { label: "More than 250 people", value: "more" },
    { label: "I'm not sure yet", value: "not_sure" },
  ]);
  const { themeColor, isDarkMode } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.subtitle}>Tell us a little about your events</Text>
      <Text style={[styles.title2]}>On average, how big are your events?</Text>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          value={numberOfPeople}
          items={items}
          setValue={setNumberOfPeople}
          setItems={setItems}
          placeholder="Number of people"
        />
      </View>
    </View>
  );
};

const Step3 = () => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View style={styles.step3Container}>
      <ActivityIndicator animating={true} color="rgb(77,224,160)" size={100} />
      <Text style={styles.title3}>
        We're exited to help you create your first event!
      </Text>
    </View>
  );
};

const NewOrganizerSteps = ({ setCurrentPage }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();
  const [step, setStep] = useState(0);
  const [numberOfEvents, setNumberOfEvents] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if ((step === 1 && !numberOfEvents) || (step === 2 && !numberOfPeople)) {
      setDisabled(true);
    } else setDisabled(false);
  }, [step, numberOfEvents, numberOfPeople]);

  const onPressNext = () => {
    console.log(step);
    if (step === 2) {
      console.log("Before timeout");
      // Call back & create organizer account
      // Redirect create event page
      setTimeout(() => {
        console.log("hello");
        setCurrentPage("Home");
        navigation.navigate("Organizer", { screen: "CreateEvent" });
      }, 2000);
    }
    setStep(step + 1);
  };

  return (
    <View
      style={[
        {
          // paddingTop: insets.top,
          paddingBottom: 90,
          backgroundColor: themeColor.background,
        },
        styles.container,
      ]}
    >
      {step === 0 && <Step0 />}
      {step === 1 && (
        <Step1
          numberOfEvents={numberOfEvents}
          setNumberOfEvents={setNumberOfEvents}
        />
      )}
      {step === 2 && (
        <Step2
          numberOfPeople={numberOfPeople}
          setNumberOfPeople={setNumberOfPeople}
        />
      )}
      {step === 3 && <Step3 />}
      {/* <Text style={styles.title}>
        {step === 0
          ? "First, let's verify it's you with a secure code"
          : "Enter the verification code"}
      </Text>
       */}

      {step < 3 && (
        <View
          style={step === 0 ? styles.buttonContainer : styles.buttonsContainer}
        >
          {step > 0 && (
            <Button
              style={[
                {
                  backgroundColor: themeColor.backgroundColor,
                },
                styles.button,
              ]}
              labelStyle={{
                color: themeColor.blue,
                fontSize: 15,
                fontWeight: 700,
              }}
              mode="contained"
              onPress={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button
            style={[
              {
                backgroundColor: disabled
                  ? "rgb(251, 247, 252)"
                  : themeColor.primary,
              },
              styles.button,
            ]}
            labelStyle={{
              fontSize: 15,
              fontWeight: 600,
            }}
            mode="contained"
            onPress={onPressNext}
            disabled={disabled}
          >
            Next
          </Button>
        </View>
      )}
    </View>
  );
};

export default NewOrganizerSteps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 90,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    columnGap: 6,
  },
  dropdownContainer: {
    marginTop: 40,
  },
  step3Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  // errorContainer: {
  //   flexDirection: "row",
  //   columnGap: 5,
  //   borderWidth: 2,
  //   borderRadius: 8,
  //   padding: 4,
  //   paddingLeft: 20,
  // },
  // errorIconContainer: {
  //   width: 30,
  //   height: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 20,
  // },
  // errorTextContainer: {
  //   rowGap: 10,
  //   // paddingHorizontal: 10,
  //   padding: 10,
  // },
  title: {
    fontSize: 25,
    fontWeight: 700,
    textAlign: "center",
    color: "rgb(78, 72, 93)",
  },
  title2: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    color: "rgb(78, 72, 93)",
    marginTop: 20,
  },
  title3: {
    fontSize: 32,
    fontWeight: 800,
    textAlign: "center",
    color: "rgb(40, 27, 55)",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 600,
    textAlign: "center",
    color: "rgb(78, 72, 93)",
  },
  // mainText: {
  //   fontSize: 18,
  // },
  // errorText: {
  //   fontSize: 16,
  // },
  button: {
    // marginTop: 40,
    // marginBottom: 10,
    borderRadius: 4,
    width: 105,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
