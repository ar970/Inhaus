/* ─── Core product facts (single speciality coffee concentrate) ──────── */

export const steps: { n: string; title: string; copy: string; icon: "bottle" | "drop" | "cup" }[] = [
  { n: "01", title: "Pour", copy: "Pour the INHAUS concentrate into your favourite cup.", icon: "bottle" },
  { n: "02", title: "Add milk or water", copy: "Top it up — hot or over ice — and give it a quick stir.", icon: "drop" },
  { n: "03", title: "Sip", copy: "Café-grade speciality coffee in seconds. No machine required.", icon: "cup" },
];

export const benefits: { title: string; icon: "bean" | "drop" | "house" | "cup" | "star" | "bottle" }[] = [
  { title: "Speciality coffee", icon: "bean" },
  { title: "No added sugar", icon: "drop" },
  { title: "No preservatives", icon: "star" },
  { title: "Ready in seconds", icon: "bottle" },
  { title: "Just add milk or water", icon: "cup" },
  { title: "No machine needed", icon: "house" },
];

/* ─── What can you make (from the real drink line-up) ────────────────── */
export const drinks: { name: string; mood: string; time: string; icon: "cup" | "drop" | "bean" }[] = [
  { name: "Mocha", mood: "Hot · Comfort", time: "2 min", icon: "cup" },
  { name: "Iced Caramel Latte", mood: "Iced · Indulgent", time: "1 min", icon: "drop" },
  { name: "Classic Americano", mood: "Hot or Iced", time: "1 min", icon: "bean" },
  { name: "Iced Hazelnut Latte", mood: "Iced · 60 sec", time: "1 min", icon: "cup" },
  { name: "Classic Latte", mood: "Hot · Smooth", time: "2 min", icon: "drop" },
];

/* ─── Default reviews (used pre-persona; personas override these) ─────── */
export const reviews: { quote: string; name: string; role: string }[] = [
  {
    quote: "One stir and it tastes like my neighbourhood café. I'm never going back to instant.",
    name: "Ananya R.",
    role: "Bengaluru",
  },
  {
    quote: "Iced americano in under a minute, no machine. This is genuinely how I drink coffee now.",
    name: "Dev M.",
    role: "Mumbai",
  },
  {
    quote: "Speciality coffee without the ceremony. Pour, add milk, done.",
    name: "Priya S.",
    role: "Delhi",
  },
];

/* ─── FAQ — reconstructed from the brewcasso / STIR screenshots ───────── */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How do I make coffee with the concentrate?",
    a: "Pour the concentrate into your cup, add milk or water — hot or iced — give it a quick stir, and it's ready. That's the whole recipe.",
  },
  {
    q: "Is this the same as instant coffee?",
    a: "No. This is real brewed speciality coffee, concentrated into liquid form. Instant is dried and reconstituted; INHAUS keeps the aroma and body of a freshly brewed cup.",
  },
  {
    q: "Do I need any special equipment?",
    a: "None at all — no machine, no grinder, no filter. If you have a cup and something to pour, you're set.",
  },
  {
    q: "How much milk or water should I add?",
    a: "Start with roughly one part concentrate to three parts milk or water, then adjust to taste — stronger or lighter, hot or over ice.",
  },
  {
    q: "Can I use it for iced coffee?",
    a: "Absolutely. Pour over ice and top with cold milk or water for an instant iced latte or iced americano.",
  },
  {
    q: "Can I customise the strength?",
    a: "Yes — just change the ratio. More concentrate for a bolder cup, more milk or water for a smoother one.",
  },
  {
    q: "Does it contain preservatives or additives?",
    a: "No preservatives, no additives, and no added sugar. Just speciality coffee, the way it should be.",
  },
  {
    q: "Is the concentrate vegan?",
    a: "Yes — the concentrate itself is 100% plant-based. What you add to it (milk or water) is entirely up to you.",
  },
  {
    q: "How long does it last?",
    a: "Full shelf-life and storage details will be confirmed with the final product. Keep it cool and sealed for the best flavour.",
  },
  {
    q: "Do you offer a trial or returns?",
    a: "If your first order isn't for you, reach out and we'll make it right. Complete trial and return terms will be shared at launch.",
  },
];

/* ─── Default marquee (personas override these) ──────────────────────── */
export const marqueeItems: string[] = [
  "SPECIALITY COFFEE",
  "JUST ADD MILK OR WATER",
  "READY IN SECONDS",
  "NO MACHINE",
  "NO ADDED SUGAR",
  "NO PRESERVATIVES",
  "STIR & SIP",
];
