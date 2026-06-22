import {
  getDashboardData,
  isDatabaseConfigured,
  type DashboardData,
  type DashboardLead,
} from "@/lib/database";
import { requireAdminSession } from "@/lib/admin-auth";
import { logoutAdmin } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdminSession();
  const data = await loadDashboardData();

  return (
    <main className="min-h-screen bg-[#050607] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-300/80">
              Portfolio admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Заявки и аналитика
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Аккаунт: {session.username}
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              Выйти
            </button>
          </form>
        </header>

        {!isDatabaseConfigured() ? (
          <Notice
            tone="warn"
            title="PostgreSQL не подключен"
            text="Задайте DATABASE_URL и перезапустите приложение. До этого заявки продолжат уходить в Telegram, но админка не сможет показать историю."
          />
        ) : null}

        {data ? (
          <Dashboard data={data} />
        ) : (
          <Notice
            tone="error"
            title="Данные временно недоступны"
            text="Проверьте доступность PostgreSQL, DATABASE_URL и логи контейнера portfolio."
          />
        )}
      </div>
    </main>
  );
}

async function loadDashboardData() {
  try {
    return await getDashboardData();
  } catch (error) {
    console.error("[admin:dashboard]", error);
    return null;
  }
}

function Dashboard({ data }: { data: DashboardData }) {
  const maxDailyViews = Math.max(
    1,
    ...data.dailyViews.map((item) => item.views),
  );

  return (
    <div className="grid gap-6 py-8">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <Metric label="Заявки" value={data.totalLeads} />
        <Metric label="Сегодня" value={data.leadsToday} />
        <Metric label="Доставлено" value={data.deliveredLeads} />
        <Metric label="Просмотры" value={data.totalViews} />
        <Metric label="Сегодня" value={data.viewsToday} />
        <Metric label="Посетители" value={data.uniqueVisitors} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-white/10 bg-[#0b0d0c]/82 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                Traffic
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Просмотры за 14 дней
              </h2>
            </div>
          </div>
          <div className="mt-6 flex h-56 items-end gap-2">
            {data.dailyViews.map((item) => (
              <div
                key={item.day}
                className="grid h-full flex-1 content-end gap-2"
                title={`${item.day}: ${item.views}`}
              >
                <span
                  className="block min-h-1 rounded-t-lg bg-emerald-300/75"
                  style={{
                    height: `${Math.max(4, (item.views / maxDailyViews) * 100)}%`,
                  }}
                />
                <span className="truncate text-center font-mono text-[10px] text-zinc-500">
                  {item.day.slice(5)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b0d0c]/82 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            Top pages
          </p>
          <h2 className="mt-2 text-xl font-semibold">Страницы за 30 дней</h2>
          <div className="mt-5 grid gap-3">
            {data.topPages.length ? (
              data.topPages.map((page) => (
                <div
                  key={page.path}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"
                >
                  <p className="truncate text-sm font-medium text-zinc-100">
                    {page.path}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-zinc-500">
                    {page.views} views / {page.uniqueVisitors} visitors
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-zinc-500">
                Пока нет данных по посещениям.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#0b0d0c]/82 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              Leads
            </p>
            <h2 className="mt-2 text-xl font-semibold">Последние заявки</h2>
          </div>
          <p className="text-sm text-zinc-500">Последние 30 записей</p>
        </div>

        <div className="mt-5 grid gap-3">
          {data.recentLeads.length ? (
            data.recentLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
          ) : (
            <p className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-zinc-500">
              Заявок пока нет.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function LeadCard({ lead }: { lead: DashboardLead }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 font-mono text-[11px] text-emerald-100">
              #{lead.id}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${
                lead.telegramDelivered
                  ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                  : "border-amber-200/20 bg-amber-200/10 text-amber-100"
              }`}
            >
              {lead.telegramDelivered ? "Telegram delivered" : "Telegram pending"}
            </span>
            <span className="font-mono text-[11px] text-zinc-500">
              {formatDate(lead.createdAt)}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">
            {lead.category} / {lead.complexity}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{lead.comment}</p>
        </div>
        <div className="grid shrink-0 gap-1 text-sm text-zinc-400 lg:min-w-72">
          <span>Контакт: {lead.contactValue}</span>
          {lead.contactChannel ? <span>Канал: {lead.contactChannel}</span> : null}
          {lead.contactName ? <span>Имя: {lead.contactName}</span> : null}
          {lead.contactTelegram && lead.contactTelegram !== lead.contactValue ? (
            <span>Telegram: {lead.contactTelegram}</span>
          ) : null}
          {lead.contactEmail && lead.contactEmail !== lead.contactValue ? (
            <span>Email: {lead.contactEmail}</span>
          ) : null}
          {lead.fileUrl ? <span className="truncate">Файл: {lead.fileUrl}</span> : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-3 py-1.5 font-mono text-[11px] text-cyan-50/80">
          {lead.budget}
        </span>
        <span className="rounded-full border border-amber-200/20 bg-amber-200/[0.07] px-3 py-1.5 font-mono text-[11px] text-amber-50/80">
          {lead.timeline}
        </span>
        {lead.options.map((option) => (
          <span
            key={option}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-400"
          >
            {option}
          </span>
        ))}
      </div>

      {lead.telegramError ? (
        <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-300/10 p-3 text-xs leading-5 text-red-50">
          {lead.telegramError}
        </p>
      ) : null}
    </article>
  );
}

function Notice({
  text,
  title,
  tone,
}: {
  text: string;
  title: string;
  tone: "warn" | "error";
}) {
  const className =
    tone === "warn"
      ? "border-amber-200/25 bg-amber-200/10 text-amber-50"
      : "border-red-300/25 bg-red-300/10 text-red-50";

  return (
    <section className={`mt-6 rounded-3xl border p-5 ${className}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{text}</p>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}
