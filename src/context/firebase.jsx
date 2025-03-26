import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const FireStore = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
let isSignedIn = false;

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const logOut = () => {
    isSignedIn = false;
    return signOut(auth);
  };
  const signInWithGoogle = () => {
    isSignedIn = true;
    return signInWithPopup(auth, provider);
  };

  const putData = (path, data) => {
    return set(ref(db, path), data);
  };

  const getData = (path) => {
    return get(ref(db, path));
  };

  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        isSignedIn,
        logOut,
        getData,
        putData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { auth, db, FireStore, provider };
