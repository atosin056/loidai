// firebase.js
import { getApps, initializeApp } from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCarF_I7-db-ktATcbwOl9kXRSJUQlEWho",
  authDomain: "pushnotificationdemo-1b554.firebaseapp.com",
  projectId: "pushnotificationdemo-1b554",
  storageBucket: "pushnotificationdemo-1b554.firebasestorage.app",
  messagingSenderId: "876400932174",
  appId: "1:876400932174:web:e87d1ebd407a70c77b1a1f",
  measurementId: "G-B3926CLR4J",
  databaseURL: "https://pushnotificationdemo-1b554-default-rtdb.firebaseio.com",
};

// Initialize only if no apps exist
export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
