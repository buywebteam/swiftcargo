// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "swiftcargo-1e25f.firebaseapp.com",
  projectId: "swiftcargo-1e25f",
  storageBucket: "swiftcargo-1e25f.firebasestorage.app",
  messagingSenderId: "776980973595",
  appId: "1:776980973595:web:b9429b885d7869879a10be",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
