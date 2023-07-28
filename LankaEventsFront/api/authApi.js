import axios from "axios";
import config from "../config";
import { getToken } from "../src/utils/functions/storage";

const API_URL = config.API_BASE_URL;

// import BASE_URL from './apiConfig';

const api = axios.create({
  baseURL: API_URL,
  // withCredentials: !isGraviteeSession,
  // adapter: cache.adapter
});

module.exports = {
  signInWithGoogle: async () => {
    try {
      const { data } = await api.get("/auth/login/federated/google");
      // return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  testProtected: async () => {
    const token = await getToken();
    try {
      const { data } = await api.get("/auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  },

  logOut: async () => {
    try {
      const { data } = await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
