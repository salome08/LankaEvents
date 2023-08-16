import React from "react";
// import { SearchBar as SearchBarElement } from "react-native-elements";
import { SearchBar as SearchBarElement } from "@rneui/themed";
import { useTheme } from "../contexts/ThemContext";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchBar = ({
  placeholder,
  onChangeSearch,
  searchQuery,
  loadingQuery,
}) => {
  const { themeColor } = useTheme();

  return (
    <SearchBarElement
      placeholder={placeholder}
      onChangeText={onChangeSearch}
      value={searchQuery}
      showPrompt={false} // Set the showPrompt prop to false to hide the prompt bar
      autoFocus={false}
      showCancel={true}
      showLoading={loadingQuery}
      containerStyle={{
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderTopWidth: 0,
        padding: 0,
        borderBottomColor: themeColor.searchBottomBar,
      }}
      inputContainerStyle={{
        backgroundColor: "transparent",
      }}
      searchIcon={{
        size: 22,
      }}
      placeholderTextColor={themeColor.searchBarText}
      inputStyle={{
        color: themeColor.primaryText,
        fontSize: 23,
        fontWeight: "700",
      }}
    />
  );
};

export default SearchBar;
