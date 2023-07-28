import AsyncStorage from "@react-native-async-storage/async-storage";

module.exports = {
  // Get the token from AsyncStorage
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      return token;
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return null;
    }
  },
  storeToken: async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      console.log("Token stored successfully in AsyncStorage.");
    } catch (error) {
      console.error("Error storing token in AsyncStorage:", error);
    }
  },
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      console.log("Token removed successfully from AsyncStorage.");
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  },
};
