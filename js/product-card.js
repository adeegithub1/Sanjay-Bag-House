/* ============================================================
   Reusable Product Card component (vanilla JS render function)
   ============================================================ */
(function () {
  function stars(rating) {
    const full = Math.round(rating);
    return "★★★★★☆☆☆☆☆".slice(5 - full, 10 - full);
  }

  window.renderProductCard = function (p) {
    const data = window.SBH_DATA;
    const wished = window.SBHStore.isWishlisted(p.id);
    const discount = data.discountPct(p.mrp, p.price);
    const outOfStock = p.stock <= 0;
    return `
    <div class="product-card" data-product-id="${p.id}">
      <div class="product-media">
        <a href="/product.html?slug=${p.slug}" aria-label="${p.name}">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
        </a>
        ${p.bestseller ? '<span class="badge badge-accent product-badge">Bestseller</span>' : (p.newArrival ? '<span class="badge badge-neutral product-badge">New</span>' : '')}
        <button class="product-wishlist-btn ${wished ? 'active' : ''}" aria-label="Toggle wishlist" onclick="handleWishlistClick(event, '${p.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6Z"/></svg>
        </button>
        ${outOfStock ? '<div class="out-of-stock-overlay"><span class="badge badge-danger">Out of Stock</span></div>' : ''}
      </div>
      <a href="/product.html?slug=${p.slug}">
        <div class="brand">${p.category.replace('-', ' ')}</div>
        <div class="name">${p.name}</div>
      </a>
      <div class="product-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews})</div>
      <div class="price-row">
        <span class="price-text">${data.formatINR(p.price)}</span>
        <span class="mrp">${data.formatINR(p.mrp)}</span>
        <span class="discount">${discount}% OFF</span>
      </div>
      <button class="add-cart-btn" ${outOfStock ? 'disabled' : ''} onclick="handleAddToCartClick(event, '${p.id}')">${outOfStock ? 'Notify Me' : 'Add to Cart'}</button>
    </div>`;
  };

  window.handleWishlistClick = function (e, productId) {
    e.preventDefault(); e.stopPropagation();
    const added = window.SBHStore.toggleWishlist(productId);
    showToast(added ? "Added to wishlist" : "Removed from wishlist", added ? "success" : "default");
    const btn = e.currentTarget;
    btn.classList.toggle("active", added);
    btn.querySelector("svg").setAttribute("fill", added ? "currentColor" : "none");
  };

  window.handleAddToCartClick = function (e, productId) {
    e.preventDefault(); e.stopPropagation();
    window.SBHStore.addToCart(productId, 1);
    showToast("Product added to cart", "success");
  };
})();
