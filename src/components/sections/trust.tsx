import { BadgeCheck, Bot, Brain, CandlestickChart, ServerCog } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

const icons = [Bot, Brain, CandlestickChart, ServerCog];

export function Trust({ site }: { site: SiteData }) {
  const { proofItems, ui } = site;

  return (
    <section className="section-shell bg-[#070908]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-[#101311]/68 p-5 backdrop-blur-md sm:p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  {ui.trust.eyebrow}
                </p>
                <h2 className="mt-3 max-w-3xl text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {ui.trust.title}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-zinc-400">
                {ui.trust.description}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {proofItems.map((item, index) => {
                const Icon = icons[index] ?? BadgeCheck;

                return (
                  <article
                    key={item.title}
                    className="group min-h-52 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-white/[0.06]"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
                        <Icon size={21} />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                        {ui.trust.proofLabel} 0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {item.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
