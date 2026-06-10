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
    a: "INHAUS concentrate lasts 1 year unopened at room temperature. Once opened, seal it and refrigerate — best consumed within 25 days. No cold chain needed before opening.",
  },
  {
    q: "Do you offer a trial or returns?",
    a: "If your bottle arrives damaged, leaking, or defective, contact us within 48 hours of delivery with a photo and we will send a replacement at no charge. We do not accept returns on opened products. For any issue, reach us at admin@inhauscoffee.com or +91 93113 49922.",
  },
  {
    q: "What is coffee concentrate?",
    a: "Coffee concentrate is brewed coffee made at a much higher ratio of coffee to water — typically 2–4× stronger than regular coffee. You dilute it with milk or water when drinking, which gives you full café-strength flavour in seconds. INHAUS uses cold extraction to preserve the natural aroma and smoothness.",
  },
  {
    q: "Is liquid coffee concentrate better than instant coffee?",
    a: "Yes — significantly. Instant coffee is made by spray-drying or freeze-drying brewed coffee, which destroys much of the aroma and body. INHAUS is cold-extracted speciality Arabica, so you get the full complexity of a properly brewed cup — none of the hollow, bitter taste instant gives you.",
  },
  {
    q: "What is the difference between coffee concentrate and cold brew?",
    a: "Cold brew is typically brewed for 12–24 hours and consumed as-is. Coffee concentrate is brewed at a much higher coffee-to-water ratio, so a small amount (15ml) makes a full cup when diluted. INHAUS cold-extracts its concentrate slowly at low temperature, giving you cold brew quality that's shelf-stable and ready in seconds.",
  },
  {
    q: "How do I make iced coffee with INHAUS?",
    a: "Fill a glass with ice, pour 15–20ml of INHAUS concentrate, add 100–120ml of cold milk or water, and stir. Done — you have a café-style iced latte or iced americano in under 30 seconds, no machine needed.",
  },
  {
    q: "Is INHAUS good for studying?",
    a: "Yes — Study Fuel is specifically made for late-night study sessions and deadline-mode. It's 100% Arabica with no added sugar, so you get clean caffeine without a crash. Ready in 60 seconds, no noise, no mess — perfect for a hostel room or dorm.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes. INHAUS ships across India. Standard delivery is 2–5 business days. For questions about your order, contact admin@inhauscoffee.com or call +91 93113 49922.",
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
