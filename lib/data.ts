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
export type Recipe = {
  description: string;
  ingredients: string[];
  steps: string[];
};

export const drinks: { name: string; mood: string; time: string; icon: "cup" | "drop" | "bean"; image: string; recipe: Recipe }[] = [
  /* ── New flavours first ── */
  {
    name: "Iced Strawberry Latte", mood: "Iced · Fruity", time: "1 min", icon: "drop", image: "/iced-strawberry-latte.jpeg",
    recipe: {
      description: "Coffee and cold milk with a burst of strawberry over ice. Fruity, creamy, summer in a cup.",
      ingredients: ["15 ml INHAUS concentrate", "100 ml cold milk", "2 tsp (10 ml) strawberry syrup", "50 g ice cubes"],
      steps: ["Fill a glass with ice.", "Add INHAUS concentrate and strawberry syrup.", "Pour cold milk over the top.", "Stir and enjoy.", "(opt) Garnish with a thin slice of strawberry."],
    },
  },
  {
    name: "Pistachio Latte", mood: "Hot · Nutty", time: "2 min", icon: "cup", image: "/pistachio-latte.jpeg",
    recipe: {
      description: "Rich coffee blended with nutty pistachio and creamy steamed milk. Warm, toasty, quietly indulgent.",
      ingredients: ["15 ml INHAUS concentrate", "2 tsp (10 ml) pistachio syrup / paste", "100 ml hot milk"],
      steps: ["Add pistachio syrup / paste to hot milk and mix.", "Add INHAUS concentrate to the cup.", "Slowly pour the milk & pistachio mix over the coffee.", "Stir to combine just before drinking.", "(opt) Garnish with a dusting of ground pistachio."],
    },
  },
  {
    name: "Spanish Latte", mood: "Iced · Bold", time: "1 min", icon: "bean", image: "/spanish-latte.jpeg",
    recipe: {
      description: "Concentrate with hot milk and sweetened condensed milk. Smooth, indulgent, caramel-kissed.",
      ingredients: ["15 ml INHAUS concentrate", "100 ml hot milk", "1.5 tbsp sweetened condensed milk"],
      steps: ["Add condensed milk to your cup.", "Pour the concentrate over it.", "Heat milk and pour gently.", "Stir until combined."],
    },
  },
  {
    name: "Iced Vanilla Latte", mood: "Hot · Sweet", time: "2 min", icon: "drop", image: "/iced-vanilla-latte.jpeg",
    recipe: {
      description: "INHAUS concentrate, cold milk, and a hint of vanilla over ice. Cool, sweet, effortless — your everyday favourite.",
      ingredients: ["15 ml INHAUS concentrate", "100 ml cold milk", "2 tsp (10 ml) vanilla syrup", "50 g ice cubes"],
      steps: ["Fill a glass with ice cubes.", "Pour INHAUS concentrate over the ice.", "Add vanilla syrup.", "Top with cold milk and give it a gentle stir."],
    },
  },
  /* ── Original five ── */
  {
    name: "Mocha", mood: "Hot · Comfort", time: "2 min", icon: "cup", image: "/mocha.jpeg",
    recipe: {
      description: "Coffee meets rich chocolate in a hot milk hug. The classic comfort cup.",
      ingredients: ["15 ml INHAUS concentrate", "100 ml hot milk", "2 tsp (10 ml) dark chocolate syrup"],
      steps: ["Add chocolate syrup to your cup.", "Pour in the INHAUS concentrate and stir.", "Heat milk and pour over the top.", "Stir gently and serve.", "(opt) Garnish with a dusting of cocoa powder."],
    },
  },
  {
    name: "Iced Caramel Latte", mood: "Iced · Indulgent", time: "1 min", icon: "drop", image: "/iced-caramel-latte.jpeg",
    recipe: {
      description: "Smooth coffee with cold milk and caramel over ice. Sweet, silky, seriously good.",
      ingredients: ["15 ml INHAUS concentrate", "100 ml cold milk", "2 tsp (10 ml) caramel syrup", "50 g ice cubes"],
      steps: ["Fill a glass with ice.", "Pour concentrate over ice.", "Add caramel syrup.", "Top with cold milk and stir.", "(opt) Garnish with a drizzle of caramel sauce."],
    },
  },
  {
    name: "Classic Americano", mood: "Hot or Iced", time: "1 min", icon: "bean", image: "/classic-americano.jpeg",
    recipe: {
      description: "Concentrate diluted with water — hot or over ice. Simple, bold, timeless.",
      ingredients: ["10 ml INHAUS concentrate", "90 ml hot or cold water", "50 g ice (if iced)"],
      steps: ["For iced: fill glass with ice, add INHAUS concentrate, top with cold water.", "For hot: add concentrate to cup, pour hot water over it.", "Stir and enjoy!"],
    },
  },
  {
    name: "Iced Hazelnut Latte", mood: "Iced · 60 sec", time: "1 min", icon: "cup", image: "/iced-hazelnut-latte.jpeg",
    recipe: {
      description: "INHAUS concentrate with cold milk and hazelnut over ice. Nutty, creamy, dangerously drinkable.",
      ingredients: ["15 ml INHAUS concentrate", "100 ml cold milk", "2 tsp (10 ml) hazelnut syrup", "50 g ice cubes"],
      steps: ["Fill a glass with ice.", "Add INHAUS concentrate and hazelnut syrup.", "Pour cold milk over the top.", "Stir and serve."],
    },
  },
  {
    name: "Classic Latte", mood: "Hot · Smooth", time: "2 min", icon: "drop", image: "/classic-latte.jpeg",
    recipe: {
      description: "INHAUS concentrate with warm milk. Creamy, comforting, classic.",
      ingredients: ["10 ml INHAUS concentrate", "100 ml hot milk"],
      steps: ["Pour INHAUS concentrate into your cup.", "Heat milk to about 70°C (do not boil).", "Pour hot milk over the concentrate.", "Stir and enjoy."],
    },
  },
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
