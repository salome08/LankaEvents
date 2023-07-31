import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import filters from "../../utils/constants/eventFilters";
import { useTheme } from "../../contexts/ThemContext";

const SelectFilters = () => {
  const { themeColor, isDarkMode } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: themeColor.background,
        },
        styles.container,
      ]}
    >
      <ScrollView>
        <Text>Categories</Text>
        <View style={styles.filtersContainer}>
          {filters.categories.map((category, key) => {
            return (
              <Button
                key={key}
                compact={true}
                buttonColor={themeColor.lightBlue}
                mode="contained-tonal"
                onPress={() => {
                  console.log("pressed");
                }}
              >
                {category}
              </Button>
            );
          })}
        </View>
        <Text>Event type</Text>
        <View style={styles.filtersContainer}>
          {filters.types.map((type, key) => {
            return (
              <Button
                key={key}
                compact={true}
                buttonColor={themeColor.lightBlue}
                mode="contained-tonal"
                onPress={() => {
                  console.log("pressed");
                }}
              >
                {type}
              </Button>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectFilters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20,
    columnGap: 6,
    rowGap: 5,
  },
});
