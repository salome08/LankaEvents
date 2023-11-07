import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTheme } from "../contexts/ThemContext";

const VerificationCodeInput = ({ code, setCode }) => {
  const { themeColor } = useTheme();
  const inputRefs = useRef([]);

  const onChangeValue = (text, index) => {
    const newValue = code.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text;
      }
      return item;
    });

    setCode(newValue);
  };

  const handleChange = (text, index) => {
    onChangeValue(text, index);
    if (text.length !== 0) {
      return inputRefs.current[index + 1]?.focus();
    }
    return inputRefs?.current[index - 1]?.focus();
  };

  const handleBackspace = (event, index) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === "Backspace") {
      handleChange("", index);
    }
  };

  return (
    <View style={styles.inputsContainer}>
      {[...new Array(5)].map((item, index) => (
        <TextInput
          ref={(ref) => {
            // We check if ref is not already in array and add it
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          key={index}
          style={[
            {
              backgroundColor: themeColor.iconContainer,
              color: themeColor.primaryText,
            },
            styles.input,
          ]}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          keyboardType="phone-pad"
          inputMode="tel"
          value={code[index]}
          testID={`OTPInput-${index}`}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleBackspace(event, index)}
        />
      ))}
    </View>
  );
};

export default VerificationCodeInput;

const styles = StyleSheet.create({
  inputsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 30,
    paddingVertical: 10,
  },
  input: {
    fontSize: 24,
    textAlign: "center",
    width: 45,
    height: 55,
    borderRadius: 5,
  },
});
