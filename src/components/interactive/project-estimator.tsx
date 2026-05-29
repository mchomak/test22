"use client";

import { motion } from "framer-motion";
import { Calculator, Check, Clock3, Gauge, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

const options = [
  { id: "payments", label: "Платежи", price: 45, weeks: 1 },
  { id: "admin", label: "Админка", price: 40, weeks: 1 },
  { id: "ai", label: "AI/RAG", price: 90, weeks: 2 },
  { id: "crypto", label: "Crypto/API", price: 70, weeks: 2 },
  { id: "monitoring", label: "Мониторинг", price: 30, weeks: 1 },
];

export function ProjectEstimator() {
  const [selected, setSelected] = useState(["payments", "admin"]);
  const [complexity, setComplexity] = useState(2);

  const estimate = useMemo(() => {
    const selectedOptions = options.filter((option) =>
      selected.includes(option.id),
    );
    const base = 60 + complexity * 35;
    const extra = selectedOptions.reduce((sum, option) => sum + option.price, 0);
    const weeks =
      1 + complexity + selectedOptions.reduce((sum, option) => sum + option.weeks, 0);
    const low = base + extra;
    const high = Math.round(low * 1.32);

    return {
      low,
      high,
      weeks: `${Math.max(2, weeks - 1)}-${weeks + 1}`,
      label:
        low < 140
          ? "MVP / точечная интеграция"
          : low < 280
            ? "Полноценный продуктовый контур"
            : "Сложная система с интеграциями",
    };
  }, [complexity, selected]);

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <div className="mt-5 grid gap-5 rounded-3xl border border-white/10 bg-[#101311] p-6 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
            <SlidersHorizontal size={20} />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
              Быстрая прикидка
            </p>
            <h3 className="text-xl font-semibold text-white">
              Соберите примерный контур проекта
            </h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          {options.map((option) => {
            const isActive = selected.includes(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggle(option.id)}
                className={`relative min-h-24 rounded-2xl border p-3 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                  isActive
                    ? "border-emerald-300/45 bg-emerald-300/10"
                    : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`mb-4 grid h-6 w-6 place-items-center rounded-full border ${
                    isActive
                      ? "border-emerald-300 bg-emerald-300 text-zinc-950"
                      : "border-white/15 text-transparent"
                  }`}
                >
                  <Check size={14} />
                </span>
                <span className="block text-sm font-semibold text-white">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              сложность сценариев
            </span>
            <span className="font-mono text-xs text-emerald-200">
              level {complexity}
            </span>
          </div>
          <input
            aria-label="Сложность сценариев"
            type="range"
            min="1"
            max="4"
            value={complexity}
            onChange={(event) => setComplexity(Number(event.target.value))}
            className="w-full accent-emerald-300"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-emerald-300/25 bg-[#0b1712] p-5">
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
          <Calculator size={16} />
          estimate
        </div>
        <motion.p
          key={`${estimate.low}-${estimate.high}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-3xl font-semibold text-white"
        >
          {estimate.low}k-{estimate.high}k ₽
        </motion.p>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {estimate.label}. Это не оферта, а быстрая рамка до нормального
          технического разбора.
        </p>
        <div className="mt-6 grid gap-3">
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Clock3 size={16} className="text-amber-200" />
              сроки
            </span>
            <span className="font-mono text-sm text-white">
              {estimate.weeks} недель
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Gauge size={16} className="text-cyan-200" />
              старт
            </span>
            <span className="font-mono text-sm text-white">50% предоплата</span>
          </div>
        </div>
      </div>
    </div>
  );
}
