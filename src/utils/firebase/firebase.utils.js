import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc, // contains fields -> which map to values.
  getDoc, // getthe data related to a document
  setDoc, // Writes to the document referred to by the specified DocumnetReference, If the document does not yet exist -> it will be created.
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2DpFE1A3w0nR8z35BhwGuzIVZssVaYaI",
  authDomain: "crwn-clothing-db-4d26b.firebaseapp.com",
  projectId: "crwn-clothing-db-4d26b",
  storageBucket: "crwn-clothing-db-4d26b.appspot.com",
  messagingSenderId: "566502622663",
  appId: "1:566502622663:web:1ea5644d6d4f310dfcc5e2",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () => {
  return signInWithPopup(getAuth(firebaseApp), googleProvider);
};

export const db = getFirestore();
export const auth = getAuth();
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return; // If don't have value -> not running function
  // giving doc inside db under users with uid
  const userDocRef = doc(db, "users", userAuth.uid);

  // snapshot -> data
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.mesaage);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; //not call a method
  return await createUserWithEmailAndPassword(auth, email, password);
};
