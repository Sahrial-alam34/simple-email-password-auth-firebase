// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4IF6wRTHKP9OLhEDXEvMM683iLTVr4kI",
  authDomain: "email-password-auth-ecfef.firebaseapp.com",
  projectId: "email-password-auth-ecfef",
  storageBucket: "email-password-auth-ecfef.appspot.com",
  messagingSenderId: "417657998265",
  appId: "1:417657998265:web:93f34dd6b494c646260468"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;