import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";

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
    <html lang="en">
      <body>
        <PersonaProvider>{children}</PersonaProvider>
      </body>
    </html>
  );
}
