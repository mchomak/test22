import {
  Bot,
  BrainCircuit,
  DatabaseZap,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteData } from "@/data/site";

const icons = [BrainCircuit, Bot, DatabaseZap];

export function Specialization({ site }: { site: SiteData }) {
  const { specializations, ui } = site;

  return (
    <section id="specialization" className="section-shell bg-[#090a0a]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={ui.specialization.eyebrow}
          title={ui.specialization.title}
          description={ui.specialization.description}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {specializations.map((item, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="group h-full rounded-3xl border border-white/10 bg-[#0d1110]/70 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-[#101715]/78">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200 transition duration-300 group-hover:border-emerald-200/60">
                      <Icon size={24} />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                      {ui.specialization.taskLabel} 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-zinc-300">
                    {item.audience}
                  </p>

                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-sm leading-6 text-emerald-100/85">
                      {item.result}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
