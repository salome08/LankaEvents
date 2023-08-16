import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";

const SearchQuery = () => {
  const navigation = useNavigation();
  const { themeColor, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.searchBackground,
          paddingTop: insets.top * 1.5,
        },
        styles.container,
      ]}
    >
      <View style={styles.searchBarContainer}>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default SearchQuery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
  },
});
