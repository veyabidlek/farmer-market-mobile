// contexts/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(false);
  const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isFarmerLoggedIn,
        setIsFarmerLoggedIn,
        isBuyerLoggedIn,
        setIsBuyerLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
