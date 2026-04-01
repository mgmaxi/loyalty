# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tienda Macro** is a Next.js 14 loyalty program e-commerce platform implementing a sophisticated **Segmentation & Personalization Engine** (CPPG - Programa de Fidelización) for Selecta customers. The app dynamically personalizes pricing, product visibility, and messaging based on customer level and engagement metrics.

### Project Purpose
The platform is a **Plataforma Integral de Fidelización** designed to:
- Incrementar el engagement y la interacción de los clientes con el Banco
- Reforzar el vínculo emocional — que los clientes se sientan valorados y recompensados
- Impulsar la adopción y uso de productos y servicios financieros
- Categorizar clientes por niveles basados en su grado de relacionamiento con el Banco
- Ofrecer beneficios y experiencias personalizadas, relevantes y oportunas
- Incorporar gamificación que incentive la participación activa
- Fomentar sentido de comunidad y pertenencia dentro del ecosistema

### Stack

- **Framework:** Next.js 14.2 with App Router
- **UI Library:** React 18 + Tailwind CSS 3.4
- **Icons:** lucide-react
- **Styling:** Custom CSS animations + Tailwind utilities
- **Font:** Poppins (Google Fonts)
- **Package manager:** npm

## Common Development Commands

```bash
# Install dependencies (run locally on Windows only)
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm lint
```

## Project Architecture

### Core Segmentation Engine (`src/lib/segmentation.js`)

The app implements a **5-scenario CPPG matrix** that determines customer experience:

1. **No Adherido** - Unadhered customer: Adhesion modal popup
2. **Riesgo de Baja** - Risk of downgrade: Red warning banner (Calculado < Real)
3. **Cerca del Ascenso** - Near level-up: Purple incentive banner (Insignias faltantes ≤ threshold)
4. **Nivel Máximo / Socio** - High-engagement top tier: Dark recognition banner
5. **Tope CPPG** - Monthly badge cap reached: Green derivation banner

Key functions:
- `getEscenarioCPPG(perfil, config)` - Determines active scenario and messaging
- `getPrecioPersonalizado(producto, perfil, _config)` - Calculates Tienda Macro discount + cuotas by level. Returns `{ precio, cuotas, descuentoAplicado, ahorroLabel }`. Reads from `BENEFICIOS_RECOMPENSAS.beneficiosAhorros.items.tiendaMacro.niveles[nivelReal]`
- `esProductoVisible(producto, perfil)` - Controls product exclusivity by level

**Token fields:** EnteMis | Apellido | Nombres | Puntos | Categoría | TipoPersona | NivelCalculado | **NivelReal** | InsigniasAcumuladas | InsigniasFaltantes

### Level System (4 levels)

| # | Nombre  | Color    | Cuotas TM | Ahorro TM | Tope TM    |
|---|---------|----------|-----------|-----------|------------|
| 1 | Nivel 1 | #94A3B8  | 12        | 0%        | —          |
| 2 | Nivel 2 | #3B82F6  | 12        | 30% TC    | $500.000   |
| 3 | Nivel 3 | #8B5CF6  | 12        | 30% TC+DB | $100.000   |
| 4 | Socio   | #1A1A2E  | 18        | 30%       | sin tope   |

> **Important:** Nivel 4 is called **"Socio"** — never "Premium" or "Nivel 4" in UI copy. The word "Selecta" should not appear in level labels or benefit copy (it's the program category, not the level name).

### Data Layer

- **`src/data/config.js`** — `DEFAULT_CONFIG` (4 niveles, CPPG rules, beneficiosPorNivel legacy) + `BENEFICIOS_RECOMPENSAS` (4-pillar benefits matrix)
- **`src/data/products.js`** — PRODUCTOS array with pricing, categories, cuota limits, and exclusivity flags
- **`src/data/profiles.js`** — PERFILES_DEMO: 7 sample customers (nivelReal 0–4, adherido true/false). Profile id:7 is the "Socio" demo.

### BENEFICIOS_RECOMPENSAS structure (`src/data/config.js`)

Four pillars, each with items keyed by nivel 1–4:

```js
BENEFICIOS_RECOMPENSAS = {
  beneficiosAhorros: { label, items: { gastronomia, supermercados, combustible, turismo, tiendaMacro } },
  productos:         { label, items: { plazoFijo } },
  experiencias:      { label, items: { tickets, gastronomiaEspectaculos } },
  servicio:          { label, items: { atencion } },
}
// Each item has: { niveles: { 1: { descripcion, tope?, ahorroPorc?, cuotasSinInteres?, ahorroLabel? }, ... } }
```

`tiendaMacro.niveles[n].ahorroLabel` drives the copy shown in `ProductCard` below the cuotas line.

### Component Structure

**Page Layout:**
- `src/app/page.js` - Main store view (Tienda + Loyalty Home toggle)
- `src/app/backoffice/page.js` - Admin panel with 5 tabs (Niveles, Reglas, Beneficios, Simulador, Escenarios)

**Core Components:**
- `Header` - Sticky header. Level badge shows `nivelConfig?.nombre` (e.g. "Nivel 2", "Socio") — no "Selecta" suffix
- `HeroBanner` - Dynamic hero with different copy for adhered vs. non-adhered
- `FeaturedProduct` - Hero cards with discount badges. Badge reads from `ahorroLabel` (e.g. "30% ahorro Tienda Macro")
- `ProductCard` - Grid item with price, cuotas, level discount badge + `ahorroLabel` line below cuotas
- `ProductCarousel` - Horizontal scrollable product sections by category
- `CPPGBanners` - Scenario-specific banners: `PopupNoAdherido` ("¡Sumate al Programa de Fidelización!"), `InlineBanner`
- `LoyaltyHome` - Full loyalty landing with 5 sections (see below)
- `CategoriesStrip`, `PromoBanners`, `BrandsStrip`, `Footer` - Static sections
- `ProfileSwitcher` - Floating menu to switch between PERFILES_DEMO

**Store Sections (ordered):**
1. Header + CPPG popups/banners
2. Hero banner
3. 2 featured products
4. "Tecnología" carousel
5. "Celulares" carousel
6. "Computación" carousel
7. "Electrodomésticos" carousel
8. Exclusive products (if nivel ≥ 3)
9. Promo banners
10. Categories strip
11. Brands strip
12. Footer

### LoyaltyHome sections (in order)

1. **Hero header** — headline dinámico: `NIVEL_IDENTITY[nivelReal].headline` para niveles 1–3; para Socio (nivel 4) se genera como `"Bienvenido, {perfil.nombres}"`. Ícono sin borde ni fondo: `animate-bounce` (2.5s) para Socio, `animate-float` (3.5s) para el resto. La animación se re-dispara en cada cambio de perfil (reset a `false` → `true` en el `useEffect`).
2. **Alerta período de gracia** — shown only when `nivelCalculado < nivelReal`
3. **3-column grid:**
   - *Card Nivel*: colored `colorBg`, ícono emoji sin círculo blanco — `animate-bounce` (Socio) o `animate-float` (resto), gradient bar
   - *Card Insignias*: monthly progress bar + "Próximo nivel" block with `animate-ringPulse` and motivational copy from `NIVEL_IDENTITY[n].motivacion`
   - *Beneficio destacado del mes*: `BENEFICIO_DESTACADO[nivelReal]` header + compact 4-pillar recompensas list
4. **Logros** — 9 achievements grid. Unlocked = blue/purple gradient + `animate-unlockShine` sweep. Locked = gray + nivel requerido label.
5. **Tabla comparativa** — full `BENEFICIOS_RECOMPENSAS` matrix. Header color `#CCBB8D` (dorado cálido) para columna "Recompensas" y niveles no activos (texto `#5C4A1E`); columna del nivel activo usa el color del nivel con texto blanco + badge "✦ TU NIVEL". Filas de pilar con fondo azul/violeta alternado. Hover sutil en filas. Primera columna sticky. No incluye nota "(CUADRO NO EXHAUSTIVO)".

### Styling System

- **Tailwind + globals.css** — Custom keyframes:
  - **Core:** fadeIn, slideUp, slideDown, slideInFromLeft, slideInFromRight, pulse, bounce, shimmer, gradientShift
  - **Experience:** progressFill, glow, float, scalePulse, countUp
  - **New (April 2026):** `levelUpBurst` (scale + radial ring on level change), `unlockShine` (sweep shimmer for achievements), `ringPulse` (soft ring for next-level progress)
- **Brand colors:** Primary #0038FF (blue), Secondary #EC4899 (pink), Gradient #4A8CFF, Dark #1A1A2E (Socio)
- **Responsive:** Mobile-first
- **Stagger delays:** animate-stagger-1 through animate-stagger-6

## Key Patterns & Conventions

### Page Structure
- All pages are **Client Components** (`"use client"`)
- State management: `useState` for profile, config, view mode
- No external state library (Redux, Zustand)

### Data Flow
1. Import `DEFAULT_CONFIG`, `BENEFICIOS_RECOMPENSAS`, `PRODUCTOS`, `PERFILES_DEMO`
2. Maintain `perfilActivo` state (user context)
3. Call `getEscenarioCPPG()` to determine banner/popup
4. Pass `perfil + config` to components for dynamic rendering
5. Filter products by `esProductoVisible()` and `exclusivoNivel` flag

### Formatting & Localization
- **Price formatting:** `.toLocaleString("es-AR")` for currency display
- **Number separators:** Argentine Spanish locale (1.000.000 format)
- **Language:** All UI text in Spanish

### Component Props Pattern
```jsx
function ProductCard({ producto, perfil, config }) {
  const { precio, cuotas, descuentoAplicado, ahorroLabel } = getPrecioPersonalizado(
    producto, perfil, config
  );
  // Render...
}
```

### Naming Conventions
- **Profile fields:** `perfil.nivelReal`, `perfil.nivelCalculado`, `perfil.adherido`, `perfil.insigniasAcumuladas`
- **Config fields:** `config.niveles[1]`, `config.reglasCPPG.*`, `BENEFICIOS_RECOMPENSAS.beneficiosAhorros.items.tiendaMacro.niveles[n]`
- **Product fields:** `producto.precio`, `producto.cuotas`, `producto.exclusivoNivel`, `producto.categoria`

### UI Copy Rules
- Level 4 = **"Socio"** everywhere (navbar, cards, banners, copy)
- No "Selecta" in level labels or benefit descriptions
- Popup title = **"¡Sumate al Programa de Fidelización!"**
- LoyaltyHome title = `NIVEL_IDENTITY[nivelReal].headline` (not a generic string)

## Recent Updates (April 2026)

### Esquema de Recompensas — Redefinición completa

**Niveles renombrados:**
- Nivel 1 → "Nivel 1" (label: "Nivel 1")
- Nivel 2 → "Nivel 2" (label: "Nivel 2")
- Nivel 3 → "Nivel 3" (label: "Nivel 3")
- Nivel 4 → **"Socio"** (color #1A1A2E, ya no "Premium")

**Nueva estructura de beneficios (`BENEFICIOS_RECOMPENSAS`):**
4 pilares con matriz completa por nivel:
- **Tus beneficios / ahorros**: Gastronomía, Supermercados, Combustible YPF, Turismo (Almundo), Tienda Macro
- **Tus productos**: Plazo Fijo Tasa Preferencial (solo N3/Socio)
- **Tus experiencias**: Tickets espectáculos, Gastronomía + Merchandising en espectáculos
- **Tu servicio**: Atención (WhatsApp → Prioridad → Ejecutivo Asignado → Concierge)

**Tienda Macro — lógica de precios actualizada:**
- Todos los niveles: 12 cuotas sin interés base
- Nivel 2+: 30% ahorro con Tarjeta de Crédito (Nivel 2), TC + Débito (Nivel 3), mejorado (Socio)
- `ahorroLabel` por nivel en config → mostrado en `ProductCard` debajo de cuotas
- Topes: N2 $500.000 / N3 $100.000 / Socio sin tope

**LoyaltyHome — gamificación y mejoras UX:**
- Copy de pertenencia por nivel (`NIVEL_IDENTITY`) con headline + motivación
- Progreso hacia siguiente nivel con barra y copy motivacional
- Sección de logros (9 achievements acumulativos, desbloqueados con shimmer)
- Beneficio destacado del mes por nivel (`BENEFICIO_DESTACADO`)
- Animación `levelUpBurst` al cambiar de perfil/nivel

**Animaciones nuevas en `globals.css`:**
- `animate-levelUpBurst` — scale + radial ring, para cambio de nivel
- `animate-unlockShine` — sweep shimmer, para logros desbloqueados
- `animate-ringPulse` — ring suave, para bloque de próximo nivel
- `animate-stagger-5/6` — delays adicionales

## Important Implementation Notes

1. **No Tests Setup** - Project currently has no Jest/Testing Library configuration.

2. **Static Data Only** - All data (products, profiles, config) is hardcoded. API route exists at `src/app/api/config/route.js` but not actively used.

3. **Exclusive Products Logic** - Products with `exclusivoNivel: 3` or `4` only appear if `perfil.nivelReal >= exclusivoNivel`.

4. **Cuotas Tienda Macro** — All levels get 12 cuotas sin interés base. Socio gets 18. This comes from `BENEFICIOS_RECOMPENSAS.tiendaMacro.niveles[n].cuotasSinInteres`, NOT from `config.niveles[n].cuotasMax`.

5. **Discounts** — `getPrecioPersonalizado` uses `ahorroPorc` from `BENEFICIOS_RECOMPENSAS` (0 for N1, 30 for N2/N3/Socio). The old `tasaDescuento` field in `config.niveles` is now 0 for all levels and should not be used for pricing.

6. **Image Handling** - next.config.js allows Unsplash + internal CDN domains; `unoptimized: true` (temporary). Local images in `/public/images/products/` with hyphens in filenames.

7. **Responsive Behavior** - Product grids collapse to single column on mobile; carousels scrollable on small screens.

8. **Git Configuration** - .gitignore excludes CLAUDE.md, .claude/, documentation files, and standard Node/Next.js patterns.

## Troubleshooting

- **Module resolution errors:** Ensure `@/` import paths point to `src/` (configured in tsconfig or next.config)
- **Missing dependencies:** Run `npm install` on local Windows machine; VM registry may be blocked
- **Styling not applying:** Check `globals.css` is imported in root layout; Tailwind classes must be in JSX/template content
- **`getPrecioPersonalizado` returning wrong discount:** Verify `BENEFICIOS_RECOMPENSAS` is imported in `segmentation.js` — it does NOT use `config.niveles[n].tasaDescuento`
