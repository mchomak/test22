import { ArrowRight, Info, LifeBuoy, WalletCards } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import type { SiteData } from "@/data/site";

export function Services({ site }: { site: SiteData }) {
  const { budgetGuides, retainer, ui } = site;

  return (
    <section id="budget" className="section-shell section-soft">
      <div className="mx-auto max-w-[1680px] px-4 py-20 sm:px-6 lg:px-10 2xl:px-12">
        <div className="budget-story">
          <Reveal>
            <div className="budget-lead">
              <p className="eyebrow">{ui.services.eyebrow}</p>
              <h2 className="section-title mt-4">{ui.services.title}</h2>
              <p className="section-copy mt-5">{ui.services.description}</p>

              <div className="budget-note">
                <Info size={22} className="accent-signal" />
                <div>
                  <h3>{ui.services.finalTitle}</h3>
                  <p>
                    {ui.services.finalDescription} {retainer.price}.
                  </p>
                </div>
              </div>

              <div className="budget-actions">
                <ButtonLink href="#estimator" icon={<ArrowRight size={18} />}>
                  {ui.services.estimateCta}
                </ButtonLink>
                <span>
                  <LifeBuoy size={17} className="accent-logic" />
                  {retainer.title.toLowerCase()}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="budget-guides">
            {budgetGuides.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <article className="budget-guide">
                  <div className="budget-guide-icon">
                    <WalletCards size={22} />
                  </div>
                  <div>
                    <span className="number-pill">
                      {ui.services.budgetLabel} 0{index + 1}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <strong>{item.price}</strong>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
