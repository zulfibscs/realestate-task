# Reference Site Analysis

> **Reference:** [Walton Dean Realty](https://waltondeanrealty.com/)  
> **Status:** Preliminary pass — to be refined after implementation and side-by-side comparison.

---

## What the reference does well

### Clear value proposition above the fold

The homepage opens with a strong geographic and professional identity ("Houston County Real Estate, Elevated") and immediately communicates who the agent is, where they serve, and what makes their approach different. This is a proven real-estate pattern: lead with **trust + territory + differentiation**, not a generic stock photo.

### Service-oriented content architecture

Buy, sell, and process sections each have a dedicated block with a headline, supporting copy, and a single CTA ("Start Your Home Search," "Get Your Home Value," "Schedule a Consultation"). Users self-select their intent quickly — a best practice for agent sites where visitors arrive with different goals.

### Social proof at scale

A large testimonials section with named clients builds credibility. Real estate is a high-trust purchase; repeated third-party validation reduces perceived risk. Even a subset of 3–6 curated testimonials on our build will follow this principle.

### Active listings integration

Featured/active listings on the homepage connect marketing content to inventory. This bridges "why hire this agent" with "here is what is available now" — a critical UX loop that keeps users on-site rather than bouncing to a third-party portal.

### Local expertise signaling

"Areas of Expertise" with city/neighborhood breakdowns reinforces hyper-local authority. Search engines and human visitors both respond to specific place names over vague regional copy.

### Persistent contact pathways

Phone number, email, and a contact form appear in multiple locations (header area, footer, inline CTAs). Real-estate UX best practice: **never more than one scroll away from a contact action**.

### Content marketing depth

Blog/press content demonstrates market knowledge and supports SEO. While out of scope for v1, the reference shows how agent sites extend beyond listings into local lifestyle and market updates.

---

## What could be improved

### Homepage length and cognitive load

The reference homepage is very long — testimonials, blog previews, valuation widgets, area guides, and multiple CTAs compete for attention. Users may lose the thread before reaching listings. **Our approach:** tighter homepage with clearer section hierarchy and fewer repeated blocks.

### Testimonial repetition

Some testimonials appear duplicated in the fetched content, which suggests carousel or CMS rendering issues. Long unbroken testimonial walls also slow scanning on mobile. **Our approach:** concise quotes, visible attribution, and a compact carousel or grid with max 4–6 items.

### Third-party widget dependency

Home valuation flows rely on embedded Luxury Presence tooling. These widgets can hurt performance, create inconsistent styling, and fail offline or in dev environments. **Our approach:** skip live valuation in v1; use a simple "Schedule a consultation" CTA instead.

### Navigation clarity

Multiple entry points ("Let's Connect," "My Search Portal," contact drawer) can overlap in purpose. **Our approach:** simplified global nav — Home, Properties, Contact — plus one primary CTA button.

### Listing discoverability

If listings are buried below extensive marketing content, buyers ready to browse may scroll too far. **Our approach:** featured listings higher on the homepage and a prominent "View all properties" path in the header.

### Form friction

Multi-field contact forms with legal opt-in copy are necessary for compliance but feel heavy on first interaction. **Our approach:** shorter contact form on `/contact` with progressive disclosure for optional fields where possible.

---

## UX observations

| Pattern | Reference behavior | Best practice | Our intent |
|---------|-------------------|---------------|------------|
| Primary CTA | Multiple CTAs per section | One primary action per section | Single gold-accent button per block |
| User paths | Buy / sell / browse interleaved | Distinct journeys, shared chrome | Services section + dedicated `/properties` |
| Listing cards | Photo, price, status, location | Scannable card with 3–4 data points | `PropertyCard` with badge, price, beds/baths |
| Detail pages | Full specs, gallery, agent contact | Gallery first, specs table, sticky CTA on mobile | Gallery → specs → agent card → similar listings |
| Contact | Form + phone + email repeated | Redundant contact is good in RE | Header CTA + footer info + `/contact` page |
| Empty states | N/A on reference | Guide user when no results | `EmptyState` on filtered listings |

**Flow we are optimizing for:**

```
Land on homepage → Understand agent/value → Browse featured listings
       ↓
/properties → Filter/search → /properties/[id]
       ↓
Contact agent (detail page CTA or /contact)
```

---

## Responsive observations

### Expected reference behavior (typical agent-site patterns)

- Hero imagery and headline stack vertically on mobile with CTAs full-width.
- Testimonial carousels replace multi-column grids on small screens.
- Listing grids collapse from 3 columns → 2 → 1.
- Mobile navigation hides desktop links behind a hamburger menu.
- Contact forms remain single-column on all breakpoints.

### Gaps common in agent sites (to avoid)

- Tiny tap targets on phone/email links in headers.
- Horizontal scroll caused by fixed-width embeds (valuation widgets, maps).
- Gallery thumbnails too small to tap on mobile.
- Sticky headers that consume excessive viewport height.

### Our responsive targets

| Breakpoint | Layout notes |
|------------|--------------|
| `< 640px` | Single-column everything; hamburger nav; full-width CTAs |
| `640–1024px` | 2-column listing grid; condensed hero |
| `≥ 1024px` | 3-column listing grid; horizontal nav; side-by-side contact layout |

Filter controls on `/properties` will collapse into a mobile-friendly panel or stacked row rather than a wide horizontal toolbar.

---

## Accessibility observations

### What professional real-estate sites often miss

- Image-heavy heroes without meaningful `alt` text.
- Carousel controls without keyboard support or `aria-live` regions.
- Form fields missing visible labels (placeholder-only inputs).
- Insufficient color contrast on gold/beige accent text over white.
- Icon-only buttons (phone, menu) without accessible names.

### Standards we will target (WCAG 2.1 AA-oriented)

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with headings.
- Visible focus rings on all interactive elements.
- Form labels associated with inputs; error messages linked via `aria-describedby`.
- Property gallery: keyboard-navigable thumbnails, alt text per image.
- Reduced motion: respect `prefers-reduced-motion` for carousel/transitions.
- Color contrast: navy/gold palette checked against 4.5:1 for body text.

---

## Performance observations

### Typical agent-site performance risks

- Large uncompressed hero images.
- Multiple third-party scripts (CRM, chat, valuation, analytics).
- Render-blocking fonts and widgets.
- Excessive DOM size from long homepage sections.

### Reference-specific notes

The reference site appears to bundle substantial blog content and embedded tools on the homepage, which likely increases Time to Interactive. Testimonial and blog sections add significant HTML weight.

### Our performance strategy

| Technique | Application |
|-----------|-------------|
| `next/image` | All property photos with responsive `sizes` |
| `next/font` | Self-hosted Google fonts, no layout shift |
| Static generation | `generateStaticParams` for property detail pages |
| No third-party embeds (v1) | Avoid valuation/CRM widgets |
| Code splitting | Client components only where needed (filters, mobile nav) |
| Lazy loading | Below-fold images and similar-properties section |

**Target:** Lighthouse performance ≥ 90 on production build for homepage and listing pages.

---

## What we do differently and why

| Area | Reference approach | Our approach | Rationale |
|------|-------------------|--------------|-----------|
| Homepage length | Very long, many sections | Curated sections, tighter scroll depth | Faster path to listings and contact |
| Valuation tool | Embedded third-party widget | Consultation CTA | Simpler, faster, no external dependency |
| Blog / press | Extensive content hub | Out of scope v1 | Focus assignment on core RE UX: browse + detail + contact |
| Navigation | Multiple overlapping CTAs | 3-link nav + one primary CTA | Clearer information architecture |
| Listings source | Likely MLS feed integration | Static mock data in `src/data` | Predictable for assignment demo and deployment |
| Testimonials | Large volume | 4–6 curated quotes | Quality over quantity; easier to scan |
| Design fidelity | Luxury Presence template | Custom Tailwind design system | Demonstrates implementation skill, not template config |
| Property filters | Portal / external search | Built-in filter UI on `/properties` | Shows frontend engineering capability |
| 404 handling | Generic (assumed) | Branded custom `not-found` | Professional polish and UX continuity |

---

## Refinement checklist (post-build)

- [ ] Side-by-side screenshot comparison at mobile, tablet, desktop
- [ ] Validate assumptions against live reference navigation and listing UX
- [ ] Update "What could be improved" with specific examples from live site
- [ ] Note any reference patterns we adopted vs. deliberately omitted
- [ ] Record final Lighthouse scores and compare to reference (if testable)
