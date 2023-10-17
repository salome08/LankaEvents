// EventContext.js
import React, { createContext, useState, useEffect } from "react";
import eventApi from "../../api/eventApi";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";

// Use Context Selectors to prevent home from rerender
const EventContext = createContext();

const EventProvider = ({ children }) => {
  const { authenticated, user } = useAuth();
  const [events, setEvents] = useState(null);
  // const [homeEvents, setHomEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const [eventsLoading, setLoading] = useState(true);
  // const [locationSearch, setLocationSearch] = useState("Weligama");

  // Fetch events from the database when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      // TO DO: infinite scroll for search
      try {
        // Call your function to fetch liked events from the database
        const fetchedEvents = await eventApi.getAll();
        // console.log(fetchedEvents);
        setEvents(fetchedEvents); // Set the initial state with the fetched data
        // Get liked events from the api
        setLoading(false);
      } catch (error) {
        console.error("Error fetching liked events:", error);
        setLoading(false);
      }
    };

    // const fetchHomeEvents = async () => {
    //   try {
    //     // Call your function to fetch liked events from the database
    //     const fetchedEvents = await eventApi.getHome();
    //     console.log(fetchedEvents);
    //     setHomEvents(fetchedEvents); // Set the initial state with the fetched data
    //     // Get liked events from the api
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching liked events:", error);
    //     setLoading(false);
    //   }
    // };
    // fetchHomeEvents();
    fetchEvents();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const fetchedLikedEvents = await eventApi.getLiked();
        setLikedEvents(fetchedLikedEvents);
      } catch (error) {
        console.error("Error fetching liked events");
      }
    };

    if (authenticated) {
      console.log("before fetch liked events", authenticated);
      fetchLikedEvents();
    } else setLikedEvents([]);
  }, [authenticated]);

  const toggleLikeEvent = (event) => {
    // Add/remove eventId from the likedEvents array based on user's actions

    setLikedEvents((prevLikedEvents) => {
      return prevLikedEvents.some((e) => e._id === event._id)
        ? prevLikedEvents.filter((e) => e._id !== event._id)
        : [...prevLikedEvents, event].sort((a, b) =>
            moment(a.date).isSameOrBefore(moment(b.date)) ? -1 : 1
          );
    });
  };

  const isLiked = (eventId) => {
    const ret = likedEvents?.some((e) => e._id === eventId);
    return ret;
  };

  console.log("likedEvents context", likedEvents);
  return (
    <EventContext.Provider
      value={{
        events,
        isLiked,
        toggleLikeEvent,
        eventsLoading,
        likedEvents,
      }}
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
