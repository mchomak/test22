import { Send, MessageCircle } from "lucide-react";
import type { SiteData } from "@/data/site";

export function MobileContactBar({
  contacts,
  copy,
}: {
  contacts: SiteData["contacts"];
  copy: SiteData["ui"]["stickyCta"];
}) {
  return (
    <div className="mobile-contact-bar">
      <div className="mobile-contact-bar-inner border-t border-white/10 bg-[#050607]/90 backdrop-blur-md">
        <a
          href="#quick-lead"
          className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-300 px-4 text-sm font-semibold text-zinc-950 transition duration-300 hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          {copy.discuss}
        </a>
        <a
          href={contacts.telegramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.telegram}
          className="grid h-12 w-12 flex-none place-items-center rounded-full border border-white/15 bg-white/[0.06] text-zinc-50 transition duration-300 hover:border-white/30 hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          <Send size={18} />
        </a>
        <a
          href={contacts.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.whatsapp}
          className="grid h-12 w-12 flex-none place-items-center rounded-full border border-white/15 bg-white/[0.06] text-zinc-50 transition duration-300 hover:border-white/30 hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          <MessageCircle size={18} />
        </a>
      </div>
    </div>
  );
}
