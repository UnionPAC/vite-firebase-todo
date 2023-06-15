import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9eUql_oU5kqs4I5_BhkWMxK35vyyPOHM",
  authDomain: "vite-firebase-todo.firebaseapp.com",
  projectId: "vite-firebase-todo",
  storageBucket: "vite-firebase-todo.appspot.com",
  messagingSenderId: "52108179158",
  appId: "1:52108179158:web:c56fd404a861650a553b77",
  measurementId: "G-7W6FGMDN10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
