// Importing React, Firebase OAuth

import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

// AuthContext is a Context of React now!
const AuthContext = React.createContext();

// Function useAuth(), uses the AuthContext
export function useAuth() { return useContext(AuthContext) }

// Auth Provider
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory(); 

// If someone is a user and is logged in then redirect to Chats
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
      if (user) history.push('/chats');
    })
  }, [user, history]);

// The Value is the User
  const value = { user }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}