// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXF87vncgBO-bWpDcPd_t_QDjXxFuH_3M",
  authDomain: "grow-social-media-app-1.firebaseapp.com",
  projectId: "grow-social-media-app-1",
  storageBucket: "grow-social-media-app-1.appspot.com",
  messagingSenderId: "366114170611",
  appId: "1:366114170611:web:05e9b80f4d990d1f763986",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
