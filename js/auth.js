/* ============================================================
   SANJAY BAG HOUSE — AUTH MODULE
   Wraps Firebase Auth + creates/reads the matching customers/{uid} doc.
   Include this AFTER firebase-init.js on any page that needs auth.
   ============================================================ */

import { auth, db } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  doc, setDoc, getDoc, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const SBHAuth = {
  /** Register a new customer. Throws on failure (weak password, email in use, etc.) */
  async register({ name, email, phone, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, "customers", cred.user.uid), {
      name,
      email,
      phone,
      addresses: [],
      totalSpent: 0,
      orderCount: 0,
      createdAt: serverTimestamp(),
    });
    return cred.user;
  },

  /** Log in an existing customer. Throws on failure (wrong password, no such user, etc.) */
  async login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  },

  async logout() {
    await signOut(auth);
  },

  async sendResetEmail(email) {
    await sendPasswordResetEmail(auth, email);
  },

  /** Resolves once with the current user (or null), then never fires again. Use for one-off checks. */
  getCurrentUser() {
    return new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (user) => { unsub(); resolve(user); });
    });
  },

  /** Fetch the customers/{uid} profile doc for the current user. */
  async getCustomerProfile(uid) {
    const snap = await getDoc(doc(db, "customers", uid));
    return snap.exists() ? snap.data() : null;
  },

  /**
   * Checks if the current signed-in user has the admin custom claim.
   * Claim is set server-side by the setAdminClaim Cloud Function — never
   * trust a Firestore field for this, always use the ID token claim.
   */
  async isAdmin() {
    const user = auth.currentUser || (await this.getCurrentUser());
    if (!user) return false;
    const token = await user.getIdTokenResult();
    return token.claims.admin === true;
  },

  onChange(callback) {
    return onAuthStateChanged(auth, callback);
  },
};

window.SBHAuth = SBHAuth;
export default SBHAuth;

/* Friendlier error messages for common Firebase Auth error codes */
window.friendlyAuthError = function (err) {
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again in a few minutes.",
  };
  return map[err.code] || "Something went wrong. Please try again.";
};
