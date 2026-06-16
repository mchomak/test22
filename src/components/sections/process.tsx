import { GitBranch, Rocket, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

const metricIcons = [
  <GitBranch key="architecture" size={18} />,
  <Settings2 key="delivery" size={18} />,
  <Rocket key="launch" size={18} />,
];

export function Process({ site }: { site: SiteData }) {
  const { processSteps, ui } = site;

  return (
    <section id="process" className="section-shell section-warm">
      <div className="mx-auto max-w-[1680px] px-4 py-20 sm:px-6 lg:px-10 2xl:px-12">
        <div className="process-story">
          <Reveal>
            <aside className="process-sticky">
              <p className="eyebrow">{ui.process.eyebrow}</p>
              <h2 className="section-title mt-4">{ui.process.title}</h2>
              <p className="section-copy mt-5">{ui.process.description}</p>

              <div className="process-metrics">
                {ui.process.metrics.map((metric, index) => (
                  <PipelineMetric
                    key={metric.label}
                    icon={metricIcons[index]}
                    label={metric.label}
                    value={metric.value}
                  />
                ))}
              </div>
            </aside>
          </Reveal>

          <div className="process-story-steps">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className="process-story-step">
                  <div className="process-index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
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
    <div className="process-metric">
      <span className="icon-tile icon-tile-warm process-metric-icon">
        {icon}
      </span>
      <span>
        <span className="eyebrow-muted block">
          {label}
        </span>
        <span className="mt-1 block text-sm text-[var(--text-secondary)]">{value}</span>
      </span>
    </div>
  );
}
