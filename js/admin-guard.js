/* ============================================================
   SANJAY BAG HOUSE — ADMIN AUTH GUARD
   Include this as the FIRST script (type="module") on every page
   inside /admin/*.html. It:
     1. Waits for Firebase Auth to resolve
     2. If not signed in at all -> redirect to /login.html
     3. If signed in but NOT an admin -> sign out + redirect + show a message
     4. Only if the admin custom claim is present does the page render

   The admin claim is set server-side only (see functions/setAdminClaim.js)
   — it can never be forged from the browser, unlike a Firestore field.

   To avoid a flash of admin content before the check finishes, admin
   pages should keep <body> hidden (e.g. `body{visibility:hidden}` in
   admin.css) and this script reveals it once the check passes.
   ============================================================ */

import SBHAuth from "/js/auth.js";

(async function guard() {
  const user = await SBHAuth.getCurrentUser();

  if (!user) {
    window.location.href = "/login.html?next=" + encodeURIComponent(location.pathname);
    return;
  }

  const isAdmin = await SBHAuth.isAdmin();
  if (!isAdmin) {
    await SBHAuth.logout();
    alert("This account does not have admin access.");
    window.location.href = "/login.html";
    return;
  }

  // Passed — reveal the page
  document.documentElement.classList.add("admin-authed");
  document.dispatchEvent(new CustomEvent("sbh:admin-ready", { detail: { user } }));
})();
