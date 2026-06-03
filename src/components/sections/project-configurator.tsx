import { ProjectEstimator } from "@/components/interactive/project-estimator";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectConfigurator() {
  return (
    <section id="estimator" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Конфигуратор заявки"
          title="Соберите конфигурацию проекта"
          description="Выберите тип решения, модули и сроки — сайт покажет ориентир по бюджету и сформирует заявку."
        />

        <Reveal>
          <ProjectEstimator />
        </Reveal>
      </div>
    </section>
  );
}
