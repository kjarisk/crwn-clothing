import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCCnmzQe4Ggfi3SiaXdiB6VDZokutq7bGg",
  authDomain: "crwnpro-a61c7.firebaseapp.com",
  projectId: "crwnpro-a61c7",
  storageBucket: "crwnpro-a61c7.appspot.com",
  messagingSenderId: "101445761418",
  appId: "1:101445761418:web:e4bd2d05891b3424423073",
  measurementId: "G-BG9THT4RPK",
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;