import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { DoodleIcon } from "@/components/Doodles";
import { drinks } from "@/lib/data";

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 5v3l2 1.5" />
    </svg>
  );
}

export default function WhatCanYouMake() {
  return (
    <section id="make" className="section bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="What can you make?"
          title="One concentrate. Endless orders."
          subtitle="Hot or iced, comforting or indulgent — your whole café menu starts from a single pour."
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
          {drinks.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06} className="shrink-0 snap-start basis-[70%] sm:basis-[40%] md:basis-auto">
              <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-espresso/10 bg-oat">
                {/* illustrated drink */}
                <div
                  className="relative flex h-40 items-center justify-center"
                  style={{ background: "radial-gradient(120% 120% at 50% 15%, var(--theme-surface) 0%, var(--theme-accent-soft) 100%)" }}
                >
                  <DoodleIcon name={d.icon} className="h-16 w-16 text-espresso/45 transition-transform duration-300 group-hover:-translate-y-1" />
                </div>
                {/* details */}
                <div className="flex flex-1 flex-col p-4">
                  <span className="label text-crema">{d.mood}</span>
                  <h3 className="mt-2 font-serif text-xl leading-tight">{d.name}</h3>
                  <div className="mt-auto flex items-center gap-1.5 pt-4 text-espresso/55">
                    <ClockIcon className="h-3.5 w-3.5" />
                    <span className="label">{d.time}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
