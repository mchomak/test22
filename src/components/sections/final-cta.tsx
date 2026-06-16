import { ArrowRight, Code2, Mail, MessageCircle, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

export function FinalCTA({ site }: { site: SiteData }) {
  const { contacts, heroMetrics, ui } = site;

  return (
    <section id="contact" className="final-cta-section section-shell section-deep">
      <div className="final-cta-map" aria-hidden="true">
        <div className="final-cta-map-line final-cta-map-line-a" />
        <div className="final-cta-map-line final-cta-map-line-b" />
        <div className="final-cta-map-line final-cta-map-line-c" />
        <div className="final-cta-map-core" />
      </div>

      <div className="site-container py-24 lg:py-32">
        <Reveal>
          <div className="final-cta-layout">
            <div className="final-cta-copy">
              <p className="eyebrow">{ui.finalCta.eyebrow}</p>
              <h2 className="final-cta-title">
                {ui.finalCta.title}
              </h2>
              <p className="final-cta-description">
                {ui.finalCta.description}
              </p>
            </div>

            <div className="final-cta-actions">
              <ButtonLink href="#estimator" icon={<ArrowRight size={18} />}>
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

            <div className="final-cta-proof-grid">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="final-cta-proof-item">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="final-cta-contact-row">
              <a
                href={contacts.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="final-cta-contact-link"
              >
                <Send size={16} className="accent-signal" />
                {contacts.telegram}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="final-cta-contact-link"
              >
                <Mail size={16} className="accent-warm" />
                {contacts.email}
              </a>
              <a
                href={contacts.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="final-cta-contact-link"
              >
                <Code2 size={16} className="accent-logic" />
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
    <footer className="site-footer">
      <div className="site-container flex flex-col gap-3 py-7 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© 2026 {ui.brandName} / mchomak</p>
        <p>{ui.finalCta.footer}</p>
      </div>
    </footer>
  );
}
