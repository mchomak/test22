import { Code2, Mail, MessageCircle, Send } from "lucide-react";
import { contacts } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/reveal";

export function FinalCTA() {
  return (
    <section id="contact" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/25 bg-[#0d1713]/72 p-6 backdrop-blur-md sm:p-10 lg:p-12">
            <div className="cta-grid absolute inset-0 opacity-50" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  Next step
                </p>
                <h2 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
                  Опишите задачу - я вернусь с архитектурой, сроками и вилкой
                  бюджета.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
                  Лучше всего прислать сценарии пользователей, платежи,
                  интеграции, текущие материалы и желаемую дату запуска. Если
                  вводных мало, начнём с диагностики.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ButtonLink
                  href={contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  icon={<MessageCircle size={18} />}
                >
                  Telegram
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${contacts.email}`}
                  variant="secondary"
                  icon={<Mail size={18} />}
                >
                  Email
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

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050607]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© 2026 Рамиль Канеев / mchomak</p>
        <p>Python, Telegram bots, AI integrations, backend services.</p>
      </div>
    </footer>
  );
}
