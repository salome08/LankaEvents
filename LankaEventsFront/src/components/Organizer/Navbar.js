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
  Menu,
  Divider,
  PaperProvider,
  IconButton,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import { useOrganizer } from "../../contexts/OrganizerContext";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { removeOrganizerToken } from "../../utils/functions/storage";

const AccountMenu = () => {
  const { themeColor, isDarkMode } = useTheme();
  const { setAuthenticatedO } = useOrganizer();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="account-circle" onPress={openMenu} />}
        anchorPosition="bottom"
      >
        <Menu.Item
          trailingIcon="logout"
          onPress={() => {
            setAuthenticatedO(false);
            removeOrganizerToken("authOrganizerToken");
          }}
          title="Log out"
        />
      </Menu>
    </View>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const { setAuthenticatedO } = useOrganizer();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const menu = ["Home", "Events"];

  const MenuItem = ({ label, icon }) => {
    const color =
      label === currentPage ? themeColor.primary : themeColor.primaryText;
    return (
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => setCurrentPage(label)}
      >
        <Feather name={icon} size={22} color={color} />
        <Text
          style={[
            {
              color: color,
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      <View style={styles.linksContainer}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {currentPage !== "NewOrganizerSteps" &&
            menu.map((label, index) => (
              <MenuItem
                key={index}
                label={label}
                icon={label === "Home" ? "home" : "calendar"}
              />
            ))}
        </View>
        <AccountMenu />
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 0.3,
    justifyContent: "flex-end",
    zIndex: 1,
  },
  linksContainer: {
    flexDirection: "row",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 8,
  },
  userMenu: {
    position: "absolute",
    // height: 100,
    width: 120,
    // backgroundColor: "white",
    top: 40,
    right: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    columnGap: 10,
    // paddingVertical: 16,
    borderRadius: 4,
    // paddingHorizontal: 22,
  },
});
