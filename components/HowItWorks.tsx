import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { DoodleIcon, Arrow } from "@/components/Doodles";
import { steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how" className="section bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="Pour. Add milk or water. Sip."
          subtitle="No grinder, no machine, no waiting. Good coffee shouldn't be complicated."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1} className="relative">
              <div className="flex h-full flex-col items-center rounded-[20px] border border-espresso/10 bg-oat px-6 py-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-espresso/15 bg-paper text-espresso">
                  <DoodleIcon name={step.icon} className="h-10 w-10" />
                </div>
                <span className="label mt-6 text-clay">{step.n}</span>
                <h3 className="mt-2 font-serif text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm text-espresso/75">{step.copy}</p>
              </div>
              {i < steps.length - 1 && (
                <Arrow className="absolute -right-3 top-1/2 hidden h-4 w-7 -translate-y-1/2 text-espresso/30 md:block" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
