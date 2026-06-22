import { Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteData } from "@/data/site";

export function Testimonials({ site }: { site: SiteData }) {
  const { testimonials, ui } = site;

  return (
    <section className="section-shell section-deep">
      <div className="site-container py-20">
        <SectionHeading
          eyebrow={ui.testimonials.eyebrow}
          title={ui.testimonials.title}
          description={ui.testimonials.description}
        />

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.08}>
              <figure className="testimonial-card">
                <div className="testimonial-card-head">
                  <span className="icon-tile icon-tile-warm">
                    <Quote size={19} />
                  </span>
                  <span className="number-pill">
                    0{index + 1}
                  </span>
                </div>
                <blockquote>{item.quote}</blockquote>
                <figcaption>{item.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
