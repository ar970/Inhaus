import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import WhyInhaus from "@/components/WhyInhaus";
import RealPours from "@/components/RealPours";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <HowItWorks />
        <Comparison />
        <WhyInhaus />
        <RealPours />
        <Reviews />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
