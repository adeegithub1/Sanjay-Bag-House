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

const BRANDING_DEFAULTS = { logoUrl: "", faviconUrl: "" };
let _brandingCache = null;

async function loadBrandingSettings() {
  if (_brandingCache) return _brandingCache;
  try {
    const snap = await getDoc(doc(db, "storeSettings", "branding"));
    _brandingCache = snap.exists() ? { ...BRANDING_DEFAULTS, ...snap.data() } : { ...BRANDING_DEFAULTS };
  } catch (e) {
    _brandingCache = { ...BRANDING_DEFAULTS };
  }
  return _brandingCache;
}

async function saveBrandingSettings(data) {
  await setDoc(doc(db, "storeSettings", "branding"), { ...data, updatedAt: serverTimestamp() });
  _brandingCache = { ...BRANDING_DEFAULTS, ...data };
}

const SOCIAL_DEFAULTS = { instagram: "", facebook: "", youtube: "" };
let _socialCache = null;

async function loadSocialSettings() {
  if (_socialCache) return _socialCache;
  try {
    const snap = await getDoc(doc(db, "storeSettings", "social"));
    _socialCache = snap.exists() ? { ...SOCIAL_DEFAULTS, ...snap.data() } : { ...SOCIAL_DEFAULTS };
  } catch (e) {
    _socialCache = { ...SOCIAL_DEFAULTS };
  }
  return _socialCache;
}

async function saveSocialSettings(data) {
  await setDoc(doc(db, "storeSettings", "social"), { ...data, updatedAt: serverTimestamp() });
  _socialCache = { ...SOCIAL_DEFAULTS, ...data };
}

const SHIPPING_DEFAULTS = {
  standardCharge: 79, freeThreshold: 999,
  codEnabled: true, codFee: 0, codMinOrder: 0, codMaxOrder: 0,
  courierName: "", trackingUrlFormat: "",
};
let _shippingCache = null;

async function loadShippingSettings() {
  if (_shippingCache) return _shippingCache;
  try {
    const snap = await getDoc(doc(db, "storeSettings", "shipping"));
    _shippingCache = snap.exists() ? { ...SHIPPING_DEFAULTS, ...snap.data() } : { ...SHIPPING_DEFAULTS };
  } catch (e) {
    _shippingCache = { ...SHIPPING_DEFAULTS };
  }
  return _shippingCache;
}

async function saveShippingSettings(data) {
  await setDoc(doc(db, "storeSettings", "shipping"), { ...data, updatedAt: serverTimestamp() });
  _shippingCache = { ...SHIPPING_DEFAULTS, ...data };
}

window.SBHStoreSettings = { loadContactSettings, saveContactSettings, loadBrandingSettings, saveBrandingSettings, loadSocialSettings, saveSocialSettings, loadShippingSettings, saveShippingSettings };
export { loadContactSettings, saveContactSettings, loadBrandingSettings, saveBrandingSettings, loadSocialSettings, saveSocialSettings, loadShippingSettings, saveShippingSettings };
