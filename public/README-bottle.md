# Product bottle image

The hero shows the file **`inhaus-bottle.jpg`** from this `public/` folder.

To use your real product artwork:

1. Save your bottle/sticker-sheet image as `inhaus-bottle.jpg`
   (PNG with a transparent background works best).
2. Drop it into this `public/` folder so the path is:
   `public/inhaus-bottle.jpg`
3. Commit + push. The website picks it up automatically — no code change needed.

If the file is missing, the site falls back to the inline SVG recreation
in `components/InhausBottle.tsx` so nothing ever breaks.

> A `.jpg` also works — just rename the `src` in
> `components/InhausBottle.tsx` from `/inhaus-bottle.jpg` to `/inhaus-bottle.jpg`.
