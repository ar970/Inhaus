export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  cups: number;
  ml: number;
  comingSoon?: boolean;
}

export interface Product {
  handle: string;
  name: string;
  tagline: string;
  persona: "student" | "creator" | "professional";
  color: string;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  variants: ProductVariant[];
  benefits: string[];
  howTo: string[];
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    handle: "study-fuel",
    name: "Study Fuel",
    tagline: "Fuel for the 2:17 AM grind.",
    persona: "student",
    color: "#F04E12",
    image: "/product-study.jpeg",
    images: ["/study fuel 2.png", "/study fuel 3.png", "/product-study.jpeg"],
    description: "Café-grade coffee concentrate for late-night study sessions, deadlines, and ambitious goals. Ready in 60 seconds. No machine needed.",
    longDescription: "Study Fuel is INHAUS's answer to the café run you never have time for. Made from 100% Arabica speciality coffee, cold-brewed and concentrated into a bottle that fits your hostel fridge. Pour over milk or water, hot or iced, and you're sorted in 60 seconds.",
    variants: [
      { id: "study-100", name: "100ml (10 cups)", price: 0, cups: 10, ml: 100, comingSoon: true },
      { id: "study-200", name: "200ml (20 cups)", price: 499, cups: 20, ml: 200 },
    ],
    benefits: ["100% Arabica speciality coffee", "No added sugar", "No preservatives", "Ready in 60 seconds", "No machine needed", "Hot or iced"],
    howTo: ["Pour 15ml concentrate into your cup", "Add 100ml hot or cold milk (or water)", "Stir once", "Done — that's it"],
    specs: [
      { label: "Coffee", value: "100% Arabica" },
      { label: "Process", value: "Cold brew concentrate" },
      { label: "Storage", value: "Refrigerate after opening" },
      { label: "Shelf life", value: "1 year sealed" },
    ],
  },
  {
    handle: "creator-fuel",
    name: "Creator Fuel",
    tagline: "Make. Edit. Repeat.",
    persona: "creator",
    color: "#FF2D78",
    image: "/creator flow.jpeg",
    images: ["/creator flow.jpeg", "/creator flow 2.png", "/creator flow 3.png"],
    description: "Café-grade coffee concentrate for deep work, creative flow, and sessions that can't afford an interruption. Ready in 60 seconds. No machine needed.",
    longDescription: "Creator Fuel is for the people who can't afford a break in their flow. No café run, no machine setup, no waiting. INHAUS concentrate on your desk — stir into milk or water whenever the session calls for it. The same quality you'd get at a good café, made in seconds.",
    variants: [
      { id: "creator-100", name: "100ml (10 cups)", price: 0, cups: 10, ml: 100, comingSoon: true },
      { id: "creator-200", name: "200ml (20 cups)", price: 499, cups: 20, ml: 200 },
    ],
    benefits: ["100% Arabica speciality coffee", "No added sugar", "No preservatives", "Ready in 60 seconds", "No machine needed", "20 sessions per 200ml"],
    howTo: ["Pour 15ml concentrate into your cup", "Add 100ml milk or water — hot or over ice", "Stir", "Stay in the zone"],
    specs: [
      { label: "Coffee", value: "100% Arabica" },
      { label: "Process", value: "Cold brew concentrate" },
      { label: "Storage", value: "Refrigerate after opening" },
      { label: "Shelf life", value: "1 year sealed" },
    ],
  },
  {
    handle: "workflow",
    name: "WorkFlow",
    tagline: "Skip the coffee run. Keep going.",
    persona: "professional",
    color: "#00A896",
    image: "/product-workflow.jpeg",
    images: ["/work flow 2.png", "/work flow 3.png", "/product-workflow.jpeg"],
    description: "Café-grade coffee concentrate for people who ship, build, and execute without compromise. Ready in 60 seconds. No machine needed.",
    longDescription: "WorkFlow is precision in a bottle. Built for professionals who won't compromise on quality or time. The same great cup every single morning — no inconsistency, no café queue, no machine. INHAUS replaces the ritual without losing the result.",
    variants: [
      { id: "workflow-100", name: "100ml (10 cups)", price: 0, cups: 10, ml: 100, comingSoon: true },
      { id: "workflow-200", name: "200ml (20 cups)", price: 499, cups: 20, ml: 200 },
    ],
    benefits: ["100% Arabica speciality coffee", "No added sugar", "No preservatives", "60 seconds to brew", "No machine needed", "Consistent every cup"],
    howTo: ["Pour 15ml concentrate into your cup", "Add 100ml hot or cold milk (or water)", "Quick stir", "Consistent result, every time"],
    specs: [
      { label: "Coffee", value: "100% Arabica" },
      { label: "Process", value: "Cold brew concentrate" },
      { label: "Storage", value: "Refrigerate after opening" },
      { label: "Shelf life", value: "1 year sealed" },
    ],
  },
];

export function getProduct(handle: string) {
  return products.find(p => p.handle === handle) ?? null;
}
