import dynamic from "next/dynamic";
import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import PersonaGate from "@/components/PersonaGate";
import PersonaSwitcher from "@/components/PersonaSwitcher";

// Lazy-load everything below the fold — keeps the gate→site transition fast
const HowItWorks    = dynamic(() => import("@/components/HowItWorks"));
const WhyInhaus     = dynamic(() => import("@/components/WhyInhaus"));
const WhatCanYouMake = dynamic(() => import("@/components/WhatCanYouMake"));
const RealPours     = dynamic(() => import("@/components/RealPours"));
const Reviews       = dynamic(() => import("@/components/Reviews"));
const FAQ           = dynamic(() => import("@/components/FAQ"));
const Newsletter    = dynamic(() => import("@/components/Newsletter"));
const Footer        = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <PersonaGate />

      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <HowItWorks />
        <WhyInhaus />
        <WhatCanYouMake />
        <RealPours />
        <Reviews />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />

      <PersonaSwitcher />
    </>
  );
}
