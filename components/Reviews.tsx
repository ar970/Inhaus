"use client";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Stars } from "@/components/Doodles";
import { reviews as defaultReviews } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

export default function Reviews() {
  const { persona } = usePersona();
  const reviewList = persona ? personaContent[persona].reviews : defaultReviews;

  return (
    <section id="reviews" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="The verdict"
          title="4.9 / 5 from 2,000+ pours"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviewList.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08} className="card flex flex-col p-7">
              <Stars />
              <blockquote className="mt-4 flex-1 font-serif text-xl italic leading-snug text-espresso/90">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-medium">{r.name}</div>
                <div className="label mt-1 text-espresso/50">{r.role}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
