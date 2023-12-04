import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZTf_JPl1SvEzYf99GLdVK5jJw_l1D-_Y",
  authDomain: "chat-app-58a09.firebaseapp.com",
  projectId: "chat-app-58a09",
  storageBucket: "chat-app-58a09.appspot.com",
  messagingSenderId: "989892009981",
  appId: "1:989892009981:web:e55a60b82f08c7a78a8394"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()