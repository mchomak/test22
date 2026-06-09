"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Check,
  Clock3,
  FileText,
  Gauge,
  Link as LinkIcon,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  type ProjectComplexityId,
  type ProjectTypeId,
  type SiteData,
} from "@/data/site";

type SubmitState = "idle" | "sending" | "success" | "error";

type ProjectEstimatorData = Pick<
  SiteData,
  "projectTypes" | "complexityLevels" | "urgencyOptions" | "projectModules" | "ui"
>;

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
};

const getEstimatorInitialState = (
  query: string,
  data: ProjectEstimatorData,
): EstimatorInitialState => {
  const params = new URLSearchParams(query);
  const typeParam = params.get("estimateType");
  const { complexityLevels, projectTypes, urgencyOptions } = data;

  if (!isProjectTypeId(typeParam, projectTypes)) {
    return {
      key: "default",
      selectedTypeId: projectTypes[0].id,
      selectedModules: projectTypes[0].defaultModules,
      complexityId: "business",
      urgencyId: urgencyOptions[1].id,
    };
  }

  const complexityParam = params.get("estimateComplexity");
  const selectedModules = getEstimatorPresetModules(
    typeParam,
    params.get("estimateModules"),
    data,
  );
  const complexityId = isProjectComplexityId(complexityParam, complexityLevels)
    ? complexityParam
    : "business";

  return {
    key: `preset:${typeParam}:${complexityId}:${selectedModules.join(",")}`,
    selectedTypeId: typeParam,
    selectedModules,
    complexityId,
    urgencyId: "standard",
  };
};

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

  const chooseType = (typeId: ProjectTypeId) => {
    const nextType = projectTypes.find((item) => item.id === typeId);
    if (!nextType) return;

    setSelectedTypeId(typeId);
    setSelectedModules(nextType.defaultModules);
    setSubmitState("idle");
    setSubmitMessage("");
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules((current) =>
      current.includes(moduleId)
        ? current.filter((item) => item !== moduleId)
        : [...current, moduleId],
    );
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
      contact: {
        name: contact.name.trim(),
        telegram: contact.telegram.trim(),
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
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : copy.unknownSubmitError,
      );
    }
  };

  return (
    <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-[#101311]/68 p-4 backdrop-blur-md sm:p-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="rounded-3xl border border-white/10 bg-black/18 p-4 sm:p-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
              <SlidersHorizontal size={20} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                {copy.kicker}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {copy.title}
              </h3>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
            {copy.steps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-xs font-medium text-zinc-300">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ConfigBlock
          label="01"
          copy={copy}
          title={copy.typeTitle}
          description={copy.typeDescription}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {projectTypes.map((type) => {
              const isActive = type.id === selectedTypeId;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => chooseType(type.id)}
                  aria-pressed={isActive}
                  className={`min-h-32 rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                    isActive
                      ? "border-emerald-300/50 bg-emerald-300/10"
                      : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block text-base font-semibold text-white">
                        {type.label}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-zinc-400">
                        {type.description}
                      </span>
                    </span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                        isActive
                          ? "border-emerald-300 bg-emerald-300 text-zinc-950"
                          : "border-white/15 text-transparent"
                      }`}
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
          title={copy.complexityTitle}
          description={copy.complexityDescription}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {complexityLevels.map((level) => {
              const isActive = level.id === complexityId;

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setComplexityId(level.id)}
                  aria-pressed={isActive}
                  className={`rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                    isActive
                      ? "border-cyan-200/45 bg-cyan-200/10"
                      : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="font-semibold text-white">{level.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-400">
                    {level.description}
                  </span>
                </button>
              );
            })}
          </div>
        </ConfigBlock>

        <ConfigBlock
          label="03"
          copy={copy}
          title={copy.modulesTitle}
          description={copy.modulesDescription.replace("{category}", activeType.label)}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {modules.map((module) => {
              const isActive = selectedModules.includes(module.id);

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  aria-pressed={isActive}
                  className={`min-h-28 rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                    isActive
                      ? "border-emerald-300/45 bg-emerald-300/10"
                      : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                        isActive
                          ? "border-emerald-300 bg-emerald-300 text-zinc-950"
                          : "border-white/15 text-transparent"
                      }`}
                    >
                      <Check size={14} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">
                        {module.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-zinc-400">
                        {module.description}
                      </span>
                      <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                        + {formatMoney(module.price)} / +{module.days} {copy.dayShort}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </ConfigBlock>

        <ConfigBlock
          label="04"
          copy={copy}
          title={copy.urgencyTitle}
          description={copy.urgencyDescription}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {urgencyOptions.map((option) => {
              const isActive = option.id === urgencyId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setUrgencyId(option.id)}
                  aria-pressed={isActive}
                  className={`rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                    isActive
                      ? "border-amber-200/45 bg-amber-200/10"
                      : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="font-semibold text-white">{option.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-400">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </ConfigBlock>

        <ConfigBlock
          label="05"
          copy={copy}
          title={copy.contactsTitle}
          description={copy.contactsDescription}
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
              label={copy.fields.telegram}
              value={contact.telegram}
              placeholder="@username"
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
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
              <FileText size={16} className="text-emerald-300" />
              {copy.fields.comment}
            </span>
            <textarea
              required
              rows={5}
              value={contact.comment}
              onChange={(event) => updateContact("comment", event.target.value)}
              placeholder={copy.fields.commentPlaceholder}
              className="min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
            />
          </label>
        </ConfigBlock>

        <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-4 sm:p-5">
          {submitState === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-300 text-zinc-950">
                  <Check size={22} />
                </span>
                <p className="text-sm font-semibold leading-6 text-emerald-100">
                  {submitMessage}
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1.5 text-sm text-emerald-300/70 transition hover:text-emerald-300"
              >
                <Send size={13} />
                {copy.sendAnother}
              </button>
            </motion.div>
          ) : (
            <>
              <p className="text-sm leading-6 text-emerald-50/90">
                {copy.note}
              </p>
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-300 px-5 text-sm font-semibold text-zinc-950 transition duration-300 hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {submitState === "sending" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {copy.submit}
              </button>
              {submitMessage ? (
                <p
                  className="mt-3 text-sm leading-6 text-red-200"
                  aria-live="polite"
                >
                  {submitMessage}
                </p>
              ) : null}
            </>
          )}
        </div>
      </form>

      <aside className="relative overflow-hidden rounded-3xl border border-emerald-300/25 bg-[#0b1712]/72 p-5 backdrop-blur-md lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />

        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
          <Calculator size={16} />
          live estimate
        </div>

        <motion.div
          key={`${estimate.low}-${estimate.high}-${estimate.daysLow}-${estimate.daysHigh}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
        >
          <p className="text-sm text-zinc-500">{copy.estimateLabel}</p>
          <p className="mt-2 text-3xl font-semibold leading-tight text-white">
            {estimate.budget}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-zinc-400">
            <Clock3 size={16} className="text-amber-200" />
            {copy.timelineLabel}{" "}
            <span className="font-mono text-white">{estimate.timeline}</span>
          </p>
        </motion.div>

        <div className="mt-6 grid gap-3 border-t border-white/10 pt-5">
          <SummaryLine label={copy.summaryLabels.category} value={activeType.label} />
          <SummaryLine label={copy.summaryLabels.complexity} value={activeComplexity.label} />
          <SummaryLine label={copy.summaryLabels.urgency} value={activeUrgency.label} />
        </div>

        <div className="mt-6">
          <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            <Gauge size={15} className="text-cyan-200" />
            {copy.selectedModules}
          </p>
          {selectedModuleDetails.length ? (
            <div className="flex flex-wrap gap-2">
              {selectedModuleDetails.map((module) => (
                <span
                  key={module.id}
                  className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-100"
                >
                  {module.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-zinc-500">
              {copy.noModules}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/24 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            {copy.requestFormat}
          </p>
          <p className="mt-3 whitespace-pre-line text-xs leading-6 text-zinc-400">
            {`${copy.requestTitle}

${copy.summaryLabels.category}: ${activeType.label}
${copy.summaryLabels.complexity}: ${activeComplexity.label.toLowerCase()}
${copy.requestOptions}: ${selectedModuleDetails.length ? selectedModuleDetails.map((item) => item.label).join(", ") : copy.baseDevelopment}
${copy.requestEstimate}: ${estimate.budget}
${copy.timelineLabel} ${estimate.timeline}`}
          </p>
        </div>

        <a
          href="#cases"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
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
  children,
}: {
  label: string;
  copy: ProjectEstimatorData["ui"]["estimator"];
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/18 p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/75">
            {copy.stepPrefix} {label}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            {description}
          </p>
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
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
        <span className="text-emerald-300">{icon}</span>
        {label}
        {required ? <span className="text-emerald-300">*</span> : null}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
      />
    </label>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="text-right text-sm font-medium text-white">{value}</span>
    </div>
  );
}
