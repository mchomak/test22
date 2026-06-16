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
      className={`mx-auto mb-10 max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p className="eyebrow mb-4">
        {eyebrow}
      </p>
      <h2 className="section-title">
        {title}
      </h2>
      {description ? (
        <p className="section-copy mt-5">
          {description}
        </p>
      ) : null}
    </div>
  );
}
