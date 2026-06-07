import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  DM_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "INHAUS Coffee — Speciality Coffee Concentrate | No Machine, Ready in 60 Sec",
    template: "%s | INHAUS Coffee",
  },
  description:
    "INHAUS is a cold-extracted speciality coffee concentrate. Café-grade quality at home — no machine, no barista. Pour, add milk or water, ready in 60 seconds. 100% Arabica, no sugar, no preservatives. Shipped across India.",
  keywords: [
    "coffee concentrate India",
    "liquid coffee concentrate",
    "cold brew concentrate",
    "speciality coffee India",
    "coffee without machine",
    "coffee concentrate buy online India",
    "study fuel coffee",
    "instant coffee alternative",
    "café coffee at home",
    "INHAUS coffee",
  ],
  authors: [{ name: "INHAUS Coffee" }],
  creator: "INHAUS Coffee",
  publisher: "INHAUS Coffee",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "INHAUS Coffee — Speciality Coffee Concentrate",
    description: "Café-grade coffee concentrate. No machine. Ready in 60 seconds. Shipped across India.",
    type: "website",
    locale: "en_IN",
    siteName: "INHAUS Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "INHAUS Coffee — Speciality Coffee Concentrate",
    description: "Café-grade coffee concentrate. No machine. Ready in 60 seconds.",
    site: "@inhauscoffee",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0B09",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INHAUS Coffee",
  url: "https://inhauscoffee.com",
  logo: "https://inhauscoffee.com/inhaus-logo.jpeg",
  description: "INHAUS makes cold-extracted speciality coffee concentrate — café-grade coffee at home with no machine, ready in 60 seconds.",
  email: "admin@inhauscoffee.com",
  telephone: "+919311349922",
  areaServed: "IN",
  sameAs: ["https://www.instagram.com/inhauscoffee"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${fraunces.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <PersonaProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </PersonaProvider>
      </body>
    </html>
  );
}
