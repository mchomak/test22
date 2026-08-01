"use client";

import { Check, Loader2, Send, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react";
import type { Locale } from "@/data/site";
import { buildReferenceLeadPayload } from "@/lib/reference-lead";

type ContextValue = { openReferenceLeadModal: (referenceCase: string) => void };
const ReferenceLeadModalContext = createContext<ContextValue | null>(null);

type ModalCopy = {
  title: string; description: string; selectedCase: string; noCase: string;
  clearCase: string; name: string; contact: string; descriptionLabel: string;
  descriptionPlaceholder: string; submit: string; sending: string; success: string;
  validationError: string; submitError: string; close: string;
};

const modalCopy: Record<Locale, ModalCopy> = {
  ru: {
    title: "Заказать похожий проект", description: "Оставьте контакты и коротко опишите задачу — отвечу с вопросами по проекту.",
    selectedCase: "Кейс-референс", noCase: "Без выбранного кейса", clearCase: "Удалить выбранный кейс",
    name: "Имя", contact: "Telegram, телефон или другой контакт", descriptionLabel: "Дополнительное описание проекта",
    descriptionPlaceholder: "Например: нужен похожий сценарий, но для другой аудитории.", submit: "Отправить заявку",
    sending: "Отправляем", success: "Заявка отправлена. Вернусь с уточняющими вопросами.",
    validationError: "Оставьте контакт и коротко опишите задачу.", submitError: "Не получилось отправить заявку. Попробуйте ещё раз.", close: "Закрыть форму",
  },
  en: {
    title: "Order a similar project", description: "Leave your contact and a short description. I will reply with project questions.",
    selectedCase: "Reference case", noCase: "No case selected", clearCase: "Remove selected case",
    name: "Name", contact: "Telegram, phone, or another contact", descriptionLabel: "Additional project details",
    descriptionPlaceholder: "For example: a similar workflow for a different audience.", submit: "Send request",
    sending: "Sending", success: "Request sent. I will come back with clarifying questions.",
    validationError: "Leave a contact and briefly describe the task.", submitError: "The request could not be sent. Please try again.", close: "Close form",
  },
};

export function ReferenceLeadModalProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const [referenceCase, setReferenceCase] = useState<string | null>(null);
  const openReferenceLeadModal = useCallback((caseTitle: string) => setReferenceCase(caseTitle), []);
  const closeReferenceLeadModal = useCallback(() => setReferenceCase(null), []);

  return (
    <ReferenceLeadModalContext.Provider value={{ openReferenceLeadModal }}>
      {children}
      <ReferenceLeadModal key={referenceCase ?? "closed"} locale={locale} referenceCase={referenceCase} onClose={closeReferenceLeadModal} />
    </ReferenceLeadModalContext.Provider>
  );
}

export function useReferenceLeadModal() {
  const context = useContext(ReferenceLeadModalContext);
  if (!context) throw new Error("useReferenceLeadModal must be used within ReferenceLeadModalProvider");
  return context;
}

export function ReferenceLeadButton({ caseTitle, children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { caseTitle: string; children: ReactNode }) {
  const { openReferenceLeadModal } = useReferenceLeadModal();
  return (
    <button {...props} type="button" onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented) openReferenceLeadModal(caseTitle);
    }}>
      {children}
    </button>
  );
}

function ReferenceLeadModal({ locale, referenceCase, onClose }: { locale: Locale; referenceCase: string | null; onClose: () => void }) {
  const copy = modalCopy[locale];
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const [selectedCase, setSelectedCase] = useState(referenceCase ?? "");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const isOpen = referenceCase !== null;

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => contactRef.current?.focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      lastFocusedElement.current?.focus();
    };
  }, [isOpen, onClose, referenceCase]);

  const resetFeedback = () => { if (submitState !== "idle") setSubmitState("idle"); };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contact.trim() || !comment.trim()) { setSubmitState("error"); return; }
    setSubmitState("sending");
    try {
      const response = await fetch("/api/project-leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildReferenceLeadPayload({ referenceCase: selectedCase, name, contact, comment })),
      });
      if (!response.ok) throw new Error("submit-failed");
      setSubmitState("success");
    } catch { setSubmitState("error"); }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="max-h-[92dvh] w-full overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#0b0d0c] p-5 shadow-2xl sm:max-w-xl sm:rounded-[2rem] sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div><h2 id={titleId} className="text-2xl font-semibold text-white">{copy.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">{copy.description}</p></div>
          <button type="button" onClick={onClose} aria-label={copy.close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"><X size={18} /></button>
        </div>
        {submitState === "success" ? (
          <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-300 text-black"><Check size={20} /></span><p className="text-sm font-semibold leading-6 text-emerald-100">{copy.success}</p></div></div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200/80">{copy.selectedCase}</p><p className="mt-1 text-sm font-medium text-white">{selectedCase || copy.noCase}</p></div>{selectedCase ? <button type="button" onClick={() => setSelectedCase("")} aria-label={copy.clearCase} className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-emerald-100 transition hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"><X size={15} /></button> : null}</div></div>
            <label className="block"><span className="mb-2 block text-sm font-medium text-zinc-300">{copy.name}</span><input type="text" autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); resetFeedback(); }} className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55" /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-zinc-300">{copy.contact} <span className="text-emerald-300">*</span></span><input ref={contactRef} type="text" autoComplete="tel" value={contact} onChange={(event) => { setContact(event.target.value); resetFeedback(); }} className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55" /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-zinc-300">{copy.descriptionLabel} <span className="text-emerald-300">*</span></span><textarea rows={4} value={comment} onChange={(event) => { setComment(event.target.value); resetFeedback(); }} placeholder={copy.descriptionPlaceholder} className="w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55" /></label>
            <button type="submit" disabled={submitState === "sending"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-300 px-5 text-sm font-semibold text-black transition hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70">{submitState === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}{submitState === "sending" ? copy.sending : copy.submit}</button>
            {submitState === "error" ? <p className="text-sm leading-6 text-red-200" aria-live="polite">{contact.trim() && comment.trim() ? copy.submitError : copy.validationError}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
}
