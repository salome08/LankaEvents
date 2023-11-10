import React, { useEffect, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, Text } from "react-native";
import { useTheme } from "../contexts/ThemContext";

const initMap = (children) => {
  const sceneMap = {};
  const routes = children.map((child, index) => {
    sceneMap[index] = () => children[index];
    return { key: index, title: child.props.title };
  });
  return { routes, sceneMap };
};

const TabBarView = ({ children, DynamicConfig }) => {
  console.log("render tabView");
  const { themeColor, isDarkMode } = useTheme();
  const [index, setIndex] = React.useState(0);
  const init = initMap(children);
  const [routes, setRoutes] = useState(init.routes);
  const renderScene = SceneMap(init.sceneMap);

  useEffect(() => {
    setRoutes(init.routes);
  }, [DynamicConfig]);

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
