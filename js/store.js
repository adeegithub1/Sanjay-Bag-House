/* ============================================================
   SANJAY BAG HOUSE — CLIENT STORE
   Cart + Wishlist state (localStorage) + Toast notifications.
   cartDetailed()/wishlistDetailed() are now ASYNC — they hydrate
   against real Firestore product data via window.SBH_FIRESTORE.
   ============================================================ */

(function () {
  const CART_KEY = "sbh_cart";
  const WISHLIST_KEY = "sbh_wishlist";

  function read(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; } }
  function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  const Store = {
    getCart() { return read(CART_KEY); },
    getWishlist() { return read(WISHLIST_KEY); },

    addToCart(productId, qty = 1) {
      const cart = read(CART_KEY);
      const existing = cart.find(i => i.productId === productId);
      if (existing) { existing.qty += qty; } else { cart.push({ productId, qty }); }
      write(CART_KEY, cart);
      document.dispatchEvent(new CustomEvent("sbh:cart-updated"));
    },
    updateQty(productId, qty) {
      let cart = read(CART_KEY);
      if (qty <= 0) { cart = cart.filter(i => i.productId !== productId); }
      else { const item = cart.find(i => i.productId === productId); if (item) item.qty = qty; }
      write(CART_KEY, cart);
      document.dispatchEvent(new CustomEvent("sbh:cart-updated"));
    },
    removeFromCart(productId) {
      const cart = read(CART_KEY).filter(i => i.productId !== productId);
      write(CART_KEY, cart);
      document.dispatchEvent(new CustomEvent("sbh:cart-updated"));
    },
    clearCart() { write(CART_KEY, []); document.dispatchEvent(new CustomEvent("sbh:cart-updated")); },
    cartCount() { return read(CART_KEY).reduce((s, i) => s + i.qty, 0); },

    toggleWishlist(productId) {
      let list = read(WISHLIST_KEY);
      const idx = list.indexOf(productId);
      let added;
      if (idx >= 0) { list.splice(idx, 1); added = false; } else { list.push(productId); added = true; }
      write(WISHLIST_KEY, list);
      document.dispatchEvent(new CustomEvent("sbh:wishlist-updated"));
      return added;
    },
    isWishlisted(productId) { return read(WISHLIST_KEY).includes(productId); },
    wishlistCount() { return read(WISHLIST_KEY).length; },

    /** ASYNC now — await this. Hydrates cart product IDs against real Firestore data. */
    async cartDetailed() {
      const data = await window.SBH_FIRESTORE.load();
      const cart = this.getCart();
      const validEntries = [];
      const detailed = [];
      cart.forEach(i => {
        const p = data.PRODUCTS.find(pp => pp.id === i.productId);
        if (p) { validEntries.push(i); detailed.push({ ...p, qty: i.qty, lineTotal: p.price * i.qty }); }
      });
      // Self-heal: if any entries pointed at products that no longer exist
      // (deleted/unpublished), drop them from storage and refresh the badges —
      // otherwise the cart page can say "empty" while the header count lags.
      if (validEntries.length !== cart.length) {
        write(CART_KEY, validEntries);
        document.dispatchEvent(new CustomEvent("sbh:cart-updated"));
      }
      return detailed;
    },
    /** ASYNC now — await this. */
    async wishlistDetailed() {
      const data = await window.SBH_FIRESTORE.load();
      const list = this.getWishlist();
      const validIds = [];
      const detailed = [];
      list.forEach(id => {
        const p = data.PRODUCTS.find(pp => pp.id === id);
        if (p) { validIds.push(id); detailed.push(p); }
      });
      if (validIds.length !== list.length) {
        write(WISHLIST_KEY, validIds);
        document.dispatchEvent(new CustomEvent("sbh:wishlist-updated"));
      }
      return detailed;
    },
  };

  window.SBHStore = Store;

  /* ---------------- Toast ---------------- */
  function ensureToastContainer() {
    let c = document.querySelector(".toast-container");
    if (!c) { c = document.createElement("div"); c.className = "toast-container"; document.body.appendChild(c); }
    return c;
  }
  window.showToast = function (message, type = "default") {
    const c = ensureToastContainer();
    const t = document.createElement("div");
    t.className = "toast" + (type === "success" ? " success" : type === "error" ? " error" : "");
    t.innerHTML = `<span>${message}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(10px)"; t.style.transition = "all .25s ease"; setTimeout(() => t.remove(), 250); }, 2400);
  };

  window.updateBadges = function () {
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      const n = Store.cartCount();
      const changed = el.textContent !== String(n);
      el.textContent = n; el.style.display = n > 0 ? "flex" : "none";
      if (changed && n > 0) { el.classList.remove("sbh-bump"); void el.offsetWidth; el.classList.add("sbh-bump"); }
    });
    document.querySelectorAll("[data-wishlist-count]").forEach(el => {
      const n = Store.wishlistCount();
      const changed = el.textContent !== String(n);
      el.textContent = n; el.style.display = n > 0 ? "flex" : "none";
      if (changed && n > 0) { el.classList.remove("sbh-bump"); void el.offsetWidth; el.classList.add("sbh-bump"); }
    });
  };
  document.addEventListener("sbh:cart-updated", window.updateBadges);
  document.addEventListener("sbh:wishlist-updated", window.updateBadges);
  document.addEventListener("DOMContentLoaded", window.updateBadges);
})();
