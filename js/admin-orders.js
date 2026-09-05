/* ============================================================
   SANJAY BAG HOUSE — ADMIN ORDERS
   Real Firestore reads + status updates for admin order pages.
   ============================================================ */

import { db } from "./firebase-init.js";
import {
  collection, getDocs, doc, getDoc, updateDoc, query, orderBy,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "packed", label: "Packed" },
  { value: "shipped", label: "Shipped" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
  { value: "refunded", label: "Refunded" },
];
export function statusLabel(value) {
  return (STATUS_OPTIONS.find(s => s.value === value) || {}).label || value;
}

const AdminOrders = {
  async listAll() {
    const snap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async getOne(id) {
    const snap = await getDoc(doc(db, "orders", id));
    if (!snap.exists()) return null;
    const order = { id: snap.id, ...snap.data() };
    // Best-effort: also pull the customer's email for display
    try {
      const custSnap = await getDoc(doc(db, "customers", order.userId));
      order.customerEmail = custSnap.exists() ? custSnap.data().email : "";
    } catch (e) { order.customerEmail = ""; }
    return order;
  },

  async updateStatus(id, status) {
    await updateDoc(doc(db, "orders", id), { status });
  },
};

window.AdminOrders = AdminOrders;
window.SBH_STATUS_OPTIONS = STATUS_OPTIONS;
window.SBH_statusLabel = statusLabel;
export default AdminOrders;
