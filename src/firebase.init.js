import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ-Lsi8cjJimVo7-tZtHBp4d9waSE4ZyM",
  authDomain: "email-pass-auth-f3072.firebaseapp.com",
  projectId: "email-pass-auth-f3072",
  storageBucket: "email-pass-auth-f3072.firebasestorage.app",
  messagingSenderId: "805270908806",
  appId: "1:805270908806:web:786bedb65efa7bd47b0607"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;