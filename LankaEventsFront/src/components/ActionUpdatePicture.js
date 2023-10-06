import React, { useEffect } from "react";
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
import { useAuth } from "../contexts/AuthContext";
import userApi from "../../api/userApi";
import eventApi from "../../api/eventApi";
import * as ImagePicker from "expo-image-picker";

const ActionUpdatePicture = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { themeColor } = useTheme();
  const { updateProfilePicture } = useAuth();

  // const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // change image into db
        await userApi.updateProfilePicture(result.assets[0].uri);
        updateProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access the camera is required!");
      }

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
    } catch (error) {
      console.error(error);
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
