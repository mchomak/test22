import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "btn-link-primary",
  secondary: "btn-link-secondary",
  ghost: "btn-link-ghost",
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
      className={["btn-link group", variants[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span className="btn-link-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
