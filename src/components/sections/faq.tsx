import { CircleHelp } from "lucide-react";
import { faqs } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQ() {
  return (
    <section id="faq" className="section-shell bg-[#090a0a]">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Вопросы, которые лучше закрыть до старта"
          description="Чем точнее на входе сценарии, интеграции и ограничения, тем меньше сюрпризов на этапе разработки."
          align="center"
        />

        <Reveal>
          <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-[#101311]">
            {faqs.map((item, index) => (
              <details
                key={item.question}
                className="group px-5 py-5 open:bg-white/[0.025] sm:px-7"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 sm:text-lg">
                  <span className="flex gap-3">
                    <CircleHelp
                      size={20}
                      className="mt-0.5 shrink-0 text-emerald-300"
                    />
                    {item.question}
                  </span>
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full border border-white/20 text-center text-sm leading-[18px] text-zinc-400 transition group-open:rotate-45 group-open:border-emerald-300/40 group-open:text-emerald-200">
                    +
                  </span>
                </summary>
                <p className="ml-8 mt-4 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
