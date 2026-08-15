# Walton Dean Realty

A responsive real-estate website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Overview

This project presents a polished real-estate experience with:

- a branded homepage
- featured listings
- a filterable `/properties` listing page
- property detail pages
- contact and schedule-viewing forms
- a custom 404 page

The design is inspired by Walton Dean Realty, but the implementation is original and structured to support the assignment goals.

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Vercel deployment target

## Folder Structure

- `app/` - route entry points, metadata, and page composition
- `src/components/layout/` - header, footer, and navigation
- `src/components/sections/` - homepage and page-level content sections
- `src/components/property/` - property cards, gallery, search, and forms
- `src/data/` - shared mock property content
- `src/lib/` - shared utilities such as formatters and filtering logic
- `src/types/` - shared TypeScript types
- `docs/` - project plan, decisions, analysis, changelog, and write-up

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. If port `3000` is already in use, Next will pick another available port.

## Testing And Build

```bash
npm run lint
npm run build
```

## Deployment

Deploy on Vercel after a successful build. The project is already structured for static generation where possible and server rendering where needed.

## Documentation

See the `docs/` folder for the detailed project plan, design decisions, reference analysis, assignment write-up, and changelog.
