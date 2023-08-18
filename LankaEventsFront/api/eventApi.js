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
  getAll: async () => {
    try {
      const { data } = await api.get("/events");
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  getHome: async (town) => {
    try {
      const { data } = await api.get("/events/home", {
        params: { town },
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  getFiltered: async (filters) => {
    try {
      const { data } = await api.get("/events/filter", {
        params: { filters },
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  getFromQuery: async (query) => {
    try {
      const { data } = await api.get(`/events/query/${query}`);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  getLiked: async () => {
    const token = await getToken();
    try {
      const { data } = await api.get("/events/liked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  getById: async (id) => {
    try {
      const { data } = await api.get(`/events/${id}`);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  addLike: async (eventId) => {
    const token = await getToken();
    try {
      const { data } = await api.post(
        `/events/${eventId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  },
  testProtected: async () => {
    const token = await getToken();
    try {
      const { data } = await api.post(
        "/events/like",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  },
};

// export const getEvents = async () => {
//   try {
//     const { data } = await api.get("/events");
//     return data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
