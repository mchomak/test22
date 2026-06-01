"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  CreditCard,
  Database,
  Network,
  Radar,
  Route,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const modes = [
  {
    id: "bot",
    title: "Telegram commerce bot",
    label: "Бот + оплаты",
    icon: Bot,
    accent: "emerald",
    input: "message / callback / payment",
    orchestration: "scenario router + FSM + roles",
    persistence: "PostgreSQL + Redis state",
    output: "order paid / admin alert / receipt",
    code: [
      "await router.dispatch(update)",
      "state = await storage.get(user_id)",
      "invoice = payments.create(order)",
      "await notify_admin(order.status)",
    ],
  },
  {
    id: "ai",
    title: "AI knowledge assistant",
    label: "AI / RAG",
    icon: BrainCircuit,
    accent: "cyan",
    input: "question + user role",
    orchestration: "retrieval + guardrails + LLM",
    persistence: "documents + chunks + history",
    output: "scoped answer + citations + limits",
    code: [
      "context = await retriever.search(query)",
      "policy.check(user.role, context)",
      "answer = await llm.respond(prompt)",
      "await history.append(dialog_id, answer)",
    ],
  },
  {
    id: "pay",
    title: "Payment integration core",
    label: "Платежи",
    icon: CreditCard,
    accent: "amber",
    input: "invoice / webhook / refund",
    orchestration: "signature check + idempotency",
    persistence: "orders + transactions + audit",
    output: "paid status / retry / operator action",
    code: [
      "signature.verify(headers, payload)",
      "tx = await transactions.lock(uuid)",
      "await order.mark_paid(provider_id)",
      "events.emit('payment.confirmed')",
    ],
  },
  {
    id: "backend",
    title: "Async backend service",
    label: "Backend",
    icon: Network,
    accent: "stone",
    input: "API / parser / CRM event",
    orchestration: "FastAPI + queues + workers",
    persistence: "PostgreSQL + Redis + logs",
    output: "normalized data + status + metrics",
    code: [
      "async with session.begin():",
      "  entity = await service.sync(dto)",
      "queue.enqueue('external.push', entity.id)",
      "metrics.increment('sync.success')",
    ],
  },
];

const lanes = [
  { icon: Route, label: "Input", key: "input" },
  { icon: Radar, label: "Orchestration", key: "orchestration" },
  { icon: Database, label: "Persistence", key: "persistence" },
  { icon: CreditCard, label: "Output", key: "output" },
] as const;

export function SystemShowcase() {
  const [activeId, setActiveId] = useState(modes[0].id);
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0];

  return (
    <section className="section-shell bg-[#070908]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Интерактивный контур"
          title="Каждый проект собирается как управляемая система: входы, состояния, данные, платежи, наблюдаемость"
          description="Переключите режим и посмотрите, как меняется архитектурная логика. Это не декоративная схема, а способ быстро показать мышление: что приходит на вход, где живёт состояние и как система отвечает бизнесу."
        />

        <Reveal>
          <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-[#0d1110]/70 p-4 shadow-2xl shadow-black/35 backdrop-blur-md md:p-6 lg:grid-cols-[300px_1fr]">
            <div className="grid gap-2 self-start">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = mode.id === active.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveId(mode.id)}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                      isActive
                        ? "border-emerald-300/35 bg-emerald-300/10"
                        : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="mode-active"
                        className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-emerald-300"
                      />
                    ) : null}
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/25 text-emerald-200">
                        <Icon size={19} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">
                          {mode.label}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                          {mode.id}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-4 md:p-6">
              <div className="system-map-grid absolute inset-0 opacity-55" />
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                          Active architecture
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                          {active.title}
                        </h3>
                      </div>
                      <div className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 font-mono text-xs text-emerald-100">
                        async / observable / deploy-ready
                      </div>
                    </div>

                    <div className="grid gap-3 lg:grid-cols-4">
                      {lanes.map((lane, index) => {
                        const Icon = lane.icon;
                        const value = active[lane.key];

                        return (
                          <motion.div
                            key={lane.key}
                            className="relative min-h-36 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1110]/62 p-4 backdrop-blur"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                          >
                            <motion.span
                              className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 2.6,
                                repeat: Infinity,
                                delay: index * 0.25,
                                ease: "linear",
                              }}
                            />
                            <Icon size={18} className="text-emerald-300" />
                            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                              {lane.label}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-zinc-200">
                              {value}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#050607]/70 backdrop-blur">
                      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                        <span className="ml-2 font-mono text-xs text-zinc-500">
                          architecture_trace.py
                        </span>
                      </div>
                      <div className="grid gap-2 p-4 font-mono text-xs leading-6 text-zinc-400 sm:text-sm">
                        {active.code.map((line, index) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.12 + index * 0.05 }}
                            className="grid grid-cols-[28px_1fr] gap-3"
                          >
                            <span className="text-zinc-700">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>
                              <span className="text-emerald-300">&gt;</span>{" "}
                              {line}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
