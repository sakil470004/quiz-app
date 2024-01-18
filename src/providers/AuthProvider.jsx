"use client";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import app from "@/components/Firebase/firebase.init";
import Login from "@/components/Login/Login";


export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("english");

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const updateUser = (data) => {
    return updateProfile(auth.currentUser, data);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // observer user auth state
  // ("use client");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // stop observing while unmounting
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    logOut,
    updateUser,
    googleLogin,
    githubLogin,
    currentLanguage,
    setCurrentLanguage
  };
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        loading...
      </div>
    );
  else
    return (
      <AuthContext.Provider value={authInfo}>
        {!loading && !user ? <Login/> : children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;
