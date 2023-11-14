// OrganizerContext.js
import React, { createContext, useState, useEffect } from "react";

const OrganizerContext = createContext();

const OrganizerProvider = ({ children }) => {
  const [authenticatedO, setAuthenticatedO] = useState(false);
  const [authenticatedU, setAuthenticatedU] = useState(false);

  return (
    <OrganizerContext.Provider
      value={{
        authenticatedO,
        setAuthenticatedO,
        authenticatedU,
        setAuthenticatedU,
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
