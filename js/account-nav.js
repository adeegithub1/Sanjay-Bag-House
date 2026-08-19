(function () {
  window.renderAccountNav = function (active) {
    const items = [
      { key: 'profile', label: 'Profile', href: '/account.html', icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>' },
      { key: 'orders', label: 'Orders', href: '/account/orders.html', icon: '<path d="M3 7h18M3 7l1.5 12a2 2 0 0 0 2 1.8h11a2 2 0 0 0 2-1.8L21 7M8 7V5a4 4 0 0 1 8 0v2"/>' },
      { key: 'wishlist', label: 'Wishlist', href: '/wishlist.html', icon: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6Z"/>' },
      { key: 'addresses', label: 'Addresses', href: '/account.html#addresses', icon: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>' },
    ];
    return `
    <nav class="account-nav card" style="padding:10px;">
      ${items.map(i => `<a class="${active===i.key?'active':''}" href="${i.href}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${i.icon}</svg> ${i.label}</a>`).join('')}
      <a href="/login.html" onclick="showToast('Logged out')" style="color:var(--color-danger);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg> Logout</a>
    </nav>`;
  };
})();
