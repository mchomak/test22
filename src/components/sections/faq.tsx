import { CircleHelp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { SiteData } from "@/data/site";

export function FAQ({ site }: { site: SiteData }) {
  const { faqs, ui } = site;

  return (
    <section id="faq" className="section-shell section-deep">
      <div className="site-container py-24">
        <div className="faq-split">
          <Reveal>
            <aside className="faq-copy">
              <p className="eyebrow">{ui.faq.eyebrow}</p>
              <h2 className="section-title mt-4">{ui.faq.title}</h2>
              <p className="section-copy mt-5">{ui.faq.description}</p>
            </aside>
          </Reveal>

          <Reveal>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details
                  key={item.question}
                  className="faq-item group"
                  open={index === 0}
                >
                  <summary>
                    <span>
                      <CircleHelp
                        size={20}
                        className="accent-signal mt-0.5 shrink-0"
                      />
                      {item.question}
                    </span>
                    <span className="faq-toggle">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
