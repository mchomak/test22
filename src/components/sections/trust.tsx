import {
  BadgeCheck,
  BrainCircuit,
  LayoutDashboard,
  LifeBuoy,
  Rocket,
  SearchCode,
  WalletCards,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

const icons = [
  WalletCards,
  LayoutDashboard,
  BrainCircuit,
  SearchCode,
  Rocket,
  LifeBuoy,
];

export function Trust({ site }: { site: SiteData }) {
  const { proofItems, ui } = site;

  return (
    <section className="section-shell section-deep">
      <div className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-10 2xl:px-12">
        <Reveal>
          <div className="proof-strip">
            <div className="proof-strip-copy">
              <p className="eyebrow">{ui.trust.eyebrow}</p>
              <h2 className="panel-title mt-3">{ui.trust.title}</h2>
              <p className="body-copy mt-4 text-sm">
                {ui.trust.description}
              </p>
            </div>

            <div className="proof-strip-items">
              {proofItems.map((item, index) => {
                const Icon = icons[index] ?? BadgeCheck;
                const iconTone =
                  index % 3 === 1
                    ? "icon-tile-logic"
                    : index % 3 === 2
                      ? "icon-tile-warm"
                      : "";

                return (
                  <article
                    key={item.title}
                    className="proof-strip-item"
                  >
                    <div className="proof-strip-item-head">
                      <span className={`icon-tile proof-strip-icon ${iconTone}`}>
                        <Icon size={21} />
                      </span>
                      <span className="number-pill">
                        {ui.trust.proofLabel} 0{index + 1}
                      </span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="proof-strip-tags">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tag-pill min-h-0 px-2.5 py-1 text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
