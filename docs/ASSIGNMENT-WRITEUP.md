# Assignment Writeup

## Tech Stack And Why

This project uses Next.js App Router, TypeScript, and Tailwind CSS.

Next.js gives the project a clean route structure, server-rendered pages by default, and fast static output for the homepage, property listings, and generated detail pages. TypeScript keeps the shared property data, filter logic, and form state consistent. Tailwind CSS made it practical to build a polished real-estate layout quickly while keeping the visual system consistent across cards, forms, and page sections.

## Challenges And Solutions

The main challenge was keeping the implementation modular without scattering the real-estate logic across the app. The property types, mock data, and filtering logic were kept in shared modules so the listing page and detail pages could reuse them.

Another challenge was balancing interactivity with performance. The menu, search controls, gallery, and forms all needed client-side state, but the rest of the app should remain server-rendered. I kept the client boundaries narrow so the browser only hydrates the parts that actually need it.

The most visible issue during the build was remote image reliability. Some listings did not render consistently from external URLs in the assignment environment, so I switched the important property images and agent portrait to local assets.

Forms also needed more than placeholder-only UX. I added explicit labels, field-level error messages, live success confirmation, and focus movement so the flows work for keyboard and screen reader users.

## Improvements With More Time

If I had more time, I would add:

- a proper map or neighborhood section on the property detail page
- richer property relationships such as similar listings
- URL-based filtering so search state can be shared and bookmarked
- a more complete `/about` and `/contact` content layer
- analytics or basic conversion tracking for the main CTAs

## Reference-Site Observations

The reference site does a good job of establishing trust quickly, which matters a lot in real estate. It also uses repeated contact prompts and listing content to keep users moving toward action.

Where this build differs is in the task flow. I added a more functional listing search, dedicated property detail pages, clearer separation between filtering and presentation, and more explicit accessibility/documentation work. That makes the project feel less like a marketing clone and more like a maintainable product built from the same inspiration.
