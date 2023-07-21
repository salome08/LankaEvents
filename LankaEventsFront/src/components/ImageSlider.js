import React, { useState, useRef } from "react";
import { View, Image, FlatList, Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  if (images.length === 1) {
    return <Image source={{ uri: images[0] }} style={styles.singleImage} />;
  }

  const handleScroll = (event) => {
    const slideOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(slideOffset / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        onScroll={handleScroll}
      />
      <View style={styles.barContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.bar, index === activeIndex && styles.activeBar]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  image: {
    width: screenWidth,
    height: "100%",
    resizeMode: "cover",
  },
  singleImage: {
    width: screenWidth,
    height: 200,
    resizeMode: "cover",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  bar: {
    width: 52,
    height: 4,
    marginHorizontal: 4,
    borderRadius: 2,
    backgroundColor: "lightgrey",
  },
  activeBar: {
    backgroundColor: "white",
  },
});

export default ImageSlider;
