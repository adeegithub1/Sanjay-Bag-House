/* ============================================================
   Reusable Product Card component (vanilla JS render function) — v2
   Marketplace-dense layout: rating pill, coral discount chip.
   ============================================================ */
(function () {
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
        ${discount > 0 ? `<span class="badge badge-accent product-badge">${discount}% OFF</span>` : (p.bestseller ? '<span class="badge badge-accent product-badge">Bestseller</span>' : (p.newArrival ? '<span class="badge badge-accent product-badge">New</span>' : ''))}
        <button class="product-wishlist-btn ${wished ? 'active' : ''}" aria-label="Toggle wishlist" onclick="handleWishlistClick(event, '${p.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6Z"/></svg>
        </button>
        ${outOfStock ? '<div class="out-of-stock-overlay"><span class="badge badge-danger">Out of Stock</span></div>' : ''}
      </div>
      <div class="product-card-body">
        <a href="/product.html?slug=${p.slug}">
          <div class="brand">${p.category.replace('-', ' ')}</div>
          <div class="name">${p.name}</div>
        </a>
        ${p.rating ? `<div class="product-rating">${p.rating} <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>` : ''}
        <div class="price-row">
          <span class="price-text">${data.formatINR(p.price)}</span>
          ${discount > 0 ? `<span class="mrp">${data.formatINR(p.mrp)}</span><span class="discount">${discount}% off</span>` : ''}
        </div>
        <button class="add-cart-btn" ${outOfStock ? 'disabled' : ''} onclick="handleAddToCartClick(event, '${p.id}')">${outOfStock ? 'Notify Me' : 'Add to Cart'}</button>
      </div>
    </div>`;
  };

  window.handleWishlistClick = function (e, productId) {
    e.preventDefault(); e.stopPropagation();
    const added = window.SBHStore.toggleWishlist(productId);
    showToast(added ? "Added to wishlist" : "Removed from wishlist", added ? "success" : "default");
    const btn = e.currentTarget;
    btn.classList.toggle("active", added);
    btn.querySelector("svg").setAttribute("fill", added ? "currentColor" : "none");
    btn.classList.remove("sbh-pop"); void btn.offsetWidth; btn.classList.add("sbh-pop");
  };

  window.handleAddToCartClick = function (e, productId) {
    e.preventDefault(); e.stopPropagation();
    window.SBHStore.addToCart(productId, 1);
    showToast("Product added to cart", "success");
    const btn = e.currentTarget;
    btn.classList.remove("sbh-added"); void btn.offsetWidth; btn.classList.add("sbh-added");
  };
})();
