import { Suspense } from "react";
import { ProjectEstimator } from "@/components/interactive/project-estimator";
import type { SiteData } from "@/data/site";

export function ProjectConfigurator({ site }: { site: SiteData }) {
  const { ui } = site;
  const estimatorData = {
    contacts: site.contacts,
    casePresets: site.cases.map((item) => ({
      estimatorPreset: item.estimatorPreset,
      keyResult: item.keyResult,
      slug: item.slug,
      title: item.title,
      type: item.type,
    })),
    projectTypes: site.projectTypes,
    complexityLevels: site.complexityLevels,
    urgencyOptions: site.urgencyOptions,
    projectModules: site.projectModules,
    ui: site.ui,
  };

  return (
    <section id="estimator" className="section-shell estimator-section section-soft">
      <div className="site-container py-20">
        <div className="estimator-section-head">
          <div>
            <p className="eyebrow mb-4">{ui.configurator.eyebrow}</p>
            <h2 className="section-title">
              {ui.configurator.title}
            </h2>
            <p className="section-copy mt-5 max-w-4xl">
              {ui.configurator.description}
            </p>
          </div>

          <div
            className="estimator-section-steps"
            aria-label={ui.estimator.kicker}
          >
            {ui.estimator.steps.slice(0, 4).map((step, index) => (
              <span key={step}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {step}
              </span>
            ))}
          </div>
        </div>

        <Suspense
          fallback={
            <div className="estimator-workbench min-h-[520px]" />
          }
        >
          <ProjectEstimator data={estimatorData} />
        </Suspense>
      </div>
    </section>
  );
}
