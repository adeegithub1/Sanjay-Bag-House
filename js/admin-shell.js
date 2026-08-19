/* ============================================================
   SANJAY BAG HOUSE — ADMIN SHELL COMPONENT
   Injects sidebar + topbar into every admin page.
   ============================================================ */
(function () {
  const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', href: '/admin/index.html', icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>' },
    { key: 'products', label: 'Products', href: '/admin/products.html', icon: '<path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2M3 8l1.5 11a2 2 0 0 0 2 1.8h11a2 2 0 0 0 2-1.8L21 8M3 8h18"/>' },
    { key: 'categories', label: 'Categories', href: '/admin/categories.html', icon: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>' },
    { key: 'orders', label: 'Orders', href: '/admin/orders.html', icon: '<path d="M9 2h6l1 4H8l1-4Z"/><path d="M4 6h16l-1.5 14a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 6Z"/>' },
    { key: 'inventory', label: 'Inventory', href: '/admin/inventory.html', icon: '<path d="M20 7 12 3 4 7v10l8 4 8-4V7Z"/><path d="M4 7l8 4 8-4M12 11v10"/>' },
    { key: 'customers', label: 'Customers', href: '/admin/customers.html', icon: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><circle cx="18" cy="8" r="2.8"/><path d="M16 13.5c2.8.4 5 2.9 5 6.5"/>' },
    { key: 'coupons', label: 'Coupons', href: '/admin/coupons.html', icon: '<path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4V9Z"/><path d="M9 7v10"/>' },
    { key: 'reviews', label: 'Reviews', href: '/admin/reviews.html', icon: '<path d="m12 2 3 6.5 7 1-5 5 1.2 7-6.2-3.4-6.2 3.4L7 14.5l-5-5 7-1z"/>' },
    { key: 'homepage', label: 'Homepage', href: '/admin/homepage.html', icon: '<path d="m3 10 9-7 9 7"/><path d="M5 9v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9"/>' },
    { key: 'store-settings', label: 'Store Settings', href: '/admin/store-settings.html', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>' },
    { key: 'shipping', label: 'Shipping', href: '/admin/shipping.html', icon: '<rect x="1" y="6" width="15" height="12" rx="1.5"/><path d="M16 10h4l3 3v5h-7"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/>' },
    { key: 'settings', label: 'Settings', href: '/admin/settings.html', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82"/>' },
  ];

  function sidebarHTML(active) {
    return `
    <div class="admin-overlay" id="adminOverlay" onclick="AdminShell.closeSidebar()"></div>
    <aside class="admin-sidebar" id="adminSidebar">
      <div class="admin-sidebar-brand">
        <div class="logo-mini">Sanjay Bag House<small>Admin Panel</small></div>
        <button class="admin-sidebar-close" onclick="AdminShell.closeSidebar()" aria-label="Close sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <nav class="admin-nav">
        ${NAV_ITEMS.map(i => `<a class="${active===i.key?'active':''}" href="${i.href}"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${i.icon}</svg> ${i.label}</a>`).join('')}
      </nav>
      <div class="admin-sidebar-footer">
        <a class="admin-profile-mini" href="/admin/settings.html" style="display:flex;">
          <div class="admin-avatar">SB</div>
          <div><div class="name">Sanjay Batra</div><div class="role">Store Owner</div></div>
        </a>
      </div>
    </aside>`;
  }

  function topbarHTML(title) {
    return `
    <div class="admin-topbar">
      <div class="flex items-center gap-8">
        <button class="icon-btn admin-hamburger" onclick="AdminShell.openSidebar()" aria-label="Open menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <span class="admin-topbar-title">${title}</span>
      </div>
      <div class="admin-topbar-right">
        <button class="icon-btn" aria-label="Notifications" style="position:relative;">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
          <span class="icon-badge" style="display:flex;background:var(--color-danger);">3</span>
        </button>
        <a href="/index.html" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">View Store</a>
      </div>
    </div>`;
  }

  window.AdminShell = {
    init(active, title) {
      document.body.classList.add('admin-body');
      const s = document.getElementById('admin-sidebar');
      if (s) s.outerHTML = sidebarHTML(active);
      const t = document.getElementById('admin-topbar');
      if (t) t.outerHTML = topbarHTML(title);
    },
    openSidebar() { document.getElementById('adminSidebar').classList.add('open'); document.getElementById('adminOverlay').classList.add('open'); },
    closeSidebar() { document.getElementById('adminSidebar').classList.remove('open'); document.getElementById('adminOverlay').classList.remove('open'); },
  };

  window.showConfirmDialog = function (message, onConfirm) {
    let modal = document.getElementById('globalConfirmModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'globalConfirmModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-box">
          <div class="modal-head"><h3>Please Confirm</h3></div>
          <div class="modal-body"><p id="confirmMsg" class="body-text"></p></div>
          <div class="modal-footer">
            <button class="btn btn-ghost" id="confirmCancelBtn">Cancel</button>
            <button class="btn btn-danger" id="confirmOkBtn">Confirm</button>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }
    document.getElementById('confirmMsg').textContent = message;
    modal.classList.add('open');
    document.getElementById('confirmCancelBtn').onclick = () => modal.classList.remove('open');
    document.getElementById('confirmOkBtn').onclick = () => { modal.classList.remove('open'); onConfirm(); };
  };
})();
