import axios from "axios";
import config from "../config";

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
  getById: async (id) => {
    try {
      const { data } = await api.get(`/events/${id}`);
      return data;
    } catch (err) {
      console.error(err);
      return null;
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
