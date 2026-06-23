import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  Code2,
  Mail,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { EngineeringScene } from "@/components/interactive/engineering-scene";
import { HeroHeadline } from "@/components/interactive/hero-headline";
import { QuickLeadForm } from "@/components/interactive/quick-lead-form";
import type { SiteData } from "@/data/site";

export function Hero({ site }: { site: SiteData }) {
  const { contacts, heroMetrics, ui } = site;

  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden border-b border-white/10 pt-16"
    >
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#050607_0%,#07100e_44%,#090a0a_100%)]" />
      <Image
        src="/images/engineering-command-center.webp"
        alt=""
        aria-hidden
        fill
        preload
        quality={70}
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-[0.14]"
      />
      <div className="hero-grid absolute inset-0 -z-10 opacity-70" />
      <EngineeringScene showCore={false} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_67%_46%,transparent_0%,rgba(5,6,7,0.2)_30%,rgba(5,6,7,0.84)_78%),linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.78)_40%,rgba(5,6,7,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[#090a0a] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-18">
        <Reveal className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 shadow-2xl shadow-black/30 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
            {ui.hero.badge}
          </div>

          <HeroHeadline lines={ui.hero.headline} />

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-300 sm:text-xl">
            {ui.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="#quick-lead"
              icon={<ArrowRight size={18} />}
            >
              {ui.hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href="#estimator"
              variant="secondary"
              icon={<Calculator size={18} />}
            >
              {ui.hero.secondaryCta}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          delay={0.12}
          className="w-full lg:max-w-xl lg:justify-self-end"
        >
          <div id="quick-lead" className="scroll-mt-24">
            <QuickLeadForm
              contacts={contacts}
              copy={ui.quickLead}
              source="hero"
            />
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-white/[0.075]"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="text-2xl font-semibold text-white">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm leading-5 text-zinc-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
          {ui.hero.bottomNote}
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
          <a
            href={`mailto:${contacts.email}`}
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Mail size={16} />
            {contacts.email}
          </a>
          <a
            href={contacts.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Code2 size={16} />
            {contacts.github}
          </a>
        </div>
      </div>
    </section>
  );
}
