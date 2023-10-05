import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTheme } from "../contexts/ThemContext";
import * as ImagePicker from "expo-image-picker";

const ActionUpdatePicture = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { themeColor } = useTheme();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPress = () => {
    const options = ["Choose from Library", "Take photo", "Cancel"];
    // const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        // destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // Save
            pickImage();
            break;

          case 1:
            // Delete
            takePhoto();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[{ color: themeColor.blue }]}>Update picture</Text>
    </TouchableOpacity>
  );
};

export default ActionUpdatePicture;
