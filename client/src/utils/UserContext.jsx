import React, { createContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext";

// This context holds user state and a setter function
export const UserContext = createContext(null);

// The provider wraps the entire app
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user: authUser, isAuthenticated } = useAuth();

  // Update currentUser when auth state changes
  useEffect(() => {
    if (isAuthenticated && authUser) {
      // Transform Auth0 user to match your app's user structure
      setCurrentUser({
        email: authUser.email,
        name: authUser.name,
        image: authUser.picture,
        // If Auth0 doesn't provide role, set default
        role: authUser.role || "USER" 
      });
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated, authUser]);

  // Memoize the context value (optional optimization)
  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};