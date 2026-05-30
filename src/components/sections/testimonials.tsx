import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Спокойная инженерная работа без лишнего шума"
          description="Формулировки обезличены, но передают типичный запрос: довести продукт до рабочего состояния, а не просто написать отдельный скрипт."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#101311]/68 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-200/30">
                <Quote size={26} className="text-amber-200" />
                <blockquote className="mt-5 flex-1 text-base leading-7 text-zinc-300">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {item.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
