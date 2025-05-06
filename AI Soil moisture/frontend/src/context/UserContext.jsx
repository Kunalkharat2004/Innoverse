import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// Create Context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      try {
        setUserInfo(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
    setInitialized(true);
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setUserInfo(userData);
    setToken(authToken);

    // Store in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    toast.success(`Welcome back, ${userData.name}!`);
    return true;
  };

  // Logout function
  const logout = () => {
    setUserInfo(null);
    setToken(null);

    // Remove from localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");

    toast.success("You have been logged out");
    return true;
  };

  // Update user information
  const updateUserInfo = (updatedUser) => {
    setUserInfo(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!userInfo && !!token;
  };

  // Check if user is admin
  const isAdmin = () => {
    return userInfo?.role === "admin" || userInfo?.isAdmin === true;
  };

  const contextValue = {
    userInfo,
    token,
    loading,
    initialized,
    login,
    logout,
    updateUserInfo,
    isAuthenticated,
    isAdmin,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
