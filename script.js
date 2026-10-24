/* ============================================================
   KEDAI LAHAJIA — SCRIPT (v3 - STABLE)
   ============================================================ */
"use strict";

/* ---------- KONFIGURASI ---------- */
const CONFIG = {
  whatsappNumber: "",
  storeName: "Kedai Lahajia",
  currency: "IDR",
  address: "",
  hours: "",
  mapsUrl: "",
  tableCount: 12 /* jumlah meja di kedai (pilihan nomor meja untuk pesan di tempat) */
};

/* ---------- IKON ---------- */
const ICON_PATHS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  all: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  makanan: '<path d="M7 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V2"/><path d="M9 2v20"/><path d="M17 22V2c-2.5 1.5-4 4.5-4 8 0 1.5 1 2.5 2.5 2.5H17"/>',
  camilan: '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 10h.01M10 15h.01M14.5 15h.01"/>',
  minuman: '<path d="M5 8h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2v2M12 2v2"/>',
  favorit: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>'
};

function svgIcon(name, size) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON_PATHS[name] + '</svg>';
}

function setBtnLabel(btn, text) {
  const span = btn.querySelector("span");
  (span || btn).textContent = text;
}

/* ---------- DATA MENU ---------- */
const U = function(id) { return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=600&q=80"; };

const CATEGORIES = [
  { key: "yamin",    label: "Mie Yamin",         icon: "makanan", desc: "Mie manis tanpa kuah.",                 image: U("photo-1569718212165-3a8278d5f624") },
  { key: "bakmie",   label: "Bakmie",            icon: "makanan", desc: "Bakmi asin yang gurih.",                image: U("photo-1585032226651-759b368d7246") },
  { key: "chili",    label: "Bakmi Chili",       icon: "makanan", desc: "Bakmi dengan rasa sedikit pedas.",      image: U("photo-1612929633738-8fe44f7ec841") },
  { key: "dimsum",   label: "Dimsum",            icon: "camilan", desc: "Isi 3 pcs.",                            image: U("photo-1563245372-f21724e3856d") },
  { key: "bakso",    label: "Bakso & Pelengkap", icon: "makanan", desc: "Bakso dan pelengkap untuk santapan Anda.", image: U("photo-1547592166-23ac45744acd") },
  { key: "dingin",   label: "Minuman Dingin",    icon: "minuman", desc: "Minuman dingin yang menyegarkan.",      image: U("photo-1556679343-c7306c1976bc") },
  { key: "panas",    label: "Minuman Panas",     icon: "minuman", desc: "Minuman panas yang menghangatkan.",     image: U("photo-1495474472287-4d71bcdd2085") },
  { key: "snack",    label: "Snack",             icon: "camilan", desc: "Camilan untuk menemani waktu santai.",  image: U("photo-1573080496219-bb080dd4f877") },
  { key: "toast",    label: "Toast",             icon: "camilan", desc: "Roti panggang yang manis.",             image: U("photo-1484723091739-30a097e8f929") },
  { key: "tambahan", label: "Tambahan",          icon: "plus",    desc: "Tambahan untuk pesanan Anda.",          image: U("photo-1569718212165-3a8278d5f624") }
];

const RAW_MENU = {
  yamin: [
    ["Mie Yamin Polos", 13000], ["Mie Yamin Ayam", 17000], ["Mie Yamin Bakso", 17000],
    ["Mie Yamin Spesial (Ayam & Bakso)", 22000], ["Mie Yamin Jumbo Ayam", 22000], ["Mie Yamin Jumbo Bakso", 22000],
    ["Mie Yamin Jumbo Spesial (Ayam & Bakso)", 27000], ["Mie Yamin Daging Sapi Oseng Mercon", 27000]
  ],
  bakmie: [
    ["Bakmi Polos", 13000], ["Bakmi Ayam", 17000], ["Bakmi Bakso", 17000],
    ["Bakmi Spesial (Ayam & Bakso)", 22000], ["Bakmi Jumbo Ayam", 22000], ["Bakmi Jumbo Bakso", 22000],
    ["Bakmi Jumbo Spesial (Ayam & Bakso)", 27000], ["Bakmi Daging Sapi Oseng Mercon", 27000], ["Bakmi Ayam Carbonara", 27000]
  ],
  chili: [
    ["Bakmi Chili Polos", 15000], ["Bakmi Chili Ayam", 18000], ["Bakmi Chili Bakso", 18000],
    ["Bakmi Chili Spesial (Ayam & Bakso)", 26000], ["Bakmi Chili Jumbo Ayam", 26000], ["Bakmi Chili Jumbo Bakso", 26000],
    ["Bakmi Chili Jumbo Spesial", 29000]
  ],
  dimsum: [
    ["Bakwan Goreng", 13500], ["Siomay Crab", 13500], ["Siomay Keju", 13500],
    ["Gyoza", 13500], ["Udang Keju", 13500], ["Dimsum Mix", 13500]
  ],
  bakso: [
    ["Bakso 1 Porsi", 17000], ["Pentol Kecil Halus", 2500], ["Gorengan Bakso", 2500], ["Tahu Bakso", 2500],
    ["Siomay Bakso", 2500], ["Pentol Besar Kasar", 12000], ["Pentol Keju", 14000]
  ],
  dingin: [
    ["Es Teh Jumbo", 7000], ["Es Teh Biasa", 5000], ["Es Teh Lychee", 12000], ["Es Teh Lemon", 12000],
    ["Es Jeruk Jumbo", 12000], ["Es Cao Kurnia", 12000], ["Es Sirup Kurnia", 10000], ["Air Mineral", 5000],
    ["Es Teh Tarik", 15000], ["Es Coklat Jadoel", 15000], ["Es Milo Melayu", 15000], ["Es Dawet", 12000],
    ["Es Cincau", 12000], ["Es Susu Soda", 15000], ["Es Kopi Gula Aren", 15000], ["Es Kopi Susu Saring", 15000],
    ["Es Kopi Tarik", 15000]
  ],
  panas: [
    ["Teh Panas/Hangat", 5000], ["Jeruk Panas", 10000], ["Teh Lemon Panas", 10000], ["Kopi Tubruk/Hitam", 8000],
    ["Kopi Butter", 15000], ["Kopi Susu Saring Panas", 12000], ["Kopi Tarik Panas", 12000], ["Teh Tarik Panas", 12000],
    ["Coklat Jadoel Panas", 12000], ["Milo Melayu Panas", 12000]
  ],
  snack: [
    ["Dimsum Goreng Keju Lumer", 15000], ["Kentang Goreng", 12000], ["Cireng Salju", 12000],
    ["Kulit Pangsit Ayam", 10000], ["Pisang Pasir Coklat Keju", 15000], ["Pisang Aroma Cinta", 12000]
  ],
  toast: [
    ["Roti Kaya", 12000], ["Roti Kaya Butter", 15000], ["Roti Coklat", 15000],
    ["Roti Coklat Keju", 17000], ["Roti Banana Coklat", 17000]
  ],
  tambahan: [
    ["Tambah Mie Lebar", 3000], ["Upsize Porsi", 6000]
  ]
};

/* Menu yang ditampilkan di bagian "Menu Favorit" pada Beranda */
const FAVORITE_NAMES = ["Mie Yamin Spesial (Ayam & Bakso)", "Bakmi Jumbo Spesial (Ayam & Bakso)", "Dimsum Mix", "Es Teh Tarik"];

const CATEGORY_LABELS = {};
const MENU_DATA = [];
CATEGORIES.forEach(function(cat) {
  CATEGORY_LABELS[cat.key] = cat.label;
  (RAW_MENU[cat.key] || []).forEach(function(row) {
    const fav = FAVORITE_NAMES.indexOf(row[0]) !== -1;
    MENU_DATA.push({
      id: "m" + (MENU_DATA.length + 1),
      name: row[0],
      description: cat.desc,
      price: row[1],
      category: cat.key,
      kind: cat.icon,
      label: fav ? "Favorit" : "",
      image: cat.image,
      favorite: fav
    });
  });
});

/* ---------- STATE ---------- */
let cart = [];
let activeCategory = "semua";
let storageAvailable = true;
let pendingClearCart = false;

const STORAGE_KEY = "kedai_lahajia_cart_v2";

/* ---------- UTILITAS ---------- */
function formatRupiah(value) {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency", currency: CONFIG.currency, maximumFractionDigits: 0
    }).format(value);
  } catch (e) {
    return "Rp " + Number(value).toLocaleString("id-ID");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) { console.log("[Toast]", message); return; }
  toast.textContent = message;
  toast.classList.add("toast--visible");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("toast--visible"), 3000);
}

function logDebug(msg) {
  console.log("[Kedai Lahajia] " + msg);
}

/* ---------- STORAGE ---------- */
function safeGetStorage() {
  try {
    const t = "__t__";
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch (e) { return false; }
}

function loadCartFromStorage() {
  if (!storageAvailable) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cart = parsed
        .filter(i => i && typeof i.id === "string" && typeof i.qty === "number")
        .map(i => {
          const p = MENU_DATA.find(x => x.id === i.id);
          if (!p) return null;
          return { id: i.id, qty: Math.max(1, Math.min(99, Math.floor(i.qty))) };
        })
        .filter(Boolean);
    }
  } catch (e) {
    logDebug("Storage load gagal: " + e.message);
    storageAvailable = false;
    cart = [];
  }
}

function saveCartToStorage() {
  if (!storageAvailable) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    storageAvailable = false;
  }
}

/* ---------- CART LOGIC ---------- */
function getProductById(id) { return MENU_DATA.find(p => p.id === id) || null; }
function getCartTotalItems() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotalPrice() {
  return cart.reduce((s, i) => {
    const p = getProductById(i.id);
    return p ? s + p.price * i.qty : s;
  }, 0);
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    if (existing.qty >= 99) { showToast("Jumlah maksimal tercapai."); return; }
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCartToStorage();
  renderCart();
  updateCartCount();
  showToast(product.name + " ditambahkan.");
}

function updateCartItemQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== productId);
  else if (item.qty > 99) item.qty = 99;
  saveCartToStorage();
  renderCart();
  updateCartCount();
  updateOrderSummary();
}

function removeCartItem(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCartToStorage();
  renderCart();
  updateCartCount();
  updateOrderSummary();
}

function clearCart() {
  cart = [];
  saveCartToStorage();
  renderCart();
  updateCartCount();
  updateOrderSummary();
  showToast("Keranjang dikosongkan.");
}

/* ---------- RENDER CART ---------- */
function renderCart() {
  const cartBody = document.getElementById("cartBody");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartBody || !cartEmpty || !cartFooter) return;

  if (cart.length === 0) {
    cartBody.innerHTML = "";
    cartBody.hidden = true;
    cartEmpty.hidden = false;
    cartFooter.hidden = true;
    return;
  }

  cartBody.hidden = false;
  cartEmpty.hidden = true;
  cartFooter.hidden = false;

  const frag = document.createDocumentFragment();
  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;
    const el = document.createElement("div");
    el.className = "cart-item";

    const img = document.createElement("img");
    img.className = "cart-item__image";
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";
    img.onerror = () => { img.style.background = "#efe2cd"; img.removeAttribute("src"); };

    const info = document.createElement("div");
    info.className = "cart-item__info";

    const name = document.createElement("p");
    name.className = "cart-item__name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "cart-item__price";
    price.textContent = formatRupiah(product.price) + " / item";

    const controls = document.createElement("div");
    controls.className = "cart-item__controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "cart-item__qty-btn";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Kurangi " + product.name);
    minus.addEventListener("click", function() { updateCartItemQty(product.id, -1); });

    const qty = document.createElement("span");
    qty.className = "cart-item__qty";
    qty.textContent = item.qty;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "cart-item__qty-btn";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Tambah " + product.name);
    plus.addEventListener("click", function() { updateCartItemQty(product.id, 1); });

    controls.append(minus, qty, plus);
    info.append(name, price, controls);

    const right = document.createElement("div");
    right.style.cssText = "display:flex;flex-direction:column;align-items:flex-end;gap:8px;";

    const sub = document.createElement("p");
    sub.className = "cart-item__subtotal";
    sub.textContent = formatRupiah(product.price * item.qty);

    const rem = document.createElement("button");
    rem.type = "button";
    rem.className = "cart-item__remove";
    rem.innerHTML = "&times;";
    rem.setAttribute("aria-label", "Hapus " + product.name);
    rem.addEventListener("click", function() { removeCartItem(product.id); });

    right.append(sub, rem);
    el.append(img, info, right);
    frag.appendChild(el);
  });

  cartBody.innerHTML = "";
  cartBody.appendChild(frag);
  if (cartTotal) cartTotal.textContent = formatRupiah(getCartTotalPrice());
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;
  const total = getCartTotalItems();
  el.textContent = total;
  el.classList.toggle("navbar__cart-count--visible", total > 0);
}

/* ---------- RENDER MENU ---------- */
function renderCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;
  const cats = [{ key: "semua", label: "Semua Menu", icon: "all" }].concat(CATEGORIES);
  container.innerHTML = "";
  cats.forEach(cat => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filter-btn" + (activeCategory === cat.key ? " filter-btn--active" : "");
    const total = cat.key === "semua" ? MENU_DATA.length : MENU_DATA.filter(p => p.category === cat.key).length;
    b.dataset.kind = cat.icon;
    b.innerHTML = '<i class="filter-btn__icon">' + svgIcon(cat.icon, 16) + "</i><span>" + cat.label + '</span><em class="filter-btn__count">' + total + "</em>";
    b.setAttribute("aria-pressed", activeCategory === cat.key);
    b.addEventListener("click", function() {
      activeCategory = cat.key;
      renderCategoryFilters();
      renderMenuGrid();
    });
    container.appendChild(b);
  });
}

function getFilteredMenu() {
  let items = MENU_DATA;
  if (activeCategory !== "semua") items = items.filter(p => p.category === activeCategory);
  return items;
}

function createMenuCard(product) {
  const card = document.createElement("article");
  card.className = "menu-card";

  const imgWrap = document.createElement("div");
  imgWrap.className = "menu-card__image-wrap";
  const img = document.createElement("img");
  img.className = "menu-card__image";
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";
  img.onerror = function() {
    this.style.display = "none";
    this.parentElement.style.background = "linear-gradient(135deg,#efe2cd,#e8e2d8)";
  };
  imgWrap.appendChild(img);

  if (product.label) {
    const lbl = document.createElement("span");
    lbl.className = "menu-card__label" + (product.label === "Favorit" ? " menu-card__label--favorit" : "");
    lbl.textContent = product.label;
    imgWrap.appendChild(lbl);
  }

  const body = document.createElement("div");
  body.className = "menu-card__body";

  const h3 = document.createElement("h3");
  h3.className = "menu-card__name";
  h3.textContent = product.name;

  const desc = document.createElement("p");
  desc.className = "menu-card__desc";
  desc.textContent = product.description;

  const footer = document.createElement("div");
  footer.className = "menu-card__footer";

  const price = document.createElement("span");
  price.className = "menu-card__price";
  price.textContent = formatRupiah(product.price);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "menu-card__add";
  btn.innerHTML = svgIcon("plus", 16) + " Tambah";
  btn.setAttribute("aria-label", "Tambah " + product.name);
  btn.addEventListener("click", function() { addToCart(product.id); });

  footer.append(price, btn);
  body.append(h3, desc, footer);
  card.append(imgWrap, body);
  return card;
}

/* ---------- CAROUSEL MENU BERTUMPUK (port dari carousel-07) ---------- */
const stack = { progress: 0, start: 0, items: [], cards: [], active: -1, raf: null };

function getStackConfig(width) {
  if (width < 640) return { distanceDivisor: 120, velocityDivisor: 500, sensitivity: 180, x: 90, y: 20, rot: 8, scale: 0.06 };
  if (width < 1024) return { distanceDivisor: 160, velocityDivisor: 650, sensitivity: 220, x: 130, y: 30, rot: 10, scale: 0.09 };
  return { distanceDivisor: 200, velocityDivisor: 800, sensitivity: 250, x: 170, y: 40, rot: 12, scale: 0.12 };
}

function layoutStack() {
  const n = stack.cards.length;
  if (!n) return;
  const cfg = getStackConfig(window.innerWidth);
  stack.cards.forEach(function(card, i) {
    let o = (((i - stack.progress) % n) + n) % n;
    if (o > n / 2) o -= n;
    const a = Math.abs(o);
    const rot = a < 0.05 ? 0 : o * cfg.rot;
    const y = a < 0.05 ? 0 : a * cfg.y;
    const sc = 1 - a * cfg.scale;
    let op = 1;
    if (a >= n / 2) op = 0;
    else if (a > n / 2 - 0.5) op = (n / 2 - a) / 0.5;
    card.style.transform = "translate(-50%, -50%) translate(" + (o * cfg.x) + "px, " + y + "px) rotate(" + rot + "deg) scale(" + sc + ")";
    card.style.opacity = op;
    card.style.zIndex = Math.round(100 - a * 10);
    card.firstElementChild.style.setProperty("--shade", Math.min(0.5, a < 0.5 ? a * 0.4 : 0.2 + (a - 0.5) * 0.2));
    card.firstElementChild.style.setProperty("--txt", Math.max(0, 1 - a / 0.5));
  });
  const idx = ((Math.round(stack.progress) % n) + n) % n;
  if (idx !== stack.active) setStackActive(idx);
}

function setStackActive(idx) {
  stack.active = idx;
  const p = stack.items[idx];
  if (!p) return;
  const set = function(id, t) { const e = document.getElementById(id); if (e) e.textContent = t; };
  set("stackBadge", p.label || CATEGORY_LABELS[p.category]);
  const stackBadgeEl = document.getElementById("stackBadge");
  if (stackBadgeEl) stackBadgeEl.dataset.kind = p.label ? "fav" : p.kind;
  const stackRoot = document.getElementById("menuStack");
  if (stackRoot) {
    stackRoot.dataset.kind = p.kind;
    const stackSection = stackRoot.closest(".menu");
    if (stackSection) stackSection.dataset.kind = p.kind;
    const detailEl = stackRoot.querySelector(".stack__detail");
    if (detailEl) {
      detailEl.classList.remove("is-swap");
      void detailEl.offsetWidth;
      detailEl.classList.add("is-swap");
    }
  }
  set("stackName", p.name);
  set("stackDesc", p.description);
  set("stackPrice", formatRupiah(p.price));
  set("stackCount", (idx + 1) + " / " + stack.items.length);
}

function animateStackTo(target) {
  cancelAnimationFrame(stack.raf);
  let x = stack.progress, v = 0, last = performance.now();
  const k = 200, c = 30, m = 1;
  function step(now) {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;
    v += ((-k * (x - target) - c * v) / m) * dt;
    x += v * dt;
    stack.progress = x;
    layoutStack();
    if (Math.abs(x - target) < 0.001 && Math.abs(v) < 0.01) {
      stack.progress = target;
      layoutStack();
      return;
    }
    stack.raf = requestAnimationFrame(step);
  }
  stack.raf = requestAnimationFrame(step);
}

function initStackDrag() {
  const surface = document.getElementById("stackSurface");
  if (!surface || surface._ready) return;
  surface._ready = true;
  let dragging = false, lastX = 0, startX = 0, lastT = 0, vel = 0;

  surface.addEventListener("pointerdown", function(e) {
    if (!stack.cards.length) return;
    dragging = true;
    cancelAnimationFrame(stack.raf);
    stack.start = stack.progress;
    lastX = startX = e.clientX;
    lastT = performance.now();
    vel = 0;
    surface.setPointerCapture(e.pointerId);
  });
  surface.addEventListener("pointermove", function(e) {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    vel = 0.8 * vel + 0.2 * ((e.clientX - lastX) / dt) * 1000;
    stack.progress += -(e.clientX - lastX) / getStackConfig(window.innerWidth).sensitivity;
    lastX = e.clientX;
    lastT = now;
    layoutStack();
  });
  function end(e) {
    if (!dragging) return;
    dragging = false;
    const cfg = getStackConfig(window.innerWidth);
    const shift = -(e.clientX - startX) / cfg.distanceDivisor + -vel / cfg.velocityDivisor;
    const total = Math.max(-3, Math.min(3, Math.round(shift)));
    animateStackTo(Math.round(stack.start) + total);
  }
  surface.addEventListener("pointerup", end);
  surface.addEventListener("pointercancel", end);
  surface.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); animateStackTo(Math.round(stack.progress) + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); animateStackTo(Math.round(stack.progress) - 1); }
  });

  const prev = document.getElementById("stackPrev");
  const next = document.getElementById("stackNext");
  const add = document.getElementById("stackAdd");
  if (prev) prev.addEventListener("click", function() { animateStackTo(Math.round(stack.progress) - 1); });
  if (next) next.addEventListener("click", function() { animateStackTo(Math.round(stack.progress) + 1); });
  if (add) add.addEventListener("click", function() {
    const p = stack.items[stack.active];
    if (p) addToCart(p.id);
  });
  window.addEventListener("resize", layoutStack);
}

function createStackCard(product) {
  const card = document.createElement("div");
  card.className = "stack-card";

  const inner = document.createElement("div");
  inner.className = "stack-card__inner";

  const img = document.createElement("img");
  img.className = "stack-card__image";
  img.src = product.image;
  img.alt = product.name;
  img.draggable = false;
  img.onerror = function() { this.style.display = "none"; };

  const shade = document.createElement("div");
  shade.className = "stack-card__shade";
  const grad = document.createElement("div");
  grad.className = "stack-card__grad";

  const badge = document.createElement("span");
  badge.className = "stack-card__badge";
  badge.textContent = product.label || CATEGORY_LABELS[product.category];
  badge.dataset.kind = product.label ? "fav" : product.kind;

  const title = document.createElement("p");
  title.className = "stack-card__title";
  title.textContent = product.name;

  inner.append(img, shade, grad, badge, title);
  card.appendChild(inner);
  return card;
}

function renderMenuGrid() {
  const stage = document.getElementById("menuGrid");
  const wrap = document.getElementById("menuStack");
  const empty = document.getElementById("menuEmpty");
  if (!stage || !wrap) return;

  stack.items = getFilteredMenu();
  stage.querySelectorAll(".stack-card").forEach(function(c) { c.remove(); });
  stack.cards = [];
  cancelAnimationFrame(stack.raf);

  if (stack.items.length === 0) {
    wrap.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }
  wrap.hidden = false;
  if (empty) empty.hidden = true;

  const surface = document.getElementById("stackSurface");
  stack.items.forEach(function(product) {
    const card = createStackCard(product);
    stage.insertBefore(card, surface);
    stack.cards.push(card);
  });
  stack.progress = 0;
  stack.active = -1;
  initStackDrag();
  layoutStack();
}

/* Kartu menu favorit di hero Beranda */
function initFeatured() {
  const img = document.getElementById("featImg");
  if (!img) return;
  const favs = MENU_DATA.filter(function(p) { return p.favorite; });
  if (!favs.length) return;
  const media = img.parentElement;
  let idx = 0;

  function show(i) {
    idx = ((i % favs.length) + favs.length) % favs.length;
    const p = favs[idx];
    media.classList.add("feature__media--swap");
    setTimeout(function() {
      img.src = p.image;
      img.alt = p.name;
      document.getElementById("featName").textContent = p.name;
      document.getElementById("featDesc").textContent = p.description;
      document.getElementById("featPrice").textContent = formatRupiah(p.price);
      document.getElementById("featCount").textContent = String(idx + 1).padStart(2, "0") + " / " + String(favs.length).padStart(2, "0");
      media.classList.remove("feature__media--swap");
    }, 160);
  }

  img.onerror = function() { this.style.visibility = "hidden"; };
  document.getElementById("featPrev").addEventListener("click", function() { show(idx - 1); });
  document.getElementById("featNext").addEventListener("click", function() { show(idx + 1); });
  document.getElementById("featAdd").addEventListener("click", function() { addToCart(favs[idx].id); });
  show(0);
}

/* Menu favorit di halaman Beranda (maks. 4 item) */
function renderFavorites() {
  const grid = document.getElementById("favoritGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const frag = document.createDocumentFragment();
  MENU_DATA.filter(function(p) { return p.favorite; }).slice(0, 4).forEach(function(product) {
    frag.appendChild(createMenuCard(product));
  });
  grid.appendChild(frag);
}

/* ---------- PANELS ---------- */
function openCartPanel() {
  const panel = document.getElementById("cartPanel");
  const overlay = document.getElementById("cartOverlay");
  if (!panel || !overlay) return;
  renderCart();
  panel.classList.add("cart-panel--open");
  panel.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
  requestAnimationFrame(function() { overlay.classList.add("cart-overlay--visible"); });
  document.body.style.overflow = "hidden";
}

function closeCartPanel() {
  const panel = document.getElementById("cartPanel");
  const overlay = document.getElementById("cartOverlay");
  if (!panel || !overlay) return;
  panel.classList.remove("cart-panel--open");
  panel.setAttribute("aria-hidden", "true");
  overlay.classList.remove("cart-overlay--visible");
  setTimeout(function() { overlay.hidden = true; }, 250);
  document.body.style.overflow = "";
}

function openCheckoutModal() {
  if (cart.length === 0) { showToast("Keranjang masih kosong."); return; }
  closeCartPanel();
  const overlay = document.getElementById("checkoutOverlay");
  if (!overlay) return;
  overlay.hidden = false;
  requestAnimationFrame(function() { overlay.classList.add("modal-overlay--visible"); });
  document.body.style.overflow = "hidden";
  clearFormErrors();
  updateOrderSummary();
  toggleAddressField();
}

function closeCheckoutModal() {
  const overlay = document.getElementById("checkoutOverlay");
  if (!overlay) return;
  overlay.classList.remove("modal-overlay--visible");
  setTimeout(function() { overlay.hidden = true; }, 250);
  document.body.style.overflow = "";
}

function updateOrderSummary() {
  const container = document.getElementById("orderSummaryItems");
  const totalEl = document.getElementById("orderSummaryTotal");
  if (!container) return;
  container.innerHTML = "";
  if (cart.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Keranjang kosong.";
    container.appendChild(p);
  } else {
    cart.forEach(item => {
      const product = getProductById(item.id);
      if (!product) return;
      const row = document.createElement("div");
      row.className = "order-summary__item";
      const left = document.createElement("span");
      left.textContent = product.name + " ";
      const q = document.createElement("span");
      q.className = "order-summary__item-qty";
      q.textContent = "× " + item.qty;
      left.appendChild(q);
      const right = document.createElement("span");
      right.textContent = formatRupiah(product.price * item.qty);
      row.append(left, right);
      container.appendChild(row);
    });
  }
  if (totalEl) totalEl.textContent = formatRupiah(getCartTotalPrice());
}

function toggleAddressField() {
  const method = document.querySelector('input[name="orderMethod"]:checked');
  const group = document.getElementById("addressGroup");
  const input = document.getElementById("customerAddress");
  const tableGroup = document.getElementById("tableGroup");
  const tableSelect = document.getElementById("customerTable");
  if (!method || !group || !input) return;
  if (method.value === "delivery") {
    group.hidden = false;
    input.setAttribute("required", "required");
  } else {
    group.hidden = true;
    input.removeAttribute("required");
    const e = document.getElementById("errorAddress");
    if (e) e.textContent = "";
  }
  if (tableGroup && tableSelect) {
    if (method.value === "dinein") {
      tableGroup.hidden = false;
      tableSelect.setAttribute("required", "required");
    } else {
      tableGroup.hidden = true;
      tableSelect.removeAttribute("required");
      const et = document.getElementById("errorTable");
      if (et) et.textContent = "";
    }
  }
}

/* ---------- MODE PESAN: ONLINE / MAKAN DI TEMPAT ---------- */
const MODE_KEY = "kedai_lahajia_mode_v1";
const MODE_TTL = 6 * 60 * 60 * 1000; /* pilihan meja berlaku 6 jam */
let orderMode = "online";
let tableNo = "";

function validTable(n) {
  const v = parseInt(n, 10);
  return v >= 1 && v <= CONFIG.tableCount ? String(v) : "";
}

function saveOrderMode() {
  if (!storageAvailable) return;
  try { localStorage.setItem(MODE_KEY, JSON.stringify({ mode: orderMode, table: tableNo, ts: Date.now() })); } catch (e) {}
}

/* Sumber: penyimpanan (<6 jam) lalu URL. QR di meja cukup mengarah ke menu.html?meja=5 */
function loadOrderMode() {
  if (storageAvailable) {
    try {
      const raw = JSON.parse(localStorage.getItem(MODE_KEY) || "null");
      if (raw && Date.now() - raw.ts < MODE_TTL) {
        orderMode = raw.mode === "dinein" ? "dinein" : "online";
        tableNo = validTable(raw.table);
      }
    } catch (e) {}
  }
  try {
    const q = new URLSearchParams(window.location.search);
    const t = validTable(q.get("meja"));
    if (t) { orderMode = "dinein"; tableNo = t; saveOrderMode(); }
    else if (q.get("mode") === "dinein") { orderMode = "dinein"; saveOrderMode(); }
    else if (q.get("mode") === "online") { orderMode = "online"; saveOrderMode(); }
  } catch (e) {}
}

function setOrderMode(mode) {
  orderMode = mode === "dinein" ? "dinein" : "online";
  saveOrderMode();
  renderOrderMode();
}

function setTable(n, silent) {
  tableNo = validTable(n);
  if (tableNo) orderMode = "dinein";
  saveOrderMode();
  renderOrderMode();
  if (tableNo && !silent) showToast("Meja " + tableNo + " dipilih.");
}

function renderOrderMode() {
  const dine = orderMode === "dinein";
  const label = dine ? (tableNo ? "Meja " + tableNo : "Pilih meja") : "";

  document.querySelectorAll(".dine__tab").forEach(function(b) {
    const on = b.dataset.mode === orderMode;
    b.classList.toggle("dine__tab--active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const body = document.getElementById("dineBody");
  if (body) body.hidden = !dine;
  document.querySelectorAll(".dine__chip").forEach(function(c) {
    const on = c.dataset.table === tableNo;
    c.classList.toggle("dine__chip--active", on);
    c.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const status = document.getElementById("dineStatus");
  if (status) {
    status.className = "dine__status" + (dine ? (tableNo ? " dine__status--ok" : " dine__status--warn") : "");
    status.textContent = dine
      ? (tableNo
        ? "Pesananmu akan diantar ke Meja " + tableNo + ". Cek pesanan lalu kirim lewat WhatsApp."
        : "Pilih nomor mejamu dulu supaya pesanan sampai ke meja yang tepat.")
      : "Pesananmu dikirim lewat WhatsApp. Pilih ambil sendiri atau pengantaran saat checkout.";
  }

  const chip = document.getElementById("navTable");
  if (chip) { chip.hidden = !dine; chip.textContent = label; }
  const cartMode = document.getElementById("cartMode");
  const cartModeText = document.getElementById("cartModeText");
  if (cartMode && cartModeText) {
    cartMode.hidden = !dine;
    cartModeText.textContent = "Makan di tempat · " + (tableNo ? "Meja " + tableNo : "belum pilih meja");
  }

  /* samakan formulir pemesanan */
  const radios = document.querySelectorAll('input[name="orderMethod"]');
  if (radios.length) {
    const cur = document.querySelector('input[name="orderMethod"]:checked');
    if (dine) {
      const r = document.querySelector('input[name="orderMethod"][value="dinein"]');
      if (r) r.checked = true;
    } else if (cur && cur.value === "dinein") {
      const r = document.querySelector('input[name="orderMethod"][value="pickup"]');
      if (r) r.checked = true;
    }
    const sel = document.getElementById("customerTable");
    if (sel) sel.value = tableNo;
    toggleAddressField();
  }
}

function focusDinePanel() {
  const panel = document.getElementById("dinePanel");
  if (!panel) { navigateTo("menu.html?mode=dinein"); return; }
  panel.scrollIntoView({ behavior: "smooth", block: "center" });
  panel.classList.remove("dine--pulse");
  void panel.offsetWidth;
  panel.classList.add("dine--pulse");
}

function initDine() {
  const grid = document.getElementById("dineGrid");
  const sel = document.getElementById("customerTable");
  for (let i = 1; i <= CONFIG.tableCount; i++) {
    if (grid) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dine__chip";
      b.dataset.table = String(i);
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "Meja " + i);
      b.innerHTML = '<small>Meja</small><strong>' + i + "</strong>";
      b.addEventListener("click", function() { setTable(i); });
      grid.appendChild(b);
    }
    if (sel) {
      const o = document.createElement("option");
      o.value = String(i);
      o.textContent = "Meja " + i;
      sel.appendChild(o);
    }
  }
  document.querySelectorAll(".dine__tab").forEach(function(b) {
    b.addEventListener("click", function() { setOrderMode(b.dataset.mode); });
  });
  if (sel) sel.addEventListener("change", function() { setTable(sel.value, true); });
  const change = document.getElementById("btnChangeTable");
  if (change) change.addEventListener("click", function() { closeCartPanel(); focusDinePanel(); });
  const chip = document.getElementById("navTable");
  if (chip) chip.addEventListener("click", function(e) {
    if (document.getElementById("dinePanel")) { e.preventDefault(); focusDinePanel(); }
  });
  renderOrderMode();
}

function clearFormErrors() {
  ["errorName", "errorPhone", "errorAddress", "errorTable"].forEach(function(id) {
    const e = document.getElementById(id);
    if (e) e.textContent = "";
  });
}

/* ---------- VALIDATION ---------- */
function validateOrderForm() {
  clearFormErrors();
  let valid = true;
  const name = document.getElementById("customerName");
  const nameErr = document.getElementById("errorName");
  if (name && !name.value.trim() && nameErr) {
    nameErr.textContent = "Nama pelanggan wajib diisi.";
    valid = false;
  }
  const method = document.querySelector('input[name="orderMethod"]:checked');
  if (method && method.value === "delivery") {
    const addr = document.getElementById("customerAddress");
    const addrErr = document.getElementById("errorAddress");
    if (addr && !addr.value.trim() && addrErr) {
      addrErr.textContent = "Alamat pengantaran wajib diisi.";
      valid = false;
    }
  }
  if (method && method.value === "dinein") {
    const tbl = document.getElementById("customerTable");
    const tblErr = document.getElementById("errorTable");
    if (tbl && !validTable(tbl.value) && tblErr) {
      tblErr.textContent = "Pilih nomor meja dulu.";
      valid = false;
    }
  }
  if (cart.length === 0) { showToast("Keranjang kosong."); valid = false; }
  return valid;
}

function buildWhatsAppMessage(name, phone, method, address, note, table) {
  const lines = [];
  lines.push("Halo " + CONFIG.storeName + ", saya ingin memesan" + (method === "dinein" ? " (makan di tempat)." : "."));
  lines.push("");
  lines.push("Nama: " + name);
  if (phone.trim()) lines.push("Telepon: " + phone.trim());
  lines.push("Metode: " + (method === "delivery" ? "Pengantaran" : method === "dinein" ? "Makan di Tempat" : "Ambil Sendiri"));
  if (method === "dinein" && table) lines.push("Nomor Meja: " + table);
  lines.push("");
  lines.push("Pesanan:");
  cart.forEach(function(item, i) {
    const p = getProductById(item.id);
    if (!p) return;
    lines.push((i + 1) + ". " + p.name);
    lines.push("   " + item.qty + " x " + formatRupiah(p.price) + " = " + formatRupiah(p.price * item.qty));
  });
  lines.push("");
  lines.push("Total Pesanan: " + formatRupiah(getCartTotalPrice()));
  lines.push("");
  if (method === "delivery" && address.trim()) lines.push("Alamat: " + address.trim());
  if (note.trim()) lines.push("Catatan: " + note.trim());
  lines.push("");
  lines.push(method === "dinein"
    ? "Mohon konfirmasi dan antar pesanan ke meja saya. Terima kasih."
    : "Mohon konfirmasi pesanan saya. Terima kasih.");
  return lines.join("\n");
}

function handleOrderSubmit(e) {
  e.preventDefault();
  if (!validateOrderForm()) return;
  if (!CONFIG.whatsappNumber || !CONFIG.whatsappNumber.trim()) {
    showToast("Nomor WhatsApp resmi belum dikonfigurasi. Silakan hubungi kedai langsung.");
    return;
  }
  const clean = CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  if (!clean) { showToast("Nomor WhatsApp tidak valid."); return; }

  const name = (document.getElementById("customerName") || {}).value || "";
  const phone = (document.getElementById("customerPhone") || {}).value || "";
  const methodEl = document.querySelector('input[name="orderMethod"]:checked');
  const method = methodEl ? methodEl.value : "pickup";
  const address = (document.getElementById("customerAddress") || {}).value || "";
  const note = (document.getElementById("customerNote") || {}).value || "";

  const table = validTable((document.getElementById("customerTable") || {}).value);
  const msg = buildWhatsAppMessage(name.trim(), phone.trim(), method, address.trim(), note.trim(), table);
  const url = "https://wa.me/" + clean + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank", "noopener,noreferrer");
  showToast("Pesan WhatsApp disiapkan. Silakan kirim untuk konfirmasi.");
}

/* ---------- NAVIGASI ANTAR HALAMAN ---------- */
function goToMenuPage() {
  if (document.getElementById("menuGrid")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("menu.html");
  }
}

/* Pindah halaman: transisinya ditangani browser lewat CSS View Transitions (lihat style.css).
   Di sini hanya menandai navigasi internal agar loading awal tidak muncul lagi. */
function navigateTo(url) {
  try { sessionStorage.setItem("kl_nav", "1"); } catch (e) {}
  window.location.href = url;
}

function initPageTransitions() {
  document.addEventListener("click", function(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|https?:|javascript:)/i.test(href)) return;
    const here = (location.pathname.split("/").pop() || "index.html");
    if (href === here) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    try { sessionStorage.setItem("kl_nav", "1"); } catch (err) {}
  });
}

/* Navbar (porting bottom-nav-bar.tsx): tombol yang diklik jadi aktif, labelnya melebar dengan spring,
   label tombol sebelumnya menutup. Kondisi awal tanpa animasi (seperti initial={false}). */
function initBottomNav() {
  const nav = document.querySelector(".bottom-nav");
  if (!nav) return;
  const items = Array.prototype.slice.call(nav.querySelectorAll(".bottom-nav__item"));
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function parts(item) {
    const label = item.querySelector(".bottom-nav__label");
    return { label: label, text: label ? label.firstElementChild : null };
  }

  function apply(item, isActive, animate) {
    const p = parts(item);
    if (!p.label || !p.text) return;
    item.classList.toggle("bottom-nav__item--active", isActive);
    if (isActive) item.setAttribute("aria-current", "page"); else item.removeAttribute("aria-current");
    if (isActive) {
      if (!animate) {
        p.label.style.width = "auto"; /* mengikuti ukuran teks/font apa adanya */
      } else {
        p.label.style.width = Math.ceil(p.text.getBoundingClientRect().width) + "px";
        p.label.addEventListener("transitionend", function done(e) {
          if (e.propertyName !== "width") return;
          p.label.removeEventListener("transitionend", done);
          if (item.classList.contains("bottom-nav__item--active")) p.label.style.width = "auto";
        });
      }
      p.label.style.opacity = "1";
      p.label.style.marginLeft = "8px";
    } else {
      if (animate) {
        p.label.style.width = p.label.getBoundingClientRect().width + "px";
        void p.label.offsetWidth;
      }
      p.label.style.width = "0px";
      p.label.style.opacity = "0";
      p.label.style.marginLeft = "0px";
    }
  }

  /* kondisi awal: label aktif langsung terbuka, tanpa animasi */
  items.forEach(function(it) {
    const p = parts(it);
    if (p.label) p.label.style.transition = "none";
    apply(it, it.classList.contains("bottom-nav__item--active"), false);
  });
  void nav.offsetWidth;
  items.forEach(function(it) { const p = parts(it); if (p.label) p.label.style.transition = ""; });

  items.forEach(function(item) {
    item.addEventListener("click", function(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = item.getAttribute("href");
      if (!href) return;
      const here = (location.pathname.split("/").pop() || "index.html");
      if (href === here) return;
      e.preventDefault();
      items.forEach(function(it) { apply(it, it === item, true); });
      try { sessionStorage.setItem("kl_nav", "1"); } catch (err) {}
      /* beri waktu singkat agar animasi pegas terlihat sebelum pindah halaman */
      setTimeout(function() { window.location.href = href; }, reduce ? 0 : 180);
    });
  });
}

/* Prefetch: halaman lain diunduh saat browser sedang santai / saat link disorot, sehingga pindah halaman nyaris instan */
function initPrefetch() {
  const done = {};
  function prefetch(href) {
    if (!href || done[href]) return;
    if (/^(mailto:|tel:|https?:|javascript:|#)/i.test(href)) return;
    const here = (location.pathname.split("/").pop() || "index.html");
    if (href === here) return;
    done[href] = true;
    const l = document.createElement("link");
    l.rel = "prefetch";
    l.href = href;
    l.as = "document";
    document.head.appendChild(l);
  }
  const links = Array.prototype.slice.call(document.querySelectorAll(".bottom-nav a[href], .footer a[href]"));
  function hover(e) {
    const a = e.target.closest && e.target.closest("a[href]");
    if (a) prefetch(a.getAttribute("href"));
  }
  document.addEventListener("pointerover", hover, { passive: true });
  document.addEventListener("touchstart", hover, { passive: true });
  const idle = window.requestIdleCallback || function(fn) { return setTimeout(fn, 1500); };
  window.addEventListener("load", function() {
    idle(function() { links.forEach(function(a) { prefetch(a.getAttribute("href")); }); });
  });
}

/* ---------- ANIMASI MUNCUL (reveal) ---------- */
function markReady() {
  window.__klReady = true;
  document.dispatchEvent(new Event("kl:ready"));
}

function onReady(fn) {
  if (window.__klReady) fn();
  else document.addEventListener("kl:ready", fn, { once: true });
}

/* Word pull-up (porting word-pull-up.tsx): tiap kata naik dan memudar masuk bergiliran */
function splitWords(el) {
  let n = 0;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(function(node) {
    const frag = document.createDocumentFragment();
    node.nodeValue.split(/(\s+)/).forEach(function(part) {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
      const word = document.createElement("span");
      word.className = "wp-word";
      word.style.setProperty("--i", Math.min(n++, 40));
      word.textContent = part;
      frag.appendChild(word);
    });
    node.parentNode.replaceChild(frag, node);
  });
}

/* Semua tulisan yang memakai word pull-up */
const WP_HEADINGS = "main h1, main h2, main h3, .footer__logo, .footer__heading";
const WP_TEXT = "main p, .footer__desc, .footer__links li, .footer__bottom p";
const WP_SKIP = ".cart-panel, .modal-overlay, .loader, .bottom-nav, .navbar, .toast, button, .btn, label, .stack__info, .glass--feature, .menu__filters, .tm";
/* Jeda awal (ms) untuk urutan di hero Beranda */
const WP_BASE = [[".home-hero__eyebrow", 0], [".home-hero__title", 120], [".home-hero__desc", 700]];

const REVEAL_BLOCKS = [
  [".home-hero__actions", 380], [".glass", 460],
  [".about__visual", 0], [".about__list li", 220],
  [".menu__controls", 100], ["#menuStack", 200],
  [".contact__card", 0], [".location__map", 0], [".info-card", 120],
  [".fact-card", 0], [".tm", 100], [".reviews__summary", 0], [".reviews__cta", 0],
  [".footer__col", 0]
];

function initReveal() {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const barTargets = document.querySelectorAll(".price-card, .reviews__summary");

  if (reduce || !("IntersectionObserver" in window)) {
    barTargets.forEach(function(t) { t.classList.add("is-visible"); });
    return;
  }

  const targets = [];

  function addWordPull(selector, step) {
    document.querySelectorAll(selector).forEach(function(el) {
      if (el.classList.contains("wp-text") || el.closest(WP_SKIP)) return;
      if (!el.textContent.trim()) return;
      splitWords(el);
      el.classList.add("wp-text");
      el.style.setProperty("--wp-step", step + "ms");
      WP_BASE.forEach(function(p) { if (el.matches(p[0])) el.style.setProperty("--wp-base", p[1] + "ms"); });
      targets.push(el);
    });
  }
  addWordPull(WP_HEADINGS, 150);
  addWordPull(WP_TEXT, 28);

  REVEAL_BLOCKS.forEach(function(pair) {
    const counters = new Map();
    document.querySelectorAll(pair[0]).forEach(function(el) {
      if (el.classList.contains("rv")) return;
      const key = el.parentNode;
      const idx = counters.get(key) || 0;
      counters.set(key, idx + 1);
      el.classList.add("rv");
      el.style.setProperty("--rv-d", (pair[1] + (idx % 6) * 70) + "ms");
      targets.push(el);
    });
  });
  barTargets.forEach(function(t) { if (targets.indexOf(t) === -1) targets.push(t); });

  const io = new IntersectionObserver(function(entries) {
    entries.forEach(function(en) {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      el.classList.add("is-in", "is-visible");
      if (el.classList.contains("rv")) {
        const delay = parseInt(el.style.getPropertyValue("--rv-d"), 10) || 0;
        /* setelah selesai, lepas kelas reveal agar efek hover bawaan komponen kembali normal */
        setTimeout(function() {
          el.classList.remove("rv", "is-in");
          el.style.removeProperty("--rv-d");
        }, delay + 1100);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

  onReady(function() { targets.forEach(function(t) { io.observe(t); }); });
}

/* Testimonial marquee (porting testimonials-columns-1.tsx): kolom ulasan bergulir ke atas tanpa henti */
function initTestimonials() {
  const root = document.getElementById("tm");
  if (!root) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; /* tetap tampil sebagai grid biasa */

  const source = root.querySelector(".tm-source");
  const colsEl = root.querySelector(".tm-cols");
  const cards = Array.prototype.slice.call(source.querySelectorAll(".tm-card"));
  const speeds = [34, 28, 31]; /* px per detik untuk tiap kolom */
  let current = 0;

  function columnCount() {
    const w = window.innerWidth;
    return w < 768 ? 1 : (w < 1024 ? 2 : 3);
  }

  function build() {
    const n = columnCount();
    if (n === current) return;
    current = n;
    colsEl.innerHTML = "";
    const tracks = [];
    for (let k = 0; k < n; k++) {
      const col = document.createElement("div");
      col.className = "tm-col";
      const track = document.createElement("div");
      track.className = "tm-track";
      const mine = cards.filter(function(_, i) { return i % n === k; });
      mine.forEach(function(c) { track.appendChild(c.cloneNode(true)); });
      /* salinan kedua untuk loop mulus; disembunyikan dari pembaca layar */
      mine.forEach(function(c) {
        const copy = c.cloneNode(true);
        copy.setAttribute("aria-hidden", "true");
        copy.querySelectorAll("a").forEach(function(a) { a.tabIndex = -1; });
        track.appendChild(copy);
      });
      col.appendChild(track);
      colsEl.appendChild(col);
      tracks.push(track);
    }
    source.hidden = true;
    colsEl.hidden = false;
    requestAnimationFrame(function() {
      tracks.forEach(function(track, k) {
        const half = track.scrollHeight / 2;
        track.style.animationDuration = Math.max(14, half / speeds[k]) + "s";
      });
    });
  }

  build();
  let timer;
  window.addEventListener("resize", function() {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  });
}

/* Loading screen saat pertama kali membuka web (sekali per sesi) */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader || document.documentElement.classList.contains("no-loader")) { markReady(); return; }
  const MIN_MS = 2800;
  const started = Date.now();
  const fill = document.getElementById("loaderFill");
  const pct = document.getElementById("loaderPct");
  let done = false;
  let loaded = false;

  /* Progres naik halus; berhenti di 92% sampai halaman benar-benar selesai dimuat */
  function setProgress(p) {
    p = Math.round(p);
    if (fill) fill.style.width = p + "%";
    if (pct) pct.textContent = p;
  }
  function tick() {
    if (done) return;
    const t = Math.min(1, (Date.now() - started - 900) / (MIN_MS - 1300));
    const eased = 1 - Math.pow(1 - Math.max(0, t), 3);
    setProgress(Math.min(loaded ? 100 : 92, eased * 100));
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function hide() {
    if (done) return;
    done = true;
    setProgress(100);
    /* beri jeda singkat agar 100% terlihat sebelum tirai terangkat */
    setTimeout(function() {
      markReady();
      loader.classList.add("loader--hide");
      setTimeout(function() { loader.remove(); }, 1000);
    }, 280);
  }
  function whenReady() {
    loaded = true;
    setTimeout(hide, Math.max(0, MIN_MS - (Date.now() - started)));
  }
  if (document.readyState === "complete") whenReady();
  else window.addEventListener("load", whenReady);
  setTimeout(hide, 5000);
}

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", function() {
    navbar.classList.toggle("navbar--scrolled", window.scrollY > 10);
  }, { passive: true });
}

/* ---------- INIT ---------- */
function init() {
  logDebug("Initializing...");
  initLoader();
  initPageTransitions();
  initPrefetch();
  initBottomNav();
  initTestimonials();
  initReveal();
  try {
    storageAvailable = safeGetStorage();
    if (!storageAvailable) logDebug("localStorage tidak tersedia — keranjang tidak disimpan.");
    loadCartFromStorage();
    loadOrderMode();
    initDine();
    renderCategoryFilters();
    renderMenuGrid();
    renderFavorites();
    initFeatured();
    renderCart();
    updateCartCount();

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (CONFIG.address) {
      const n = document.getElementById("addressNote");
      if (n) n.textContent = CONFIG.address;
    }
    if (CONFIG.whatsappNumber) {
      const wa = document.getElementById("contactWhatsapp");
      if (wa) wa.textContent = "+" + CONFIG.whatsappNumber;
      const fw = document.getElementById("footerWhatsapp");
      if (fw) fw.textContent = "WhatsApp: +" + CONFIG.whatsappNumber;
    }
    if (CONFIG.hours) {
      const h = document.getElementById("contactHours");
      if (h) h.textContent = CONFIG.hours;
    }

    initNavbar();

    /* ---- Semua event listener tombol ---- */
    const btnCart = document.getElementById("btnCart");
    if (btnCart) btnCart.addEventListener("click", openCartPanel);

    const btnCartClose = document.getElementById("btnCartClose");
    if (btnCartClose) btnCartClose.addEventListener("click", closeCartPanel);

    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) cartOverlay.addEventListener("click", closeCartPanel);

    const btnCartEmptyClose = document.getElementById("btnCartEmptyClose");
    if (btnCartEmptyClose) {
      btnCartEmptyClose.addEventListener("click", function() {
        closeCartPanel();
        goToMenuPage();
      });
    }

    /* Kosongkan keranjang: konfirmasi 2 klik (tanpa confirm()) */
    const btnClearCart = document.getElementById("btnClearCart");
    if (btnClearCart) {
      btnClearCart.addEventListener("click", function() {
        if (!pendingClearCart) {
          pendingClearCart = true;
          setBtnLabel(btnClearCart, "Yakin? Klik lagi");
          showToast("Klik sekali lagi untuk mengosongkan.");
          setTimeout(function() {
            pendingClearCart = false;
            if (btnClearCart) setBtnLabel(btnClearCart, "Kosongkan Keranjang");
          }, 4000);
        } else {
          pendingClearCart = false;
          setBtnLabel(btnClearCart, "Kosongkan Keranjang");
          clearCart();
        }
      });
    }

    const btnCheckout = document.getElementById("btnCheckout");
    if (btnCheckout) btnCheckout.addEventListener("click", openCheckoutModal);

    const btnCheckoutClose = document.getElementById("btnCheckoutClose");
    if (btnCheckoutClose) btnCheckoutClose.addEventListener("click", closeCheckoutModal);

    const checkoutOverlay = document.getElementById("checkoutOverlay");
    if (checkoutOverlay) {
      checkoutOverlay.addEventListener("click", function(e) {
        if (e.target === checkoutOverlay) closeCheckoutModal();
      });
    }

    const btnBackToCart = document.getElementById("btnBackToCart");
    if (btnBackToCart) {
      btnBackToCart.addEventListener("click", function() {
        closeCheckoutModal();
        openCartPanel();
      });
    }

    const orderForm = document.getElementById("orderForm");
    if (orderForm) orderForm.addEventListener("submit", handleOrderSubmit);

    document.querySelectorAll('input[name="orderMethod"]').forEach(function(r) {
      r.addEventListener("change", function() {
        const v = r.value;
        if (v === "dinein" && orderMode !== "dinein") setOrderMode("dinein");
        else if (v !== "dinein" && orderMode === "dinein") setOrderMode("online");
        else toggleAddressField();
      });
    });

    function scrollToMenuAndOpenCart() {
      if (getCartTotalItems() > 0) {
        openCartPanel();
      } else if (document.getElementById("menuGrid")) {
        showToast("Silakan pilih menu terlebih dahulu.");
      } else {
        navigateTo("menu.html");
      }
    }

    const btnPesanNavbar = document.getElementById("btnPesanNavbar");
    if (btnPesanNavbar) btnPesanNavbar.addEventListener("click", scrollToMenuAndOpenCart);

    const btnPesanHero = document.getElementById("btnPesanHero");
    if (btnPesanHero) btnPesanHero.addEventListener("click", scrollToMenuAndOpenCart);

    const btnPesanMobile = document.getElementById("btnPesanMobile");
    if (btnPesanMobile) {
      btnPesanMobile.addEventListener("click", function() {
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.getElementById("btnHamburger");
        if (navMenu) navMenu.classList.remove("navbar__nav--open");
        if (hamburger) hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        scrollToMenuAndOpenCart();
      });
    }

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        closeCartPanel();
        closeCheckoutModal();
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.getElementById("btnHamburger");
        if (navMenu && navMenu.classList.contains("navbar__nav--open")) {
          navMenu.classList.remove("navbar__nav--open");
          if (hamburger) hamburger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      }
    });

    logDebug("Ready ✓ Semua tombol aktif.");
  } catch (err) {
    console.error("[Kedai Lahajia] FATAL ERROR saat init:", err);
    showToast("Terjadi kesalahan saat memuat halaman. Cek Console (F12).");
  }
}

/* Panggil init segera kalau DOM sudah siap, kalau belum tunggu event */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}