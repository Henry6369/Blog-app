
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "blog-app-acf76.firebaseapp.com",
  projectId: "blog-app-acf76",
  storageBucket: "blog-app-acf76.firebasestorage.app",
  messagingSenderId: "351262210001",
  appId: "1:351262210001:web:6ecd3a0345df85151bd2f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);