# INHAUS — Design Blueprint

> **Brand:** INHAUS — liquid coffee concentrate. *Café-style coffee, at home.*
> **Inspiration reference:** [getjustpour.com](https://getjustpour.com/) (structure & energy only — INHAUS gets its own identity)
> **Status:** v1 design blueprint · extracted & adapted · 2026-06-05

---

## 1. Brand Essence

| | |
|---|---|
| **One-liner** | Café in a bottle. Pour, add milk or water, sip. |
| **Promise** | Barista-quality coffee at home in 10 seconds — no machine, no mess. |
| **Personality** | Premium but unpretentious · warm · design-literate · a little cheeky |
| **Name read** | *IN-HAUS* — "in-house" quality + a Bauhaus/architectural ring → design-forward, crafted |
| **Feeling** | The calm of a good café, brought into your kitchen |

**Positioning vs. the reference:** JustPour is warm, playful, and doodle-driven on a rose-and-cream palette. INHAUS keeps that human, hand-drawn warmth but pushes the **premium + editorial + architectural** dial harder — espresso-dark ink, a crema/amber signature accent, high-contrast serif display type, and a tighter grid. Same soul, more atelier.

---

## 2. Design DNA Extracted From the Reference

What makes the inspiration work (and what we're keeping):

1. **High-contrast display serif** for big statements ("Café Coffee In A Bottle.") set against a calm neutral base → instant premium.
2. **Hand-drawn black line-art doodles + a sticker-collage** ("No Sugar", "100% Coffee", "20 cups", "BYOB") → this is the *humanizing* layer that stops it feeling like a luxury cliché.
3. **A functional product comparison** ("Find the Right Product for You" → BLACK vs CLASSIC) that doubles as education *and* a buying tool.
4. **"Real, not staged" lifestyle photography** ("NOT A PHOTOSHOOT, JUST HOW WE ACTUALLY DRINK IT") → trust + intimacy.
5. **Pill buttons**, generous whitespace, centered serif section titles, soft carousels.
6. **Confident, casual microcopy** that sounds like a person, not a brand deck.

What we **change** for INHAUS: rose → **crema/amber**; cuter → **more editorial**; looser → **tighter modular grid**; add a **mono "spec-label" voice** for eyebrows and stats (the architectural touch).

---

## 3. Color System

### Core palette
| Token | Hex | Use |
|---|---|---|
| `--espresso` | `#211712` | Primary ink — headings, body, dark sections, primary button fill |
| `--oat` | `#F6EFE3` | Primary background (warm cream) |
| `--paper` | `#FBF7EF` | Card / raised surface (a touch lighter than oat) |
| `--crema` | `#C8761E` | **Signature accent** — links, hover fills, key highlights (warm amber/caramel) |
| `--clay` | `#B5654A` | Secondary accent — terracotta for badges, alt sections |
| `--latte` | `#E3D2B8` | Muted tan — dividers, sticker fills, subtle fills |
| `--sage` | `#8A9A7B` | Tertiary pop — used sparingly (e.g. "no preservatives" cues) |
| `--ink-60` | `#211712` @ 60% | Secondary text |

### Section background pairings (the rhythm of the page)
- **Oat** (default) → **Espresso** (full dark "Why INHAUS") → **Paper** → **Clay-tinted** → **Oat**.
- Alternating warm-light and one bold dark block keeps long scrolls premium and paced.

> **Contrast:** Espresso on Oat ≈ 13:1 (AAA). Crema is an *accent*, not body text — pair crema with espresso, never crema text on oat for paragraphs.

---

## 4. Typography

| Role | Font | Notes |
|---|---|---|
| **Display / headings** | **Fraunces** (variable, free — Google Fonts) | High-contrast "old-style" serif with optical sizing + a soft/wonky axis. Premium with personality. Use *italic* for product names. |
| **Body / UI** | **General Sans** (Fontshare, free) *or* **Inter** | Clean, neutral, modern. Comfortable at small sizes. |
| **Eyebrows / labels / stats** | **Space Mono** *or* **JetBrains Mono** | UPPERCASE, letter-spaced — the "spec sheet / architectural" voice. e.g. `[ 100% ARABICA ]`, `20 CUPS / BOTTLE`. |

### Type scale (desktop → mobile)
| Style | Size | Weight | Tracking |
|---|---|---|---|
| Display XL (hero) | 88px → 44px | Fraunces 400, opt-size large | -1.5% |
| H1 section | 56px → 34px | Fraunces 400 | -1% |
| H2 | 36px → 26px | Fraunces 500 | -0.5% |
| Product name | 32px → 24px | Fraunces 400 *italic* | 0 |
| Body L | 18px → 16px | Sans 400 | 0 |
| Body | 16px → 15px | Sans 400 | 0 |
| Eyebrow / label | 12px | Mono 500, UPPER | +8% |

**Rule of thumb:** one big serif statement per section, everything else quiet sans/mono around it.

---

## 5. Logo / Wordmark Direction

- **Wordmark:** `INHAUS` set in Fraunces, slightly tightened, with the option of a subtle ligature or a small architectural detail on the **A** (a roofline) to nod to "haus."
- **Monogram:** `IH` stacked, or a single bottle silhouette mark for favicon / cart / stickers.
- **Lockup variants:** horizontal (nav), stacked (footer/hero), icon-only (mobile, social).
- Keep it on espresso or oat only; never on the accent.

---

## 6. Illustration & Sticker System (the signature layer)

This is what makes it *INHAUS* and not a generic premium store.

- **Style:** single-weight black line-art doodles (≈2px), hand-drawn wobble, no fill or flat latte/crema fill.
- **Motifs:** the bottle, a pour stream, coffee beans, a steaming cup, milk splash, a tiny house/roof, a moka pot, characters mid-pour.
- **Sticker badges** (rotated, slightly overlapping, drop-shadow): `NO SUGAR`, `NO PRESERVATIVES`, `100% ARABICA`, `20 CUPS`, `10-SEC BREW`, `BYOB`, `BLACK`, `CLASSIC`.
- **Where:** scattered around the hero, dense collage over the bottle in "Why INHAUS", little accents punctuating section breaks and buttons on hover.
- **Construction:** SVG so they scale crisp and can wiggle on hover (`rotate` 1–3°).

---

## 7. Photography Direction

- **Hero/product:** warm, tight crops — a hand pouring the concentrate, the pour stream, condensation on an iced glass, crema blooming into milk.
- **Lifestyle:** real, intimate, slightly imperfect — kitchen counters, morning light, two people, the actual box in-hand. Caption energy: *"Real pours. Not a photoshoot."*
- **Grade:** warm, soft contrast, golden-hour bias; avoid cold/clinical studio white.
- **Treatment:** rounded corners (16–24px), occasionally bordered by a doodle frame or a sticker peeking over a corner.

---

## 8. Layout Grid & Spacing

- **Grid:** 12-col, max content width **1200px**, gutter 24px, page padding 24px (desktop) / 20px (mobile).
- **Vertical rhythm:** section padding 120px desktop / 72px mobile.
- **Radii:** buttons = pill (999px); cards = 20px; images = 16–24px; inputs = 999px.
- **Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120.
- **Shadows:** soft, warm-tinted — `0 12px 40px rgba(33,23,18,.10)`. Stickers get a tiny hard offset shadow for "stuck-on" feel.

---

## 9. Component Specs

**Buttons**
- *Primary:* espresso fill, oat text, pill. Hover → crema fill, espresso text, +1px lift.
- *Secondary:* transparent, 1px espresso border, espresso text. Hover → espresso fill, oat text.
- *Text/link:* espresso underline-on-hover in crema.
- Min height 48px, padding 16×28, mono or sans label, optional small doodle arrow.

**Product card:** paper surface, image top (with a `LIMITED` / variant sticker corner), italic serif name, mono variant label, price (with strikethrough compare-at), pill "Add to Cart", swatch/variant pills.

**Comparison block ("Find Your Pour"):** two columns (BLACK | CLASSIC), product image header each, then matched rows with a doodle per row: *base (water/milk) · roast (light/medium-dark) on a bean spectrum · bean blend · flavor note · best for*. Each column ends in its own Add-to-Cart.

**Marquee strip:** infinite horizontal scroll, mono uppercase, `·`-separated: `100% ARABICA · NO SUGAR · NO PRESERVATIVES · 20 CUPS / BOTTLE · BREWS IN 10 SEC · MADE IN INDIA`.

**Accordion (FAQ):** espresso hairline dividers, serif question, +/– toggle, smooth height animation.

**Nav:** sticky, oat with slight blur on scroll; left logo, center links (Shop · How It Works · Our Story · FAQ), right cart with count. Mobile → full-screen overlay menu.

**Newsletter/footer:** clay or espresso block, mono heading, pill email input + arrow submit, links, social, fine print.

---

## 10. Page Architecture (section-by-section, with copy)

1. **Announcement bar** — `Free shipping over ₹999 · Welcome gift: 10% off your first pour`
2. **Nav** — sticky, see spec above.
3. **Hero** — Display: *"Café in a bottle."* · Sub: "Barista coffee at home in 10 seconds. Just pour." · CTA: **Shop the Pour** + secondary **How it works** · visual: bottle + pour photo with scattered doodles.
4. **Marquee trust strip** — the mono ticker above.
5. **Our Products** — featured card(s); headline *"Two pours. Pick yours."*
6. **How It Works** — *"Pour. Add milk or water. Sip."* — 3 doodle steps.
7. **Find Your Pour** — comparison BLACK vs CLASSIC (or premium names **NOIR** / **CRÈME**).
8. **Why INHAUS** — full **espresso** section, bottle hero + sticker collage of benefits.
9. **Real Pours** — lifestyle gallery/carousel · *"Real pours. Not a photoshoot."*
10. **Reviews** — 3–4 short quotes + star rating + aggregate.
11. **FAQ** — accordion (shelf life, servings per bottle, customizing ratio, sourcing, returns, delivery…).
12. **Newsletter + Footer** — *"Get 10% off your first pour."* + links.

---

## 11. Product Architecture

| | **BLACK** (alt: *NOIR*) | **CLASSIC** (alt: *CRÈME*) |
|---|---|---|
| Best base | Water-based drinks | Milk-based drinks |
| Roast | Light roast | Medium–dark roast |
| Beans | 100% Arabica | 80% Arabica + 20% Robusta |
| Flavor | Clean, bright, naturally sweet | Bold, rich, cuts through cream |
| Perfect for | Americanos, iced black | Lattes, cappuccinos, iced with milk |
| Price (placeholder) | ₹499 (compare ₹599) | ₹549 (compare ₹649) |
| Per bottle | ~20 cups · brews in 10 sec | ~20 cups · brews in 10 sec |

---

## 12. Motion & Interaction

- **On scroll:** sections fade + rise 16px (stagger children ~60ms). Respect `prefers-reduced-motion`.
- **Marquee:** continuous, pauses on hover.
- **Stickers:** idle 0; hover → small rotate/scale wiggle.
- **Carousels:** snap scroll, dot indicators, drag on touch.
- **Buttons:** 150ms ease color + lift.
- Keep it subtle — premium = restraint.

---

## 13. Voice & Tone

Confident, warm, design-literate, lightly cheeky. Short sentences. Plain words. A wink, never a gimmick.

**Sample lines**
- "Café in a bottle."
- "Brew nothing. Pour everything."
- "Twenty cups of café, one tiny bottle."
- "Add milk or water. That's the whole recipe."
- "Real pours. Not a photoshoot."
- "Good coffee shouldn't need a machine."

---

## 14. Recommended Tech Stack (for build phase)

- **Framework:** Next.js (App Router) + TypeScript.
- **Styling:** Tailwind CSS with the tokens above mapped to CSS variables; framer-motion for scroll/hover.
- **Fonts:** Fraunces + General Sans/Inter + Space Mono (self-hosted via `next/font`).
- **Content/commerce (optional):** Shopify Storefront API (headless) or a simple static catalog to start.
- **Deploy:** Vercel.
- Single-page marketing home first, then PDP / cart later.

---

## 15. Accessibility & Quality Bar

- Body contrast ≥ AA; large display ≥ AA. Crema reserved for accents/large text.
- Full keyboard nav; visible focus rings (crema, 2px).
- Alt text on all imagery; doodles marked decorative.
- Respect `prefers-reduced-motion`.
- Mobile-first; test 360px → 1440px.

---

*Next step: build the home page from this blueprint. See chat for stack/scope options.*
