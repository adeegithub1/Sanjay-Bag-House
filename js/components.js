/* ============================================================
   SANJAY BAG HOUSE — SHARED UI COMPONENTS
   Injects header / footer / drawers into placeholder elements.
   Usage: put <div id="sbh-header" data-active="shop"></div> and
   <div id="sbh-footer"></div> anywhere in the page, then include
   this script + call SBHComponents.init() (auto-runs on load).
   ============================================================ */

(function () {
  const NAV_LINKS = [
    { label: "Home", href: "/index.html", key: "home" },
    { label: "Shop", href: "/shop.html", key: "shop" },
  ];
  const CATEGORY_LINKS = [
    { label: "Backpacks", slug: "backpacks" },
    { label: "School Bags", slug: "school-bags" },
    { label: "Laptop Bags", slug: "laptop-bags" },
    { label: "Travel Bags", slug: "travel-bags" },
    { label: "Trolley Bags", slug: "trolley-bags" },
    { label: "Ladies Bags", slug: "ladies-bags" },
  ];

  function announceBarHTML() {
    return `
    <div class="announce-bar" id="announceBar">
      <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>
      <button class="announce-close" aria-label="Close announcement" onclick="document.getElementById('announceBar').style.display='none'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>`;
  }

  function headerHTML(active) {
    const desktopCats = CATEGORY_LINKS.map(c => `<a href="/category.html?slug=${c.slug}">${c.label}</a>`).join("");
    return `
    <header class="site-header">
      <div class="container header-inner">
        <button class="icon-btn hamburger-btn" aria-label="Open menu" onclick="SBHComponents.openDrawer()">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <a href="/index.html" class="logo">Sanjay Bag House<small>Carry What Matters</small></a>
        <nav class="nav-desktop">
          <a href="/index.html" class="${active === 'home' ? 'active' : ''}">Home</a>
          <a href="/shop.html" class="${active === 'shop' ? 'active' : ''}">Shop</a>
          ${desktopCats}
        </nav>
        <div class="header-actions">
          <button class="icon-btn" aria-label="Search" onclick="SBHComponents.openSearch()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <a class="icon-btn" href="/wishlist.html" aria-label="Wishlist" style="position:relative;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6Z"/></svg>
            <span class="icon-badge" data-wishlist-count style="display:none;">0</span>
          </a>
          <a class="icon-btn" href="/account.html" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </a>
          <a class="icon-btn" href="/cart.html" aria-label="Cart" style="position:relative;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            <span class="icon-badge" data-cart-count style="display:none;">0</span>
          </a>
        </div>
      </div>
    </header>`;
  }

  function drawerHTML() {
    const catLinks = CATEGORY_LINKS.map(c => `<a class="drawer-link" href="/category.html?slug=${c.slug}">${c.label}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></a>`).join("");
    return `
    <div class="drawer-overlay" id="drawerOverlay" onclick="SBHComponents.closeDrawer()"></div>
    <div class="drawer" id="mobileDrawer" role="dialog" aria-label="Site menu">
      <div class="drawer-header">
        <span class="logo" style="font-size:17px;">Sanjay Bag House</span>
        <button class="icon-btn" aria-label="Close menu" onclick="SBHComponents.closeDrawer()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="drawer-body">
        <a class="drawer-link" href="/index.html">Home</a>
        <a class="drawer-link" href="/shop.html">Shop All</a>
        ${catLinks}
        <a class="drawer-link" href="/about.html">About Us</a>
        <a class="drawer-link" href="/contact.html">Contact</a>
        <a class="drawer-link" href="/account.html">My Account</a>
        <a class="drawer-link" href="/wishlist.html">Wishlist</a>
      </div>
    </div>`;
  }

  function searchOverlayHTML() {
    return `
    <div class="search-overlay" id="searchOverlay">
      <div class="search-panel">
        <div class="search-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="searchOverlayInput" placeholder="Search for backpacks, trolley bags, laptop bags..." />
          <button class="icon-btn" aria-label="Close search" onclick="SBHComponents.closeSearch()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="caption-text" style="margin-top:14px;">Popular: Laptop Backpack, Trolley Bag, School Bag, Sling Bag</p>
      </div>
    </div>`;
  }

  function footerHTML() {
    return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="/index.html" class="logo" style="color:#fff;">Sanjay Bag House</a>
          <p>Premium bags and luggage, crafted for everyday life, work and travel. Trusted by thousands of customers across India.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 8.5s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.3 5 12 5 12 5s-4.3 0-7.1.2c-.4 0-1.3.1-2.1 1C2.2 6.9 2 8.5 2 8.5S1.8 10.4 1.8 12.3v1.4C1.8 15.6 2 17.5 2 17.5s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.3.2 7.3.2s4.3 0 7.1-.3c.4 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8Z"/><path d="m10 15 5-3-5-3z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Shop</h5>
          <ul>
            <li><a href="/category.html?slug=backpacks">Backpacks</a></li>
            <li><a href="/category.html?slug=school-bags">School Bags</a></li>
            <li><a href="/category.html?slug=laptop-bags">Laptop Bags</a></li>
            <li><a href="/category.html?slug=travel-bags">Travel Bags</a></li>
            <li><a href="/category.html?slug=trolley-bags">Trolley Bags</a></li>
            <li><a href="/category.html?slug=ladies-bags">Ladies Bags</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Customer Service</h5>
          <ul>
            <li><a href="/contact.html">Contact Us</a></li>
            <li><a href="/faq.html">FAQs</a></li>
            <li><a href="/shipping-policy.html">Shipping Policy</a></li>
            <li><a href="/return-policy.html">Return &amp; Refund Policy</a></li>
            <li><a href="/account/orders.html">Track Order</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>About</h5>
          <ul>
            <li><a href="/about.html">Our Story</a></li>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
            <li><a href="/terms.html">Terms &amp; Conditions</a></li>
          </ul>
          <ul class="footer-contact" style="margin-top:16px;">
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@sanjaybaghouse.in</li>
            <li>📍 14, MG Road, Pune, Maharashtra 411001</li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 Sanjay Bag House. All rights reserved.</span>
        <span>Made with care in India 🇮🇳</span>
      </div>
    </footer>`;
  }

  const SBHComponents = {
    init(active) {
      const h = document.getElementById("sbh-header");
      if (h) h.outerHTML = announceBarHTML() + headerHTML(active) + drawerHTML() + searchOverlayHTML();
      const f = document.getElementById("sbh-footer");
      if (f) f.outerHTML = footerHTML();
      window.updateBadges && window.updateBadges();

      document.getElementById("searchOverlayInput") && document.getElementById("searchOverlayInput").addEventListener("keydown", function (e) {
        if (e.key === "Enter" && this.value.trim()) window.location.href = "/search.html?q=" + encodeURIComponent(this.value.trim());
      });
    },
    openDrawer() { document.getElementById("mobileDrawer").classList.add("open"); document.getElementById("drawerOverlay").classList.add("open"); document.body.style.overflow = "hidden"; },
    closeDrawer() { document.getElementById("mobileDrawer").classList.remove("open"); document.getElementById("drawerOverlay").classList.remove("open"); document.body.style.overflow = ""; },
    openSearch() { document.getElementById("searchOverlay").classList.add("open"); setTimeout(() => document.getElementById("searchOverlayInput").focus(), 50); },
    closeSearch() { document.getElementById("searchOverlay").classList.remove("open"); },
  };

  window.SBHComponents = SBHComponents;
})();
