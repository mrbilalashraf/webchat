import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import db from './firebase';

const AuthContext = createContext({
  currentUser: null,
  isSignedIn: false,
  setIsSignedIn: () => {},
  loading: true
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await setDoc(doc(db, "Users", user?.uid), {
                uid: user?.uid,
                name: user?.displayName,
                email: user?.email,
                emailVerified: user?.emailVerified,
                photoURL: user?.photoURL
              }); 
        }
      setCurrentUser(user);
      setIsSignedIn(!!user);
      setLoading(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser, isSignedIn, setIsSignedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };