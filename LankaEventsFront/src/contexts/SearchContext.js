// SearchContext.js
import React, { createContext, useState, useEffect } from "react";
import eventApi from "../../api/eventApi";
import { useAuth } from "../contexts/AuthContext";

// Use Context Selectors to prevent home from rerender
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState({
    label: "Anytime",
    value: "anytime",
  });
  const [selectedTown, setSelectedTown] = useState("Sri Lanka");

  return (
    <SearchContext.Provider
      value={{
        selectedTown,
        setSelectedTown,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (!context)
    throw new Error("SearchContext must be called in SearchProvider");
  return context;
};

export default SearchProvider;
