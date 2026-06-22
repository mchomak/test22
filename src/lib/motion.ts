export const motionEasing = {
  entrance: [0.22, 1, 0.36, 1] as [number, number, number, number],
  expressive: [0.16, 1, 0.3, 1] as [number, number, number, number],
  exit: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

export const motionDuration = {
  fast: 0.24,
  base: 0.42,
  reveal: 0.72,
  hero: 0.9,
  page: 0.64,
};

export const motionStagger = {
  tight: 0.06,
  base: 0.1,
  relaxed: 0.14,
};

export const revealViewport = {
  once: true,
  margin: "0px 0px 18% 0px",
  amount: 0.08,
} as const;

export function staggerDelay(index: number, step = motionStagger.base) {
  return Math.min(index * step, 0.46);
}
