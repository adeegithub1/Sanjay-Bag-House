/* ============================================================
   SANJAY BAG HOUSE — FIREBASE INIT
   ============================================================ */
 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyBWKwm1K7OO32iTvZwrMeGT1uzBrG9kCQA",
  authDomain: "sanjay-bag-house.firebaseapp.com",
  projectId: "sanjay-bag-house",
  storageBucket: "sanjay-bag-house.firebasestorage.app",
  messagingSenderId: "700003631201",
  appId: "1:700003631201:web:743d4b7eaeb1b51f9fea20",
  measurementId: "G-CSM33N57L2",
};
 
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
 
