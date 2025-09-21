# Yanissimo Yoga — “YOGA + OCEAN” Landing Page

Single-page Next.js 15 (App Router) build that mirrors yanissimoyoga.ru while moving copy and pricing into structured content. The site exports statically for Netlify/Vercel/Cloudflare Pages and keeps the hero visually identical to the original release.

## Quickstart

```bash
npm install
npm run dev
# open http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js dev server with fast refresh |
| `npm run build` | Production build + static export to `out/` |
| `npm run lint` | ESLint (type-aware) |
| `npm run test` | Vitest unit tests for content and components |
| `npm run test:e2e` | Playwright visual regression of the hero block |

## Content Model

- `content/site.json` — single source of truth for hero title, dates, navigation labels, Google Form URL, pricing tiers (early-bird/regular) and contact profiles.
- `content/sections/*.md` — markdown + frontmatter for each section:
  - `intro.md`, `overview.md`, `hotel.md`, `program.md`, `rooms.md`, `pricing.md`, `booking.md`, `faq.md`, `teacher.md`, `gallery.md`
  - `rooms.md` and `gallery.md` store lightbox metadata (`src`, `alt`, `width`, `height`) so Next.js can render responsive thumbnails without layout shift.
  - placeholders such as `{{BOOKING_DEADLINE}}`, `{{DEPOSIT}}`, `{{BALANCE_DUE}}` resolve from `site.json` on render.

Updating copy is done by editing these markdown files. No component code is required for day-to-day changes.

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FORM_URL` | Overrides booking form link (falls back to `site.json`) |
| `NEXT_PUBLIC_CONTACT_TG` / `NEXT_PUBLIC_WHATSAPP` | Optional overrides for social buttons |
| `NEXT_PUBLIC_SITE_URL` | Used for metadata/structured data canonical (defaults to `https://yanissimoyoga.ru`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (gtag) id |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain if you prefer lightweight analytics |

## Assets & Styling

- Hero assets live in `public/images/hero-aerial.avif|webp|original.jpg` to keep the same crop as the original site.
- Teacher portrait (`teacher-yana.webp`) is reused from the legacy build.
- Room galleries use WebP files in `public/rooms/beachside/` and `public/rooms/beachfront/` (up to four images per room).
- The general photo gallery stores 10–14 WebP images in `public/gallery/`.
- Neutral palette is implemented via CSS variables in `app/globals.css` to match the `#4f4c4c` / `#e0e0e0` tones.

## Analytics Hooks

Client-side events are emitted for:
- Book CTA clicks (hero, header, mobile sticky bar).
- Pricing section visibility (via IntersectionObserver).
- FAQ accordion opens.

Events are forwarded to `window.gtag` and/or `window.plausible` when available.

## Testing

### Unit tests

```
npm run test
```

Checks hero/pricing rendering and validates the content JSON against expected values. Warning logs about the mocked `<Image />` component are harmless in this context.

### Visual regression

```
npm run test:e2e
```

This spins up `npm run dev`, loads `/`, and captures `section#hero`. Baseline lives at `tests/visual/hero.spec.ts-snapshots/hero-chromium-darwin.png`. Update with `npx playwright test --update-snapshots` after intentional hero tweaks.

## Deployment

1. `npm install`
2. Set environment variables in your hosting provider.
3. `npm run build`
4. Deploy the generated `out/` directory.

The export is fully static—no server runtime required.

## Accessibility & UX

- Semantic headings and skip link (`<a href="#main">`).
- Sticky header with smooth anchor scrolling (`SCROLL_OFFSET_PX` maintains spacing).
- Mobile bottom booking bar appears after the first scroll.
- FAQ uses `<details>` elements with keyboard support.

## Galleries & Pricing Maintenance

- **Room galleries**: add or replace WebP images in `public/rooms/beachside/` and `public/rooms/beachfront/` (≈1600–1800 px on the long edge, <300 KB). Update the corresponding entries in `content/sections/rooms.md` with the new `src`, `alt`, `width`, and `height`. The lightbox groups images per room automatically and preloads the first thumbnail.
- **General gallery**: place optimised WebP files in `public/gallery/` (10–14 images). Maintain metadata in `content/sections/gallery.md` so the grid and lightbox stay in sync.
- **Pricing order**: `components/pricing-section.tsx` sorts `site.pricing.items` by price at render time. Update values inside `content/site.json`; the visual order will follow the numeric amounts automatically.

## Folder Map (high-level)

```
app/                    → Next.js app router entry (layout + page)
components/             → Stateless building blocks (header, hero, pricing, etc.)
content/site.json       → Global configuration (dates, prices, links)
content/sections/*.md   → Section copy in markdown + frontmatter
lib/                    → Content loaders, analytics helper, utilities
public/images/          → Optimised hero/teacher assets (AVIF + WebP)
tests/                  → Vitest specs + Playwright snapshot
```

Happy shipping! 🧘‍♀️🌴
