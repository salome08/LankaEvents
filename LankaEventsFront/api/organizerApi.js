import axios from "axios";
import config from "../config";
import { getOrganizerToken } from "../src/utils/functions/storage";

const API_URL = config.API_BASE_URL;

// import BASE_URL from './apiConfig';

const api = axios.create({
  baseURL: API_URL,
  // withCredentials: !isGraviteeSession,
  // adapter: cache.adapter
});

module.exports = {
  getOrganizer: async (organizerId) => {
    try {
      console.log("getOrganizer");
      const token = await getOrganizerToken("organizerToken");
      const { data } = await api.get(`/organizer/${organizerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getEvents: async () => {
    try {
      console.log("get Events");
      const token = await getOrganizerToken("organizerToken");
      const { data } = await api.get("/organizer/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(err);
      return null;
    }
  },
};
