import Reveal from "@/components/Reveal";
import { DoodleIcon } from "@/components/Doodles";
import { steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how" className="section overflow-hidden bg-oat">
      <div className="container-x">
        <Reveal>
          <p className="label text-crema">How it works</p>
          <h2 className="mt-3 font-serif text-[38px] font-normal leading-[1.0] tracking-tight md:text-[58px]">
            Pour. Add milk or water. Sip.
          </h2>
          <p className="mt-4 max-w-lg text-espresso/60">
            No grinder, no machine, no waiting. Good coffee shouldn&apos;t be complicated.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-0 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-espresso/10 md:block" />

          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1} className="relative px-0 pb-10 md:px-8 md:pb-0 md:first:pl-0 md:last:pr-0">
              {/* Big outlined step number */}
              <div
                className="font-display select-none text-[88px] font-light leading-none tracking-tight opacity-[0.07]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                0{step.n}
              </div>

              {/* Icon circle */}
              <div className="relative -mt-8 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-espresso/15 bg-paper text-espresso shadow-soft">
                <DoodleIcon name={step.icon} className="h-6 w-6" />
              </div>

              <h3 className="mt-5 font-serif text-[22px] font-normal leading-tight">{step.title}</h3>
              <p className="mt-2 pr-4 text-sm leading-relaxed text-espresso/60">{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
