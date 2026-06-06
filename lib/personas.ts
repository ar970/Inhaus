export type Persona = "student" | "creator" | "professional";

export interface PersonaTheme {
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  accentSoft: string;
  accentSecondary: string;
  gateHover: string;
  gateText: string;
}

export interface PersonaContent {
  label: string;
  mono: string;
  tagline: string;
  gateDescription: string;
  announcement: string;
  hero: {
    eyebrow: string;
    headline: string; // \n = line break
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
    bg: "#FFF2DC",
    surface: "#FFFBF2",
    ink: "#1E0C04",
    accent: "#F04E12",
    accentSoft: "#FFDDB3",
    accentSecondary: "#FF9328",
    gateHover: "#F04E12",
    gateText: "#FFF2DC",
  },
  creator: {
    bg: "#1A0510",
    surface: "#26081A",
    ink: "#FFE8F2",
    accent: "#FF2D78",
    accentSoft: "rgba(255,45,120,0.20)",
    accentSecondary: "#FF7AAE",
    gateHover: "#FF2D78",
    gateText: "#FFE8F2",
  },
  professional: {
    bg: "#EEF2F8",
    surface: "#F8FAFD",
    ink: "#050D1F",
    accent: "#1545A8",
    accentSoft: "#C4D0EC",
    accentSecondary: "#2E65D4",
    gateHover: "#1545A8",
    gateText: "#EEF2F8",
  },
};

export const personaContent: Record<Persona, PersonaContent> = {
  student: {
    label: "Student",
    mono: "STUDENT",
    tagline: "Fuel for the grind.",
    gateDescription: "Skip the café run. Brew it in seconds.",
    announcement: "Student favourite · Café coffee without the café run",
    hero: {
      eyebrow: "Made for the grind",
      headline: "Your café.\nAlways open.",
      sub: "Café-grade coffee whenever you need it — no machine, no queue. Just pour, add milk or water, and get back to it.",
      cta: "Grab yours",
      ctaSecondary: "How it works",
    },
    products: {
      headline: "Your fuel, sorted.",
      sub: "Speciality coffee that's ready before your laptop wakes up. Pour, add milk or water, done.",
    },
    why: {
      headline: "No café run. No machine. No excuses.",
      sub: "INHAUS fits your hostel fridge, your bag, your schedule — speciality coffee in seconds, whenever the grind calls.",
    },
    reviews: [
      { quote: "Survived finals on this. Literally. I owe INHAUS a thank-you card.", name: "Arjun S.", role: "3rd year, IIT Bombay" },
      { quote: "My roommate thought I had a barista hidden in my room. It's just INHAUS and milk.", name: "Priyanka N.", role: "MBA student, Delhi" },
      { quote: "One stir and I'm sorted. This is just how I live now.", name: "Kabir M.", role: "Design student, Ahmedabad" },
    ],
    newsletter: {
      headline: "Join the grind. Get 10% off.",
      sub: "Real café quality made for student life — plus brew tips, study playlists, and first dibs on new flavours.",
    },
    marquee: ["NO CAFÉ RUN", "READY IN SECONDS", "NO MACHINE NEEDED", "SPECIALITY COFFEE", "NO ADDED SUGAR", "STIR & SIP", "HOSTEL FRIENDLY"],
  },

  creator: {
    label: "Creator",
    mono: "CREATOR",
    tagline: "Stay in the flow.",
    gateDescription: "Stay in it. The good coffee's already here.",
    announcement: "Free shipping across India · 10% off your first order with POUR10",
    hero: {
      eyebrow: "Your creative fuel",
      headline: "Stay in\nthe flow.",
      sub: "When you're in the zone, the last thing you need is a café run. Pour, add milk or water, keep making.",
      cta: "Enter the flow",
      ctaSecondary: "What you can make",
    },
    products: {
      headline: "One pour. Total focus.",
      sub: "Speciality coffee on your desk in seconds — no interruption to your process, no compromise on the cup.",
    },
    why: {
      headline: "The cup on your desk. Not the queue outside.",
      sub: "No break in your process. The same quality you'd get at a good café — made on your terms, in seconds.",
    },
    reviews: [
      { quote: "It lives on my desk now. Non-negotiable part of my setup.", name: "Shreya V.", role: "Illustrator, Pune" },
      { quote: "I make content about coffee. INHAUS is embarrassingly good. Said it.", name: "Dev R.", role: "Food creator, Mumbai" },
      { quote: "One stir over ice is my whole creative process summarised.", name: "Aarav K.", role: "Photographer, Bengaluru" },
    ],
    newsletter: {
      headline: "Create more. Brew less.",
      sub: "Pour ideas, first dibs on limited flavours, and 10% off your first order.",
    },
    marquee: ["FLOW STATE ON TAP", "SPECIALITY COFFEE", "NO ADDED SUGAR", "READY IN SECONDS", "NO MACHINE", "NO INTERRUPTIONS", "STIR & CREATE"],
  },

  professional: {
    label: "Professional",
    mono: "PROFESSIONAL",
    tagline: "Sharper mornings.",
    gateDescription: "No machine. No barista. Just results.",
    announcement: "Free shipping across India · Subscribe & save · Cancel anytime",
    hero: {
      eyebrow: "Premium. Efficient. Yours.",
      headline: "Sharper mornings.\nBetter outcomes.",
      sub: "No machine. No barista. Café-grade coffee in seconds — so you can focus on what actually moves the needle.",
      cta: "Start sharp",
      ctaSecondary: "See the difference",
    },
    products: {
      headline: "Precision in every pour.",
      sub: "Built for people who won't compromise on quality or time. The same great cup, every single morning.",
    },
    why: {
      headline: "Seconds to brew. Zero compromise.",
      sub: "INHAUS replaces the café run, the machine, and the inconsistency — without giving up a single thing on taste.",
    },
    reviews: [
      { quote: "I used to spend twenty minutes at the café every morning. Not anymore.", name: "Nisha P.", role: "Product Manager, Bengaluru" },
      { quote: "My whole team is on INHAUS now. Office efficiency is probably unrelated.", name: "Rahul D.", role: "Founder, Delhi" },
      { quote: "One stir. Cold. 6am. That's the whole ritual.", name: "Meera S.", role: "Consultant, Mumbai" },
    ],
    newsletter: {
      headline: "Sharpen the routine.",
      sub: "Subscribe for consistent quality, member pricing, and early access to new flavours.",
    },
    marquee: ["CAFÉ GRADE AT HOME", "SPECIALITY COFFEE", "NO ADDED SUGAR", "READY IN SECONDS", "NO MACHINE", "STIR & SIP", "CONSISTENT EVERY CUP"],
  },
};

export const gateCards: { id: Persona; Icon: string }[] = [
  { id: "student", Icon: "cup" },
  { id: "creator", Icon: "star" },
  { id: "professional", Icon: "house" },
];
