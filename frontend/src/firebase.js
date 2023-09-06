// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6GQLIv6ld9jI1ugfXEsmAI0VsTHKBbO8",
  authDomain: "library-system-9055c.firebaseapp.com",
  projectId: "library-system-9055c",
  storageBucket: "library-system-9055c.appspot.com",
  messagingSenderId: "599550000065",
  appId: "1:599550000065:web:9ffcfd3f32d3e9c9c6cd40",
  measurementId: "G-1VDWNEP7GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
