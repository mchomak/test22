import { MessageCircle, Send } from "lucide-react";
import type { SiteData } from "@/data/site";

export function MobileContactBar({ site }: { site: SiteData }) {
  const { contacts, ui } = site;

  return (
    <aside className="mobile-contact-bar" aria-label={ui.stickyCta.discuss}>
      <a
        href="#quick-lead"
        className="mobile-contact-bar-primary"
        data-site-event="sticky_cta_click"
        data-site-event-payload='{"target":"quick-lead"}'
      >
        <MessageCircle size={17} />
        <span>{ui.stickyCta.discuss}</span>
      </a>
      <a
        href={contacts.telegramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={ui.stickyCta.telegram}
        title={ui.stickyCta.telegram}
        className="mobile-contact-bar-icon"
        data-site-event="sticky_cta_click"
        data-site-event-payload='{"target":"telegram"}'
      >
        <Send size={17} />
      </a>
      <a
        href={contacts.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={ui.stickyCta.whatsapp}
        title={ui.stickyCta.whatsapp}
        className="mobile-contact-bar-icon"
        data-site-event="sticky_cta_click"
        data-site-event-payload='{"target":"whatsapp"}'
      >
        <MessageCircle size={17} />
      </a>
    </aside>
  );
}
