/* ============================================================
   SANJAY BAG HOUSE — ADMIN PRODUCT CRUD
   Real Firestore writes for the admin product pages.
   Requires the user to already be signed in as admin
   (admin-guard.js handles that check before this runs).
   ============================================================ */

import { db } from "./firebase-init.js";
import {
  collection, getDocs, doc, addDoc, updateDoc, deleteDoc, getDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const AdminProducts = {
  /** Always fetches fresh from Firestore — no caching, since admin needs live data. */
  async listAll() {
    const snap = await getDocs(collection(db, "products"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async listCategories() {
    const snap = await getDocs(collection(db, "categories"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async getOne(id) {
    const snap = await getDoc(doc(db, "products", id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  async create(productData) {
    const ref = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  },

  async update(id, productData) {
    await updateDoc(doc(db, "products", id), {
      ...productData,
      updatedAt: serverTimestamp(),
    });
  },

  async remove(id) {
    await deleteDoc(doc(db, "products", id));
  },

  async setActive(id, active) {
    await updateDoc(doc(db, "products", id), { active, updatedAt: serverTimestamp() });
  },
};

window.AdminProducts = AdminProducts;
export default AdminProducts;
