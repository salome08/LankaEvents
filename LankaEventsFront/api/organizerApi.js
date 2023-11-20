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
  getOrganizer: async () => {
    try {
      console.log("getOrganizer");
      const token = await getOrganizerToken("organizerToken");
      const { data } = await api.get("/organizer/profile", {
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

      console.log("events", data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createEvent: async (event) => {
    try {
      console.log("createEvent", event);
      const token = await getOrganizerToken("organizerToken");
      // console.log(token);
      const { data } = await api.post(
        `/events/create-event`,
        {
          event,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  updateEvent: async (eventId, eventData) => {
    try {
      console.log("createEvent", eventData);
      const token = await getOrganizerToken("authOrganizerToken");
      // console.log(token);
      const { data } = await api.post(
        `/events/update-event/${eventId}`,
        {
          eventData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
