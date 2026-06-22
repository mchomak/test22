import { MessageCircle, Send } from "lucide-react";
import type { SiteData } from "@/data/site";

export function MobileContactBar({ site }: { site: SiteData }) {
  const { contacts, ui } = site;

  return (
    <aside className="mobile-contact-bar" aria-label={ui.stickyCta.discuss}>
      <a href="#quick-lead" className="mobile-contact-bar-primary">
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
      >
        <MessageCircle size={17} />
      </a>
    </aside>
  );
}
