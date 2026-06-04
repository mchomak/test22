import { GitBranch, Rocket, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteData } from "@/data/site";

const metricIcons = [
  <GitBranch key="architecture" size={18} />,
  <Settings2 key="delivery" size={18} />,
  <Rocket key="launch" size={18} />,
];

export function Process({ site }: { site: SiteData }) {
  const { processSteps, ui } = site;

  return (
    <section id="process" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={ui.process.eyebrow}
          title={ui.process.title}
          description={ui.process.description}
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101311]/68 p-5 backdrop-blur-md sm:p-7">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {ui.process.metrics.map((metric, index) => (
                <PipelineMetric
                  key={metric.label}
                  icon={metricIcons[index]}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
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
