import React from "react";
// import { SearchBar as SearchBarElement } from "react-native-elements";
import { SearchBar as SearchBarElement } from "@rneui/themed";
import { useTheme } from "../contexts/ThemContext";

const SearchBar = ({ placeholder, onChangeSearch, searchQuery }) => {
  const { themeColor } = useTheme();

  return (
    <SearchBarElement
      placeholder={placeholder}
      onChangeText={onChangeSearch}
      value={searchQuery}
      showPrompt={false} // Set the showPrompt prop to false to hide the prompt bar
      autoFocus={false}
      containerStyle={{
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderTopWidth: 0,
        padding: 0,
        borderBottomColor: themeColor.veryLightGray,
      }}
      inputContainerStyle={{
        backgroundColor: "transparent",
      }}
      searchIcon={{
        size: 22,
      }}
      placeholderTextColor={themeColor.lightGray}
      inputStyle={{
        color: themeColor.primaryText,
        fontSize: 23,
        fontWeight: "700",
      }}
    />
  );
};

export default SearchBar;
