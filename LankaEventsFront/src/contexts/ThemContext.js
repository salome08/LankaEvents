// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";
import { useColorScheme, StatusBar } from "react-native"; // For detecting system theme
import colors from "../utils/constants/colors"; // Import the color palettes

const ThemeContext = createContext();

const setStatusBarStyle = (systemTheme) => {
  if (systemTheme === "dark") {
    StatusBar.setBarStyle("light-content"); // For dark mode, use light-colored status bar
  } else {
    StatusBar.setBarStyle("dark-content"); // For light mode, use dark-colored status bar
  }
};

const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // 'light' or 'dark' based on the device settings
  console.log({ systemTheme });
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  // Listen to changes in system theme and update dark mode state accordingly
  useEffect(() => {
    setIsDarkMode(systemTheme === "dark");
    setStatusBarStyle(systemTheme);
  }, [systemTheme]);

  const themeColor = isDarkMode ? colors.dark : colors.light;

  return (
    <ThemeContext.Provider value={{ themeColor, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext must be called in ThemeProvider");
  return context;
};

export default ThemeProvider;
