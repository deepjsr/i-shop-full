import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCCIoRE9fzIAHrDHOBcVZEvEQdNSO12gl0",
  authDomain: "i-shopful.firebaseapp.com",
  projectId: "i-shopful",
  storageBucket: "i-shopful.firebasestorage.app",
  databaseURL:
    "https://i-shopful-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "1040309158633",
  appId: "1:1040309158633:web:bca38ca8f6ea86093ba678",
  measurementId: "G-1E0YXQT79Z",
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
