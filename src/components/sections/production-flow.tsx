import {
  BrainCircuit,
  GitBranch,
  Rocket,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

const stepIcons = [GitBranch, Settings2, BrainCircuit, ShieldCheck, Rocket];

export function ProductionFlow({ site }: { site: SiteData }) {
  const { processSteps, ui } = site;

  return (
    <section id="process" className="section-shell section-warm">
      <div className="site-container py-16 lg:py-20">
        <div className="production-flow">
          <Reveal>
            <aside className="production-flow-copy">
              <p className="eyebrow">{ui.process.eyebrow}</p>
              <h2 className="section-title mt-4">{ui.process.title}</h2>
              <p className="section-copy mt-5">{ui.process.description}</p>

              <div className="production-flow-metrics">
                {ui.process.metrics.map((metric) => (
                  <div key={metric.label} className="production-flow-metric">
                    <span className="eyebrow-muted">{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>

          <div className="production-flow-body">
            <div className="production-flow-steps">
              {processSteps.map((step, index) => {
                const Icon = stepIcons[index] ?? Settings2;

                return (
                  <Reveal key={step.title} delay={index * 0.05}>
                    <article className="production-flow-step">
                      <span className="icon-tile production-flow-step-icon">
                        <Icon size={20} />
                      </span>
                      <div>
                        <span className="number-pill">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                        <div className="production-flow-result">
                          <span className="eyebrow-muted">
                            {ui.process.deliverableLabel}
                          </span>
                          <strong>{step.deliverable}</strong>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
