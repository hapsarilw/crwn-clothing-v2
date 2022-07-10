import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc, // contains fields -> which map to values.
  getDoc, // getthe data related to a document
  setDoc // Writes to the document referred to by the specified DocumnetReference, If the document does not yet exist -> it will be created.
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2DpFE1A3w0nR8z35BhwGuzIVZssVaYaI",
  authDomain: "crwn-clothing-db-4d26b.firebaseapp.com",
  projectId: "crwn-clothing-db-4d26b",
  storageBucket: "crwn-clothing-db-4d26b.appspot.com",
  messagingSenderId: "566502622663",
  appId: "1:566502622663:web:1ea5644d6d4f310dfcc5e2",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () => {
  return signInWithPopup(getAuth(firebaseApp), provider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // giving doc inside db under users with uid
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);
  // snapshot -> data
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.mesaage);
    }
  }

  return userDocRef;

  //if user data does not exist
  // create / set the document with the data from userAuth in my collection


  // if user data exist
  // return userDocRed
}