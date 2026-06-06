import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  DM_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";

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
  title: "INHAUS — Café in a bottle",
  description:
    "INHAUS is a liquid coffee concentrate that gives you café-style coffee at home in ten seconds. Pour, add milk or water, sip. 100% Arabica, no sugar, no preservatives.",
  keywords: ["coffee concentrate", "liquid coffee", "cold brew concentrate", "café at home", "INHAUS"],
  openGraph: {
    title: "INHAUS — Café in a bottle",
    description: "Barista coffee at home in ten seconds. Pour, add milk or water, sip.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0B09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${fraunces.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body>
        <PersonaProvider>{children}</PersonaProvider>
      </body>
    </html>
  );
}
