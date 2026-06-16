import {
  BrainCircuit,
  GitBranch,
  LayoutDashboard,
  LifeBuoy,
  Rocket,
  SearchCode,
  Settings2,
  WalletCards,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

const stepIcons = [GitBranch, Settings2, BrainCircuit, Rocket, LifeBuoy];

const proofIcons = [
  WalletCards,
  LayoutDashboard,
  BrainCircuit,
  SearchCode,
  Rocket,
  LifeBuoy,
];

export function ProductionFlow({ site }: { site: SiteData }) {
  const { processSteps, proofItems, ui } = site;

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
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="production-flow-proof" variant="quiet">
              <div className="production-flow-proof-head">
                <p className="eyebrow">{ui.trust.eyebrow}</p>
                <h3>{ui.trust.title}</h3>
                <p>{ui.trust.description}</p>
              </div>

              <div className="production-flow-proof-list">
                {proofItems.map((item, index) => {
                  const Icon = proofIcons[index] ?? Settings2;
                  const iconTone =
                    index % 3 === 1
                      ? "icon-tile-logic"
                      : index % 3 === 2
                        ? "icon-tile-warm"
                        : "";

                  return (
                    <article key={item.title} className="production-flow-proof-row">
                      <span className={`icon-tile production-flow-proof-icon ${iconTone}`}>
                        <Icon size={18} />
                      </span>
                      <div className="production-flow-proof-content">
                        <div className="production-flow-proof-titleline">
                          <h4>{item.title}</h4>
                          <span className="eyebrow-muted">
                            {ui.trust.proofLabel} {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p>{item.summary}</p>
                        <div className="production-flow-proof-tags">
                          {item.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
