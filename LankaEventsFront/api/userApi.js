import axios from "axios";
import config from "../config";
import { getToken, storeToken } from "../src/utils/functions/storage";

const API_URL = config.API_BASE_URL;

// import BASE_URL from './apiConfig';

const api = axios.create({
  baseURL: API_URL,
  // withCredentials: !isGraviteeSession,
  // adapter: cache.adapter
});

module.exports = {
  updateProfilePicture: async (newProfilePicture) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/user/profile-picture",
        {
          profilePictureUrl: newProfilePicture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await storeToken(data.token);
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  updateUserName: async (firstName, lastName) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/user/update-name",
        {
          firstname: firstName,
          lastname: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("updateUserName", data);
      await storeToken(data.token);
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  sendEmailOTP: async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/user/verification-code", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sendEmailOTP");
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
