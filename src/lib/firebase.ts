import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBk2HK4CKpWBbgVBH5OKjUccEaHJQgMryk",
  authDomain: "iwamad-chat-f4745.firebaseapp.com",
  databaseURL: "https://iwamad-chat-f4745-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-f4745",
  storageBucket: "iwamad-chat-f4745.firebasestorage.app",
  messagingSenderId: "1095379252794",
  appId: "1:1095379252794:web:fbada0416a481b47452703"
};


export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);