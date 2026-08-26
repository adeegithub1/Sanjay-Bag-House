/* ============================================================
   SANJAY BAG HOUSE — FIRESTORE DATA LAYER (v2)
   Exposes window.SBH_FIRESTORE.load() — call ONCE per page.
   It returns an object with the SAME shape/method names as the old
   window.SBH_DATA from data.js (PRODUCTS, CATEGORIES, getProduct,
   getCategory, getProductsByCategory, getRelated, formatINR,
   discountPct) — but backed by real Firestore data.

   Page migration pattern:
     BEFORE: const data = window.SBH_DATA;               (sync)
     AFTER:  const data = await window.SBH_FIRESTORE.load();  (async)
   Everything else in the page (data.PRODUCTS, data.getProduct(), etc.)
   stays exactly the same.
   ============================================================ */

import { db } from "./firebase-init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

let _cache = null;

async function load() {
  if (_cache) return _cache;

  const [productsSnap, categoriesSnap] = await Promise.all([
    getDocs(collection(db, "products")),
    getDocs(collection(db, "categories")),
  ]);

  const PRODUCTS = productsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const CATEGORIES = categoriesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  _cache = {
    PRODUCTS,
    CATEGORIES,
    getProduct(slugOrId) {
      return PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
    },
    getCategory(id) {
      return CATEGORIES.find((c) => c.id === id) || null;
    },
    getProductsByCategory(id) {
      return PRODUCTS.filter((p) => p.category === id);
    },
    getRelated(product, count = 4) {
      return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
    },
    formatINR(n) { return "₹" + n.toLocaleString("en-IN"); },
    discountPct(mrp, price) { return Math.round(((mrp - price) / mrp) * 100); },
  };

  return _cache;
}

window.SBH_FIRESTORE = { load };
