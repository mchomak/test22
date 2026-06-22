import {
  Code2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ArrowRight,
} from "lucide-react";
import { QuickLeadForm } from "@/components/interactive/quick-lead-form";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

export function FinalCTA({ site }: { site: SiteData }) {
  const { contacts, ui } = site;

  const directLinks = [
    {
      key: "telegram",
      label: contacts.telegram,
      href: contacts.telegramUrl,
      icon: <Send size={16} className="text-emerald-300" />,
      external: true,
    },
    {
      key: "whatsapp",
      label: contacts.whatsapp,
      href: contacts.whatsappUrl,
      icon: <MessageCircle size={16} className="text-emerald-300" />,
      external: true,
    },
    {
      key: "phone",
      label: contacts.phone,
      href: `tel:${contacts.phoneHref}`,
      icon: <Phone size={16} className="text-emerald-300" />,
      external: false,
    },
    {
      key: "email",
      label: contacts.email,
      href: `mailto:${contacts.email}`,
      icon: <Mail size={16} className="text-emerald-300" />,
      external: false,
    },
    {
      key: "github",
      label: contacts.github,
      href: contacts.githubUrl,
      icon: <Code2 size={16} className="text-emerald-300" />,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/25 bg-[#0d1713]/72 p-6 backdrop-blur-md sm:p-10 lg:p-12">
            <div className="cta-grid absolute inset-0 opacity-50" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  {ui.finalCta.eyebrow}
                </p>
                <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
                  {ui.finalCta.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
                  {ui.finalCta.description}
                </p>

                <a
                  href="#estimator"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 underline-offset-4 transition hover:text-emerald-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                >
                  {ui.finalCta.estimateCta}
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="w-full max-w-full">
                <QuickLeadForm
                  contacts={contacts}
                  copy={ui.quickLead}
                  source="final"
                />

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6 text-sm text-zinc-400">
                  {directLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="inline-flex max-w-full items-center gap-2 break-all transition hover:text-white"
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
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
