/* ============================================================
   SANJAY BAG HOUSE — MOCK DATA
   This file simulates what will later come from Supabase/Firebase.
   Every other script reads from window.SBH_DATA only.
   ============================================================ */

(function () {
  const IMG = (seed, w = 800, h = 1000) => `https://images.unsplash.com/${seed}?w=${w}&h=${h}&fit=crop&q=80`;

  const CATEGORIES = [
    { id: "backpacks", name: "Backpacks", count: 5, image: IMG("photo-1553062407-98eeb64c6a62", 700, 700), desc: "Everyday & travel-ready backpacks" },
    { id: "school-bags", name: "School Bags", count: 3, image: IMG("photo-1577733966973-d680bffd2e80", 700, 700), desc: "Durable bags built for school days" },
    { id: "laptop-bags", name: "Laptop Bags", count: 3, image: IMG("photo-1547949003-9792a18a2645", 700, 700), desc: "Padded protection for work essentials" },
    { id: "office-bags", name: "Office Bags", count: 2, image: IMG("photo-1622560480605-d83c853bc5c3", 700, 700), desc: "Structured bags for the workday" },
    { id: "travel-bags", name: "Travel Bags", count: 3, image: IMG("photo-1553440569-bcc63803a83d", 700, 700), desc: "Duffels and holdalls for every trip" },
    { id: "trolley-bags", name: "Trolley Bags", count: 2, image: IMG("photo-1565026057447-bc90a3dceb87", 700, 700), desc: "Rolling luggage that goes the distance" },
    { id: "ladies-bags", name: "Ladies Bags", count: 3, image: IMG("photo-1584917865442-de89df76afd3", 700, 700), desc: "Everyday elegance for her" },
    { id: "sling-bags", name: "Sling Bags", count: 2, image: IMG("photo-1591561954557-26941169b49e", 700, 700), desc: "Light, compact, always ready" },
    { id: "kids-bags", name: "Kids Bags", count: 2, image: IMG("photo-1596461404969-9ae70f2830c1", 700, 700), desc: "Fun, sturdy bags for little ones" },
  ];

  const PRODUCTS = [
    { id: "p1", slug: "urban-laptop-backpack", name: "Urban Laptop Backpack", brand: "Sanjay Bag House", category: "backpacks", sku: "SBH-BP-101", mrp: 1999, price: 1499, stock: 42, rating: 4.7, reviews: 128, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1553062407-98eeb64c6a62"), IMG("photo-1622560480605-d83c853bc5c3"), IMG("photo-1548036328-c9fa89d128fa")], color: "Black", material: "Water-resistant Polyester", weight: "0.9 kg", dimensions: "45 x 32 x 18 cm", warranty: "1 Year Manufacturer Warranty", desc: "A refined everyday backpack built for the modern commute, with a dedicated 15.6\" padded laptop sleeve and an anti-theft back pocket." },
    { id: "p2", slug: "classic-college-backpack", name: "Classic College Backpack", brand: "Sanjay Bag House", category: "backpacks", sku: "SBH-BP-102", mrp: 1799, price: 1299, stock: 30, rating: 4.5, reviews: 96, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1577733966973-d680bffd2e80"), IMG("photo-1553062407-98eeb64c6a62")], color: "Navy Blue", material: "Canvas & PU Leather Trim", weight: "0.7 kg", dimensions: "42 x 30 x 15 cm", warranty: "6 Months Warranty", desc: "A timeless silhouette in durable canvas, roomy enough for books, a jacket and a full day away from home." },
    { id: "p3", slug: "trekker-outdoor-backpack", name: "Trekker Outdoor Backpack 45L", brand: "Sanjay Bag House", category: "backpacks", sku: "SBH-BP-103", mrp: 3499, price: 2699, stock: 18, rating: 4.8, reviews: 74, featured: false, bestseller: true, newArrival: true, images: [IMG("photo-1553062407-98eeb64c6a62", 800, 1000), IMG("photo-1553440569-bcc63803a83d")], color: "Olive Green", material: "Ripstop Nylon", weight: "1.4 kg", dimensions: "58 x 34 x 24 cm", warranty: "1 Year Warranty", desc: "Rugged 45L capacity with a rain cover, hydration port and reinforced base — built for the trail, not just the terminal." },
    { id: "p4", slug: "compact-daypack", name: "Compact Everyday Daypack", brand: "Sanjay Bag House", category: "backpacks", sku: "SBH-BP-104", mrp: 1299, price: 999, stock: 55, rating: 4.4, reviews: 61, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1622560480605-d83c853bc5c3"), IMG("photo-1553062407-98eeb64c6a62")], color: "Grey", material: "Polyester", weight: "0.5 kg", dimensions: "38 x 27 x 12 cm", warranty: "6 Months Warranty", desc: "A slim, lightweight daypack for short trips, quick errands and light everyday carry." },
    { id: "p5", slug: "heritage-leather-backpack", name: "Heritage Leather Backpack", brand: "Sanjay Bag House", category: "backpacks", sku: "SBH-BP-105", mrp: 4499, price: 3599, stock: 12, rating: 4.9, reviews: 40, featured: true, bestseller: false, newArrival: true, images: [IMG("photo-1548036328-c9fa89d128fa"), IMG("photo-1622560480605-d83c853bc5c3")], color: "Tan Brown", material: "Genuine Leather", weight: "1.1 kg", dimensions: "40 x 30 x 16 cm", warranty: "1 Year Warranty", desc: "Full-grain leather that ages beautifully, paired with brass hardware for an heirloom-quality carry." },

    { id: "p6", slug: "junior-school-backpack", name: "Junior School Backpack", brand: "Sanjay Bag House", category: "school-bags", sku: "SBH-SC-201", mrp: 1199, price: 899, stock: 60, rating: 4.6, reviews: 152, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1596461404969-9ae70f2830c1"), IMG("photo-1577733966973-d680bffd2e80")], color: "Royal Blue", material: "Polyester", weight: "0.6 kg", dimensions: "40 x 28 x 16 cm", warranty: "6 Months Warranty", desc: "Padded shoulder straps and a spacious main compartment sized right for growing students." },
    { id: "p7", slug: "senior-school-backpack", name: "Senior School Backpack", brand: "Sanjay Bag House", category: "school-bags", sku: "SBH-SC-202", mrp: 1499, price: 1149, stock: 38, rating: 4.5, reviews: 88, featured: false, bestseller: true, newArrival: false, images: [IMG("photo-1577733966973-d680bffd2e80"), IMG("photo-1596461404969-9ae70f2830c1")], color: "Black/Red", material: "Polyester", weight: "0.8 kg", dimensions: "44 x 30 x 18 cm", warranty: "6 Months Warranty", desc: "Multiple compartments for books, a laptop sleeve and a water bottle pocket for the school day." },
    { id: "p8", slug: "printed-kids-school-bag", name: "Printed Kids School Bag", brand: "Sanjay Bag House", category: "school-bags", sku: "SBH-SC-203", mrp: 999, price: 749, stock: 44, rating: 4.3, reviews: 66, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1596461404969-9ae70f2830c1", 800, 1000)], color: "Multicolor", material: "Polyester", weight: "0.5 kg", dimensions: "35 x 26 x 14 cm", warranty: "3 Months Warranty", desc: "Fun prints, a lightweight build and ergonomic straps designed for younger students." },

    { id: "p9", slug: "executive-laptop-bag", name: "Executive Laptop Messenger Bag", brand: "Sanjay Bag House", category: "laptop-bags", sku: "SBH-LT-301", mrp: 2499, price: 1899, stock: 28, rating: 4.7, reviews: 102, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1547949003-9792a18a2645"), IMG("photo-1622560480605-d83c853bc5c3")], color: "Black", material: "Vegan Leather", weight: "1.0 kg", dimensions: "39 x 29 x 9 cm", warranty: "1 Year Warranty", desc: "A structured messenger silhouette with a padded 15.6\" laptop compartment and organiser pockets." },
    { id: "p10", slug: "slim-laptop-sleeve-bag", name: "Slim Laptop Sleeve Bag", brand: "Sanjay Bag House", category: "laptop-bags", sku: "SBH-LT-302", mrp: 1399, price: 999, stock: 50, rating: 4.4, reviews: 54, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1622560480605-d83c853bc5c3"), IMG("photo-1547949003-9792a18a2645")], color: "Grey Melange", material: "Neoprene & Canvas", weight: "0.4 kg", dimensions: "37 x 27 x 4 cm", warranty: "3 Months Warranty", desc: "A minimal, well-padded sleeve that slips easily into a larger bag or carries on its own." },
    { id: "p11", slug: "convertible-laptop-backpack", name: "Convertible Laptop Backpack", brand: "Sanjay Bag House", category: "laptop-bags", sku: "SBH-LT-303", mrp: 2899, price: 2199, stock: 20, rating: 4.6, reviews: 47, featured: false, bestseller: true, newArrival: false, images: [IMG("photo-1553062407-98eeb64c6a62"), IMG("photo-1547949003-9792a18a2645")], color: "Charcoal", material: "Ballistic Nylon", weight: "1.0 kg", dimensions: "44 x 31 x 17 cm", warranty: "1 Year Warranty", desc: "Switches from backpack to briefcase carry with concealed straps — built for the hybrid work week." },

    { id: "p12", slug: "structured-office-tote", name: "Structured Office Tote", brand: "Sanjay Bag House", category: "office-bags", sku: "SBH-OF-401", mrp: 2299, price: 1799, stock: 24, rating: 4.6, reviews: 58, featured: true, bestseller: false, newArrival: false, images: [IMG("photo-1584917865442-de89df76afd3"), IMG("photo-1591561954557-26941169b49e")], color: "Tan", material: "Faux Leather", weight: "0.9 kg", dimensions: "38 x 28 x 13 cm", warranty: "6 Months Warranty", desc: "A polished tote with a dedicated laptop pocket, built for the office and beyond." },
    { id: "p13", slug: "leather-briefcase", name: "Classic Leather Briefcase", brand: "Sanjay Bag House", category: "office-bags", sku: "SBH-OF-402", mrp: 3999, price: 3199, stock: 14, rating: 4.8, reviews: 33, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1548036328-c9fa89d128fa"), IMG("photo-1622560480605-d83c853bc5c3")], color: "Dark Brown", material: "Genuine Leather", weight: "1.3 kg", dimensions: "41 x 30 x 10 cm", warranty: "1 Year Warranty", desc: "A statement briefcase in full-grain leather, with a document compartment and brass-finish lock." },

    { id: "p14", slug: "weekender-duffel-bag", name: "Weekender Duffel Bag", brand: "Sanjay Bag House", category: "travel-bags", sku: "SBH-TR-501", mrp: 2199, price: 1699, stock: 33, rating: 4.6, reviews: 71, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1553440569-bcc63803a83d"), IMG("photo-1553062407-98eeb64c6a62")], color: "Olive", material: "Canvas & Leather Trim", weight: "0.8 kg", dimensions: "50 x 26 x 24 cm", warranty: "6 Months Warranty", desc: "The perfect grab-and-go bag for weekend trips, with a detachable strap and shoe compartment." },
    { id: "p15", slug: "large-travel-duffel-70l", name: "Large Travel Duffel 70L", brand: "Sanjay Bag House", category: "travel-bags", sku: "SBH-TR-502", mrp: 3299, price: 2599, stock: 19, rating: 4.5, reviews: 45, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1553440569-bcc63803a83d", 800, 1000)], color: "Black", material: "Polyester Ripstop", weight: "1.2 kg", dimensions: "68 x 32 x 30 cm", warranty: "1 Year Warranty", desc: "70L of packing space with reinforced handles and wheels — built for long hauls." },
    { id: "p16", slug: "foldable-travel-bag", name: "Foldable Travel Bag", brand: "Sanjay Bag House", category: "travel-bags", sku: "SBH-TR-503", mrp: 1199, price: 899, stock: 41, rating: 4.3, reviews: 38, featured: false, bestseller: false, newArrival: false, images: [IMG("photo-1553440569-bcc63803a83d", 800, 1000)], color: "Navy", material: "Ripstop Nylon", weight: "0.3 kg", dimensions: "55 x 30 x 25 cm (unfolded)", warranty: "3 Months Warranty", desc: "Folds flat into its own pocket — the ideal backup bag for extra luggage on the way home." },

    { id: "p17", slug: "hardside-trolley-24inch", name: "Hardside Trolley Bag 24\"", brand: "Sanjay Bag House", category: "trolley-bags", sku: "SBH-TB-601", mrp: 5499, price: 4199, stock: 16, rating: 4.7, reviews: 62, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1565026057447-bc90a3dceb87"), IMG("photo-1553440569-bcc63803a83d")], color: "Metallic Silver", material: "Polycarbonate", weight: "3.6 kg", dimensions: "66 x 46 x 27 cm", warranty: "5 Year Warranty", desc: "A durable polycarbonate shell with 360° spinner wheels and a TSA-approved lock." },
    { id: "p18", slug: "cabin-trolley-20inch", name: "Cabin Trolley Bag 20\"", brand: "Sanjay Bag House", category: "trolley-bags", sku: "SBH-TB-602", mrp: 3999, price: 3199, stock: 22, rating: 4.6, reviews: 54, featured: false, bestseller: true, newArrival: true, images: [IMG("photo-1565026057447-bc90a3dceb87", 800, 1000)], color: "Matte Black", material: "ABS + PC", weight: "2.8 kg", dimensions: "55 x 38 x 22 cm", warranty: "5 Year Warranty", desc: "Cabin-friendly dimensions sized for most airline carry-on policies, with a soft-grip handle." },

    { id: "p19", slug: "quilted-ladies-handbag", name: "Quilted Ladies Handbag", brand: "Sanjay Bag House", category: "ladies-bags", sku: "SBH-LD-701", mrp: 1999, price: 1499, stock: 36, rating: 4.6, reviews: 84, featured: true, bestseller: true, newArrival: false, images: [IMG("photo-1584917865442-de89df76afd3"), IMG("photo-1591561954557-26941169b49e")], color: "Beige", material: "PU Leather", weight: "0.6 kg", dimensions: "30 x 22 x 12 cm", warranty: "3 Months Warranty", desc: "A quilted silhouette with gold-tone hardware — equally at home at work or dinner." },
    { id: "p20", slug: "everyday-tote-bag", name: "Everyday Ladies Tote Bag", brand: "Sanjay Bag House", category: "ladies-bags", sku: "SBH-LD-702", mrp: 1699, price: 1299, stock: 40, rating: 4.5, reviews: 67, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1591561954557-26941169b49e"), IMG("photo-1584917865442-de89df76afd3")], color: "Wine Red", material: "PU Leather", weight: "0.5 kg", dimensions: "34 x 26 x 14 cm", warranty: "3 Months Warranty", desc: "A roomy, structured tote that carries a laptop, a planner and everything in between." },
    { id: "p21", slug: "clutch-purse", name: "Evening Clutch Purse", brand: "Sanjay Bag House", category: "ladies-bags", sku: "SBH-LD-703", mrp: 999, price: 749, stock: 48, rating: 4.4, reviews: 29, featured: false, bestseller: false, newArrival: false, images: [IMG("photo-1584917865442-de89df76afd3", 800, 1000)], color: "Gold", material: "Satin & Metal", weight: "0.2 kg", dimensions: "22 x 12 x 4 cm", warranty: "3 Months Warranty", desc: "A compact evening clutch with a detachable chain strap for versatile carry." },

    { id: "p22", slug: "canvas-sling-bag", name: "Canvas Sling Crossbody Bag", brand: "Sanjay Bag House", category: "sling-bags", sku: "SBH-SL-801", mrp: 899, price: 699, stock: 52, rating: 4.4, reviews: 58, featured: false, bestseller: true, newArrival: false, images: [IMG("photo-1591561954557-26941169b49e"), IMG("photo-1548036328-c9fa89d128fa")], color: "Khaki", material: "Canvas", weight: "0.3 kg", dimensions: "24 x 18 x 8 cm", warranty: "3 Months Warranty", desc: "A compact, adjustable sling built for essentials-only days and light travel." },
    { id: "p23", slug: "leather-sling-bag", name: "Leather Sling Bag", brand: "Sanjay Bag House", category: "sling-bags", sku: "SBH-SL-802", mrp: 1499, price: 1149, stock: 26, rating: 4.6, reviews: 41, featured: true, bestseller: false, newArrival: true, images: [IMG("photo-1548036328-c9fa89d128fa"), IMG("photo-1591561954557-26941169b49e")], color: "Tan", material: "Genuine Leather", weight: "0.5 kg", dimensions: "26 x 20 x 9 cm", warranty: "6 Months Warranty", desc: "Full-grain leather with brushed metal hardware, sized for a phone, wallet and keys." },

    { id: "p24", slug: "cartoon-kids-backpack", name: "Cartoon Print Kids Backpack", brand: "Sanjay Bag House", category: "kids-bags", sku: "SBH-KD-901", mrp: 899, price: 649, stock: 47, rating: 4.5, reviews: 73, featured: false, bestseller: true, newArrival: false, images: [IMG("photo-1596461404969-9ae70f2830c1"), IMG("photo-1577733966973-d680bffd2e80")], color: "Multicolor", material: "Polyester", weight: "0.35 kg", dimensions: "30 x 22 x 12 cm", warranty: "3 Months Warranty", desc: "Playful prints and a lightweight build sized right for pre-schoolers and early graders." },
    { id: "p25", slug: "toddler-mini-backpack", name: "Toddler Mini Backpack", brand: "Sanjay Bag House", category: "kids-bags", sku: "SBH-KD-902", mrp: 699, price: 549, stock: 39, rating: 4.3, reviews: 22, featured: false, bestseller: false, newArrival: true, images: [IMG("photo-1596461404969-9ae70f2830c1", 800, 1000)], color: "Pastel Pink", material: "Polyester", weight: "0.25 kg", dimensions: "24 x 18 x 9 cm", warranty: "3 Months Warranty", desc: "An extra-small backpack sized for toddlers, with a chest strap for a secure fit." },
  ];

  const INDIAN_NAMES = ["Priya Sharma","Rahul Verma","Ananya Iyer","Vikram Singh","Neha Gupta","Arjun Reddy","Sneha Patel","Karan Malhotra","Divya Nair","Rohan Kapoor","Pooja Joshi","Aditya Mehta","Ishita Chatterjee","Sanjay Yadav","Meera Pillai"];
  const CITIES = [
    { city: "Mumbai", state: "Maharashtra", pin: "400001" },
    { city: "Delhi", state: "Delhi", pin: "110001" },
    { city: "Bengaluru", state: "Karnataka", pin: "560001" },
    { city: "Pune", state: "Maharashtra", pin: "411001" },
    { city: "Ahmedabad", state: "Gujarat", pin: "380001" },
    { city: "Jaipur", state: "Rajasthan", pin: "302001" },
    { city: "Lucknow", state: "Uttar Pradesh", pin: "226001" },
    { city: "Chennai", state: "Tamil Nadu", pin: "600001" },
  ];

  const ORDER_STATUSES = ["Pending","Confirmed","Processing","Packed","Shipped","Out for Delivery","Delivered","Cancelled","Returned","Refunded"];

  function seedRandom(seed) {
    let s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  const rnd = seedRandom(42);

  const ORDERS = [];
  for (let i = 1; i <= 18; i++) {
    const custIdx = Math.floor(rnd() * INDIAN_NAMES.length);
    const cityIdx = Math.floor(rnd() * CITIES.length);
    const numItems = 1 + Math.floor(rnd() * 3);
    const items = [];
    let subtotal = 0;
    for (let j = 0; j < numItems; j++) {
      const p = PRODUCTS[Math.floor(rnd() * PRODUCTS.length)];
      const qty = 1 + Math.floor(rnd() * 2);
      items.push({ productId: p.id, name: p.name, image: p.images[0], sku: p.sku, price: p.price, qty });
      subtotal += p.price * qty;
    }
    const discount = rnd() > 0.6 ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 999 ? 0 : 79;
    const total = subtotal - discount + shipping;
    const statusIdx = Math.floor(rnd() * ORDER_STATUSES.length);
    const daysAgo = Math.floor(rnd() * 45);
    const d = new Date(); d.setDate(d.getDate() - daysAgo);
    ORDERS.push({
      id: "SBH" + String(10245 + i),
      customer: INDIAN_NAMES[custIdx],
      email: INDIAN_NAMES[custIdx].toLowerCase().replace(" ", ".") + "@gmail.com",
      phone: "9" + (800000000 + Math.floor(rnd() * 199999999)),
      address: `${12 + i}, ${["MG Road","Park Street","Church Street","Linking Road","FC Road"][Math.floor(rnd()*5)]}`,
      city: CITIES[cityIdx].city, state: CITIES[cityIdx].state, pin: CITIES[cityIdx].pin,
      items, subtotal, discount, shipping, total,
      payment: rnd() > 0.5 ? "Prepaid" : "COD",
      status: ORDER_STATUSES[statusIdx] === "Refunded" && rnd() > 0.5 ? "Delivered" : ORDER_STATUSES[statusIdx],
      date: d.toISOString().slice(0, 10),
    });
  }

  const CUSTOMERS = INDIAN_NAMES.slice(0, 12).map((name, i) => {
    const custOrders = ORDERS.filter(o => o.customer === name);
    const totalSpent = custOrders.reduce((s, o) => s + o.total, 0);
    const cityIdx = i % CITIES.length;
    const d = new Date(); d.setDate(d.getDate() - (30 + i * 22));
    return {
      id: "CUST" + (100 + i), name, email: name.toLowerCase().replace(" ", ".") + "@gmail.com",
      phone: "9" + (700000000 + i * 1234567),
      city: CITIES[cityIdx].city, state: CITIES[cityIdx].state,
      orders: custOrders.length || Math.floor(rnd() * 4) + 1,
      totalSpent: totalSpent || Math.floor(rnd() * 8000) + 1200,
      joined: d.toISOString().slice(0, 10),
      status: rnd() > 0.15 ? "Active" : "Inactive",
    };
  });

  const REVIEWS = [
    { id: "r1", productId: "p1", customer: "Priya Sharma", rating: 5, text: "Excellent build quality and the laptop compartment fits my 15-inch perfectly. Very happy with this purchase.", date: "2026-07-22", verified: true, status: "Approved" },
    { id: "r2", productId: "p1", customer: "Rahul Verma", rating: 4, text: "Good bag overall, straps are comfortable for long commutes. Wish it had one more side pocket.", date: "2026-07-15", verified: true, status: "Approved" },
    { id: "r3", productId: "p17", customer: "Ananya Iyer", rating: 5, text: "Survived two flights already, wheels are smooth and the lock feels sturdy. Great value.", date: "2026-07-30", verified: true, status: "Approved" },
    { id: "r4", productId: "p9", customer: "Vikram Singh", rating: 5, text: "Looks premium and professional, perfect for client meetings. Highly recommend.", date: "2026-06-28", verified: true, status: "Approved" },
    { id: "r5", productId: "p19", customer: "Neha Gupta", rating: 4, text: "Beautiful handbag, the quilted pattern photographs really well. Slightly smaller than I expected.", date: "2026-07-02", verified: true, status: "Approved" },
    { id: "r6", productId: "p3", customer: "Arjun Reddy", rating: 5, text: "Took this on a 4-day trek, the rain cover and hydration port were genuinely useful.", date: "2026-06-11", verified: true, status: "Pending" },
    { id: "r7", productId: "p6", customer: "Sneha Patel", rating: 5, text: "Bought for my son, he loves the colour and it's held up well after a full term.", date: "2026-05-30", verified: true, status: "Approved" },
    { id: "r8", productId: "p14", customer: "Karan Malhotra", rating: 4, text: "Great size for a weekend bag, fits airline cabin allowance easily.", date: "2026-07-18", verified: false, status: "Pending" },
    { id: "r9", productId: "p22", customer: "Divya Nair", rating: 3, text: "Decent for the price but the zipper feels a little stiff. Still usable daily.", date: "2026-06-05", verified: true, status: "Approved" },
    { id: "r10", productId: "p13", customer: "Rohan Kapoor", rating: 5, text: "The leather quality is outstanding, exceeded expectations for this price range.", date: "2026-07-08", verified: true, status: "Rejected" },
  ];

  const COUPONS = [
    { code: "WELCOME10", type: "Percentage", value: 10, minOrder: 999, maxDiscount: 300, start: "2026-06-01", end: "2026-12-31", usageLimit: 500, used: 214, perUser: 1, active: true },
    { code: "FLAT200", type: "Flat", value: 200, minOrder: 1499, maxDiscount: 200, start: "2026-07-01", end: "2026-09-30", usageLimit: 300, used: 88, perUser: 1, active: true },
    { code: "TRAVEL15", type: "Percentage", value: 15, minOrder: 2000, maxDiscount: 600, start: "2026-08-01", end: "2026-10-31", usageLimit: 200, used: 41, perUser: 2, active: true },
    { code: "SCHOOL25", type: "Percentage", value: 25, minOrder: 799, maxDiscount: 400, start: "2026-05-01", end: "2026-06-30", usageLimit: 400, used: 400, perUser: 1, active: false },
    { code: "FESTIVE500", type: "Flat", value: 500, minOrder: 3000, maxDiscount: 500, start: "2026-10-01", end: "2026-11-15", usageLimit: 250, used: 0, perUser: 1, active: true },
  ];

  window.SBH_DATA = {
    CATEGORIES, PRODUCTS, ORDERS, CUSTOMERS, REVIEWS, COUPONS,
    getProduct(slug) { return PRODUCTS.find(p => p.slug === slug || p.id === slug); },
    getCategory(id) { return CATEGORIES.find(c => c.id === id); },
    getProductsByCategory(id) { return PRODUCTS.filter(p => p.category === id); },
    getRelated(product, count = 4) {
      return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
    },
    formatINR(n) { return "₹" + n.toLocaleString("en-IN"); },
    discountPct(mrp, price) { return Math.round(((mrp - price) / mrp) * 100); },
  };
})();
