import React, { useEffect, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, Text } from "react-native";
import { useTheme } from "../contexts/ThemContext";

const TabBarView = ({ children }) => {
  const { themeColor, isDarkMode } = useTheme();

  const [index, setIndex] = React.useState(0);

  const [routes] = useState(
    children.map((child, index) => {
      return { key: index, title: child.props.title };
    })
  );

  const renderScene = SceneMap({
    0: () => children[0],
    1: () => children[1],
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: "100%" }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorContainerStyle={{
            backgroundColor: themeColor.veryLightBackground,
          }}
          indicatorStyle={{ backgroundColor: themeColor.primary }}
        />
      )}
    />
  );
};

export default TabBarView;
