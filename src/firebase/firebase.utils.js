import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc,collection, getDoc, writeBatch } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyCCnmzQe4Ggfi3SiaXdiB6VDZokutq7bGg",
  authDomain: "crwnpro-a61c7.firebaseapp.com",
  projectId: "crwnpro-a61c7",
  storageBucket: "crwnpro-a61c7.appspot.com",
  messagingSenderId: "101445761418",
  appId: "1:101445761418:web:e4bd2d05891b3424423073",
  measurementId: "G-BG9THT4RPK",
};

const app = initializeApp(config);
const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = collection(db, "users");
  const docRef = doc(db, `users/${userAuth.uid}`);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(doc(userRef, userAuth.uid), { displayName, email, createdAt, ...additionalData });
      console.log("user created");
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return docSnap;
};

// Create new collections in firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  // New write batch
  const batch = writeBatch(db);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();

  // batch end;
}

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;
