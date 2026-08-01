"use client";

import {
  Check,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import type { SiteData } from "@/data/site";

type Channel = "telegram" | "whatsapp" | "phone" | "email";

type SubmitState = "idle" | "sending" | "success" | "error";

type QuickLeadFormProps = {
  contacts: SiteData["contacts"];
  copy: SiteData["ui"]["quickLead"];
  source: "hero" | "final" | "sticky" | "inline";
  compact?: boolean;
};

const channelOrder: Channel[] = ["telegram", "whatsapp", "phone", "email"];

export function QuickLeadForm({
  contacts,
  copy,
  source,
  compact = false,
}: QuickLeadFormProps) {
  const [channel, setChannel] = useState<Channel>("telegram");
  const [name, setName] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [comment, setComment] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const resetState = () => {
    if (submitState !== "idle") {
      setSubmitState("idle");
    }
  };

  const directLinks = [
    {
      key: "telegram",
      label: copy.channels.telegram,
      href: contacts.telegramUrl,
      icon: <Send size={15} className="text-emerald-300" />,
      external: true,
    },
    {
      key: "whatsapp",
      label: copy.channels.whatsapp,
      href: contacts.whatsappUrl,
      icon: <MessageCircle size={15} className="text-emerald-300" />,
      external: true,
    },
    {
      key: "email",
      label: copy.channels.email,
      href: `mailto:${contacts.email}`,
      icon: <Mail size={15} className="text-emerald-300" />,
      external: false,
    },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !contactValue.trim() || !comment.trim()) {
      setSubmitState("error");
      return;
    }

    setSubmitState("sending");

    const value = contactValue.trim();
    const payload = {
      category: "Быстрая заявка",
      complexity: "не указана",
      urgency: "обсудить",
      options: [],
      estimate: {
        budget: "после обсуждения",
        timeline: "после обсуждения",
      },
      sourceCase: "",
      source,
      contact: {
        name: name.trim(),
        channel,
        value,
        telegram: channel === "telegram" ? value : "",
        email: channel === "email" ? value : "",
      },
      comment: comment.trim(),
      fileUrl: "",
    };

    try {
      const response = await fetch("/api/project-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("submit-failed");
      }

      setName("");
      setContactValue("");
      setComment("");
      setChannel("telegram");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div className="rounded-3xl border border-emerald-300/25 bg-emerald-300/10 p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-300 text-black">
            <Check size={22} />
          </span>
          <p className="text-sm font-semibold leading-6 text-emerald-100">
            {copy.success}
          </p>
        </div>
      </div>
    );
  }

  const isError = submitState === "error";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-full gap-4 rounded-3xl border border-white/10 bg-black/25 p-4 backdrop-blur-md sm:p-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-white">{copy.title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-400">{copy.description}</p>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-300">
          {copy.channel}
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {channelOrder.map((item) => {
            const isActive = item === channel;

            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setChannel(item);
                  resetState();
                }}
                aria-pressed={isActive}
                className={`min-h-10 rounded-2xl border px-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                  isActive
                    ? "border-emerald-300/50 bg-emerald-300/10 text-emerald-100"
                    : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                {copy.channels[item]}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
          <User size={16} className="text-emerald-300" />
          {copy.name}
        </span>
        <input
          type="text"
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            resetState();
          }}
          placeholder={copy.namePlaceholder}
          className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
        />
      </label>

      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Phone size={16} className="text-emerald-300" />
          {copy.contact}
          <span className="text-emerald-300">*</span>
        </span>
        <input
          type="text"
          value={contactValue}
          onChange={(event) => {
            setContactValue(event.target.value);
            resetState();
          }}
          placeholder={copy.contactPlaceholder[channel]}
          className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
        />
      </label>

      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
          <MessageCircle size={16} className="text-emerald-300" />
          {copy.comment}
          <span className="text-emerald-300">*</span>
        </span>
        <textarea
          rows={compact ? 2 : 4}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            resetState();
          }}
          placeholder={copy.commentPlaceholder}
          className="w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
        />
      </label>

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-300 px-5 text-sm font-semibold text-black transition duration-300 hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70"
      >
        {submitState === "sending" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
        {submitState === "sending" ? copy.sending : copy.submit}
      </button>

      {isError ? (
        <div aria-live="polite">
          <p className="text-sm leading-6 text-red-200">
            {contactValue.trim() && comment.trim()
              ? copy.submitError
              : copy.validationError}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
            {directLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </form>
  );
}
