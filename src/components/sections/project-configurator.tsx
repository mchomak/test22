import { Suspense } from "react";
import { ProjectEstimator } from "@/components/interactive/project-estimator";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteData } from "@/data/site";

export function ProjectConfigurator({ site }: { site: SiteData }) {
  const { ui } = site;
  const estimatorData = {
    projectTypes: site.projectTypes,
    complexityLevels: site.complexityLevels,
    urgencyOptions: site.urgencyOptions,
    projectModules: site.projectModules,
    ui: site.ui,
  };

  return (
    <section id="estimator" className="section-shell estimator-section bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={ui.configurator.eyebrow}
          title={ui.configurator.title}
          description={ui.configurator.description}
        />

        <Suspense
          fallback={
            <div className="min-h-[680px] rounded-[2rem] border border-white/10 bg-[#101311]/68" />
          }
        >
          <ProjectEstimator data={estimatorData} />
        </Suspense>
      </div>
    </section>
  );
}
