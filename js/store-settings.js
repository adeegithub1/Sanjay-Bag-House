/* ============================================================
   SANJAY BAG HOUSE — STORE SETTINGS
   Real Firestore-backed store contact info (storeSettings/contact).
   Public read (anyone can load it for footer/contact page), admin write.
   ============================================================ */

import { db } from "./firebase-init.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const DEFAULTS = { phone: "", whatsapp: "", email: "", address: "", mapsUrl: "", hours: "" };
let _cache = null;

async function loadContactSettings() {
  if (_cache) return _cache;
  try {
    const snap = await getDoc(doc(db, "storeSettings", "contact"));
    _cache = snap.exists() ? { ...DEFAULTS, ...snap.data() } : { ...DEFAULTS };
  } catch (e) {
    _cache = { ...DEFAULTS };
  }
  return _cache;
}

async function saveContactSettings(data) {
  await setDoc(doc(db, "storeSettings", "contact"), { ...data, updatedAt: serverTimestamp() });
  _cache = { ...DEFAULTS, ...data };
}

window.SBHStoreSettings = { loadContactSettings, saveContactSettings };
export { loadContactSettings, saveContactSettings };
