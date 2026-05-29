import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-emerald-300/50 bg-emerald-300 text-zinc-950 shadow-[0_0_40px_rgba(110,231,183,0.16)] hover:bg-emerald-200 hover:shadow-[0_0_52px_rgba(110,231,183,0.24)]",
  secondary:
    "border-white/15 bg-white/[0.06] text-zinc-50 hover:border-white/30 hover:bg-white/[0.1]",
  ghost:
    "border-transparent bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white",
};

export function ButtonLink({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold tracking-normal transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span className="transition duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
