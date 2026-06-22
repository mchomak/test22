"use client";

import {
  AtSign,
  Check,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import type { SiteData } from "@/data/site";
import { trackSiteEvent } from "@/lib/site-events";

type ContactChannel = "telegram" | "whatsapp" | "phone" | "email";
type SubmitState = "idle" | "sending" | "success" | "error";

type QuickLeadFormProps = {
  contacts: SiteData["contacts"];
  copy: SiteData["ui"]["quickLead"];
  source: "hero" | "final" | "sticky" | "inline";
  compact?: boolean;
};

const channelIcons = {
  email: Mail,
  phone: Phone,
  telegram: AtSign,
  whatsapp: MessageCircle,
} satisfies Record<ContactChannel, LucideIcon>;

const channels: ContactChannel[] = ["telegram", "whatsapp", "phone", "email"];

export function QuickLeadForm({
  compact = false,
  contacts,
  copy,
  source,
}: QuickLeadFormProps) {
  const [channel, setChannel] = useState<ContactChannel>("telegram");
  const [contactValue, setContactValue] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const directLinks = useMemo(
    () => [
      {
        href: contacts.telegramUrl,
        icon: Send,
        label: contacts.telegram,
      },
      {
        href: contacts.whatsappUrl,
        icon: MessageCircle,
        label: contacts.whatsapp,
      },
      {
        href: `mailto:${contacts.email}`,
        icon: Mail,
        label: contacts.email,
      },
    ],
    [contacts],
  );

  const resetStatus = () => {
    setSubmitState("idle");
    setSubmitMessage("");
  };
  const formClassName = compact
    ? "quick-lead-form quick-lead-form-compact grid gap-3"
    : "quick-lead-form grid gap-4";

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactValue.trim() || !comment.trim()) {
      setSubmitState("error");
      setSubmitMessage(copy.validationError);
      trackSiteEvent("quick_form_submit_error", {
        reason: "validation",
        source,
      });
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    const trimmedContact = contactValue.trim();
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
        value: trimmedContact,
        telegram: channel === "telegram" ? trimmedContact : "",
        email: channel === "email" ? trimmedContact : "",
        phone: channel === "phone" ? trimmedContact : "",
        whatsapp: channel === "whatsapp" ? trimmedContact : "",
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
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error ?? copy.validationError);
      }

      setName("");
      setContactValue("");
      setComment("");
      setSubmitState("success");
      setSubmitMessage(copy.success);
      trackSiteEvent("quick_form_submit_success", {
        channel,
        source,
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : copy.validationError,
      );
      trackSiteEvent("quick_form_submit_error", {
        channel,
        reason: error instanceof Error ? error.message : "unknown",
        source,
      });
    }
  };

  return (
    <form onSubmit={submitLead} className={formClassName}>
      <div className="quick-lead-form-head">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {copy.title}
        </h3>
        <p className="body-copy mt-2 text-sm">{copy.description}</p>
      </div>

      <div
        className={
          compact
            ? "quick-lead-form-fields grid gap-3 sm:grid-cols-2"
            : "quick-lead-form-fields grid gap-3"
        }
      >
        <label className="quick-lead-form-field block">
          <span className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            {copy.name}
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              resetStatus();
            }}
            placeholder={copy.namePlaceholder}
            className="field-control h-12 w-full px-4 text-sm"
          />
        </label>

        <fieldset className="quick-lead-form-field quick-lead-form-field-wide grid gap-2">
          <legend className="text-sm font-medium text-[var(--text-secondary)]">
            {copy.channel}
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {channels.map((item) => {
              const Icon = channelIcons[item];
              const isActive = item === channel;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setChannel(item);
                    resetStatus();
                  }}
                  aria-pressed={isActive}
                  className={`choice-card flex min-h-11 items-center justify-center gap-2 px-3 py-2 text-center text-sm font-semibold text-[var(--text-primary)] ${
                    isActive ? "choice-card-active choice-card-active-signal" : ""
                  }`}
                >
                  <Icon size={15} />
                  <span className="min-w-0 break-words">{copy.channels[item]}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="quick-lead-form-field block">
          <span className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            {copy.contact} <span className="accent-warm">*</span>
          </span>
          <input
            type={channel === "email" ? "email" : "text"}
            required
            value={contactValue}
            onChange={(event) => {
              setContactValue(event.target.value);
              resetStatus();
            }}
            placeholder={copy.contactPlaceholder[channel]}
            className="field-control h-12 w-full px-4 text-sm"
          />
        </label>

        <label className="quick-lead-form-field quick-lead-form-field-wide block">
          <span className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            {copy.comment} <span className="accent-warm">*</span>
          </span>
          <textarea
            required
            rows={compact ? 3 : 4}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              resetStatus();
            }}
            placeholder={copy.commentPlaceholder}
            className="field-control min-h-24 w-full resize-y px-4 py-3 text-sm leading-6"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="quick-lead-form-submit btn-link btn-link-primary w-full disabled:cursor-wait disabled:opacity-70"
      >
        {submitState === "sending" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : submitState === "success" ? (
          <Check size={18} />
        ) : (
          <Send size={18} />
        )}
        {submitState === "sending" ? copy.sending : copy.submit}
      </button>

      {submitMessage ? (
        <div aria-live="polite" className="grid gap-3">
          <p
            className={`text-sm leading-6 ${
              submitState === "success" ? "text-emerald-200" : "text-red-200"
            }`}
          >
            {submitMessage}
          </p>
          {submitState === "error" ? (
            <div className="grid gap-2">
              <p className="eyebrow-muted">{copy.fallbackTitle}</p>
              <div className="flex flex-wrap gap-2">
                {directLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="estimator-telegram-link w-auto px-3"
                    >
                      <Icon size={15} />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
