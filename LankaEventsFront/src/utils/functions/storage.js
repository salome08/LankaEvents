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
  updateTokenWithNewName: async (firstname, lastname) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        console.log("updatedToken", token);
        // const updatedToken = {
        //   ...token,
        //   name: `${firstname} ${lastname}`,
        //   firstname,
        //   lastname,
        // };
        // await AsyncStorage.setItem("userToken", updatedToken);
      }
    } catch (error) {
      console.error("Error updating token with new name:", error);
    }
  },
  storeOrganizerToken: async (name, token) => {
    try {
      await AsyncStorage.setItem(name, token);
      console.log("Token stored successfully in AsyncStorage.");
    } catch (error) {
      console.error("Error storing token in AsyncStorage:", error);
    }
  },
  getOrganizerToken: async (name) => {
    try {
      const token = await AsyncStorage.getItem(name);
      return token;
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return null;
    }
  },
  removeOrganizerToken: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
      console.log("Token removed successfully from AsyncStorage.");
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  },
};
