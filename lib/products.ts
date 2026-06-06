export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  cups: number;
  ml: number;
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
    images: ["/product-study.jpeg", "/morning pour.png", "/iced balck.png"],
    description: "Concentrated speciality coffee built for late nights, big deadlines, and bigger goals.",
    longDescription: "Study Fuel is INHAUS's answer to the café run you never have time for. Made from 100% Arabica speciality coffee, cold-brewed and concentrated into a bottle that fits your hostel fridge. Pour over milk or water, hot or iced, and you're sorted in 60 seconds.",
    variants: [
      { id: "study-180", name: "180ml (12 cups)", price: 299, originalPrice: 349, cups: 12, ml: 180 },
      { id: "study-300", name: "300ml (20 cups)", price: 449, originalPrice: 549, cups: 20, ml: 300 },
      { id: "study-500", name: "500ml (33 cups)", price: 649, originalPrice: 799, cups: 33, ml: 500 },
    ],
    benefits: ["100% Arabica speciality coffee", "No added sugar", "No preservatives", "Ready in 60 seconds", "No machine needed", "Hot or iced"],
    howTo: ["Pour 15ml concentrate into your cup", "Add 100ml hot or cold milk (or water)", "Stir once", "Done — that's it"],
    specs: [
      { label: "Coffee", value: "100% Arabica" },
      { label: "Process", value: "Cold brew concentrate" },
      { label: "Serves", value: "12–33 cups per bottle" },
      { label: "Storage", value: "Refrigerate after opening" },
      { label: "Shelf life", value: "6 months sealed" },
    ],
  },
  {
    handle: "creator-fuel",
    name: "Creator Fuel",
    tagline: "Make. Edit. Repeat.",
    persona: "creator",
    color: "#FF2D78",
    image: "/product-creator.jpeg",
    images: ["/product-creator.jpeg", "/latte at the counter.png", "/beans.always whole.png"],
    description: "One pour and you're back in the zone. Built for creators, designers, editors and storytellers.",
    longDescription: "Creator Fuel is for the people who can't afford a break in their flow. No café run, no machine setup, no waiting. INHAUS concentrate on your desk — stir into milk or water whenever the session calls for it. The same quality you'd get at a good café, made in seconds.",
    variants: [
      { id: "creator-180", name: "180ml (12 cups)", price: 299, originalPrice: 349, cups: 12, ml: 180 },
      { id: "creator-300", name: "300ml (20 cups)", price: 449, originalPrice: 549, cups: 20, ml: 300 },
      { id: "creator-500", name: "500ml (33 cups)", price: 649, originalPrice: 799, cups: 33, ml: 500 },
    ],
    benefits: ["100% Arabica speciality coffee", "No added sugar", "No preservatives", "Ready in 60 seconds", "No machine needed", "20 sessions per 300ml"],
    howTo: ["Pour 15ml concentrate into your cup", "Add 100ml milk or water — hot or over ice", "Stir", "Stay in the zone"],
    specs: [
      { label: "Coffee", value: "100% Arabica" },
      { label: "Process", value: "Cold brew concentrate" },
      { label: "Serves", value: "12–33 cups per bottle" },
      { label: "Storage", value: "Refrigerate after opening" },
      { label: "Shelf life", value: "6 months sealed" },
    ],
  },
  {
    handle: "workflow",
    name: "WorkFlow",
    tagline: "Skip the coffee run. Keep going.",
    persona: "professional",
    color: "#00A896",
    image: "/product-workflow.jpeg",
    images: ["/product-workflow.jpeg", "/morning pour.png", "/latte at the counter.png"],
    description: "Premium coffee for people who ship, build and execute. Café-grade. No machine.",
    longDescription: "WorkFlow is precision in a bottle. Built for professionals who won't compromise on quality or time. The same great cup every single morning — no inconsistency, no café queue, no machine. INHAUS replaces the ritual without losing the result.",
    variants: [
      { id: "workflow-180", name: "180ml (12 cups)", price: 299, originalPrice: 349, cups: 12, ml: 180 },
      { id: "workflow-300", name: "300ml (20 cups)", price: 449, originalPrice: 549, cups: 20, ml: 300 },
      { id: "workflow-500", name: "500ml (33 cups)", price: 649, originalPrice: 799, cups: 33, ml: 500 },
    ],
    benefits: ["100% Arabica speciality coffee", "No added sugar", "No preservatives", "60 seconds to brew", "No machine needed", "Consistent every cup"],
    howTo: ["Pour 15ml concentrate into your cup", "Add 100ml hot or cold milk (or water)", "Quick stir", "Consistent result, every time"],
    specs: [
      { label: "Coffee", value: "100% Arabica" },
      { label: "Process", value: "Cold brew concentrate" },
      { label: "Serves", value: "12–33 cups per bottle" },
      { label: "Storage", value: "Refrigerate after opening" },
      { label: "Shelf life", value: "6 months sealed" },
    ],
  },
];

export function getProduct(handle: string) {
  return products.find(p => p.handle === handle) ?? null;
}
