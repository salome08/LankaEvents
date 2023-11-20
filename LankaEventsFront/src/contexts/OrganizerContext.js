// OrganizerContext.js
import React, { createContext, useState, useEffect } from "react";
import JWT from "expo-jwt";
import * as WebBrowser from "expo-web-browser";
import {
  getOrganizerToken,
  storeOrganizerToken,
} from "../utils/functions/storage";
import organizerApi from "../../api/organizerApi";

const OrganizerContext = createContext();

const handleGoogleSignIn = async () => {
  const response = await WebBrowser.openAuthSessionAsync(
    "http://localhost:3000/auth/login/federated/google-organizer",
    "exp://192.168.1.112:19000/Home"
  );
  if (response?.type === "success") {
    if (response.url) {
      // Check if the URL contains the token or other relevant data
      if (response.url.includes("organizerToken")) {
        console.log(response.url);
        // Extract the token from the URL
        const urlParts = response.url.split("#");
        const tokenPart = urlParts[0];
        const tokenKeyValuePairs = tokenPart.split("&");
        const token = tokenKeyValuePairs
          .find((pair) => pair.includes("organizerToken"))
          .split("=")[1];

        console.log("token", token);
        // Token === false if user was not found in db
        if (token === "false") {
          console.log("user not found in db");
          // Display notif error
          return null;
        } else {
          // Store the token in async storage
          await storeOrganizerToken("authOrganizerToken", token);
          console.log(token);
          return token;
        }
        // Update auth state in the context
        // logIn(token);
      }
    }
    console.log("Success google connection");
  } else {
    // Error google account
    console.log("Fail connection");
    return null;
  }

  // navigation.goBack();
};

const OrganizerProvider = ({ children }) => {
  const [authenticatedO, setAuthenticatedO] = useState(false);
  const [authenticatedU, setAuthenticatedU] = useState(false);
  const [profile, setProfile] = useState(null);
  const [organizerId, setOrganizerId] = useState(null);
  const [events, setEvents] = useState(null);

  const logOrganizer = async () => {
    const token =
      // (await getOrganizerToken("authOrganizerToken")) ||
      await handleGoogleSignIn();
    if (token) {
      // decode token from storage
      const decodedToken = JWT.decode(token, "YOUR_JWT_SECRET");
      // There is an error here when token is
      const { id } = decodedToken;
      console.log("la", id);
      setOrganizerId(id);
      if (id) {
        setAuthenticatedO(true);
        const events = organizerApi.getEvents();
        setEvents(events);
      }
      return id;
    } else {
      console.log("Error log Organizer");
    }
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents([
      ...events.filter((event) => event._id !== updatedEvent._id),
      updatedEvent,
    ]);
  };

  useEffect(() => {
    // check initial state with tokens
    const getTokens = async () => {
      const organizerToken = await getOrganizerToken("organizerToken");
      const authOrganizerToken = await getOrganizerToken("authOrganizerToken");
      setAuthenticatedU(!!organizerToken);
      setAuthenticatedO(!!authOrganizerToken);
      // console.log("organizerToken", organizerToken);
      console.log("authOrganizerToken", authOrganizerToken);
    };

    getTokens();
  }, []);

  return (
    <OrganizerContext.Provider
      value={{
        authenticatedO,
        setAuthenticatedO,
        authenticatedU,
        setAuthenticatedU,
        logOrganizer,
        organizerId,
        setOrganizerId,
        events,
        setEvents,
        profile,
        setProfile,
        addEvent,
        updateEvent,
      }}
    >
      {children}
    </OrganizerContext.Provider>
  );
};

export const useOrganizer = () => {
  const context = React.useContext(OrganizerContext);
  if (!context)
    throw new Error("OrganizerContext must be called in OrganizerProvider");
  return context;
};

export default OrganizerProvider;
