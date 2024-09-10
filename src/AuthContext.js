import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import db from './firebase';

const AuthContext = createContext({
  currentUser: null,
  isSignedIn: false,
  setIsSignedIn: () => {},
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
        console.log('User: ', user);
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
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser, isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };