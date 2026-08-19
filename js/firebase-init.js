/* ============================================================
   SANJAY BAG HOUSE — FIREBASE INIT
   Fill in your config from: Firebase Console → Project Settings → General
   → Your apps → Web app → SDK setup and configuration
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// TODO: paste your config here (safe to expose publicly — this is not a secret;
// real security comes from Firestore rules + Cloud Functions, not from hiding this)
const firebaseConfig = {
  apiKey: "AIzaSyBWKwm1K70O32iTvZwrMeGT1uzBrG9kCQA",
  authDomain: "sanjay-bag-house.firebaseapp.com",
  projectId: "sanjay-bag-house",
  storageBucket: "sanjay-bag-house.firebasestorage.app",
  messagingSenderId: "700003631201",
  appId: "1:700003631201:web:743d4b7eaeb1b51f9fea20",
  measurementId: "G-CSM33N67L2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
