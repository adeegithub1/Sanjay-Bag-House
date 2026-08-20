// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWKwm1K7OO32iTvZwrMeGT1uzBrG9kCQA",
  authDomain: "sanjay-bag-house.firebaseapp.com",
  projectId: "sanjay-bag-house",
  storageBucket: "sanjay-bag-house.firebasestorage.app",
  messagingSenderId: "700003631201",
  appId: "1:700003631201:web:743d4b7eaeb1b51f9fea20",
  measurementId: "G-CSM33N57L2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
