import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HelpCenter = () => {
  const renderCategoryItem = (category) => {
    return (
      <TouchableOpacity style={styles.categoryItem} key={category.id}>
        <Image source={category.icon} style={styles.categoryIcon} />
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </TouchableOpacity>
    );
  };

  const categories = [
    {
      id: 1,
      title: "FAQ",
      icon: "?",
    },
    {
      id: 2,
      title: "Contact Us",
      icon: "C",
    },
    // Add more categories as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => renderCategoryItem(category))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HelpCenter;
