"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeQuestionMark,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Calculator,
  ChartCandlestick,
  ChartNoAxesCombined,
  Check,
  Clock3,
  Code2,
  CreditCard,
  Database,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Gauge,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Link as LinkIcon,
  Loader2,
  LockKeyhole,
  Mail,
  MessageCircle,
  MessagesSquare,
  Network,
  Plug,
  Repeat,
  Rocket,
  SearchCode,
  Send,
  ServerCog,
  Shield,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Star,
  TableProperties,
  TriangleAlert,
  User,
  UserRound,
  UsersRound,
  WalletCards,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  type ProjectComplexityId,
  type ProjectTypeId,
  type SiteData,
} from "@/data/site";
import { trackSiteEvent } from "@/lib/site-events";

type SubmitState = "idle" | "sending" | "success" | "error";

type ProjectEstimatorData = Pick<
  SiteData,
  "contacts" | "projectTypes" | "complexityLevels" | "urgencyOptions" | "projectModules" | "ui"
> & {
  casePresets: Array<
    Pick<SiteData["cases"][number], "estimatorPreset" | "keyResult" | "slug" | "title" | "type">
  >;
};

const roundBudget = (value: number, step: number, min: number) =>
  Math.max(min, Math.round(value / step) * step);

const isProjectTypeId = (
  value: string | null,
  projectTypes: ProjectEstimatorData["projectTypes"],
): value is ProjectTypeId =>
  projectTypes.some((item) => item.id === value);

const isProjectComplexityId = (
  value: string | null,
  complexityLevels: ProjectEstimatorData["complexityLevels"],
): value is ProjectComplexityId =>
  complexityLevels.some((item) => item.id === value);

const getEstimatorPresetModules = (
  typeId: ProjectTypeId,
  rawModules: string | null,
  data: ProjectEstimatorData,
) => {
  const { projectModules, projectTypes } = data;
  const nextType = projectTypes.find((item) => item.id === typeId) ?? projectTypes[0];

  if (!rawModules) {
    return nextType.defaultModules;
  }

  const availableModuleIds = new Set(projectModules[typeId].map((item) => item.id));
  const presetModules = rawModules
    .split(",")
    .map((item) => item.trim())
    .filter((item) => availableModuleIds.has(item));

  return presetModules.length ? presetModules : nextType.defaultModules;
};

type EstimatorInitialState = {
  key: string;
  selectedTypeId: ProjectTypeId;
  selectedModules: string[];
  complexityId: ProjectComplexityId;
  urgencyId: string;
  presetCaseSlug: string;
};

const estimatorFormId = "project-estimator-form";

const getEstimatorInitialState = (
  query: string,
  data: ProjectEstimatorData,
): EstimatorInitialState => {
  const params = new URLSearchParams(query);
  const typeParam = params.get("estimateType");
  const { casePresets, complexityLevels, projectTypes, urgencyOptions } = data;
  const caseParam = params.get("estimateCase");
  const presetCase = caseParam
    ? casePresets.find((item) => item.slug === caseParam)
    : undefined;
  const fallbackType = presetCase?.estimatorPreset.type;
  const selectedTypeId = isProjectTypeId(typeParam, projectTypes)
    ? typeParam
    : fallbackType;

  if (!selectedTypeId) {
    return {
      key: "default",
      selectedTypeId: projectTypes[0].id,
      selectedModules: projectTypes[0].defaultModules,
      complexityId: "business",
      urgencyId: urgencyOptions[1].id,
      presetCaseSlug: "",
    };
  }

  const complexityParam = params.get("estimateComplexity");
  const rawModules =
    params.get("estimateModules") ??
    presetCase?.estimatorPreset.modules.join(",") ??
    null;
  const selectedModules = getEstimatorPresetModules(
    selectedTypeId,
    rawModules,
    data,
  );
  const complexityId = isProjectComplexityId(complexityParam, complexityLevels)
    ? complexityParam
    : presetCase?.estimatorPreset.complexity ?? "business";

  return {
    key: `preset:${presetCase?.slug ?? "query"}:${selectedTypeId}:${complexityId}:${selectedModules.join(",")}`,
    selectedTypeId,
    selectedModules,
    complexityId,
    urgencyId: "standard",
    presetCaseSlug: presetCase?.slug ?? "",
  };
};

const projectTypeIcons = {
  "telegram-bot": Bot,
  "telegram-mini-app": Smartphone,
  "ai-integration": BrainCircuit,
  "parser-automation": SearchCode,
  "web-service": LayoutDashboard,
  "crypto-trading-bot": ChartCandlestick,
  "not-sure": MessagesSquare,
} satisfies Record<ProjectTypeId, LucideIcon>;

const moduleIcons: Record<string, LucideIcon> = {
  "admin": LayoutDashboard,
  "admin-ai": LayoutDashboard,
  "ai-assistant": BrainCircuit,
  "analytics": ChartNoAxesCombined,
  "architecture": Workflow,
  "auth": KeyRound,
  "backend-api": ServerCog,
  "captcha": Shield,
  "classification": FileSearch,
  "content-generation": Sparkles,
  "crypto-payments": WalletCards,
  "dashboard": ChartNoAxesCombined,
  "database": Database,
  "database-web": Database,
  "deploy": Rocket,
  "dex": Network,
  "discovery": BadgeQuestionMark,
  "documents": FileSpreadsheet,
  "exchange-api": Plug,
  "existing-product": Plug,
  "export": FileSpreadsheet,
  "external-api": Plug,
  "external-integrations": Plug,
  "frontend": Code2,
  "history-logs": FileText,
  "llm-api": BrainCircuit,
  "mvp-scope": TableProperties,
  "multi-site": Globe2,
  "notifications": Bell,
  "payments": CreditCard,
  "price-monitoring": ChartNoAxesCombined,
  "profile": UserRound,
  "prototype": Sparkles,
  "proxies": Shield,
  "rag": BrainCircuit,
  "referral": UsersRound,
  "regular-run": Repeat,
  "risk-limits": TriangleAlert,
  "roles": LockKeyhole,
  "signals": ChartNoAxesCombined,
  "single-site": SearchCode,
  "telegram-alerts": Bell,
  "telegram-stars": Star,
  "trade-logs": FileText,
};

const getModuleIcon = (moduleId: string) => moduleIcons[moduleId] ?? Boxes;

export function ProjectEstimator({ data }: { data: ProjectEstimatorData }) {
  const searchParams = useSearchParams();
  const estimatorQuery = searchParams?.toString() ?? "";
  const initialState = useMemo(
    () => getEstimatorInitialState(estimatorQuery, data),
    [data, estimatorQuery],
  );

  return (
    <ProjectEstimatorForm
      key={initialState.key}
      data={data}
      initialState={initialState}
    />
  );
}

function ProjectEstimatorForm({
  data,
  initialState,
}: {
  data: ProjectEstimatorData;
  initialState: EstimatorInitialState;
}) {
  const { complexityLevels, projectModules, projectTypes, ui, urgencyOptions } = data;
  const copy = ui.estimator;
  const money = useMemo(
    () => new Intl.NumberFormat(copy.moneyLocale),
    [copy.moneyLocale],
  );
  const formatMoney = useCallback(
    (value: number) =>
      copy.currencyPosition === "prefix"
        ? `${copy.currency}${money.format(value)}`
        : `${money.format(value)} ${copy.currency}`,
    [copy.currency, copy.currencyPosition, money],
  );
  const [selectedTypeId, setSelectedTypeId] = useState<ProjectTypeId>(
    initialState.selectedTypeId,
  );
  const [selectedModules, setSelectedModules] = useState<string[]>(
    initialState.selectedModules,
  );
  const [complexityId, setComplexityId] =
    useState<ProjectComplexityId>(initialState.complexityId);
  const [urgencyId, setUrgencyId] = useState(initialState.urgencyId);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [activePresetCaseSlug, setActivePresetCaseSlug] = useState(
    initialState.presetCaseSlug,
  );
  const [contact, setContact] = useState({
    name: "",
    telegram: "",
    email: "",
    comment: "",
    fileUrl: "",
  });

  const activeType =
    projectTypes.find((item) => item.id === selectedTypeId) ?? projectTypes[0];
  const activeComplexity =
    complexityLevels.find((item) => item.id === complexityId) ??
    complexityLevels[1];
  const activeUrgency =
    urgencyOptions.find((item) => item.id === urgencyId) ?? urgencyOptions[1];
  const modules = useMemo(
    () => projectModules[selectedTypeId],
    [projectModules, selectedTypeId],
  );
  const selectedModuleDetails = useMemo(
    () => modules.filter((item) => selectedModules.includes(item.id)),
    [modules, selectedModules],
  );
  const activePresetCase = useMemo(
    () =>
      activePresetCaseSlug
        ? data.casePresets.find((item) => item.slug === activePresetCaseSlug)
        : undefined,
    [activePresetCaseSlug, data.casePresets],
  );

  const estimate = useMemo(() => {
    const moduleLow = selectedModuleDetails.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    const moduleHigh = selectedModuleDetails.reduce(
      (sum, item) => sum + Math.round(item.price * 1.45),
      0,
    );
    const moduleDays = selectedModuleDetails.reduce(
      (sum, item) => sum + item.days,
      0,
    );
    const priceFactor =
      activeComplexity.priceFactor * activeUrgency.priceFactor;
    const daysFactor = activeComplexity.daysFactor * activeUrgency.daysFactor;
    const low = roundBudget(
      (activeType.baseLow + moduleLow) * priceFactor,
      copy.budgetStep,
      copy.budgetMin,
    );
    const high = Math.max(
      low + copy.budgetGap,
      roundBudget(
        (activeType.baseHigh + moduleHigh) * priceFactor,
        copy.budgetStep,
        copy.budgetMin,
      ),
    );
    const daysLow = Math.max(
      3,
      Math.round((activeType.daysLow + moduleDays * 0.65) * daysFactor),
    );
    const daysHigh = Math.max(
      daysLow + 2,
      Math.round((activeType.daysHigh + moduleDays * 1.15) * daysFactor),
    );

    return {
      low,
      high,
      daysLow,
      daysHigh,
      budget: `${formatMoney(low)} - ${formatMoney(high)}`,
      timeline: `${daysLow}-${daysHigh} ${copy.timelineSuffix}`,
    };
  }, [
    activeComplexity,
    activeType,
    activeUrgency,
    copy.budgetGap,
    copy.budgetMin,
    copy.budgetStep,
    copy.timelineSuffix,
    formatMoney,
    selectedModuleDetails,
  ]);

  const resetForm = () => {
    setContact({ name: "", telegram: "", email: "", comment: "", fileUrl: "" });
    setSubmitState("idle");
    setSubmitMessage("");
  };

  const clearPresetContext = () => {
    setActivePresetCaseSlug("");
  };

  const chooseType = (typeId: ProjectTypeId) => {
    const nextType = projectTypes.find((item) => item.id === typeId);
    if (!nextType) return;

    setSelectedTypeId(typeId);
    setSelectedModules(nextType.defaultModules);
    clearPresetContext();
    setSubmitState("idle");
    setSubmitMessage("");
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules((current) =>
      current.includes(moduleId)
        ? current.filter((item) => item !== moduleId)
        : [...current, moduleId],
    );
    clearPresetContext();
    setSubmitState("idle");
    setSubmitMessage("");
  };

  const updateContact = (field: keyof typeof contact, value: string) => {
    setContact((current) => ({ ...current, [field]: value }));
    setSubmitState("idle");
    setSubmitMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contact.telegram.trim() || !contact.comment.trim()) {
      setSubmitState("error");
      setSubmitMessage(copy.validationError);
      trackSiteEvent("estimator_submit_error", {
        reason: "validation",
      });
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    const payload = {
      category: activeType.label,
      complexity: activeComplexity.label.toLowerCase(),
      urgency: activeUrgency.label,
      options: selectedModuleDetails.map((item) => item.label),
      estimate: {
        budget: estimate.budget,
        timeline: estimate.timeline,
      },
      sourceCase: activePresetCase?.title ?? "",
      contact: {
        name: contact.name.trim(),
        channel: "contact",
        value: contact.telegram.trim(),
        telegram: "",
        email: contact.email.trim(),
      },
      comment: contact.comment.trim(),
      fileUrl: contact.fileUrl.trim(),
    };

    try {
      const response = await fetch("/api/project-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as
        | { delivered?: boolean; error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error ?? copy.fallbackSubmitError);
      }

      setContact({ name: "", telegram: "", email: "", comment: "", fileUrl: "" });
      setSubmitState("success");
      setSubmitMessage(
        data?.delivered
          ? copy.successDelivered
          : copy.successStub,
      );
      trackSiteEvent("estimator_submit_success", {
        category: activeType.id,
        presetCase: activePresetCase?.slug ?? "",
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : copy.unknownSubmitError,
      );
      trackSiteEvent("estimator_submit_error", {
        category: activeType.id,
        reason: error instanceof Error ? error.message : "unknown",
      });
    }
  };

  return (
    <div className="estimator-workbench">
      <form id={estimatorFormId} onSubmit={handleSubmit} className="estimator-form">
        <div className="estimator-command-bar">
          <div className="mb-5 flex items-center gap-3">
            <span className="icon-tile h-11 w-11">
              <SlidersHorizontal size={20} />
            </span>
            <div>
              <p className="eyebrow">
                {copy.kicker}
              </p>
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                {copy.title}
              </h3>
            </div>
          </div>

          <div className="estimator-lead-card">
            <div>
              <p className="eyebrow-muted">{copy.leadTitle}</p>
              <p>{copy.leadDescription}</p>
            </div>
            <div className="estimator-lead-bullets">
              {copy.leadBullets.map((item) => (
                <span key={item}>
                  <Check size={13} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="estimator-step-rail">
            {copy.steps.map((step, index) => (
              <span
                key={step}
                className="estimator-step-token"
              >
                <small>
                  {String(index + 1).padStart(2, "0")}
                </small>
                {step}
              </span>
            ))}
          </div>

          {activePresetCase ? (
            <div className="estimator-preset-banner mt-5">
              <div>
                <p className="eyebrow-muted">{copy.presetLabel}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {activePresetCase.title}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                  {activePresetCase.keyResult}
                </p>
              </div>
              <span className="tag-pill tag-pill-logic">
                {activePresetCase.type}
              </span>
            </div>
          ) : null}
        </div>

        <ConfigBlock
          label="01"
          copy={copy}
          title={copy.typeTitle}
          description={copy.typeDescription}
          fallbackHref="#quick-lead"
          fallbackLabel={copy.directFallback}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {projectTypes.map((type) => {
              const isActive = type.id === selectedTypeId;
              const TypeIcon = projectTypeIcons[type.id];

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => chooseType(type.id)}
                  aria-pressed={isActive}
                  className={`choice-card estimator-choice-card min-h-28 p-3 ${
                    isActive
                      ? "choice-card-active choice-card-active-logic"
                      : ""
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="estimator-choice-content">
                      <span className="estimator-choice-icon" aria-hidden="true">
                        <TypeIcon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-semibold text-[var(--text-primary)]">
                          {type.label}
                        </span>
                        <span className="body-copy mt-2 block text-sm">
                          {type.description}
                        </span>
                      </span>
                    </span>
                    <span
                      className="check-token h-7 w-7 shrink-0"
                    >
                      <Check size={15} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </ConfigBlock>

        <ConfigBlock
          label="02"
          copy={copy}
          title={`${copy.complexityTitle} / ${copy.urgencyTitle}`}
          description={copy.complexityDescription}
          fallbackHref="#quick-lead"
          fallbackLabel={copy.directFallback}
        >
          <div className="estimator-tuning-grid">
            <div>
              <p className="eyebrow-muted mb-3">{copy.complexityTitle}</p>
              <div className="grid gap-2">
                {complexityLevels.map((level) => {
                  const isActive = level.id === complexityId;

                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => {
                        setComplexityId(level.id);
                        clearPresetContext();
                      }}
                      aria-pressed={isActive}
                      className={`choice-card estimator-choice-card p-3 ${
                        isActive
                          ? "choice-card-active choice-card-active-signal"
                          : ""
                      }`}
                    >
                      <span className="font-semibold text-[var(--text-primary)]">{level.label}</span>
                      <span className="body-copy mt-1 block text-xs leading-5">
                        {level.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="eyebrow-muted mb-3">{copy.urgencyTitle}</p>
              <div className="grid gap-2">
                {urgencyOptions.map((option) => {
                  const isActive = option.id === urgencyId;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setUrgencyId(option.id);
                        clearPresetContext();
                      }}
                      aria-pressed={isActive}
                      className={`choice-card estimator-choice-card p-3 ${
                        isActive
                          ? "choice-card-active choice-card-active-warm"
                          : ""
                      }`}
                    >
                      <span className="font-semibold text-[var(--text-primary)]">{option.label}</span>
                      <span className="body-copy mt-1 block text-xs leading-5">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ConfigBlock>

        <ConfigBlock
          label="03"
          copy={copy}
          title={copy.contactsTitle}
          description={copy.contactsDescription}
          fallbackHref="#quick-lead"
          fallbackLabel={copy.directFallback}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Field
              icon={<User size={16} />}
              label={copy.fields.name}
              value={contact.name}
              placeholder={copy.fields.namePlaceholder}
              onChange={(value) => updateContact("name", value)}
            />
            <Field
              icon={<MessageCircle size={16} />}
              label={copy.fields.contact}
              value={contact.telegram}
              placeholder={copy.fields.contactPlaceholder}
              required
              onChange={(value) => updateContact("telegram", value)}
            />
            <Field
              icon={<Mail size={16} />}
              label={copy.fields.email}
              value={contact.email}
              placeholder={copy.fields.emailPlaceholder}
              type="email"
              onChange={(value) => updateContact("email", value)}
            />
            <Field
              icon={<LinkIcon size={16} />}
              label={copy.fields.fileUrl}
              value={contact.fileUrl}
              placeholder={copy.fields.fileUrlPlaceholder}
              onChange={(value) => updateContact("fileUrl", value)}
            />
          </div>

          <label className="mt-3 block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <FileText size={16} className="accent-signal" />
              {copy.fields.comment}
            </span>
            <textarea
              required
              rows={4}
              value={contact.comment}
              onChange={(event) => updateContact("comment", event.target.value)}
              placeholder={copy.fields.commentPlaceholder}
              className="field-control min-h-28 w-full resize-y px-4 py-3 text-sm leading-6"
            />
          </label>
        </ConfigBlock>

        <ConfigBlock
          label="04"
          copy={copy}
          title={copy.modulesTitle}
          description={copy.modulesDescription.replace("{category}", activeType.label)}
          fallbackHref="#quick-lead"
          fallbackLabel={copy.directFallback}
        >
          <details
            className="estimator-module-details"
            onToggle={(event) => {
              if (event.currentTarget.open) {
                trackSiteEvent("estimator_module_details_open", {
                  category: selectedTypeId,
                });
              }
            }}
          >
            <summary>
              <span>
                <span className="eyebrow-muted">{copy.modulesToggle}</span>
                <strong>
                  {copy.selectedModules}: {selectedModuleDetails.length}
                </strong>
              </span>
              <span className="tag-pill tag-pill-logic">
                {activeType.label}
              </span>
            </summary>

            <div className="estimator-module-grid grid gap-3 md:grid-cols-2">
              {modules.map((module) => {
                const isActive = selectedModules.includes(module.id);
                const ModuleIcon = getModuleIcon(module.id);

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    aria-pressed={isActive}
                    className={`choice-card estimator-choice-card min-h-24 p-3 ${
                      isActive
                        ? "choice-card-active choice-card-active-logic"
                        : ""
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="estimator-choice-content">
                        <span className="estimator-choice-icon estimator-choice-icon-sm" aria-hidden="true">
                          <ModuleIcon size={17} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[var(--text-primary)]">
                            {module.label}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
                            {module.description}
                          </span>
                          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                            + {formatMoney(module.price)} / +{module.days} {copy.dayShort}
                          </span>
                        </span>
                      </span>
                      <span
                        className="check-token h-6 w-6 shrink-0"
                      >
                        <Check size={14} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </details>
        </ConfigBlock>

        <div className="estimator-submit-panel">
          {submitState === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent-logic)] text-[var(--accent-primary-contrast)]">
                  <Check size={22} />
                </span>
                <p className="text-sm font-semibold leading-6 text-[var(--text-primary)]">
                  {submitMessage}
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-signal)] transition hover:text-[var(--text-primary)]"
              >
                <Send size={13} />
                {copy.sendAnother}
              </button>
              <a
                href="#quick-lead"
                className="estimator-telegram-link"
                data-site-event="estimator_direct_fallback_click"
                data-site-event-payload='{"source":"success"}'
              >
                <MessageCircle size={16} />
                <span>{copy.directFallback}</span>
              </a>
            </motion.div>
          ) : (
            <>
              <p className="body-copy text-sm">
                {copy.note}
              </p>
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="btn-link btn-link-primary mt-5 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {submitState === "sending" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {copy.submit}
              </button>
              {submitMessage ? (
                <div aria-live="polite" className="mt-3 grid gap-2">
                  <p className="text-sm leading-6 text-red-200">
                    {submitMessage}
                  </p>
                  {submitState === "error" ? (
                    <a
                      href="#quick-lead"
                      className="estimator-telegram-link"
                      data-site-event="estimator_direct_fallback_click"
                      data-site-event-payload='{"source":"submit_error"}'
                    >
                      <MessageCircle size={16} />
                      <span>{copy.directFallback}</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </div>
      </form>

      <aside className="estimator-summary-panel">
        <div className="eyebrow flex items-center gap-2">
          <Calculator size={16} />
          {copy.estimateLabel}
        </div>

        <motion.div
          key={`${estimate.low}-${estimate.high}-${estimate.daysLow}-${estimate.daysHigh}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
        >
          <p className="text-sm text-[var(--text-muted)]">{copy.kicker}</p>
          <p className="mt-2 text-3xl font-semibold leading-tight text-[var(--text-primary)]">
            {estimate.budget}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Clock3 size={16} className="accent-warm" />
            {copy.timelineLabel}{" "}
            <span className="font-mono text-[var(--text-primary)]">{estimate.timeline}</span>
          </p>
        </motion.div>

        <div className="mt-6 grid gap-3 border-t border-[var(--stroke-subtle)] pt-5">
          {activePresetCase ? (
            <SummaryLine
              label={copy.summaryLabels.source}
              value={activePresetCase.title}
            />
          ) : null}
          <SummaryLine label={copy.summaryLabels.category} value={activeType.label} />
          <SummaryLine label={copy.summaryLabels.complexity} value={activeComplexity.label} />
          <SummaryLine label={copy.summaryLabels.urgency} value={activeUrgency.label} />
        </div>

        <div className="mt-6">
          <p className="eyebrow-muted mb-3 flex items-center gap-2">
            <Gauge size={15} className="accent-signal" />
            {copy.selectedModules}
          </p>
          {selectedModuleDetails.length ? (
            <div className="flex flex-wrap gap-2">
              {selectedModuleDetails.map((module) => (
                <span
                  key={module.id}
                  className="tag-pill tag-pill-logic"
                >
                  {module.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[var(--text-muted)]">
              {copy.noModules}
            </p>
          )}
        </div>

        <div className="estimator-summary-actions">
          <button
            type="submit"
            form={estimatorFormId}
            disabled={submitState === "sending"}
            className="btn-link btn-link-primary w-full disabled:cursor-wait disabled:opacity-70"
          >
            {submitState === "sending" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {copy.summaryCta}
          </button>
          <a
            className="estimator-telegram-link"
            href="#quick-lead"
            data-site-event="estimator_direct_fallback_click"
            data-site-event-payload='{"source":"summary"}'
          >
            <MessageCircle size={16} />
            <span>{copy.directFallback}</span>
          </a>
          <div className="estimator-direct-links">
            <a href={data.contacts.telegramUrl} target="_blank" rel="noreferrer">
              <Send size={14} />
              <span>{data.contacts.telegram}</span>
            </a>
            <a href={data.contacts.whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={14} />
              <span>{data.contacts.whatsapp}</span>
            </a>
          </div>
        </div>

        <div className="estimator-request-preview">
          <p className="eyebrow-muted">
            {copy.requestFormat}
          </p>
          <p className="mt-3 whitespace-pre-line text-xs leading-6 text-[var(--text-muted)]">
            {`${copy.requestTitle}

${activePresetCase ? `${copy.summaryLabels.source}: ${activePresetCase.title}\n` : ""}${copy.summaryLabels.category}: ${activeType.label}
${copy.summaryLabels.complexity}: ${activeComplexity.label.toLowerCase()}
${copy.requestOptions}: ${selectedModuleDetails.length ? selectedModuleDetails.map((item) => item.label).join(", ") : copy.baseDevelopment}
${copy.requestEstimate}: ${estimate.budget}
${copy.timelineLabel} ${estimate.timeline}`}
          </p>
        </div>

        <a
          href="#cases"
          className="btn-link btn-link-secondary mt-5 w-full"
        >
          {copy.viewCases}
          <ArrowRight size={16} />
        </a>
      </aside>
    </div>
  );
}

function ConfigBlock({
  label,
  copy,
  title,
  description,
  fallbackHref,
  fallbackLabel,
  children,
}: {
  label: string;
  copy: ProjectEstimatorData["ui"]["estimator"];
  title: string;
  description: string;
  fallbackHref?: string;
  fallbackLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="estimator-step-block">
      <div className="estimator-step-block-head">
        <div>
          <p className="estimator-step-label">
            {copy.stepPrefix} {label}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          <p className="body-copy mt-2 max-w-3xl text-sm">
            {description}
          </p>
          {fallbackHref && fallbackLabel ? (
            <a
              href={fallbackHref}
              className="estimator-step-fallback"
              onClick={() =>
                trackSiteEvent("estimator_direct_fallback_click", {
                  source: "step",
                  step: label,
                  title,
                })
              }
            >
              <ArrowRight size={14} />
              {fallbackLabel}
            </a>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  icon,
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
        <span className="accent-signal">{icon}</span>
        {label}
        {required ? <span className="accent-warm">*</span> : null}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="field-control h-12 w-full px-4 text-sm"
      />
    </label>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--stroke-subtle)] pb-3 last:border-b-0 last:pb-0">
      <span className="shrink-0 text-sm text-[var(--text-muted)]">{label}</span>
      <span className="min-w-0 break-words text-right text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
