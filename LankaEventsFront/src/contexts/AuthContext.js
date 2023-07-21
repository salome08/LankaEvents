// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  // Check user authentication on app start
  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if user is authenticated based on stored session data
      // const userIsAuthenticated = await checkUserAuthentication();
      const userIsAuthenticated = false;
      setAuthenticated(userIsAuthenticated);
    };
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
