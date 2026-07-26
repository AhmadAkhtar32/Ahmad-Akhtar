import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKBMTIi2kZvBA91_uTADaOGLrmaASkqnY",
  authDomain: "ahmad-portfolio-bef06.firebaseapp.com",
  projectId: "ahmad-portfolio-bef06",
  storageBucket: "ahmad-portfolio-bef06.firebasestorage.app",
  messagingSenderId: "861902791304",
  appId: "1:861902791304:web:e482c48f4129414959f53d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);