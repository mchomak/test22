import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
};

export function Reveal({ children, delay = 0, className, id }: RevealProps) {
  return (
    <div
      id={id}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
