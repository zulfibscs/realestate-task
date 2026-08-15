# Real Estate Website — Project Plan

> **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Vercel  
> **Reference inspiration:** [Walton Dean Realty](https://waltondeanrealty.com/) — structure and UX only, not a pixel-perfect clone.

---

## Sitemap

| Route | Page | Purpose |
|-------|------|---------|
| `/` | **Homepage** | Brand introduction, hero, services overview, featured listings, agent credibility, testimonials, and primary CTAs (search properties, contact). |
| `/properties` | **Properties listing** | Searchable, filterable grid of all available listings with sort options and clear path to detail pages. |
| `/properties/[id]` | **Property details** | Full listing view: gallery, specs, description, price, location, agent contact, and related listings. |
| `/contact` | **Contact** | Dedicated contact page with form, office info, phone/email, and optional map placeholder. Keeps conversion-focused UX separate from browsing flow. |
| `*` (404) | **Custom not-found** | Branded 404 with helpful links back to home, properties, and contact. |

### Navigation structure (global)

```
Home
Properties
Contact
[Primary CTA: "Search Homes" or "Get in Touch"]
```

Footer repeats main nav plus office details, social links (placeholder), and legal/copyright.

---

## Folder Structure

The project currently bootstraps with a root-level `app/` directory. During implementation, code will move under `src/` for a cleaner separation of concerns. Target layout:

```
src/
├── app/                          # Next.js App Router pages & layouts
│   ├── layout.tsx                # Root layout (fonts, metadata, Header/Footer)
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # Custom 404
│   ├── properties/
│   │   ├── page.tsx              # Listing page
│   │   └── [id]/
│   │       └── page.tsx          # Property detail page
│   └── contact/
│       └── page.tsx              # Contact page
│
├── components/
│   ├── layout/                   # Site-wide shell components
│   ├── sections/                 # Homepage & page-level content blocks
│   ├── property/                 # Listing-specific UI
│   └── ui/                       # Reusable primitives (buttons, inputs, cards)
│
├── data/                         # Static/mock property & site content
├── lib/                          # Utilities, formatters, filter helpers
└── types/                        # Shared TypeScript interfaces
```

### `src/components/layout`

Persistent chrome that wraps every page.

| Responsibility | Examples |
|----------------|----------|
| Global navigation | `Header`, `Footer`, `MobileNav`, `NavLink` |
| Page scaffolding | `PageContainer`, `MainLayout` |
| SEO / meta helpers | `JsonLd` (optional, later milestone) |

**Why separate:** Layout components change rarely, are imported from `app/layout.tsx`, and should not mix with page-specific marketing sections.

### `src/components/sections`

Composable homepage and landing-page blocks. Each section is a self-contained vertical slice.

| Responsibility | Examples |
|----------------|----------|
| Marketing / storytelling | `Hero`, `ServicesOverview`, `AgentIntro`, `Testimonials`, `AreasServed` |
| Conversion | `ContactCTA`, `FeaturedListings` |
| Page-specific blocks | `ContactFormSection`, `PageHero` (reused on `/properties`, `/contact`) |

**Why separate:** Keeps `page.tsx` files thin (compose sections only) and makes it easy to reorder or A/B homepage layout without touching layout or property logic.

### `src/components/property`

Everything tied to listing data and the properties flow.

| Responsibility | Examples |
|----------------|----------|
| Cards & grids | `PropertyCard`, `PropertyGrid`, `PropertyBadge` |
| Listing page | `PropertyFilters`, `PropertySearchBar`, `PropertySort`, `PropertyResultsCount` |
| Detail page | `PropertyGallery`, `PropertySpecs`, `PropertyDescription`, `PropertyAgentCard`, `SimilarProperties` |

**Why separate:** Property components share types from `src/types` and helpers from `src/lib`. Isolating them prevents homepage sections from importing heavy property-only UI.

### `src/components/ui`

Low-level, reusable, mostly presentational building blocks.

| Responsibility | Examples |
|----------------|----------|
| Actions | `Button`, `LinkButton` |
| Form controls | `Input`, `Select`, `Textarea`, `Label` |
| Layout primitives | `Container`, `Section`, `Grid`, `Stack` |
| Feedback | `Badge`, `Skeleton`, `EmptyState` |

**Why separate:** UI primitives enforce consistent spacing, color tokens, and accessibility patterns. Sections and property components compose these rather than duplicating Tailwind classes.

### `src/data`

Static JSON or TypeScript modules for mock content (no CMS/API in v1).

| File (planned) | Contents |
|----------------|----------|
| `properties.ts` | Array of property objects (id, title, price, beds, baths, sqft, images, status, location) |
| `agent.ts` | Agent name, bio, license, contact info, photo |
| `testimonials.ts` | Client quotes for homepage carousel/grid |
| `site.ts` | Site name, tagline, office address, nav links, social URLs |

**Why separate:** Decouples content from components so pages can be built and tested before any real API integration.

### `src/lib`

Pure functions with no React dependencies.

| File (planned) | Contents |
|----------------|----------|
| `format.ts` | `formatPrice`, `formatSqft`, `formatAddress` |
| `filters.ts` | Filter/sort logic for property listing page |
| `constants.ts` | Breakpoints, default filter values, site URLs |
| `cn.ts` | Tailwind class merge helper (if using `clsx` + `tailwind-merge`) |

**Why separate:** Keeps business logic testable and out of components.

### `src/types`

Shared TypeScript definitions.

| File (planned) | Contents |
|----------------|----------|
| `property.ts` | `Property`, `PropertyStatus`, `PropertyFilters` |
| `agent.ts` | `Agent`, `ContactFormData` |
| `site.ts` | `NavItem`, `Testimonial`, `SiteConfig` |

**Why separate:** Single source of truth for shapes used across data, components, and pages.

---

## Design System

### Color palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Navy** | `#1B2A41` | Primary brand, header/footer backgrounds, headings on light surfaces |
| **Slate** | `#3D4F63` | Body text, secondary UI |
| **Gold** | `#C4A962` | Accent — CTAs, highlights, dividers, hover states |
| **Gold Light** | `#E8DCC4` | Subtle accent backgrounds, badge tints |
| **Off-White** | `#FAFAF8` | Page background (warmer than pure white) |
| **White** | `#FFFFFF` | Cards, form fields, elevated surfaces |
| **Charcoal** | `#2C2C2C` | High-contrast text on light backgrounds |
| **Success** | `#2D6A4F` | "For Sale" / positive status badges |
| **Muted** | `#6B7280` | Captions, meta text, placeholders |

**Reasoning:** Navy conveys trust and professionalism — standard in luxury and residential real estate. Gold accent adds warmth and a premium feel without the cliché of bright red "SOLD" banners everywhere. Off-white backgrounds reduce eye strain on long listing pages and photograph-heavy layouts.

### Typography

| Role | Font | Fallback | Reasoning |
|------|------|----------|-----------|
| **Headings** | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Georgia, serif | Elegant serif associated with premium real estate brands; strong hierarchy for hero and section titles |
| **Body / UI** | [Inter](https://fonts.google.com/specimen/Inter) | system-ui, sans-serif | Highly legible at small sizes; excellent for specs, filters, forms, and mobile |
| **Accent / Labels** | Inter (uppercase, tracked) | — | Small caps for nav, badges, and metadata — no third font needed |

**Scale (Tailwind-aligned):**

- Hero H1: `text-4xl md:text-5xl lg:text-6xl`
- Section H2: `text-3xl md:text-4xl`
- Card H3: `text-xl md:text-2xl`
- Body: `text-base leading-relaxed`
- Meta/captions: `text-sm text-muted`

Load via `next/font/google` in root layout for performance and zero layout shift.

---

## Components by Milestone

### Milestone 1 — Foundation & layout

Scaffolding, design tokens, and global shell. Nothing page-specific yet.

| Component | Location | Notes |
|-----------|----------|-------|
| `Button` | `ui/` | Primary, secondary, ghost variants |
| `Container` | `ui/` | Max-width wrapper with responsive padding |
| `Section` | `ui/` | Vertical spacing + optional background variant |
| `Badge` | `ui/` | Status labels (For Sale, Pending, Sold) |
| `Input`, `Label`, `Textarea`, `Select` | `ui/` | Form primitives for contact & filters |
| `Skeleton` | `ui/` | Loading placeholders |
| `Header` | `layout/` | Logo, desktop nav, mobile menu trigger |
| `MobileNav` | `layout/` | Slide-out or full-screen mobile navigation |
| `Footer` | `layout/` | Nav, contact snippet, copyright |
| `MainLayout` | `layout/` | Optional wrapper if needed beyond root layout |
| Root `layout.tsx` | `app/` | Fonts, metadata, Header/Footer composition |
| Tailwind theme extension | config/CSS | Color tokens, font families |

**Deliverable:** Navigable shell with placeholder page content on all routes.

---

### Milestone 2 — Data layer & homepage

Mock data and homepage sections.

| Component / File | Location | Notes |
|------------------|----------|-------|
| `properties.ts`, `agent.ts`, `testimonials.ts`, `site.ts` | `data/` | Mock content |
| `property.ts`, `agent.ts`, `site.ts` | `types/` | Shared interfaces |
| `format.ts`, `filters.ts`, `constants.ts` | `lib/` | Helpers |
| `Hero` | `sections/` | Headline, subcopy, dual CTAs |
| `ServicesOverview` | `sections/` | Buy / Sell / Process cards (3-column) |
| `AgentIntro` | `sections/` | Photo, bio excerpt, credentials |
| `FeaturedListings` | `sections/` | Curated subset + link to `/properties` |
| `PropertyCard` | `property/` | Reused here and on listing page |
| `Testimonials` | `sections/` | Carousel or responsive grid |
| `AreasServed` | `sections/` | Location chips or simple grid |
| `ContactCTA` | `sections/` | Banner driving to `/contact` |
| Homepage `page.tsx` | `app/` | Compose all sections |

**Deliverable:** Fully composed homepage with real mock data.

---

### Milestone 3 — Properties listing page

Search, filter, sort, and grid of all listings.

| Component | Location | Notes |
|-----------|----------|-------|
| `PageHero` | `sections/` | Reusable title band for inner pages |
| `PropertySearchBar` | `property/` | Text search by address/title/city |
| `PropertyFilters` | `property/` | Beds, baths, price range, status |
| `PropertySort` | `property/` | Price, date, sqft |
| `PropertyGrid` | `property/` | Responsive grid of `PropertyCard` |
| `PropertyResultsCount` | `property/` | "Showing X of Y properties" |
| `EmptyState` | `ui/` | No results after filter |
| Properties `page.tsx` | `app/` | Client-side or URL-param filtering |

**Deliverable:** Functional listing page with client-side filter/sort over mock data.

---

### Milestone 4 — Property detail page

Individual listing experience.

| Component | Location | Notes |
|-----------|----------|-------|
| `PropertyGallery` | `property/` | Main image + thumbnail strip |
| `PropertyHeader` | `property/` | Title, price, status, address |
| `PropertySpecs` | `property/` | Beds, baths, sqft, lot size, year built |
| `PropertyDescription` | `property/` | Long-form copy |
| `PropertyFeatures` | `property/` | Bullet list of amenities |
| `PropertyAgentCard` | `property/` | Agent photo, contact buttons |
| `SimilarProperties` | `property/` | 2–3 related cards by location or price |
| `Breadcrumbs` | `ui/` or `layout/` | Home → Properties → Listing |
| Property `[id]/page.tsx` | `app/` | Dynamic route + `generateStaticParams` |

**Deliverable:** Detail pages for every mock property with 404 fallback for invalid IDs.

---

### Milestone 5 — Contact, 404, polish & deploy

Finish remaining routes, accessibility pass, and Vercel deployment.

| Component / File | Location | Notes |
|------------------|----------|-------|
| `ContactFormSection` | `sections/` | Name, email, phone, message, interest type |
| `ContactInfo` | `sections/` | Office address, phone, email, hours |
| Contact `page.tsx` | `app/` | Form + info layout |
| `not-found.tsx` | `app/` | Branded 404 with navigation links |
| `EmptyState` enhancements | `ui/` | Used on 404 and zero-result states |
| Metadata / Open Graph | `app/` | Per-page `metadata` exports |
| Responsive & a11y audit | — | Focus states, alt text, semantic HTML, keyboard nav |
| Vercel deployment | — | Production build, env check, live URL |

**Deliverable:** Complete site, documented in `docs/`, deployed to Vercel.

---

## Out of scope (v1)

- Blog / press section (present on reference site — defer unless assignment requires)
- Live MLS/API integration
- Home valuation widget
- User accounts / saved searches
- CMS integration

These may be noted as future improvements in `docs/ASSIGNMENT-WRITEUP.md`.

---

## Next step

After plan review: scaffold `src/` directory structure, migrate `app/` under `src/app/`, and begin **Milestone 1** implementation.
