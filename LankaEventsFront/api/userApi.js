import axios from "axios";
import config from "../config";
import {
  getToken,
  storeToken,
  storeOrganizerToken,
} from "../src/utils/functions/storage";

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
      const { data } = await api.get("/user/send-OTP-email", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sendEmailOTP");
      // popup info 'Verificaton email sent'
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  verifyOTP: async (code) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/user/verify-OTP",
        {
          code: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("verifyOTP");
      return { ok: true };
    } catch (err) {
      throw err;
      // if (err.response) {
      //   // The client was given an error response (5xx, 4xx)
      //   // console.error(1);
      //   console.error(err.response.data.message);
      //   return { ok: false, message: err.response.data.message };
      // } else if (err.request) {
      //   // The client never received a response, and the request was never left
      //   console.error(2);
      // } else {
      //   // Anything else
      //   console.error(3);
      // }
    }
  },
  userHasPassword: async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/user/has-password", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  createPassword: async (password) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/user/create-password",
        { password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ok: true, message: data.message };
    } catch (err) {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        // console.error(1);
        return { ok: false, message: err.response.data.message };
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.error(2);
      } else {
        // Anything else
        console.error(3);
      }
    }
  },
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/user/update-password",
        { currentPassword: currentPassword, newPassword: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ok: true, message: data.message };
    } catch (err) {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        // console.error(1);
        return { ok: false, message: err.response.data.message };
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.error(2);
      } else {
        // Anything else
        console.error(3);
      }
    }
  },
  closeAccount: async (email, password) => {
    try {
      const { data } = await api.post("/user/close-account", {
        email: email,
        password: password,
      });
      return { ok: true, message: data.message };
    } catch (err) {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        // console.error(1);
        console.log(err.response.data);
        return { ok: false, email: err.response.data.email };
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.error(2);
      } else {
        // Anything else
        console.error(3);
      }
    }
  },
  createOrganizerAccount: async (code) => {
    try {
      const token = await getToken();
      const { data } = await api.get("/user/create-organizer-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("organizer account created", data);
      await storeOrganizerToken("authOrganizerToken", data.token);
      await storeOrganizerToken("organizerToken", data.token);

      // error code
      // error create account

      // set OrganizerToken
      // set authOrganizerToken
      return null;
    } catch (err) {
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        // console.error(1);
        console.error(err.response.data.message);
        return { ok: false, message: err.response.data.message };
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.error(2);
      } else {
        // Anything else
        console.error(3);
      }
    }
  },
};
