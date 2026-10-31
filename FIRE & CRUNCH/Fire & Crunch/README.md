# 🔥 Fire & Crunch — Real 3D Food Restaurant Website

A single-page restaurant website. As you scroll, a **real 3D food model** floats in the center and changes — Burger → Pizza → Fries → Wrap → Drinks → Desserts — along with the background glow, the giant outlined word and the menu info (pasta & fried chicken show big animated photo cards, keeping the site light).

All prices are in **Pakistani Rupees (Rs)**.

## ✨ Features

- **Real 3D food models, stored locally** — a cheeseburger, pizza, fries, wrap, drink and donut load instantly from the `models/` folder (CC0, free to use). No model CDN, no rate limits, no waiting
- **⚡ Fast everywhere** — pixel ratio capped, 3D rendering pauses the moment it's covered or the tab is hidden, liquid-glass blur only on a few key surfaces
- **Liquid glass design** — every card is frosted glass with refraction edges, specular light pooling and glassy rims
- **Animated photo stage** — pasta & fried chicken float as breathing photo cards that tilt in 3D perspective
- **Opening splash** — the café name lands letter-by-letter in the center, then slides up into the navbar
- **Pinned scroll showcase** — each model spins out in perspective and the next flies in with a bounce, with background color changes, a progress bar and side dots
- **🪄 Magic interactions** — sparkle trail behind your cursor, **tap the food for a magic burst** (elastic spin + sparkles + chime), synthesized pop sounds (Web Audio, no files), and real Taptic haptics on iPhone
- **8 menu categories, 45+ items** with prices in Rs, all editable in one array
- **Real food photos on every card & deal** — free-to-use photography from Wikimedia Commons, stored locally in `images/` (each card can point to any picture with `img: "images/..."`, and falls back to the emoji art if a file is missing)
- **Quantity steppers** — pick how many you want with the − / + counter right on the card, then add them all to the cart in one tap
- **Working cart** — add to cart from anywhere, quantity +/−, total in Rs, saved in `localStorage`, "fly to cart" animation, navbar badge
- **Deals section** with tilting cards and a live countdown timer
- Animated counters, auto-sliding reviews, custom cursor, smooth scrolling (Lenis), glassmorphism cards
- Fully responsive with a mobile hamburger menu and notch-safe spacing
- Respects `prefers-reduced-motion` and automatically simplifies motion on mobile

## ▶ How to run (beginner friendly)

1. Keep the whole folder in one place (`index.html`, `style.css`, `script.js`, `images/`).
2. **Connect to the internet once** — the animation libraries load from a CDN. All photos are local and always work.
3. Double-click `index.html`. That's it. (Optional: use the **Live Server** extension in VS Code and click "Go Live" for auto-reload.)

## ✏️ How to edit

| What | Where |
|------|-------|
| Restaurant name, phone, address, hours, currency | `RESTAURANT` object at the top of `script.js` |
| Menu items, prices, colors per category, descriptions | `menuData` array at the top of `script.js` (each item has `img: "images/..."` — swap in your own photo files any time) |
| The big showcase photo per category | the `photo:` line of each category in `menuData` |
| The food photos | the `images/` folder — free-to-use photos from Wikimedia Commons; add your own files and point `img` at them |
| Theme colors (red/orange/yellow/background) | `:root` block at the top of `style.css` |
| Deals, prices and badges | `index.html` — search for `deal-card` |
| Counters numbers | `index.html` — the `data-count` attributes |
| Reviews | `index.html` — inside `reviewTrack` |
| Map | `index.html` — replace the `map-placeholder` div with your Google Maps embed iframe |

## 🧰 Tech

- [Three.js](https://threejs.org) (CDN) + GLTFLoader — renders the real `.glb` food models
- [GSAP + ScrollTrigger](https://gsap.com) (CDN) — scroll-driven transitions & 3D animation
- [Lenis](https://lenis.darkroom.engineering) (CDN) — smooth scrolling
- Google Fonts: Bebas Neue + Poppins
- Web Audio — tiny synthesized sound effects, no audio files
- No build tools, no frameworks — just open the file

## 📦 The 3D models (models/ folder)

All are **CC0 / public domain** — free for personal and commercial use, no credit required:

- `burger.glb` · `pizza.glb` · `fries.glb` · `wrap.glb` · `drink.glb` · `donut.glb`
- Source: [Grab3D](https://grab3d.com) (CC0)
- Pasta & fried chicken intentionally use animated photo cards instead — keeps the site light. To give them models too, drop any `.glb` in `models/` and add a `model:` line to that category in `menuData`.

## 🚀 Phase 2 ideas

Sizzle sound effects, dark/light toggle, WhatsApp checkout, and an admin page to edit the menu.
