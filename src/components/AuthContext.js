import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);


  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, isLoggedIn, setIsLoggedIn, userId, setUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;