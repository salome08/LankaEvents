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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import VerifyPhoneOtp from "./SignIn/NewOrganizerOtp";
import NewOrganizerSteps from "./SignIn/NewOrganizerSteps";
import TabBarView from "../../components/TabBarView";
import BasicInfo from "./BasicInfoForm";
import Details from "./DetailsForm";
import Publish from "./PublishForm";

const CreateEvent = () => {
  const { themeColor, isDarkMode } = useTheme();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  let event = null;

  if (route.params && route.params.event) {
    event = route.params.event;
  }

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
  const [config, setConfig] = useState(
    event ? tabsConfig.FULL : tabsConfig.START
  );

  const validInfo = () => setConfig(tabsConfig.FULL);

  return (
    <PaperProvider>
      <View
        style={[{ backgroundColor: themeColor.background }, styles.container]}
      >
        <TabBarView DynamicConfig={config}>
          {tabs[config].map((tab, idx) => {
            const Component = tab.component;
            return (
              <Component
                key={idx}
                title={tab.title}
                validInfo={validInfo}
                event={event}
              />
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
