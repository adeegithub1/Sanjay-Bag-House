/* ============================================================
   SANJAY BAG HOUSE — CLIENT STORE
   Cart + Wishlist state (localStorage) + Toast notifications.
   In production this logic is replaced by real API/Supabase calls,
   but the calling components stay the same.
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

    cartDetailed() {
      const data = window.SBH_DATA;
      return this.getCart().map(i => {
        const p = data.PRODUCTS.find(pp => pp.id === i.productId);
        return p ? { ...p, qty: i.qty, lineTotal: p.price * i.qty } : null;
      }).filter(Boolean);
    },
    wishlistDetailed() {
      const data = window.SBH_DATA;
      return this.getWishlist().map(id => data.PRODUCTS.find(p => p.id === id)).filter(Boolean);
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
      el.textContent = n; el.style.display = n > 0 ? "flex" : "none";
    });
    document.querySelectorAll("[data-wishlist-count]").forEach(el => {
      const n = Store.wishlistCount();
      el.textContent = n; el.style.display = n > 0 ? "flex" : "none";
    });
  };
  document.addEventListener("sbh:cart-updated", window.updateBadges);
  document.addEventListener("sbh:wishlist-updated", window.updateBadges);
  document.addEventListener("DOMContentLoaded", window.updateBadges);
})();
