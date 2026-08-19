# Sanjay Bag House — Frontend Prototype

A complete, high-fidelity **frontend-only** prototype for Sanjay Bag House — a premium
Indian bags & luggage e-commerce store. Built in plain **HTML, CSS and vanilla JavaScript**
(no framework, no build step).

Includes both the full **customer-facing storefront** and a complete **admin dashboard**,
sharing one design system.

---

## How to Run Locally

All pages use root-relative paths (`/css/...`, `/js/...`), so you must serve the folder
with a local static server — opening the HTML files directly via `file://` will not load
the CSS/JS correctly.

**Easiest option (Node installed):**
```
cd sanjay-bag-house
npx serve .
```
Then open the printed local URL (e.g. `http://localhost:3000`).

**Alternative (Python installed):**
```
cd sanjay-bag-house
python3 -m http.server 3000
```
Then open `http://localhost:3000`.

**VS Code:** install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

---

## File Structure

```
sanjay-bag-house/
├── index.html                  Homepage
├── shop.html                   Catalogue with filters/sort/pagination
├── category.html               Category listing (?slug=backpacks)
├── search.html                 Search results (?q=...)
├── product.html                Product detail (?slug=...)
├── cart.html
├── checkout.html
├── order-success.html
├── order-failed.html
├── login.html / register.html / forgot-password.html
├── account.html                Profile + saved addresses
├── account/
│   ├── orders.html
│   └── order-detail.html       (?id=SBH10246)
├── wishlist.html
├── about.html / contact.html / faq.html
├── shipping-policy.html / return-policy.html / privacy-policy.html / terms.html
├── 404.html
│
├── admin/
│   ├── index.html              Dashboard home (stats, chart, tables)
│   ├── products.html           Product list + search/filter/sort
│   ├── product-new.html        Add product form
│   ├── product-edit.html       Edit product form (?id=p1)
│   ├── categories.html
│   ├── orders.html             Order list with status tabs
│   ├── order-detail.html       Order detail + status updater (?id=SBH10246)
│   ├── inventory.html          Stock table + adjustment modal
│   ├── customers.html          Customer table + detail drawer
│   ├── coupons.html            Coupon table + create modal
│   ├── reviews.html            Review moderation
│   ├── homepage.html           Homepage CMS (hero, banners, sections)
│   ├── store-settings.html     Branding / Contact / Social / Business tabs
│   ├── shipping.html           Shipping & COD settings
│   └── settings.html           Profile / General / Notifications / Security / Appearance
│
├── css/
│   ├── styles.css              Design tokens + all customer-facing styles
│   └── admin.css               Admin-only styles (sidebar, tables, panels)
│
└── js/
    ├── data.js                 Central mock data (products, categories, orders, etc.)
    ├── store.js                Cart/Wishlist state (localStorage) + toast notifications
    ├── components.js           Header/Footer/Drawer/Search injection (customer site)
    ├── admin-shell.js          Sidebar/Topbar injection + confirm dialog (admin)
    ├── product-card.js         Shared product card renderer
    └── account-nav.js          Shared account sidebar nav
```

---

## Reusable Components

Rather than a component framework, components are implemented as JS functions that
render HTML strings into placeholder elements (`<div id="sbh-header"></div>`, etc.):

- **Header / MobileHeader / Footer / Drawer / Search overlay** — `components.js`
- **ProductCard / ProductGrid** — `product-card.js` (`renderProductCard(product)`)
- **AdminSidebar / AdminTopbar / ConfirmDialog** — `admin-shell.js`
- **AccountNav** — `account-nav.js`
- Cart items, order summaries, data tables, stat cards, toasts, skeleton loaders,
  empty states, badges, modals — all styled as reusable CSS classes in `styles.css` /
  `admin.css` (`.product-card`, `.data-table`, `.stat-card`, `.toast`, `.empty-state`, etc.)

---

## Mock Data

Defined entirely in `js/data.js`, exposed as `window.SBH_DATA`:

- **25 products** across 9 categories (backpacks, school bags, laptop bags, office bags,
  travel bags, trolley bags, ladies bags, sling bags, kids bags)
- **9 categories** with images, descriptions and product counts
- **18 orders** with realistic Indian customer names, addresses and order items
- **12 customers** with order history and spend totals
- **10 reviews** in various moderation states (Approved / Pending / Rejected)
- **5 coupons** (percentage and flat discount types)

Cart and wishlist state persist in `localStorage` via `js/store.js` and are shared
across every page.

---

## What Is Currently Mock

Everything is simulated on the frontend — there is **no backend**:

- Product/category/order/customer/review/coupon data is hardcoded in `data.js`
- Cart & wishlist persist only in the browser's `localStorage`
- "Add to cart", "Place order", "Update stock", "Approve review", etc. only mutate
  in-memory JS state (or localStorage) and show a toast — nothing is sent anywhere
- Image upload, logo upload, and file pickers are visually complete but non-functional
  (clicking shows a toast explaining upload is simulated)
- Login/Register/Checkout forms validate and redirect but do not authenticate or charge

## What Will Later Connect to Supabase / Firebase

Every place that currently reads from `window.SBH_DATA` or writes to `localStorage`
is designed to be swapped for real API/Supabase calls without changing the surrounding
HTML/CSS:

- Products, categories, stock, prices → Supabase tables + Storage (for images)
- Orders, order status, timeline → Supabase tables + a status-update endpoint
- Customers → Supabase Auth + a `customers` table
- Coupons, reviews → Supabase tables with the same CRUD shape already used in the
  admin UI (approve/reject/delete, create/edit/delete)
- Homepage CMS sections, Store Settings (logo, favicon, contact info, socials,
  brand colors), Shipping Settings → a single `store_settings` table/document,
  fetched on every page load instead of hardcoded in the footer/header components
- Real image upload → Supabase Storage, replacing the current "simulated" uploader UI
- Payments → Razorpay integration at the "Place Order" step in `checkout.html`

---

## Recommended Next Step

1. Stand up a Supabase project (Postgres + Storage + Auth).
2. Replace `js/data.js` with real fetch/query calls, keeping the same function
   signatures (`getProduct`, `getProductsByCategory`, etc.) so no page markup changes.
3. Replace `js/store.js` cart/wishlist localStorage logic with Supabase-backed
   per-user cart (fall back to localStorage for guests).
4. Wire the admin forms (product, category, coupon, settings) to real insert/update
   calls instead of local array mutation.
5. Integrate Razorpay at checkout and connect order status updates to real order rows.
6. Migrate the static HTML pages into Next.js App Router (the routing, page structure
   and component boundaries already map 1:1 to the routes specified for this project),
   once ready to add authentication and server-side data fetching.
