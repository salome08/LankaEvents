// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, removeToken } from "../utils/functions/storage";
import JWT from "expo-jwt";
import authApi from "../../api/authApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to set the token and update the state in context
  const logIn = (token) => {
    const decodedToken = JWT.decode(token, "YOUR_JWT_SECRET");
    const loggedUser = ({ id, email, displayName, pictureUrl } = decodedToken);
    setLoading(true);

    setUser(loggedUser);

    setAuthenticated(true);
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);

    await authApi.logOut();
    await removeToken();
    setAuthenticated(false);
    setUser(null);
    setLoading(false);
  };

  // Check user authentication on app start
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if user is authenticated based on stored token
        setLoading(true);

        const storageToken = await getToken();

        if (storageToken) {
          // If the token exists, update the authentication state in the context
          logIn(storageToken);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error checking token:", error);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, user, logIn, logOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be called in AuthProvider");
  return context;
};

export default AuthProvider;
