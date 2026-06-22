import {
  Calculator,
  Code2,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { QuickLeadForm } from "@/components/interactive/quick-lead-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

export function FinalCTA({ site }: { site: SiteData }) {
  const { contacts, ui } = site;

  return (
    <section id="contact" className="final-cta-section section-shell section-deep">
      <div className="final-cta-map" aria-hidden="true">
        <div className="final-cta-map-line final-cta-map-line-a" />
        <div className="final-cta-map-line final-cta-map-line-b" />
        <div className="final-cta-map-line final-cta-map-line-c" />
        <div className="final-cta-map-core" />
      </div>

      <div className="site-container py-16 lg:py-20">
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

            <div className="final-cta-side">
              <QuickLeadForm
                contacts={contacts}
                copy={ui.quickLead}
                source="final"
              />

              <ButtonLink
                href="#estimator"
                variant="secondary"
                icon={<Calculator size={18} />}
                className="final-cta-estimate-link"
              >
                {ui.finalCta.estimateCta}
              </ButtonLink>

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
                  href={contacts.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="final-cta-contact-link"
                >
                  <MessageCircle size={16} className="accent-signal" />
                  {contacts.whatsapp}
                </a>
                <a
                  href={`tel:${contacts.phoneHref}`}
                  className="final-cta-contact-link"
                >
                  <Phone size={16} className="accent-logic" />
                  {contacts.phone}
                </a>
                <a
                  href={`mailto:${contacts.email}`}
                  className="final-cta-contact-link"
                >
                  <Mail size={16} className="accent-warm" />
                  {contacts.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ site }: { site: SiteData }) {
  const { contacts, navItems, ui } = site;

  return (
    <footer className="site-footer">
      <div className="site-container site-footer-layout">
        <div className="site-footer-brand">
          <strong>{ui.brandName}</strong>
          <span>mchomak</span>
          <p>{ui.finalCta.footer}</p>
        </div>

        <nav className="site-footer-nav" aria-label={ui.header.navAria}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-footer-contacts" aria-label="Contacts">
          <a
            href={contacts.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="site-footer-contact-link"
          >
            <Send size={15} className="accent-signal" />
            {contacts.telegram}
          </a>
          <a
            href={contacts.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="site-footer-contact-link"
          >
            <MessageCircle size={15} className="accent-signal" />
            {contacts.whatsapp}
          </a>
          <a
            href={`tel:${contacts.phoneHref}`}
            className="site-footer-contact-link"
          >
            <Phone size={15} className="accent-logic" />
            {contacts.phone}
          </a>
          <a
            href={`mailto:${contacts.email}`}
            className="site-footer-contact-link"
          >
            <Mail size={15} className="accent-warm" />
            {contacts.email}
          </a>
          <a
            href={contacts.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="site-footer-contact-link"
          >
            <Code2 size={15} className="accent-logic" />
            {contacts.github}
          </a>
        </div>
      </div>

      <div className="site-container site-footer-bottom">
        <p>{"\u00A9"} 2026 {ui.brandName}</p>
        <p>Telegram / AI / Backend</p>
      </div>
    </footer>
  );
}
