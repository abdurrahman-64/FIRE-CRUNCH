/* ============================================================
   FIRE & CRUNCH — script.js
   Animated photo showcase · GSAP scroll · menuData · cart logic
   ------------------------------------------------------------
   BEGINNER'S MAP — the places you can edit things:
     1. RESTAURANT  (just below)  → name, phone, address, currency
     2. menuData    (just below)  → categories, items & prices
     3. Deals       → live in index.html (search for "deal-card")
     4. COLORS      → live in style.css (the :root block at the top)
   Everything below that works on its own — no need to touch it.
   ============================================================ */

"use strict";

/* ================= 1. EDIT ME — restaurant info ================= */
const RESTAURANT = {
  name: "Fire & Crunch",            // EDIT: your restaurant name
  currency: "Rs ",                  // EDIT: "Rs ", "$", "€" …
  phone: "+92 300 1234567",         // EDIT: your phone number
  address: "42 Grill Street, Lahore, Pakistan",
  hours: "Mon – Sun · 11:00 AM – 3:00 AM",
};

/* formats a price in Pakistani Rupees: 1699 → "Rs 1,699" */
function fmt(n) { return RESTAURANT.currency + Math.round(n).toLocaleString("en-PK"); }

/* ================= 2. EDIT ME — the menu =================
   Each category needs:
     id, emoji, title, word (the giant outlined background word),
     color (accent color), desc, photo (the big showcase picture),
     featured (shown in the showcase panel) and items (each with img).
   Prices are in whole Pakistani Rupees.
   ⚠ Keep this list in the order the photos appear on scroll. */
const menuData = [
  {
    id: "burgers", emoji: "🍔", title: "Burgers", word: "BURGER",
    color: "#ff3b30",
    photo: "images/double-cheese-burger.jpg",
    desc: "Flame-grilled, hand-smashed patties stacked in toasted sesame buns.",
    featured: { name: "Double Cheese Burger", price: 2299 },
    items: [
      { name: "Classic Beef Burger", price: 1699, img: "images/classic-beef-burger.jpg" },
      { name: "Double Cheese Burger", price: 2299, img: "images/double-cheese-burger.jpg" },
      { name: "Spicy Zinger Burger", price: 1999, img: "images/crispy-chicken-burger.jpg" },
      { name: "BBQ Bacon Burger", price: 2399, img: "images/double-cheese-burger.jpg" },
      { name: "Crispy Chicken Burger", price: 1849, img: "images/crispy-chicken-burger.jpg" },
      { name: "Veggie Burger", price: 1549, img: "images/veggie-burger.jpg" },
    ],
  },
  {
    id: "pizza", emoji: "🍕", title: "Pizza", word: "PIZZA",
    color: "#ff9500",
    photo: "images/pepperoni-pizza.jpg",
    desc: "Stone-fired dough, slow-simmered sauce and a ridiculous amount of cheese.",
    featured: { name: "Pepperoni Feast", price: 2999 },
    items: [
      { name: "Margherita", price: 2499, img: "images/margherita.jpg" },
      { name: "Pepperoni Feast", price: 2999, img: "images/pepperoni-pizza.jpg" },
      { name: "Chicken Tikka Pizza", price: 3199, img: "images/chicken-tikka-pizza.jpg" },
      { name: "BBQ Chicken", price: 3399, img: "images/bbq-chicken-pizza.jpg" },
      { name: "Veggie Supreme", price: 2799, img: "images/margherita.jpg" },
      { name: "Cheese Burst", price: 3499, img: "images/cheese-burst.jpg" },
    ],
  },
  {
    id: "pasta", emoji: "🍝", title: "Pasta", word: "PASTA",
    color: "#ffcc00",
    photo: "images/creamy-alfredo.jpg",
    desc: "Freshly boiled pasta tossed in rich, slow-cooked sauces.",
    featured: { name: "Creamy Alfredo", price: 2399 },
    items: [
      { name: "Creamy Alfredo", price: 2399, img: "images/creamy-alfredo.jpg" },
      { name: "Spicy Arrabbiata", price: 2249, img: "images/spicy-arrabbiata.jpg" },
      { name: "Chicken Mac & Cheese", price: 2099, img: "images/chicken-mac-cheese.jpg" },
      { name: "Lasagna", price: 2699, img: "images/lasagna.jpg" },
      { name: "Pesto Penne", price: 2349, img: "images/pesto-penne.jpg" },
    ],
  },
  {
    id: "chicken", emoji: "🍗", title: "Fried Chicken", word: "CHICKEN",
    color: "#ffc300",
    photo: "images/crispy-chicken.jpg",
    desc: "Double-dredged, pressure-fried and impossibly crunchy.",
    featured: { name: "4 Pc Combo", price: 2499 },
    items: [
      { name: "2 Pc Crispy Chicken", price: 1399, img: "images/crispy-chicken.jpg" },
      { name: "4 Pc Combo", price: 2499, img: "images/crispy-chicken.jpg" },
      { name: "Hot Wings (8 pc)", price: 1999, img: "images/hot-wings.jpg" },
      { name: "Chicken Nuggets (10 pc)", price: 1699, img: "images/chicken-nuggets.jpg" },
      { name: "Popcorn Chicken Bucket", price: 1849, img: "images/popcorn-chicken.jpg" },
    ],
  },
  {
    id: "fries", emoji: "🍟", title: "Fries & Sides", word: "FRIES",
    color: "#ffab00",
    photo: "images/classic-fries.jpg",
    desc: "Golden, crispy and salty-sweet — the supporting act that steals the show.",
    featured: { name: "Loaded Cheese Fries", price: 1249 },
    items: [
      { name: "Classic Fries", price: 699, img: "images/classic-fries.jpg" },
      { name: "Loaded Cheese Fries", price: 1249, img: "images/loaded-cheese-fries.jpg" },
      { name: "Curly Fries", price: 999, img: "images/curly-fries.jpg" },
      { name: "Onion Rings", price: 999, img: "images/onion-rings.jpg" },
      { name: "Garlic Bread", price: 1099, img: "images/garlic-bread.jpg" },
      { name: "Coleslaw", price: 549, img: "images/coleslaw.jpg" },
    ],
  },
  {
    id: "wraps", emoji: "🌯", title: "Wraps & Shawarma", word: "WRAP",
    color: "#2ecc71",
    photo: "images/chicken-shawarma.jpg",
    desc: "Rolled tight, grilled to order and packed with garlicky goodness.",
    featured: { name: "Chicken Shawarma", price: 1399 },
    items: [
      { name: "Chicken Shawarma", price: 1399, img: "images/chicken-shawarma.jpg" },
      { name: "Beef Shawarma", price: 1549, img: "images/beef-shawarma.jpg" },
      { name: "Zinger Wrap", price: 1699, img: "images/zinger-wrap.jpg" },
      { name: "Falafel Wrap", price: 1249, img: "images/falafel-wrap.jpg" },
      { name: "Hot Dog", price: 1099, img: "images/hot-dog.png" },
      { name: "Club Sandwich", price: 1699, img: "images/club-sandwich.jpg" },
    ],
  },
  {
    id: "drinks", emoji: "🥤", title: "Drinks", word: "DRINKS",
    color: "#29b6f6",
    photo: "images/cola.jpg",
    desc: "Ice-cold fizz, fresh-squeezed lemonade and thick, spoonable shakes.",
    featured: { name: "Chocolate Milkshake", price: 1099 },
    items: [
      { name: "Cola / Sprite / Fanta", price: 399, img: "images/cola.jpg" },
      { name: "Fresh Lemonade", price: 699, img: "images/lemonade.jpg" },
      { name: "Mint Margarita", price: 849, img: "images/mint-margarita.jpg" },
      { name: "Chocolate Milkshake", price: 1099, img: "images/chocolate-milkshake.jpg" },
      { name: "Strawberry Shake", price: 1099, img: "images/chocolate-milkshake.jpg" },
      { name: "Iced Coffee", price: 949, img: "images/iced-coffee.jpg" },
    ],
  },
  {
    id: "desserts", emoji: "🍨", title: "Desserts", word: "DESSERT",
    color: "#ff5c8a",
    photo: "images/ice-cream-sundae.jpg",
    desc: "Because you walked past the fryer and you deserve a reward.",
    featured: { name: "Ice Cream Sundae", price: 1099 },
    items: [
      { name: "Chocolate Brownie", price: 949, img: "images/chocolate-brownie.jpg" },
      { name: "Ice Cream Sundae", price: 1099, img: "images/ice-cream-sundae.jpg" },
      { name: "Fudge Cake Slice", price: 1099, img: "images/fudge-cake.jpg" },
      { name: "Donuts (3 pc)", price: 949, img: "images/donuts.jpg" },
      { name: "Apple Pie", price: 799, img: "images/apple-pie.jpg" },
    ],
  },
];

/* ================= Flags & shared state ================= */
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE_POINTER = window.matchMedia("(pointer: fine)").matches;
const mobileQuery = window.matchMedia("(max-width: 768px)");
const IS_MOBILE = () => mobileQuery.matches;

const photoCards = [];          // one big animated photo per category
const tiltTarget = { x: 0, y: 0 };  // cursor tilt target (degrees)
let showTl = null;              // the pinned GSAP timeline
let currentCat = -1;
let currentIndex = 0;           // photo currently on stage (idle animation)
let lenis = null;

/* ============================================================
   CART
   ============================================================ */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("fc_cart")) || []; } catch (e) { cart = []; }
if (!Array.isArray(cart)) cart = [];

function saveCart() { localStorage.setItem("fc_cart", JSON.stringify(cart)); }
function cartTotal() { return cart.reduce((s, it) => s + it.price * it.qty, 0); }

function addToCart(name, price, btn, qty = 1) {
  const existing = cart.find((i) => i.name === name);
  if (existing) existing.qty += qty; else cart.push({ name, price, qty });
  saveCart(); renderCart(); updateBadge(true);
  sfx("pop"); buzz("pop");            // 🎬 sound + haptic feedback
  flyToCart(btn);
  showToast("🍔 " + name + (qty > 1 ? " ×" + qty : "") + " added to cart");
}

function changeQty(name, delta) {
  const it = cart.find((i) => i.name === name);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) cart = cart.filter((i) => i !== it);
  saveCart(); renderCart(); updateBadge(false);
}

function updateBadge(animate) {
  const badge = document.getElementById("cartBadge");
  const count = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = count;
  badge.style.display = count ? "flex" : "none";
  if (animate && count && window.gsap) {
    gsap.fromTo(badge, { scale: 1.6 }, { scale: 1, duration: .3, ease: "back.out(2)" });
  }
}

function renderCart() {
  const list = document.getElementById("cartItems");
  if (!cart.length) {
    list.innerHTML = `<p class="cart-empty">Your cart is empty 🍽️<br/>Go grab something tasty!</p>`;
  } else {
    list.innerHTML = cart.map((it) => `
      <div class="cart-item">
        <div class="cart-item-info"><h5>${it.name}</h5>
          <span>${fmt(it.price * it.qty)}</span></div>
        <div class="qty">
          <button data-dec="${it.name}" aria-label="Decrease">−</button>
          <span>${it.qty}</span>
          <button data-inc="${it.name}" aria-label="Increase">+</button>
        </div>
      </div>`).join("");
  }
  document.getElementById("cartTotal").textContent = fmt(cartTotal());
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}
function checkout() {
  if (!cart.length) { showToast("Your cart is empty — add something tasty!"); return; }
  sfx("pop"); buzz("pop");
  cart = [];
  saveCart(); renderCart(); updateBadge(false); closeCart();
  showToast("🎉 Order placed! (demo checkout)");
}

/* Small "fly to cart" animation when an item is added */
function flyToCart(btn) {
  if (!btn || REDUCED || !window.gsap) return;
  const cartBtn = document.getElementById("cartBtn");
  const a = btn.getBoundingClientRect(), b = cartBtn.getBoundingClientRect();
  const dot = document.createElement("span");
  dot.className = "fly-dot";
  dot.style.left = (a.left + a.width / 2) + "px";
  dot.style.top = (a.top + a.height / 2) + "px";
  document.body.appendChild(dot);
  gsap.to(dot, {
    left: b.left + b.width / 2, top: b.top + b.height / 2, scale: .3,
    duration: .7, ease: "power2.in",
    onComplete: () => dot.remove(),
  });
}

function initCart() {
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);

  document.getElementById("cartItems").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) changeQty(inc.dataset.inc, +1);
    if (dec) changeQty(dec.dataset.dec, -1);
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn");
    if (!btn) return;
    const stepper = btn.parentElement.querySelector(".qty-pick .qty-val");
    addToCart(btn.dataset.name, parseFloat(btn.dataset.price), btn,
      stepper ? parseInt(stepper.textContent, 10) || 1 : 1);
  });

  document.addEventListener("click", (e) => {
    const plus = e.target.closest(".qty-plus");
    const minus = e.target.closest(".qty-minus");
    if (!plus && !minus) return;
    const val = e.target.parentElement.querySelector(".qty-val");
    let n = parseInt(val.textContent, 10) || 1;
    n = Math.min(9, Math.max(1, n + (plus ? 1 : -1)));
    val.textContent = n;
    buzz("pop");
  });

  renderCart();
  updateBadge(false);
}

/* ============================================================
   TOAST + SMALL UI HELPERS
   ============================================================ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function scrollToEl(el) {
  if (lenis) lenis.scrollTo(el, { offset: -60 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/* ============================================================
   THE BURGER ASSEMBLY — a burger built from pure CSS layers
   (weighs nothing, runs on any device). On load the layers fly
   in from everywhere and click together into the burger, then
   it floats gently with a warm glow beneath.
   ============================================================ */
function buildHeroBurger() {
  const hero = document.getElementById("heroFood");
  if (!hero) return;
  hero.innerHTML = `
    <div class="burger-3d">
      <div class="bl bl-top"></div>
      <div class="bl bl-lettuce"></div>
      <div class="bl bl-cheese"></div>
      <div class="bl bl-tomato"></div>
      <div class="bl bl-patty"></div>
      <div class="bl bl-bun"></div>
    </div>
    <div class="burger-glow"></div>`;
}

function assembleHeroBurger() {
  const layers = document.querySelectorAll(".hero-food .bl");
  if (REDUCED || !window.gsap || !layers.length) return;

  // every layer flies in from a different direction and clicks together
  gsap.fromTo(layers, {
    y: (i) => (i % 2 ? -150 : 170),
    x: (i) => (i % 2 ? -70 : 70),
    rotation: (i) => (i % 2 ? -24 : 18),
    opacity: 0,
    scale: 1.25,
  }, {
    y: 0, x: 0, rotation: 0, opacity: 1, scale: 1,
    duration: .95,
    stagger: .13,
    ease: "back.out(1.7)",
    onComplete() {
      // the satisfying squash when the burger lands
      gsap.fromTo(".hero-food .burger-3d", { scaleY: .86 },
        { scaleY: 1, duration: .6, ease: "elastic.out(1,.4)" });
      // sparkle pop as it completes
      const r = document.querySelector(".hero-food").getBoundingClientRect();
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        spawnSparkle(r.left + r.width / 2 + Math.cos(a) * r.width * .4,
          r.top + r.height / 2 + Math.sin(a) * r.height * .4, true);
      }
      sfx("pop"); buzz("burst");
    },
  });
}

/* ============================================================
   THE PHOTO STAGE — big real food photos, alive with motion.
   Pure CSS/GSAP transforms: silky on phones and old laptops.
   ============================================================ */

function buildPhotoStage() {
  const stage = document.getElementById("photoStage");
  menuData.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "stage-photo";
    card.title = "Tap me ✨";
    card.innerHTML = `
      <div class="sp-inner">
        <span>${c.emoji}</span>
        <img src="${c.photo}" alt="${c.title}" loading="lazy" onerror="this.remove()">
      </div>`;
    card.style.zIndex = 2 + i;
    stage.appendChild(card);
    photoCards.push(card);
  });
}

/* ---------- idle life: bobbing + slow breathing zoom + cursor tilt ---------- */
function initPhotoIdle() {
  if (REDUCED || !window.gsap) return;

  if (FINE_POINTER) {
    addEventListener("mousemove", (e) => {
      tiltTarget.x = (e.clientY / innerHeight - .5) * 9;
      tiltTarget.y = (e.clientX / innerWidth - .5) * 13;
    }, { passive: true });
  }

  gsap.ticker.add((time) => {
    // smooth cursor tilt
    const setTilt = (el) => {
      if (!el) return;
      const bob = Math.sin(time * 1.3) * 7;
      const wob = Math.sin(time * .7) * 5;
      el.style.transform =
        "translateY(" + bob.toFixed(2) + "px) rotateY(" + (tiltTarget.y + wob).toFixed(2) + "deg) rotateX(" +
        (-tiltTarget.x).toFixed(2) + "deg)";
    };
    // gentle Ken-Burns breathing on the photo itself
    const zoom = 1 + Math.sin(time * .45) * .035;

    const cur = photoCards[currentIndex];
    if (cur) {
      const inner = cur.querySelector(".sp-inner");
      setTilt(inner);
      const img = cur.querySelector("img");
      if (img) img.style.transform = "scale(" + zoom.toFixed(3) + ")";
    }
  });
}

/* tap a photo → magic burst */
function initTapBurst() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("a,button,.panel,.navbar,.cart-drawer,.dot,.side-nav")) return;
    const card = e.target.closest(".stage-photo, .hero-food");
    if (!card) return;

    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = r.width * .35 + Math.random() * r.width * .3;
      spawnSparkle(cx + Math.cos(a) * d, cy + Math.sin(a) * d, true);
    }
    sfx("magic"); buzz("burst");

    const inner = card.querySelector(".sp-inner, .burger-3d");
    if (inner && window.gsap) {
      gsap.fromTo(inner, { scale: 1.08, rotationY: -10 },
        { scale: 1, rotationY: 0, duration: .9, ease: "elastic.out(1,.45)" });
    }
  });
}

/* ============================================================
   MAGIC — sparkle trail + tiny sounds & haptics
   ============================================================ */
const SPARKLE_COLORS = ["#ffcc00", "#ff9500", "#ff3b30", "#ffffff"];

function spawnSparkle(x, y, big = false) {
  const s = document.createElement("span");
  s.className = "sparkle" + (big ? " big" : "");
  s.textContent = "✦";
  s.style.left = x + "px";
  s.style.top = y + "px";
  s.style.color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  s.style.setProperty("--dx", ((Math.random() - .5) * 46) + "px");
  s.style.setProperty("--rot", ((Math.random() * 180 - 90)) + "deg");
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 800);
}

function initSparkleTrail() {
  if (!FINE_POINTER || REDUCED) return;
  let last = { x: 0, y: 0 }, lastTime = 0;
  addEventListener("mousemove", (e) => {
    const now = performance.now();
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    if (now - lastTime < 45 || dx * dx + dy * dy < 130) return;
    last = { x: e.clientX, y: e.clientY };
    lastTime = now;
    spawnSparkle(e.clientX, e.clientY);
  }, { passive: true });
}

/* tiny synthesized sound effects — no audio files needed */
let audioCtx = null;
function sfx(kind) {
  if (REDUCED) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;
    if (kind === "pop") {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(320, t);
      o.frequency.exponentialRampToValueAtTime(660, t + .12);
      g.gain.setValueAtTime(.18, t);
      g.gain.exponentialRampToValueAtTime(.001, t + .16);
      o.connect(g).connect(audioCtx.destination);
      o.start(t); o.stop(t + .18);
    } else if (kind === "magic") {
      [880, 1174, 1568, 2093].forEach((f, i) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = "sine"; o.frequency.value = f;
        const st = t + i * .07;
        g.gain.setValueAtTime(.12, st);
        g.gain.exponentialRampToValueAtTime(.001, st + .22);
        o.connect(g).connect(audioCtx.destination);
        o.start(st); o.stop(st + .25);
      });
    }
  } catch (e) { /* audio is a bonus — never block on it */ }
}

function buzz(name) {
  if (typeof window.haptic === "function") window.haptic(name);
}

/* ============================================================
   SHOWCASE — pinned scroll section that swaps photos & menu info
   ============================================================ */
function buildShowcaseDOM() {
  const n = menuData.length;
  const wordsEl = document.getElementById("bigWords");
  const panelsEl = document.getElementById("panels");
  const dotsEl = document.getElementById("dots");

  menuData.forEach((c, i) => {
    const w = document.createElement("div");
    w.className = "big-word";
    w.textContent = c.word;
    wordsEl.appendChild(w);

    const p = document.createElement("article");
    p.className = "panel glass " + (i % 2 ? "right" : "left");
    p.innerHTML = `
      <div class="food-thumb panel-thumb" style="--c:${c.color}"><span>${c.emoji}</span><img src="${c.photo}" alt="${c.title}" loading="lazy" onerror="this.remove()"></div>
      <span class="panel-tag">${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}</span>
      <h3 class="panel-title">${c.title}</h3>
      <p class="panel-desc">${c.desc}</p>
      <div class="panel-featured"><span>${c.featured.name}</span>
        <strong>${fmt(c.featured.price)}</strong></div>
      <ul class="panel-list">${c.items.slice(0, 4).map((it) =>
        `<li>${it.name}<span>${fmt(it.price)}</span></li>`).join("")}</ul>
      <button class="btn btn-primary add-btn" data-name="${c.featured.name}" data-price="${c.featured.price}">Add to Cart</button>`;
    panelsEl.appendChild(p);

    const d = document.createElement("button");
    d.className = "dot"; d.type = "button";
    d.title = c.title; d.setAttribute("aria-label", c.title);
    dotsEl.appendChild(d);
  });
}

function setCategory(i) {
  if (i === currentCat) return;
  currentCat = i;
  currentIndex = i;
  document.querySelectorAll(".dot").forEach((d, di) => d.classList.toggle("active", di === i));
}

/* tiny color helper so the glow cross-fade needs no extra library */
function GSAP_ColorShim(hex) {
  const v = parseInt(hex.slice(1), 16);
  this.r = (v >> 16 & 255) / 255;
  this.g = (v >> 8 & 255) / 255;
  this.b = (v & 255) / 255;
}
GSAP_ColorShim.prototype.lerp = function (other, p) {
  this.r += (other.r - this.r) * p;
  this.g += (other.g - this.g) * p;
  this.b += (other.b - this.b) * p;
  return this;
};
GSAP_ColorShim.prototype.getHexString = function () {
  const to = (x) => Math.round(Math.min(1, Math.max(0, x)) * 255)
    .toString(16).padStart(2, "0");
  return to(this.r) + to(this.g) + to(this.b);
};

function buildShowcaseScroll() {
  const n = menuData.length;
  const panels = gsap.utils.toArray(".panel");
  const words = gsap.utils.toArray(".big-word");
  const progressFill = document.getElementById("progressFill");
  const glowEl = document.getElementById("glow");

  gsap.set(panels, { autoAlpha: 0, yPercent: IS_MOBILE() ? 0 : -50 });
  gsap.set(panels[0], { autoAlpha: 1 });
  gsap.set(words, { autoAlpha: 0 });
  gsap.set(words[0], { autoAlpha: 1 });
  photoCards.forEach((c, i) => { gsap.set(c, { autoAlpha: i === 0 ? 1 : 0, scale: 1 }); });

  function paintBg(fromHex, toHex, p) {
    const c = new GSAP_ColorShim(fromHex).lerp(new GSAP_ColorShim(toHex), p);
    const hex = "#" + c.getHexString();
    document.documentElement.style.setProperty("--accent", hex);
    glowEl.style.background = "radial-gradient(60% 55% at 50% 42%, " + hex + "42, transparent 70%)";
  }
  paintBg(menuData[0].color, menuData[0].color, 0);

  showTl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: "#showcase",
      start: "top top",
      end: "+=" + window.innerHeight * 7,
      scrub: REDUCED ? true : 1,
      pin: true,
      anticipatePin: 1,
      onUpdate(self) {
        if (progressFill) progressFill.style.transform = "scaleY(" + self.progress + ")";
        setCategory(Math.min(n - 1, Math.floor(self.progress * 7.5)));
      },
    },
  });

  for (let i = 0; i < n - 1; i++) {
    const t = i;
    const outDir = panels[i].classList.contains("right") ? 90 : -90;
    const inDir = panels[i + 1].classList.contains("right") ? 90 : -90;

    // current photo spins away and shrinks into the depth
    showTl.to(photoCards[i], {
      autoAlpha: 0, scale: .55, rotationY: "+=1.1", y: 170,
      duration: .5, ease: "power2.in",
    }, t + .05);

    // current panel + giant word slide out
    showTl.to(panels[i], { autoAlpha: 0, x: outDir, duration: .35 }, t + .1);
    showTl.to(words[i], { autoAlpha: 0, y: -80, duration: .35 }, t + .1);

    // next photo flies in from above with a bounce and a spin
    showTl.fromTo(photoCards[i + 1], {
      autoAlpha: 0, scale: .6, rotationY: -1.3, y: -190,
    }, {
      autoAlpha: 1, scale: 1, rotationY: 0, y: 0,
      duration: .55, ease: "back.out(1.6)",
    }, t + .5);

    // next panel + word fly in
    showTl.fromTo(panels[i + 1], { autoAlpha: 0, x: inDir }, { autoAlpha: 1, x: 0, duration: .4 }, t + .55);
    showTl.fromTo(words[i + 1], { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: .4 }, t + .55);

    // background + accent color cross-fade
    const o = { p: 0 };
    showTl.to(o, {
      p: 1, duration: .65, ease: "none",
      onUpdate() { paintBg(menuData[i].color, menuData[i + 1].color, o.p); },
    }, t + .15);
  }

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.addEventListener("click", () => {
      const st = showTl.scrollTrigger;
      const y = st.start + (st.end - st.start) * ((i + .55) / 7.5);
      if (lenis) lenis.scrollTo(y, { duration: 1.2 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  setCategory(0);
}

/* ============================================================
   NAV · CURSOR · COUNTERS · REVIEWS · MISC
   ============================================================ */
function initLenis() {
  if (REDUCED || !window.Lenis) return;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function initNav() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  const burger = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    links.classList.toggle("open");
    burger.classList.toggle("active");
  });
  window.closeMobileNav = () => { links.classList.remove("open"); burger.classList.remove("active"); };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length < 2) { e.preventDefault(); return; }
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      window.closeMobileNav();
      scrollToEl(el);
    });
  });
}

function initCursor() {
  if (!FINE_POINTER || REDUCED) return;
  document.body.classList.add("custom-cursor");
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });
  (function ringLoop() {
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(ringLoop);
  })();
  const GROW = "a,button,.menu-card,.deal-card";
  document.addEventListener("mouseover", (e) => { if (e.target.closest(GROW)) ring.classList.add("grow"); });
  document.addEventListener("mouseout", (e) => { if (e.target.closest(GROW)) ring.classList.remove("grow"); });
}

function initReveals() {
  if (REDUCED) return;
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 45, autoAlpha: 0, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    ScrollTrigger.create({
      trigger: el, start: "top 88%", once: true,
      onEnter() {
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: 1.6, ease: "power1.out",
          onUpdate() { el.textContent = Math.round(o.v).toLocaleString() + suffix; },
        });
      },
    });
  });
}

function initDealTilt() {
  if (!FINE_POINTER || REDUCED) return;
  document.querySelectorAll(".deal-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = "perspective(700px) rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 10) + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

function startCountdown() {
  const el = document.getElementById("dealTimer");
  if (!el) return;
  const pad = (v) => String(v).padStart(2, "0");
  function tick() {
    const now = new Date();
    const end = new Date(); end.setHours(23, 59, 59, 999);
    let s = Math.max(0, Math.floor((end - now) / 1000));
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    el.innerHTML = "⏰ Deal ends in <strong>" + pad(h) + "h " + pad(m) + "m " + pad(s) + "s</strong>";
  }
  tick();
  setInterval(tick, 1000);
}

function initNewsletter() {
  const form = document.getElementById("newsForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("🔥 Subscribed! Hot deals are on the way.");
    form.reset();
  });
}

function renderMenu() {
  const wrap = document.getElementById("menuGrid");
  menuData.forEach((c) => {
    const cat = document.createElement("div");
    cat.className = "menu-cat";
    cat.innerHTML = `
      <h3 class="menu-cat-title" data-reveal><span>${c.emoji}</span> ${c.title}</h3>
      <div class="menu-grid">
        ${c.items.map((it) => `
          <div class="menu-card glass" data-reveal>
            <div class="food-thumb" style="--c:${c.color}"><span>${c.emoji}</span>${it.img ? `<img src="${it.img}" alt="${it.name}" loading="lazy" onerror="this.remove()">` : ""}</div>
            <div class="menu-card-top"><h4>${it.name}</h4>
              <span class="price">${fmt(it.price)}</span></div>
            <div class="qty-pick">
              <button type="button" class="qty-minus" aria-label="Fewer">−</button>
              <span class="qty-val">1</span>
              <button type="button" class="qty-plus" aria-label="More">+</button>
            </div>
            <button class="btn btn-primary btn-small add-btn" data-name="${it.name}" data-price="${it.price}">Add to Cart</button>
          </div>`).join("")}
      </div>`;
    wrap.appendChild(cat);
  });
}

function renderReviewsMarquee() {
  const track = document.getElementById("reviewTrack");
  track.innerHTML += track.innerHTML;
}

function applyRestaurantInfo() {
  document.title = RESTAURANT.name + " — Real Food, Real Fast";
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("contactPhone", RESTAURANT.phone);
  set("contactAddress", RESTAURANT.address);
  set("contactHours", RESTAURANT.hours);
  set("footerName", RESTAURANT.name);
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- Opening splash: name slams in center, glides to navbar ---------- */
function playIntro() {
  const loader = document.getElementById("loader");
  const name = document.getElementById("loaderName");
  const nav = document.getElementById("navbar");
  if (!loader || !name || !nav) return;

  if (REDUCED || !window.gsap) { loader.remove(); return; }
  nav.classList.add("splash-live");          // hide nav logo while the splash IS the logo

  // 1) the name lands letter by letter, flame flickers
  const text = name.textContent.trim();
  name.textContent = "";
  [...text].forEach((ch) => {
    const s = document.createElement("span");
    s.textContent = ch;
    s.style.display = "inline-block";
    name.appendChild(s);
  });
  gsap.from(".loader-flame", { scale: 0, autoAlpha: 0, duration: .45 });
  gsap.from(name.children, {
    y: 70, autoAlpha: 0, duration: .55, stagger: .05, ease: "power3.out", delay: .15,
  });
  gsap.from(".loader-sub", { autoAlpha: 0, y: 12, duration: .4, delay: .6 });

  // 2) hold a beat, then the name glides up into the navbar slot
  gsap.delayedCall(1.25, () => {
    const logoSpan = document.querySelector(".logo > span");
    if (!logoSpan) { loader.remove(); nav.classList.remove("splash-live"); return; }

    const r1 = name.getBoundingClientRect();
    const r2 = logoSpan.getBoundingClientRect();
    const dx = (r2.left + r2.width / 2) - (r1.left + r1.width / 2);
    const dy = (r2.top + r2.height / 2) - (r1.top + r1.height / 2);

    // pin the name where it is so we can FLIP it to the logo's spot
    gsap.set(name, {
      position: "fixed", left: r1.left, top: r1.top,
      margin: 0, width: r1.width, transformOrigin: "center center",
    });

    // as the name lifts off, the splash background melts away
    gsap.to(".loader-flame, .loader-sub", { autoAlpha: 0, y: -16, duration: .35 });
    gsap.to(loader, { backgroundColor: "rgba(13,13,13,0)", duration: .8 });
    heroIntro();                             // hero text slides in under it
    assembleHeroBurger();                    // the burger builds itself 🍔

    gsap.to(name, {
      x: dx, y: dy,
      scale: Math.max(.05, r2.width / r1.width),
      duration: .85, ease: "power3.inOut",
      onComplete() {
        loader.remove();
        nav.classList.remove("splash-live"); // the real logo takes over seamlessly
        gsap.set(name, { clearProps: "all" });
      },
    });
  });
}

function heroIntro() {
  if (REDUCED) return;
  gsap.from(".hero-content > *", {
    y: 40, autoAlpha: 0, duration: .6, stagger: .08, ease: "power2.out", delay: .3,
  });
}

function onResize() {
  gsap.set(".panel", { yPercent: IS_MOBILE() ? 0 : -50 });
}

/* ============================================================
   BOOT
   ============================================================ */
(function boot() {
  try {
    if (!window.gsap || !window.ScrollTrigger) {
      const t = document.querySelector(".loader-sub");
      if (t) t.textContent = "connect to the internet once, then this loads instantly";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    applyRestaurantInfo();
    buildShowcaseDOM();
    buildPhotoStage();
    buildHeroBurger();
    renderMenu();
    renderReviewsMarquee();
    initLenis();
    buildShowcaseScroll();
    initPhotoIdle();
    initCart();
    initNav();
    initCursor();
    initSparkleTrail();
    initTapBurst();
    initReveals();
    initCounters();
    initDealTilt();
    startCountdown();
    initNewsletter();
    playIntro();

    window.addEventListener("load", () => ScrollTrigger.refresh());
    window.addEventListener("resize", onResize);
  } catch (err) {
    // never leave the user staring at the loader — show the page regardless
    console.warn("Startup issue:", err);
    const l = document.getElementById("loader");
    if (l) l.remove();
    document.querySelectorAll(".panel, .big-word").forEach((el, i) => {
      if (i === 0) el.style.opacity = 1; else el.style.opacity = 0;
    });
  }
})();