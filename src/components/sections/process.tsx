import { GitBranch, Rocket, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { processSteps } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="process" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Процесс"
          title="Работа идёт как pipeline: от диагноза и схемы до production и поддержки"
          description="На старте фиксируются ограничения, статусы, интеграции и зона ответственности. Так проект не расползается и не превращается в бесконечную переписку."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101311] p-5 sm:p-7">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <PipelineMetric
                icon={<GitBranch size={18} />}
                label="Architecture"
                value="схема до кода"
              />
              <PipelineMetric
                icon={<Settings2 size={18} />}
                label="Delivery"
                value="итерации и проверки"
              />
              <PipelineMetric
                icon={<Rocket size={18} />}
                label="Launch"
                value="деплой и стабилизация"
              />
            </div>

            <div className="process-flow">
              {processSteps.map((step, index) => (
                <div key={step.title} className="process-step">
                  <div className="process-index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PipelineMetric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-4 md:border-b-0 md:border-r md:pb-0 last:md:border-r-0">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
        {icon}
      </span>
      <span>
        <span className="block font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </span>
        <span className="mt-1 block text-sm text-zinc-200">{value}</span>
      </span>
    </div>
  );
}
