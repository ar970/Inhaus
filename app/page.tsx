import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import WhatCanYouMake from "@/components/WhatCanYouMake";
import WhyInhaus from "@/components/WhyInhaus";
import RealPours from "@/components/RealPours";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import PersonaGate from "@/components/PersonaGate";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      {/* Persona selection gate — hides behind persona once selected */}
      <PersonaGate />

      {/* Main site — renders beneath gate, transitions in after persona selection */}
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

      {/* Floating persona switcher — always accessible once persona is set */}
      <PersonaSwitcher />

      {/* Custom cursor — desktop only, hidden on touch */}
      <CustomCursor />
    </>
  );
}
