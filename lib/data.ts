export type Product = {
  id: string;
  name: string;
  altName: string;
  tag: string;
  blurb: string;
  price: number;
  compareAt: number;
  accent: string;
  variantLabel: string;
};

export const products: Product[] = [
  {
    id: "black",
    name: "Black",
    altName: "Noir",
    tag: "Bestseller",
    blurb: "Light-roast, 100% Arabica. Clean, bright, naturally sweet — built for water-based drinks.",
    price: 499,
    compareAt: 599,
    accent: "#2A1C14",
    variantLabel: "BLACK",
  },
  {
    id: "classic",
    name: "Classic",
    altName: "Crème",
    tag: "For milk",
    blurb: "Medium–dark roast, Arabica + Robusta. Bold, rich, and made to cut clean through cream.",
    price: 549,
    compareAt: 649,
    accent: "#B5654A",
    variantLabel: "CLASSIC",
  },
];

export const comparisonRows: { label: string; black: string; classic: string }[] = [
  { label: "Best base", black: "Water-based drinks", classic: "Milk-based drinks" },
  { label: "Roast", black: "Light roast", classic: "Medium–dark roast" },
  { label: "Beans", black: "100% Arabica", classic: "80% Arabica · 20% Robusta" },
  { label: "Flavor", black: "Clean, bright, sweet", classic: "Bold, rich, full-bodied" },
  { label: "Perfect for", black: "Americanos, iced black", classic: "Lattes, cappuccinos" },
];

export const steps: { n: string; title: string; copy: string; icon: "bottle" | "drop" | "cup" }[] = [
  { n: "01", title: "Pour", copy: "One part INHAUS concentrate into your favourite cup.", icon: "bottle" },
  { n: "02", title: "Add milk or water", copy: "Three parts of either, hot or over ice. That's the whole recipe.", icon: "drop" },
  { n: "03", title: "Sip", copy: "Café-grade coffee in about ten seconds. No machine required.", icon: "cup" },
];

export const benefits: { title: string; icon: "bean" | "drop" | "house" | "cup" | "star" | "bottle" }[] = [
  { title: "100% Arabica", icon: "bean" },
  { title: "No added sugar", icon: "drop" },
  { title: "No preservatives", icon: "star" },
  { title: "20 cups / bottle", icon: "cup" },
  { title: "Brews in 10 sec", icon: "bottle" },
  { title: "Roasted in-haus", icon: "house" },
];

export const reviews: { quote: string; name: string; role: string }[] = [
  {
    quote: "I cancelled my café subscription. INHAUS Classic in oat milk is genuinely better than my usual order.",
    name: "Ananya R.",
    role: "Work-from-home, Bengaluru",
  },
  {
    quote: "Black over ice with soda is my whole summer now. Bright, clean, not a hint of bitterness.",
    name: "Dev M.",
    role: "Home barista, Mumbai",
  },
  {
    quote: "Ten seconds and it tastes like the good neighbourhood place. The bottle lasts me three weeks.",
    name: "Priya S.",
    role: "New parent, Delhi",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Are there any preservatives or chemicals?",
    a: "None. INHAUS is cold-extracted coffee and water — nothing else. No sugar, no preservatives, no chicory.",
  },
  {
    q: "How many cups are in one bottle?",
    a: "Roughly 20 cups per 250ml bottle at our recommended 1:3 ratio. Brew stronger or lighter to taste.",
  },
  {
    q: "What is the shelf life?",
    a: "Unopened, 6 months in a cool, dark place. Once opened, refrigerate and finish within 4 weeks.",
  },
  {
    q: "How much milk or water should I add?",
    a: "Start at one part INHAUS to three parts milk or water, hot or iced, then dial it to your strength.",
  },
  {
    q: "Which variant should I choose?",
    a: "Pick Black for water-based drinks like Americanos and iced black coffee. Pick Classic for anything with milk — lattes, cappuccinos, iced lattes.",
  },
  {
    q: "Where are the beans sourced from?",
    a: "Single-origin Arabica from estates in Chikmagalur, with a touch of Robusta in Classic for body.",
  },
  {
    q: "Where do you deliver?",
    a: "Across India. Free shipping on orders over ₹999, dispatched within 24 hours on weekdays.",
  },
  {
    q: "Can I return the product?",
    a: "If your first bottle isn't for you, write to us within 14 days and we'll make it right — refund or replacement.",
  },
];

export const marqueeItems: string[] = [
  "100% ARABICA",
  "NO SUGAR",
  "NO PRESERVATIVES",
  "20 CUPS / BOTTLE",
  "BREWS IN 10 SEC",
  "MADE IN INDIA",
];
