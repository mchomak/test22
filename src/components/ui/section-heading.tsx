type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`mx-auto mb-10 max-w-5xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
