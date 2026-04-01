# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tienda Macro** is a Next.js 14 loyalty program e-commerce platform implementing a sophisticated **Segmentation & Personalization Engine** (CPPG - Programa de Lealtad 3.0) for Selecta customers. The app dynamically personalizes pricing, product visibility, and messaging based on customer level and engagement metrics.

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
4. **Nivel Máximo** - Premium high-engagement: Amber recognition banner
5. **Tope CPPG** - Monthly badge cap reached: Green derivation banner

Key functions:
- `getEscenarioCPPG(perfil, config)` - Determines active scenario and messaging
- `getPrecioPersonalizado(producto, perfil, config)` - Calculates level-based discounts (0%-15%)
- `esProductoVisible(producto, perfil)` - Controls product exclusivity by level

**Token fields:** EnteMis | Apellido | Nombres | Puntos | Categoría | TipoPersona | NivelCalculado | **NivelReal** | InsigniasAcumuladas | InsigniasFaltantes

### Data Layer

- **`src/data/config.js`** - DEFAULT_CONFIG with 4 level definitions (nivel.1-4), CPPG rules, and benefits per level
- **`src/data/products.js`** - PRODUCTOS array with pricing, categories, cuota limits, and exclusivity flags
- **`src/data/profiles.js`** - PERFILES_DEMO sample customers with adherencia status and point balances

### Component Structure

**Page Layout:**
- `src/app/page.js` - Main store view (Tienda + Loyalty Home toggle)
- `src/app/backoffice/page.js` - Admin panel with 5 tabs (Niveles, Reglas, Beneficios, Simulador, Escenarios)

**Core Components:**
- `Header` - Sticky header with profile info, level badge, points balance
- `HeroBanner` - Dynamic hero with different copy for adhered vs. non-adhered
- `FeaturedProduct` - Hero cards with discount badges and financing info
- `ProductCard` - Grid item with price, cuotas, level discount badge
- `ProductCarousel` - Horizontal scrollable product sections by category
- `CPPGBanners` - Scenario-specific warning/incentive banners (PopupNoAdherido, InlineBanner)
- `LoyaltyHome` - Level summary, badges progress, level comparison grid
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

### Styling System

- **Tailwind + globals.css** - Custom keyframes for animations:
  - **Core animations:** fadeIn, slideUp, slideDown, slideInFromLeft, slideInFromRight, pulse, bounce, shimmer, gradientShift
  - **Experience animations:** progressFill (bar loading), glow (pulsing highlight), float (subtle movement), scalePulse (size pulsing), countUp (number entrance)
- **Brand colors:** Primary #0038FF (blue), Secondary #EC4899 (pink), Gradient #4A8CFF, Dark #1A1A2E
- **Responsive:** Mobile-first with grid-cols-2 MD+ for featured products, grid-cols-4 MD+ for level comparison
- **Animations:** Cubic-bezier easing `cubic-bezier(0.23, 1, 0.320, 1)`, durations 200ms-700ms
- **Stagger delays:** animate-stagger-1 through animate-stagger-4 for cascading entrance effects

## Key Patterns & Conventions

### Page Structure
- All pages are **Client Components** (`"use client"`)
- State management: `useState` for profile, config, view mode
- No external state library (Redux, Zustand)

### Data Flow
1. Import DEFAULT_CONFIG, PRODUCTOS, PERFILES_DEMO
2. Maintain `perfilActivo` state (user context)
3. Call `getEscenarioCPPG()` to determine banner/popup
4. Pass perfil + config to components for dynamic rendering
5. Filter products by `esProductoVisible()` and `exclusivoNivel` flag

### Formatting & Localization
- **Price formatting:** `.toLocaleString("es-AR")` for currency display
- **Number separators:** Argentine Spanish locale (1.000.000 format)
- **Language:** All UI text in Spanish

### Component Props Pattern
```jsx
// Typical consumer component signature
function ProductCard({ producto, perfil, config }) {
  const { precio, cuotas, descuentoAplicado } = getPrecioPersonalizado(
    producto,
    perfil,
    config
  );
  // Render...
}
```

### Naming Conventions
- **Profile fields:** `perfil.nivelReal`, `perfil.nivelCalculado`, `perfil.adherido`, `perfil.insigniasAcumuladas`
- **Config fields:** `config.niveles[1]`, `config.reglasCPPG.*`, `config.beneficiosPorNivel[2]`
- **Product fields:** `producto.precio`, `producto.cuotas`, `producto.exclusivoNivel`, `producto.categoria`

## Recent Updates (March 2026)

### UI/UX Improvements
- **Image Asset Management** - All product image file names use hyphens instead of spaces for Vercel compatibility
- **Product Names** - Normalized to use spaces (e.g., "Celular Samsung Galaxy S26" not "Celular-Samsung-Galaxy-S26")
- **Featured Products Button** - Changed "Comprar" button color from pink (#EC4899) to blue (#0038FF) for consistency
- **Price Formatting** - FeaturedProduct now displays prices with thousand separators (e.g., "$ 2.609.999")
- **HeroBanner Spacing** - Added mb-12 margin to separate from following carousel
- **Footer Layout** - Removed pb-24 padding to eliminate white space below footer; footer now extends to page edge
- **Categories Strip** - Changed from horizontal scroll to centered flex-wrap with improved spacing (gap-8)
- **Navbar Spacing** - Added mt-6 to CPPG banners for better separation from navbar

### Product & Badge System
- **MacBook Featured Image** - Updated to use local `macbook.png` from Productos-Varios folder
- **Exclusivity Badges** - Refactored to use dynamic icons and labels from config:
  - 🥉 Exclusivo Inicial (Nivel 1)
  - 🥈 Exclusivo Intermedio (Nivel 2)
  - 🥇 Exclusivo Avanzado (Nivel 3)
  - 👑 Exclusivo Premium (Nivel 4)
- **Badge Logic** - Only displays if user's level >= product's exclusivoNivel

### Animation Enhancements (LoyaltyHome - Programa Selecta)
New animations significantly improve visual feedback and user experience:
- **Header** - slideUp entrance with floating level icon
- **Level Card** - Icon with pulsing glow effect
- **Insignias Card** - Progress bar with progressFill animation, counter with countUp entrance
- **Benefits Card** - Staggered slide-up entrance
- **Level Comparison Grid** - Cascading entrance with dynamic delays, current level pulses continuously
- **Overall Flow** - Natural, elegant progression communicating to users they're exploring personalized content

### File & Asset Structure
- **Image Paths** - All product images use pattern: `/images/products/{categoria}/{Filename-With-Hyphens}.{ext}`
- **Supported Categories** - Smart-Tv, Samsung-S26, Celulares, Xiaomi, Heladera, Productos-Varios
- **Carousel Components** - HomeCarousel (5s auto-play), CarouselHero (category-specific images)

## Important Implementation Notes

1. **No Tests Setup** - Project currently has no Jest/Testing Library configuration. If adding tests, ensure setup in jest.config.js and __tests__/ directory.

2. **Static Data Only** - All data (products, profiles, config) is hardcoded. API route exists at `src/app/api/config/route.js` but not actively used for persistence.

3. **Exclusive Products Logic** - Products with `exclusivoNivel: 3` or `4` only appear in the Exclusive section if `perfil.nivelReal >= exclusivoNivel`.

4. **Cuotas (Installments)** - Limited by level:
   - Nivel 1: 12 cuotas max
   - Nivel 2: 15 cuotas max
   - Nivel 3: 18 cuotas max
   - Nivel 4: 22 cuotas max

5. **Discounts** - Applied at checkout (hardcoded in `getPrecioPersonalizado()`, not cart logic):
   - Nivel 1: 0%
   - Nivel 2: 5%
   - Nivel 3: 10%
   - Nivel 4: 15%

6. **Image Handling** - next.config.js allows Unsplash + internal CDN domains; set `unoptimized: true` (temporary, not production-ready). Local images in `/public/images/products/` with hyphens in filenames for Vercel compatibility.

7. **Responsive Behavior** - Product grids collapse to single column on mobile; carousels scrollable on small screens.

8. **Git Configuration** - .gitignore excludes documentation and Claude-specific files:
   - CLAUDE.md, DESIGN_ITERATION_SUMMARY.md, FILES_MODIFIED.txt, NEXT_STEPS.md
   - .claude/ directory for local settings
   - Standard Node/Next.js patterns (node_modules/, .next/, .env files)

## Related Documentation

Refer to:
- [DESIGN_ITERATION_SUMMARY.md](./DESIGN_ITERATION_SUMMARY.md) - Visual design refinements and component style details
- [NEXT_STEPS.md](./NEXT_STEPS.md) - Roadmap for Phases 2-8 (images, search, cart, checkout, dashboard, etc.)

## Troubleshooting

- **Module resolution errors:** Ensure `@/` import paths point to `src/` (configured in tsconfig or next.config)
- **Missing dependencies:** Run `npm install` on local Windows machine; VM registry may be blocked
- **Styling not applying:** Check `globals.css` is imported in root layout; Tailwind classes must be in JSX/template content
