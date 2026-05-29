import { Check, Clock3, CreditCard, Minus, Shield } from "lucide-react";
import { packages, retainer } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { contacts } from "@/data/site";
import { ProjectEstimator } from "@/components/interactive/project-estimator";

export function Services() {
  return (
    <section id="packages" className="section-shell bg-[#090a0a]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Услуги и пакеты"
          title="Понятная стартовая вилка: от MVP до сложной системы с AI и платежами"
          description="Финальная оценка зависит от сценариев, интеграций, состояния существующего кода и требований к поддержке. Старт проекта: 50% предоплата."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article
                className={`relative flex h-full flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 ${
                  item.featured
                    ? "border-emerald-300/45 bg-[#102018] shadow-[0_0_55px_rgba(110,231,183,0.12)]"
                    : "border-white/10 bg-[#101311] hover:border-white/20"
                }`}
              >
                {item.featured ? (
                  <span className="mb-5 w-fit rounded-full bg-emerald-300 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-950">
                    частый выбор
                  </span>
                ) : null}

                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {item.subtitle}
                </p>

                <div className="mt-6">
                  <p className="text-3xl font-semibold text-white">
                    {item.price}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                    <Clock3 size={16} className="text-amber-200" />
                    {item.term}
                  </p>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <div className="space-y-6">
                  <PackageList title="Что входит" items={item.includes} icon="check" />
                  <PackageList
                    title="Что не входит"
                    items={item.excludes}
                    icon="minus"
                  />
                </div>

                <div className="mt-auto pt-6">
                  <div className="mb-5 flex items-start gap-3 border-t border-white/10 pt-5 text-sm leading-6 text-zinc-300">
                    <CreditCard
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-300"
                    />
                    <span>
                      50% предоплата фиксирует слот и старт работ. Поддержка
                      после запуска подключается отдельно.
                    </span>
                  </div>
                  <ButtonLink
                    href={contacts.telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant={item.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Обсудить пакет
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-5 grid gap-5 rounded-3xl border border-white/10 bg-[#101311] p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                Retainer
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {retainer.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                {retainer.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <p className="text-2xl font-semibold text-white">
                {retainer.price}
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Shield size={17} className="text-emerald-300" />
                после запуска как отдельная опция
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <ProjectEstimator />
        </Reveal>
      </div>
    </section>
  );
}

function PackageList({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: "check" | "minus";
}) {
  return (
    <div>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
            {icon === "check" ? (
              <Check size={16} className="mt-1 shrink-0 text-emerald-300" />
            ) : (
              <Minus size={16} className="mt-1 shrink-0 text-zinc-500" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
