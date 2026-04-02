# UI Design System & React Architecture: Editorial POS

## 1. Design System Specifications

### 1.1 Typography Hierarchy
The design relies on a strong, dual-font typographic hierarchy with heavy tracking (letter-spacing) and uppercase formatting to denote authority and labels.
* **Headlines (`font-headline`):** **Manrope** (Weights: 400, 700, 800). Used for page titles, numerical stats, item names.
* **Body & Labels (`font-body`, `font-label`):** **Public Sans** (Weights: 300, 400, 600, 700, 900). Used for supporting text, SKU numbers, table headers, micro-copy.
* **Iconography:** **Material Symbols Outlined** (Settings: `FILL 0` or `1`, `wght 400`, `GRAD 0`, `opsz 24`).

### 1.2 Core Color Palette (MD3 Token System)
* **Primary (Teals/Greens):** Actions, branding, positive indicators.
  * Base: `#005050` | Container: `#006a6a` | On-Primary: `#ffffff`
  * Signature Gradient: `linear-gradient(135deg, #005050 0%, #006a6a 100%)`
* **Secondary (Slate/Blue-Greys):** Structural elements, inactive states.
  * Base: `#535e7e` | Container: `#ced9ff`
* **Tertiary (Reds):** Alerts, low stock, expiries.
  * Base: `#94000a` | Container: `#bb1b1b` | Error Container: `#ffdad6`
* **Surfaces (Tonal Layering):**
  * Background: `#f7faf9` | Surface Low: `#f1f4f3` | Surface High: `#e6e9e8`

### 1.3 Layout Architecture
* **Desktop (`lg:flex`):** Fixed left sidebar (`w-72`, `h-screen`). Main canvas is padded (`lg:ml-72`, `p-12`) using a 12-column grid (`xl:grid-cols-12`).
* **Mobile (`lg:hidden`):** Fixed top App Bar (`h-16`) and fixed bottom glassmorphism navigation (`bg-white/80 backdrop-blur-xl`).

---

## 2. React Implementation & Directory Structure

This structure follows a feature-based atomic design pattern to keep Tailwind classes manageable and UI highly reusable.

```text
src/
├── assets/
│   ├── fonts/           # Manrope, Public Sans
│   └── icons/           # Material Symbols
├── components/
│   ├── layout/          # Scaffolding components
│   │   ├── DashboardLayout.jsx
│   │   ├── DesktopSidebar.jsx
│   │   ├── MobileTopBar.jsx
│   │   └── MobileBottomNav.jsx
│   ├── ui/              # Reusable primitive atomic components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── Badge.jsx
│   └── inventory/       # Feature-specific components
│       ├── PageHeader.jsx
│       ├── StatsBentoGrid.jsx
│       ├── InventoryList.jsx
│       ├── InventoryRow.jsx
│       ├── IncomingGoodsForm.jsx
│       ├── ExpiryTracker.jsx
│       └── BulkBreakingPanel.jsx
├── index.css            # Global CSS (fonts, Tailwind layers, custom classes)
├── tailwind.config.js   # MD3 Color & Font tokens
└── App.jsx