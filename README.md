# INHAUS

Premium marketing site for **INHAUS** — a liquid coffee concentrate brand serving
café-style coffee at home. Built from [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md),
with structure/energy inspired by [getjustpour.com](https://getjustpour.com/) and a
distinct espresso + crema, editorial-serif identity of its own.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.ts`)
- **Framer Motion** (scroll reveals, accordion, marquee)
- Fonts: **Fraunces** (display serif), **Inter** (body), **Space Mono** (labels),
  loaded via Google Fonts `@import` in `app/globals.css`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
app/
  layout.tsx        # html shell + metadata + fonts/styles
  page.tsx          # composes the home page sections
  globals.css       # fonts, Tailwind layers, base styles
components/
  Nav, Hero, Marquee, Products, HowItWorks, Comparison,
  WhyInhaus, RealPours, Reviews, FAQ, Newsletter, Footer
  Bottle.tsx        # the INHAUS bottle, drawn as inline SVG
  Doodles.tsx       # hand-drawn line-art icon set
  Sticker.tsx       # rotated sticker badges
  Reveal.tsx        # scroll-reveal wrapper (respects reduced-motion)
  ui/Button.tsx     # pill buttons (primary / secondary / ghost)
lib/
  data.ts           # products, comparison, reviews, FAQs, copy
  cn.ts             # className helper
```

## Home page sections

Announcement bar · Nav · Hero · Trust marquee · Products · How it works ·
Find your pour (Black vs Classic) · Why INHAUS · Real pours · Reviews · FAQ ·
Newsletter · Footer.

## Notes on assets

All visuals are **illustrated as inline SVG** (the bottle, doodles, lifestyle
frames) so the site is fully self-contained and on-brand out of the box. To use
real photography, replace `<Bottle />` and the `<Scene>` frames in
`RealPours.tsx` with `next/image` — captions mark the intended shots.

The product variants, prices, and copy in `lib/data.ts` are placeholders ready
to be swapped for real catalogue data (or wired to the Shopify Storefront API).
