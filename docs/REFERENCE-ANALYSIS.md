# Reference Site Analysis

> **Reference:** [Walton Dean Realty](https://waltondeanrealty.com/)
> **Status:** Updated after implementation and build-out of the full assignment structure.

---

## What The Reference Does Well

### Strong brand positioning

The reference site introduces the agent and the service area immediately. That gives visitors trust, geography, and a clear sense of who the site is for within the first screen.

### Good trust-building structure

The homepage leans on testimonials, active listings, and local expertise. That combination is effective for real estate because the user is usually asking two questions at once: "Can I trust this person?" and "Do they have the kind of homes I want?"

### Service-driven navigation

The reference site makes it easy to move between buying, selling, and browsing. That is useful for an audience with mixed intent and keeps the site from feeling like a generic brochure.

### Repeated contact pathways

Contact details appear in several places, which is a good fit for a high-intent, high-touch domain like real estate.

---

## What Could Be Improved

### Long homepage

The reference homepage is content-rich, but it can feel long and dense. It asks users to process a lot before they reach listings.

### Reliance on embedded tools

Third-party widgets and heavy homepage content can slow the experience and make styling less predictable.

### Listing browsing is less functional than it could be

The reference does not appear to give users the same kind of built-in filter flow we added on `/properties`. That is a missed opportunity for users who already know what they want.

### Navigation can feel broad

There are many paths and prompts, but the main journey is not always as sharply framed as it could be.

---

## What We Deliberately Did Differently

| Area | Reference | This Build | Why |
|------|-----------|------------|-----|
| Listings flow | Marketing-led browsing | Functional `/properties` search and filter flow | The assignment benefits from usable filtering, not just presentation. |
| Data source | Site content and marketing emphasis | Shared mock property data in `src/data/properties.ts` | Keeps the system predictable and easier to extend. |
| Filtering | Implicit or external search patterns | `filterProperties()` in `src/lib` | Separates logic from UI and keeps it testable. |
| Navigation | Broad marketing routes | Smaller, clearer top-level routes | Makes the browsing task easier to complete. |
| Detail pages | Reference-first style | Server-rendered detail pages with gallery, features, and contact CTAs | Better supports the assignment brief and reuse of shared property data. |
| Accessibility | Solid, but not always explicit in structure | Visible focus states, labeled fields, live validation feedback | Makes the implementation easier to defend and maintain. |
| Documentation | Not visible to the user | Dedicated docs for decisions, analysis, and write-up | Helps explain the build in a way the assignment can review. |

---

## Responsive Observations

- The reference benefits from a layout that feels comfortable on desktop and large laptops.
- On smaller widths, the browsing task becomes more important than long-form storytelling.
- In this build, the property grid, filters, and forms were kept stacked or compressed at mobile widths so the content stays scannable.

---

## Accessibility Observations

- Real-estate sites often look polished but skip small structural details that matter to keyboard and screen reader users.
- In this build, we kept semantic landmarks, visible focus states, linked labels, and live validation messages explicit.
- That matters because the property search and contact flow are task-oriented, not decorative.

---

## Performance Observations

- Property browsing benefits more from fast image handling and small client islands than from heavier page chrome.
- This build uses shared mock data, server-rendered pages, lazy-loaded secondary images, and client components only where state is needed.

---

## Summary

The reference site is strong at brand storytelling and trust-building. This build keeps those qualities but shifts the center of gravity toward actual browsing: search, filtering, detail pages, contact conversion, and maintainable implementation choices.
