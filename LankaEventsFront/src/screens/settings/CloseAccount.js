import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import userApi from "../../../api/userApi";

const CloseAccount = () => {
  return (
    <View>
      <Text>Close account</Text>
    </View>
  );
};

export default CloseAccount;

const styles = StyleSheet.create({});
