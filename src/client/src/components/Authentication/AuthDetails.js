import { auth } from "../Auth/auth";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

// Context manager for user authentication
// Updates the state whenever the user signs in or out
const AuthDetails = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('--- AUTH STATE LISTENER INITIALIZING ---');
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('--- AUTH STATE CHANGED ---', user ? 'User logged in: ' + user.email : 'No user');
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthDetails;