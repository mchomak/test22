import {
  Bot,
  BrainCircuit,
  DatabaseZap,
  Globe2,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

const icons = [Bot, BrainCircuit, DatabaseZap, Globe2];

export function Specialization({ site }: { site: SiteData }) {
  const { heroMetrics, specializations, ui } = site;

  return (
    <section id="specialization" className="section-shell section-soft">
      <div className="site-container py-20">
        <div className="specialization-story">
          <Reveal>
            <aside className="specialization-sticky">
              <p className="eyebrow">{ui.specialization.eyebrow}</p>
              <h2 className="section-title mt-4">{ui.specialization.title}</h2>
              <p className="section-copy mt-5">
                {ui.specialization.description}
              </p>

              <div className="specialization-metrics">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="specialization-metric">
                    <span>{metric.value}</span>
                    <small>{metric.label}</small>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>

          <div className="specialization-lanes">
            {specializations.map((item, index) => {
              const Icon = icons[index] ?? Globe2;
              const iconTone =
                index % 3 === 1
                  ? "icon-tile-logic"
                  : index % 3 === 2
                    ? "icon-tile-warm"
                    : "";

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="specialization-lane">
                    <div className={`icon-tile specialization-lane-icon ${iconTone}`}>
                      <Icon size={24} />
                    </div>

                    <div className="specialization-lane-main">
                      <div className="specialization-lane-head">
                        <span className="number-pill">
                          {ui.specialization.taskLabel} 0{index + 1}
                        </span>
                        <h3>{item.title}</h3>
                      </div>

                      <p className="specialization-audience">
                        <span>{ui.specialization.audienceLabel} </span>
                        {item.audience}
                      </p>

                      <div className="specialization-includes">
                        {item.includes.slice(0, 2).map((point) => (
                          <span key={point}>{point}</span>
                        ))}
                      </div>
                    </div>

                    <div className="specialization-lane-result">
                      <p>{item.result}</p>
                      <small>{item.tech}</small>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
