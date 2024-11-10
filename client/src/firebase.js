// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-1e91c.firebaseapp.com",
  projectId: "mern-estate-1e91c",
  storageBucket: "mern-estate-1e91c.firebasestorage.app",
  messagingSenderId: "424564127449",
  appId: "1:424564127449:web:76b1c06f57524f527d70c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);