import { ArrowRight, Info, LifeBuoy, WalletCards } from "lucide-react";
import { budgetGuides, retainer } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export function Services() {
  return (
    <section id="budget" className="section-shell bg-[#090a0a]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Ориентиры по бюджету"
          title="Короткая рамка цен без конкуренции с калькулятором"
          description="Эти суммы помогают понять порядок бюджета. Точную вилку лучше считать через конфигуратор выше, потому что модули, сроки и интеграции сильно меняют объём."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {budgetGuides.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="group h-full rounded-3xl border border-white/10 bg-[#101311]/68 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-[#101715]/78">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
                    <WalletCards size={22} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                    budget 0{index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-5 text-3xl font-semibold text-emerald-100">
                  {item.price}
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-5 grid gap-5 rounded-3xl border border-white/10 bg-[#101311]/68 p-6 backdrop-blur-md lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-4">
              <Info size={22} className="mt-1 shrink-0 text-emerald-300" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Финальная стоимость зависит от деталей
                </h3>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-zinc-400">
                  Финальная стоимость зависит от сценариев, дизайна,
                  интеграций, платежей, объёма данных и сроков. После запуска
                  можно отдельно подключить поддержку: {retainer.price}.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="#estimator" icon={<ArrowRight size={18} />}>
                Рассчитать проект
              </ButtonLink>
              <div className="flex items-center gap-2 text-sm text-zinc-400 lg:justify-end">
                <LifeBuoy size={17} className="text-emerald-300" />
                {retainer.title.toLowerCase()}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
