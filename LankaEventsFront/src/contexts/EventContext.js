// EventContext.js
import React, { createContext, useState, useEffect } from "react";
import eventApi from "../../api/eventApi";
import { useAuth } from "../contexts/AuthContext";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);
  const [eventsLoading, setLoading] = useState(true);
  const { authenticated, user } = useAuth();
  // Fetch events from the database when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Call your function to fetch liked events from the database
        const fetchedEvents = await eventApi.getAll();
        setEvents(fetchedEvents); // Set the initial state with the fetched data
        // Get liked events from the api
        setLoading(false);
      } catch (error) {
        console.error("Error fetching liked events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const fetchedLikedEvents = await eventApi.getLiked();
        setLikedEvents(fetchedLikedEvents);
      } catch (error) {}
    };

    if (authenticated) {
      fetchLikedEvents();
    } else setLikedEvents([]);
  }, [authenticated]);

  const toggleLikeEvent = (eventId) => {
    // Add/remove eventId from the likedEvents array based on user's actions
    setLikedEvents((prevLikedEvents) =>
      prevLikedEvents.includes(eventId)
        ? prevLikedEvents.filter((id) => id !== eventId)
        : [...prevLikedEvents, eventId]
    );
  };

  const isLiked = (eventId) => {
    const ret = likedEvents.includes(eventId);
    return ret;
  };

  return (
    <EventContext.Provider
      value={{ events, isLiked, toggleLikeEvent, eventsLoading }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = React.useContext(EventContext);
  if (!context) throw new Error("EventContext must be called in EventProvider");
  return context;
};

export default EventProvider;
