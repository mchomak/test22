import { BadgeCheck, Brain, CreditCard, ServerCog, Wrench } from "lucide-react";
import { trustItems } from "@/data/site";
import { Reveal } from "@/components/reveal";

const trustStats = [
  { value: "5 лет", label: "коммерческой Python-разработки" },
  { value: "30+", label: "завершённых проектов под ключ" },
  { value: "50%", label: "предоплата перед стартом работ" },
  { value: "MVP → PROD", label: "от первой версии до поддержки" },
];

const capabilities = [
  { icon: CreditCard, label: "платежи и webhook-и" },
  { icon: Brain, label: "AI/LLM и RAG" },
  { icon: ServerCog, label: "backend-first архитектура" },
  { icon: Wrench, label: "деплой и развитие" },
];

export function Trust() {
  return (
    <section className="section-shell bg-[#090a0a]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-[#101311]/68 p-6 backdrop-blur-md sm:p-8 lg:grid-cols-[0.86fr_1.14fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                Trust contour
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Безопасно начинать коммерческий проект, когда понятны рамки,
                риски и следующий шаг
              </h2>
              <p className="mt-5 text-base leading-7 text-zinc-400">
                Сайт продаёт не “умение писать код”, а способность довести
                систему до запуска: архитектура, backend, интеграции, оплаты,
                деплой, мониторинг и поддержка.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {capabilities.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 border-t border-white/10 pt-3"
                    >
                      <Icon size={18} className="text-emerald-300" />
                      <span className="text-sm text-zinc-300">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid content-start gap-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {trustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-l border-emerald-300/35 bg-white/[0.035] px-4 py-3"
                  >
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 border-b border-white/10 pb-3 last:border-b-0"
                  >
                    <BadgeCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-300"
                    />
                    <p className="text-sm leading-6 text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
