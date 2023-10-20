import React from "react";
import { View, Text, StyleSheet } from "react-native";
import zxcvbn from "zxcvbn";
import { ProgressBar } from "react-native-paper";
import { useTheme } from "../contexts/ThemContext";

const PasswordStrength = ({ password }) => {
  const { themeColor } = useTheme();
  const passwordInfos = zxcvbn(password);
  const { score } = passwordInfos;
  const decimalScore = score / 4;
  const minDecimalScore = decimalScore + 0.05;

  const strengthIndicator = [
    { label: "Very weak", color: themeColor.red },
    { label: "Weak", color: themeColor.red },
    { label: "Average", color: themeColor.yellow },
    { label: "Strong", color: themeColor.green },
    { label: "Great!", color: themeColor.green },
  ];

  return (
    <View style={styles.container}>
      <Text style={[{ color: themeColor.secondaryText }, styles.label]}>
        Password strength
      </Text>
      <View style={styles.indicatorContainer}>
        <Text style={[{ color: themeColor.secondaryText }, styles.value]}>
          {password.length > 0 ? strengthIndicator[score].label : ""}
        </Text>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={password.length > 0 ? minDecimalScore : decimalScore}
            color={strengthIndicator[score].color}
            style={[
              {
                backgroundColor: themeColor.veryLightGray,
              },
              styles.progressBar,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default PasswordStrength;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  progressBarContainer: {
    paddingHorizontal: 8,
  },
  progressBar: {
    width: 90,
    height: 5,
    borderRadius: 10,
    bottom: 2,
  },
  label: {
    fontSize: 11,
  },
  value: {
    fontSize: 12,
    fontWeight: 500,
  },
});
