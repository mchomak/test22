import { Code2, Mail, MessageCircle, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

export function FinalCTA({ site }: { site: SiteData }) {
  const { contacts, ui } = site;

  return (
    <section id="contact" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/25 bg-[#0d1713]/72 p-6 backdrop-blur-md sm:p-10 lg:p-12">
            <div className="cta-grid absolute inset-0 opacity-50" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  {ui.finalCta.eyebrow}
                </p>
                <h2 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
                  {ui.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
                  {ui.finalCta.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ButtonLink
                  href="#estimator"
                  icon={<Send size={18} />}
                >
                  {ui.finalCta.estimateCta}
                </ButtonLink>
                <ButtonLink
                  href={contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  icon={<MessageCircle size={18} />}
                >
                  {ui.finalCta.telegramCta}
                </ButtonLink>
              </div>
            </div>

            <div className="relative z-10 mt-10 grid gap-3 border-t border-white/10 pt-6 text-sm text-zinc-400 md:grid-cols-3">
              <a
                href={contacts.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Send size={16} className="text-emerald-300" />
                {contacts.telegram}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={16} className="text-emerald-300" />
                {contacts.email}
              </a>
              <a
                href={contacts.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Code2 size={16} className="text-emerald-300" />
                {contacts.github}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ site }: { site: SiteData }) {
  const { ui } = site;

  return (
    <footer className="border-t border-white/10 bg-[#050607]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© 2026 {ui.brandName} / mchomak</p>
        <p>{ui.finalCta.footer}</p>
      </div>
    </footer>
  );
}
