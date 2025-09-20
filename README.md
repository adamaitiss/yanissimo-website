# Yanissimo Yoga · Maldives Retreat Landing

Single-page Next.js (App Router) site for the Yanissimo Yoga retreat at The Barefoot Eco Hotel. Content is driven by JSON and exports to a static bundle for Netlify, Vercel, or Cloudflare Pages.

## 1. Installation & Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to preview. Edit copy under `/content` or components under `/components`; HMR refreshes instantly.

## 2. Available Scripts

- `npm run dev` – Next dev server with Tailwind watch.
- `npm run build` – Production build + static export to `/out`.
- `npm run export` – Shortcut to rebuild + refresh `/out` (same as `npm run build`).
- `npm run lint` – ESLint type-aware rules.

## 3. Content & Configuration

- `/content/copy.ru.json` – Russian copy for all sections. Duplicate as `copy.en.json` when English is ready.
- `/content/config.json` – Retreat dates, prices, deposit policy and default links.
- `/content/sources.json` – Source list for inline citations.

Tokens like `{{DATES}}` or `{{PRICE_DOUBLE}}` are replaced at runtime from `config.json`. Citations `[thebarefoot.com][2]` are resolved against `sources.json` and surfaced in the footer.

### Runtime environment variables

Override links without touching JSON:

- `NEXT_PUBLIC_FORM_URL`
- `NEXT_PUBLIC_CONTACT_TG`
- `NEXT_PUBLIC_WHATSAPP`
- Optional analytics: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Optional canonical base: `NEXT_PUBLIC_SITE_URL` (defaults to `https://yanissimoyoga.ru`).

## 4. Assets

All retreat photography lives in `public/images` as local WebP assets. Replace `teacher-yana.webp` with an approved portrait as soon as it is available (same filename/ratio to avoid edits).

## 5. Deployment (static, 5 steps)

1. `npm install`
2. Define env vars in your platform dashboard (form, Telegram, WhatsApp, analytics, site URL).
3. `npm run build`
4. `npm run export` (optional alias that refreshes `/out` if you prefer the legacy command)
5. Deploy `/out` to Netlify/Vercel/Cloudflare Pages (drag & drop or connect repo).

The build artefact is fully static: no server or API routes required.

## 6. Accessibility & UX Notes

- Skip link, high-contrast palette, semantic headings, and `scroll-mt` offsets for sticky nav anchors.
- Mobile bottom CTA bar (`md:hidden`) mirrors the hero buttons.
- Sources are listed in the footer; inline references stay clickable.

## 7. Performance Checklist

- Local WebP images sized for responsive layouts (`next/image` with `unoptimized` export mode).
- Fonts served via `next/font` (Inter + Playfair Display, Cyrillic subsets).
- Progressive section reveals use dynamically-imported Framer Motion to keep interaction lightweight.
- `next.config.ts` is pre-set for `output: 'export'` and package import optimisation.

## 8. Next Steps / Customisation

- Add translated copy to `/content/copy.en.json` and swap locale in `app/page.tsx` when ready.
- Extend `/content/config.json` for future metadata (e.g., available seats, add-ons) without touching components.
- Replace placeholder teacher artwork once photography is cleared.

Enjoy the ship! 🧘‍♀️🌴
