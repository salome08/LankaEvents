import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemContext";
import ActionUpdatePicture from "../../components/ActionUpdatePicture";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import userApi from "../../../api/userApi";

const AccountSettings = () => {
  const { themeColor } = useTheme();
  const navigation = useNavigation();
  const { logOut, authenticated, user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const settingsList = [
    { label: "Name", value: user?.name, link: "UpdateName" },
    { label: "Email", value: user?.email },
    { label: "Password", value: "Update password", link: "UpdatePassword" },
    { label: "Account", value: "Close your account", link: "CloseAccount" },
  ];

  const onPressLink = async (link) => {
    if (link === "CloseAccount") {
      const { userHasPassword } = await userApi.userHasPassword();
      userHasPassword ? navigation.navigate(link) : console.log("NOTIFICATION");
    } else navigation.navigate(link);
  };

  return (
    <View
      style={[{ backgroundColor: themeColor.background }, styles.container]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: user?.pictureUrl,
          }}
          style={styles.profilePicture}
        />
        <ActionUpdatePicture />
      </View>
      <View style={styles.settingsContainer}>
        {settingsList.map((setting, key) => (
          <View key={key} style={styles.settingContainer}>
            <Text style={{ color: themeColor.primaryText }}>
              {setting.label}
            </Text>
            {setting.link ? (
              <Pressable
                style={styles.linkContainer}
                onPress={
                  () => onPressLink(setting.link)
                  //   () => {
                  //   navigation.navigate(setting.link);
                  // }
                }
              >
                <Text style={{ color: themeColor.blue }}>{setting.value}</Text>
                <Entypo
                  name="chevron-right"
                  size={17}
                  color={themeColor.primaryText}
                />
              </Pressable>
            ) : (
              <Text style={{ color: themeColor.primaryText }}>
                {setting.value}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  settingsContainer: {
    marginTop: 70,
    rowGap: 15,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkContainer: {
    flexDirection: "row",
    columnGap: 12,
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 80,
    marginBottom: 25,
  },
});

export default AccountSettings;
