import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import { useOrganizer } from "../../contexts/OrganizerContext";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const { setAuthenticatedO } = useOrganizer();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = React.useState(true);
  const menu = ["Home", "Events"];
  const [showUserMenu, setShowUserMenu] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    setShowUserMenu(false);
  }, [currentPage]);

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
            // backgroundColor: "red",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {menu.map((label, index) => (
            <MenuItem
              key={index}
              label={label}
              icon={label === "Home" ? "home" : "calendar"}
            />
          ))}
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => setShowUserMenu(!showUserMenu)}
          >
            <FontAwesome5
              name="user-circle"
              size={22}
              color={themeColor.primaryText}
            />
          </TouchableOpacity>
          {showUserMenu && (
            <TouchableOpacity
              style={[
                { backgroundColor: themeColor.primaryText },
                styles.userMenu,
              ]}
              onPress={() => {
                setAuthenticatedO(false);
              }}
            >
              <SimpleLineIcons name="logout" size={18} color="black" />
              <Text style={{ fontWeight: 500 }}>Log out</Text>
            </TouchableOpacity>
          )}
        </View>
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
    justifyContent: "center",
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
    paddingVertical: 16,
    borderRadius: 4,
    // paddingHorizontal: 22,
  },
});
