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

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      <PaperProvider>
        <View
          style={{
            paddingTop: 50,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "red",
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>
                <Text style={{ color: "black" }}>Show menu</Text>
              </Button>
            }
          >
            <Menu.Item
              style={{ backgroundColor: "blue" }}
              onPress={() => {}}
              title="Item 1"
            />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </View>
      </PaperProvider>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    // height: 100,
    // width: "100%",
    flex: 1,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 16,
  },
});
