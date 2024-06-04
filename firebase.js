// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS6UsWYsB23f6KD2Oz3UF5CIdzRWS7NvY",
  authDomain: "dcgamingbot-c1b1c.firebaseapp.com",
  databaseURL: "https://dcgamingbot-c1b1c-default-rtdb.firebaseio.com",
  projectId: "dcgamingbot-c1b1c",
  storageBucket: "dcgamingbot-c1b1c.appspot.com",
  messagingSenderId: "184275053819",
  appId: "1:184275053819:web:a3bdd1fffc07d57535d45e",
  measurementId: "G-65TRC7J3R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);