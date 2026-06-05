export type Persona = "student" | "creator" | "professional";

export interface PersonaTheme {
  /* CSS variable values set on <html data-persona="..."> */
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  accentSoft: string;
  accentSecondary: string;
  /* Raw hex for gate card hover fill */
  gateHover: string;
  gateText: string;
}

export interface PersonaContent {
  label: string;
  mono: string;            // UPPERCASE short label
  tagline: string;         // gate one-liner
  gateDescription: string; // gate sub-label
  announcement: string;
  hero: {
    eyebrow: string;
    headline: string;      // use \n for line break
    sub: string;
    cta: string;
    ctaSecondary: string;
  };
  products: {
    headline: string;
    sub: string;
  };
  why: {
    headline: string;
    sub: string;
  };
  reviews: { quote: string; name: string; role: string }[];
  newsletter: {
    headline: string;
    sub: string;
  };
  marquee: string[];
}

export const personaThemes: Record<Persona, PersonaTheme> = {
  student: {
    bg: "#FFF8F2",
    surface: "#FFFBF7",
    ink: "#1C1009",
    accent: "#E8601A",
    accentSoft: "#FDE5CC",
    accentSecondary: "#F5A54A",
    gateHover: "#E8601A",
    gateText: "#FFF8F2",
  },
  creator: {
    bg: "#F9F4FF",
    surface: "#FCF9FF",
    ink: "#1A0E2E",
    accent: "#8931C4",
    accentSoft: "#ECDAF6",
    accentSecondary: "#B566DF",
    gateHover: "#8931C4",
    gateText: "#F9F4FF",
  },
  professional: {
    bg: "#F3FAF5",
    surface: "#F7FCF8",
    ink: "#0C1F13",
    accent: "#177545",
    accentSoft: "#D1ECE0",
    accentSecondary: "#3EA46D",
    gateHover: "#177545",
    gateText: "#F3FAF5",
  },
};

export const personaContent: Record<Persona, PersonaContent> = {
  student: {
    label: "Student",
    mono: "STUDENT",
    tagline: "Fuel for the grind.",
    gateDescription: "₹25 a cup. No café run. No excuse.",
    announcement: "Student deal: ₹499 / bottle · That's just ₹25 a cup",
    hero: {
      eyebrow: "Made for the grind",
      headline: "Your café.\nAlways open.",
      sub: "₹25 per cup, 20 cups per bottle. No machine, no queue — just pour, add milk or water, and get back to it.",
      cta: "Grab a bottle",
      ctaSecondary: "How it works",
    },
    products: {
      headline: "Pick your fuel.",
      sub: "Black for all-nighters, Classic for early starts. Both under a minute. Both better than the café queue.",
    },
    why: {
      headline: "No café run. No machine. No excuses.",
      sub: "INHAUS fits in your hostel fridge, your bag, your schedule. Twenty cups, one bottle, ₹25 each.",
    },
    reviews: [
      {
        quote: "Survived finals on Black. Literally. I owe INHAUS a thank-you card.",
        name: "Arjun S.",
        role: "3rd year, IIT Bombay",
      },
      {
        quote: "My roommate thought I had a barista hidden in my room. It's just INHAUS and milk.",
        name: "Priyanka N.",
        role: "MBA student, Delhi",
      },
      {
        quote: "₹25 a cup. I've done the math. This is just how I live now.",
        name: "Kabir M.",
        role: "Design student, Ahmedabad",
      },
    ],
    newsletter: {
      headline: "Join the grind. Get 10% off.",
      sub: "Student prices, real café quality. Plus brew tips, study playlists, first dibs on new roasts.",
    },
    marquee: [
      "₹25 A CUP",
      "20 CUPS / BOTTLE",
      "NO MACHINE NEEDED",
      "100% ARABICA",
      "NO SUGAR",
      "BREWS IN 10 SEC",
      "HOSTEL FRIENDLY",
    ],
  },

  creator: {
    label: "Creator",
    mono: "CREATOR",
    tagline: "Flow state in a bottle.",
    gateDescription: "Stay in it. The good coffee is already here.",
    announcement: "Free shipping over ₹999 · First pour: 10% off with code POUR10",
    hero: {
      eyebrow: "Your creative fuel",
      headline: "Stay in\nthe flow.",
      sub: "When you're in the zone, the last thing you need is a café run. Pour, add milk, keep making.",
      cta: "Enter the flow",
      ctaSecondary: "Find your pour",
    },
    products: {
      headline: "Two pours. One obsession.",
      sub: "Black for the focused hours. Classic for the late-night sessions. Both on your desk in ten seconds.",
    },
    why: {
      headline: "The bottle on the desk. Not the queue outside.",
      sub: "No interruption to your process. Same quality you'd get at a good café — poured on your terms.",
    },
    reviews: [
      {
        quote: "The bottle lives on my desk now. Non-negotiable part of my setup.",
        name: "Shreya V.",
        role: "Illustrator, Pune",
      },
      {
        quote: "I make content about coffee. INHAUS is embarrassingly good. Said it.",
        name: "Dev R.",
        role: "Food creator, Mumbai",
      },
      {
        quote: "Black over ice is my whole creative process summarised.",
        name: "Aarav K.",
        role: "Photographer, Bengaluru",
      },
    ],
    newsletter: {
      headline: "Create more. Brew less.",
      sub: "Pour ideas, first dibs on limited roasts, and 10% off your first bottle.",
    },
    marquee: [
      "FLOW STATE IN A BOTTLE",
      "100% ARABICA",
      "NO SUGAR",
      "20 CUPS / BOTTLE",
      "BREWS IN 10 SEC",
      "NO INTERRUPTIONS",
      "POUR & CREATE",
    ],
  },

  professional: {
    label: "Professional",
    mono: "PROFESSIONAL",
    tagline: "Sharper mornings.",
    gateDescription: "No machine. No barista. Just results.",
    announcement: "Free shipping over ₹999 · Subscribe & save 15% · Cancel anytime",
    hero: {
      eyebrow: "Premium. Efficient. Yours.",
      headline: "Sharper mornings.\nBetter outcomes.",
      sub: "No machine. No barista. Café-grade coffee in ten seconds — so you can focus on what actually moves the needle.",
      cta: "Start sharp",
      ctaSecondary: "See the difference",
    },
    products: {
      headline: "Precision in every pour.",
      sub: "Built for people who don't compromise on quality or time. The same great cup, every single morning.",
    },
    why: {
      headline: "Ten seconds. No compromise.",
      sub: "INHAUS replaces the café run, the machine maintenance, and the inconsistency — without sacrificing a single thing.",
    },
    reviews: [
      {
        quote: "I used to spend ₹200 and 20 minutes at the café every morning. Not anymore.",
        name: "Nisha P.",
        role: "Product Manager, Bengaluru",
      },
      {
        quote: "My entire team is on INHAUS now. Office efficiency is probably unrelated.",
        name: "Rahul D.",
        role: "Founder, Delhi",
      },
      {
        quote: "Black. Cold. 6am. That's the whole ritual. INHAUS makes it work.",
        name: "Meera S.",
        role: "Consultant, Mumbai",
      },
    ],
    newsletter: {
      headline: "Sharpen the routine. Save 15%.",
      sub: "Subscribe for consistent quality, a 15% saving, and early access to new roasts.",
    },
    marquee: [
      "CAFÉ GRADE AT HOME",
      "100% ARABICA",
      "NO SUGAR",
      "10 SEC BREW",
      "20 CUPS / BOTTLE",
      "NO MACHINE",
      "PREMIUM CONCENTRATE",
    ],
  },
};

export const gateCards: { id: Persona; Icon: string }[] = [
  { id: "student", Icon: "cup" },
  { id: "creator", Icon: "star" },
  { id: "professional", Icon: "house" },
];
