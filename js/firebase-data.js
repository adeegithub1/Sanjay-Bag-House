/* ============================================================
   SANJAY BAG HOUSE — FIRESTORE DATA LAYER
   Drop-in replacement for js/data.js.
   Same function names as window.SBH_DATA, but async (Firestore-backed)
   and cached in memory after first load so pages stay fast.

   IMPORTANT: pages currently do `window.SBH_DATA.PRODUCTS.find(...)`
   synchronously on load. With Firestore, data arrives async, so each
   page's inline <script> needs a small change:
     BEFORE:  const p = SBH_DATA.getProduct(slug);           render(p);
     AFTER:   const p = await SBH_DATA.getProduct(slug);     render(p);
   (wrap the page's init logic in an async function — that's the only
   change needed; markup and render() functions stay identical)
   ============================================================ */

import { db } from "./firebase-init.js";
import {
  collection, getDocs, doc, getDoc, query, where,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

let _productsCache = null;
let _categoriesCache = null;

async function loadProducts() {
  if (_productsCache) return _productsCache;
  const snap = await getDocs(collection(db, "products"));
  _productsCache = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return _productsCache;
}

async function loadCategories() {
  if (_categoriesCache) return _categoriesCache;
  const snap = await getDocs(collection(db, "categories"));
  _categoriesCache = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return _categoriesCache;
}

window.SBH_DATA = {
  async getAllProducts() { return loadProducts(); },
  async getAllCategories() { return loadCategories(); },

  async getProduct(slugOrId) {
    // Try direct doc lookup first (fast path when id is known)
    const products = await loadProducts();
    return products.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
  },

  async getCategory(id) {
    const categories = await loadCategories();
    return categories.find((c) => c.id === id) || null;
  },

  async getProductsByCategory(id) {
    const products = await loadProducts();
    return products.filter((p) => p.category === id);
  },

  async getRelated(product, count = 4) {
    const products = await loadProducts();
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, count);
  },

  // Unchanged — pure formatting, no data needed
  formatINR(n) { return "₹" + n.toLocaleString("en-IN"); },
  discountPct(mrp, price) { return Math.round(((mrp - price) / mrp) * 100); },
};
