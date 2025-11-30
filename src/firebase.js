// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✔️ USE YOUR FIREBASE CONFIG (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyDq0iT6tnxiNycPDsLsXGenPszV8GL6UO4",
  authDomain: "codecylon-89f48.firebaseapp.com",
  projectId: "codecylon-89f48",
  storageBucket: "codecylon-89f48.appspot.com",
  messagingSenderId: "999436085190",
  appId: "1:999436085190:web:2214a7caa02313916074c7",apiKey: "AIzaSyDq0iT6tnxiNycPDsLsxGenPszV8GL6UO4",
  authDomain: "codeceylon-89f48.firebaseapp.com",
  projectId: "codeceylon-89f48",
  storageBucket: "codeceylon-89f48.firebasestorage.app",
  messagingSenderId: "999436085190",
  appId: "1:999436085190:web:2214a7caa02313916074c7",
  measurementId: "G-F3DRD9MJ8Z"
};

// ✔️ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✔️ This is what we will use for Login / Signup
export const auth = getAuth(app);
export const db = getFirestore(app);  

export default app;