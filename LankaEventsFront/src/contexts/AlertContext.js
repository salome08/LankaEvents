// AlertContext.js
import React, { createContext, useState, useEffect } from "react";
import ErrorDialog from "../components/ErrorDialog";
import InformationPopup from "../components/InformationPopup";
const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  // const [authenticatedO, setAuthenticatedO] = useState(false);
  // const [authenticatedU, setAuthenticatedU] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("error");
  const [message, setMessage] = useState("");
  const test = "hello";

  const showInfo = (message) => {
    setMessage(message);
    setType("info");
    setIsVisible(true);
  };

  const showError = (error) => {
    if (error?.response?.data?.message) {
      // The client was given an error response (5xx, 4xx)
      setMessage(error.response.data.message);
    } else if (error) {
      setMessage(error);
    } else {
      setMessage("We have technical difficulties, please try again later.");
    }
    setType("error");
    setIsVisible(true);
  };

  // const
  return (
    <AlertContext.Provider
      value={{
        showError,
        showInfo,
      }}
    >
      <ErrorDialog
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        message={message}
        type={type}
      />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (!context) throw new Error("AlertContext must be called in AlertProvider");
  return context;
};

export default AlertProvider;
