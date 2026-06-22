import "server-only";

import { Pool, type QueryResult } from "pg";

export type ProjectLeadRecord = {
  category: string;
  complexity: string;
  urgency: string;
  options: string[];
  budget: string;
  timeline: string;
  source?: string;
  sourceCase?: string;
  contactName: string;
  contactChannel: string;
  contactValue: string;
  contactTelegram?: string;
  contactEmail?: string;
  comment: string;
  fileUrl: string;
  payload: Record<string, unknown>;
};

export type SiteVisitRecord = {
  visitorId: string;
  path: string;
  locale: string;
  referrer: string;
  userAgent: string;
  language: string;
  timezone: string;
  viewport: string;
  country: string;
  ipHash: string;
};

export type DashboardLead = {
  id: number;
  createdAt: string;
  category: string;
  complexity: string;
  urgency: string;
  options: string[];
  budget: string;
  timeline: string;
  contactName: string;
  contactChannel: string;
  contactValue: string;
  contactTelegram: string;
  contactEmail: string;
  comment: string;
  fileUrl: string;
  source: string;
  telegramDelivered: boolean;
  telegramError: string;
};

export type DashboardDay = {
  day: string;
  views: number;
};

export type DashboardPage = {
  path: string;
  views: number;
  uniqueVisitors: number;
};

export type DashboardData = {
  totalLeads: number;
  deliveredLeads: number;
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  leadsToday: number;
  recentLeads: DashboardLead[];
  dailyViews: DashboardDay[];
  topPages: DashboardPage[];
};

type GlobalWithPg = typeof globalThis & {
  portfolioPgPool?: Pool;
  portfolioPgInit?: Promise<void>;
};

const globalForPg = globalThis as GlobalWithPg;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    return null;
  }

  if (!globalForPg.portfolioPgPool) {
    globalForPg.portfolioPgPool = new Pool({
      connectionString,
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
      ssl:
        process.env.DATABASE_SSL === "true"
          ? {
              rejectUnauthorized:
                process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
            }
          : undefined,
    });
  }

  return globalForPg.portfolioPgPool;
}

async function ensureSchema(pool: Pool) {
  if (!globalForPg.portfolioPgInit) {
    globalForPg.portfolioPgInit = pool.query(`
      CREATE TABLE IF NOT EXISTS project_leads (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        category TEXT NOT NULL,
        complexity TEXT NOT NULL,
        urgency TEXT,
        options JSONB NOT NULL DEFAULT '[]'::jsonb,
        budget TEXT NOT NULL,
        timeline TEXT NOT NULL,
        contact_name TEXT,
        contact_channel TEXT,
        contact_value TEXT,
        contact_telegram TEXT NOT NULL,
        contact_email TEXT,
        comment TEXT NOT NULL,
        file_url TEXT,
        payload JSONB NOT NULL,
        telegram_delivered BOOLEAN NOT NULL DEFAULT false,
        telegram_error TEXT
      );

      CREATE INDEX IF NOT EXISTS project_leads_created_at_idx
        ON project_leads (created_at DESC);

      CREATE TABLE IF NOT EXISTS site_visits (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        visitor_id TEXT,
        path TEXT NOT NULL,
        locale TEXT,
        referrer TEXT,
        user_agent TEXT,
        language TEXT,
        timezone TEXT,
        viewport TEXT,
        country TEXT,
        ip_hash TEXT
      );

      CREATE INDEX IF NOT EXISTS site_visits_created_at_idx
        ON site_visits (created_at DESC);
      CREATE INDEX IF NOT EXISTS site_visits_path_idx
        ON site_visits (path);
      CREATE INDEX IF NOT EXISTS site_visits_visitor_id_idx
        ON site_visits (visitor_id);

      ALTER TABLE project_leads ADD COLUMN IF NOT EXISTS telegram_retry_count INT NOT NULL DEFAULT 0;
      ALTER TABLE project_leads ADD COLUMN IF NOT EXISTS contact_channel TEXT;
      ALTER TABLE project_leads ADD COLUMN IF NOT EXISTS contact_value TEXT;
    `).then(() => undefined);
  }

  await globalForPg.portfolioPgInit;
}

async function withDatabase<T>(query: (pool: Pool) => Promise<T>) {
  const pool = getPool();

  if (!pool) {
    return null;
  }

  await ensureSchema(pool);
  return query(pool);
}

export async function insertProjectLead(lead: ProjectLeadRecord) {
  const result = await withDatabase((pool) =>
    pool.query<{ id: string }>(
      `
        INSERT INTO project_leads (
          category,
          complexity,
          urgency,
          options,
          budget,
          timeline,
          contact_name,
          contact_channel,
          contact_value,
          contact_telegram,
          contact_email,
          comment,
          file_url,
          payload
        )
        VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb)
        RETURNING id
      `,
      [
        lead.category,
        lead.complexity,
        lead.urgency || null,
        JSON.stringify(lead.options),
        lead.budget,
        lead.timeline,
        lead.contactName || null,
        lead.contactChannel || null,
        lead.contactValue,
        lead.contactTelegram || lead.contactValue,
        lead.contactEmail || null,
        lead.comment,
        lead.fileUrl || null,
        JSON.stringify(lead.payload),
      ],
    ),
  );

  return result ? Number(result.rows[0]?.id) : null;
}

export async function updateLeadTelegramStatus(
  id: number | null,
  delivered: boolean,
  error: string,
) {
  if (!id) {
    return;
  }

  await withDatabase((pool) =>
    pool.query(
      `
        UPDATE project_leads
        SET telegram_delivered = $2,
            telegram_error = $3,
            telegram_retry_count = telegram_retry_count + 1
        WHERE id = $1
      `,
      [id, delivered, error || null],
    ),
  );
}

export type UndeliveredLead = {
  id: number;
  category: string;
  complexity: string;
  urgency: string;
  options: string[];
  budget: string;
  timeline: string;
  source: string;
  contactName: string;
  contactChannel: string;
  contactValue: string;
  contactTelegram: string;
  contactEmail: string;
  comment: string;
  fileUrl: string;
};

export async function getUndeliveredLeads(): Promise<UndeliveredLead[]> {
  const result = await withDatabase((pool) =>
    pool.query<{
      id: string;
      category: string;
      complexity: string;
      urgency: string | null;
      options: unknown;
      budget: string;
      timeline: string;
      contact_name: string | null;
      contact_channel: string | null;
      contact_value: string | null;
      contact_telegram: string;
      contact_email: string | null;
      comment: string;
      file_url: string | null;
      payload: unknown;
    }>(
      `
        SELECT id, category, complexity, urgency, options, budget, timeline,
               contact_name, contact_channel, contact_value, contact_telegram,
               contact_email, comment, file_url, payload
        FROM project_leads
        WHERE telegram_delivered = false
          AND telegram_retry_count < 10
          AND created_at < NOW() - INTERVAL '2 minutes'
          AND created_at > NOW() - INTERVAL '24 hours'
        ORDER BY created_at ASC
        LIMIT 5
      `,
    ),
  );

  if (!result) return [];

  return result.rows.map((row) => ({
    id: Number(row.id),
    category: row.category,
    complexity: row.complexity,
    urgency: row.urgency ?? "",
    options: Array.isArray(row.options)
      ? (row.options as unknown[]).filter((item): item is string => typeof item === "string")
      : [],
    budget: row.budget,
    timeline: row.timeline,
    source: textFromLeadPayload(row.payload, "source"),
    contactName: row.contact_name ?? "",
    contactChannel: row.contact_channel ?? (row.contact_value ? "" : "Telegram"),
    contactValue: row.contact_value ?? row.contact_telegram,
    contactTelegram:
      textFromLeadPayload(row.payload, "contact.telegram") ||
      (row.contact_value ? "" : row.contact_telegram),
    contactEmail: row.contact_email ?? textFromLeadPayload(row.payload, "contact.email"),
    comment: row.comment,
    fileUrl: row.file_url ?? "",
  }));
}

export async function insertSiteVisit(visit: SiteVisitRecord) {
  const result = await withDatabase((pool) =>
    pool.query(
      `
        INSERT INTO site_visits (
          visitor_id,
          path,
          locale,
          referrer,
          user_agent,
          language,
          timezone,
          viewport,
          country,
          ip_hash
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
        visit.visitorId || null,
        visit.path,
        visit.locale || null,
        visit.referrer || null,
        visit.userAgent || null,
        visit.language || null,
        visit.timezone || null,
        visit.viewport || null,
        visit.country || null,
        visit.ipHash || null,
      ],
    ),
  );

  return Boolean(result);
}

export async function getDashboardData(): Promise<DashboardData | null> {
  return withDatabase(async (pool) => {
    const [
      totals,
      views,
      recentLeads,
      dailyViews,
      topPages,
    ] = await Promise.all([
      pool.query<{
        total_leads: string;
        delivered_leads: string;
        leads_today: string;
      }>(`
        SELECT
          count(*)::text AS total_leads,
          count(*) FILTER (WHERE telegram_delivered)::text AS delivered_leads,
          count(*) FILTER (WHERE created_at >= current_date)::text AS leads_today
        FROM project_leads
      `),
      pool.query<{
        total_views: string;
        unique_visitors: string;
        views_today: string;
      }>(`
        SELECT
          count(*)::text AS total_views,
          count(DISTINCT visitor_id)::text AS unique_visitors,
          count(*) FILTER (WHERE created_at >= current_date)::text AS views_today
        FROM site_visits
      `),
      pool.query<LeadRow>(`
        SELECT
          id::text,
          created_at,
          category,
          complexity,
          COALESCE(urgency, '') AS urgency,
          options,
          budget,
          timeline,
          COALESCE(contact_name, '') AS contact_name,
          COALESCE(contact_channel, '') AS contact_channel,
          COALESCE(contact_value, contact_telegram, '') AS contact_value,
          contact_telegram,
          COALESCE(contact_email, '') AS contact_email,
          comment,
          COALESCE(file_url, '') AS file_url,
          payload,
          telegram_delivered,
          COALESCE(telegram_error, '') AS telegram_error
        FROM project_leads
        ORDER BY created_at DESC
        LIMIT 30
      `),
      pool.query<{ day: string; views: string }>(`
        SELECT
          to_char(days.day, 'YYYY-MM-DD') AS day,
          count(site_visits.id)::text AS views
        FROM generate_series(
          current_date - interval '13 days',
          current_date,
          interval '1 day'
        ) AS days(day)
        LEFT JOIN site_visits
          ON site_visits.created_at >= days.day
         AND site_visits.created_at < days.day + interval '1 day'
        GROUP BY days.day
        ORDER BY days.day
      `),
      pool.query<{ path: string; views: string; unique_visitors: string }>(`
        SELECT
          path,
          count(*)::text AS views,
          count(DISTINCT visitor_id)::text AS unique_visitors
        FROM site_visits
        WHERE created_at >= now() - interval '30 days'
        GROUP BY path
        ORDER BY count(*) DESC
        LIMIT 10
      `),
    ]);

    return {
      totalLeads: numberFrom(totals, "total_leads"),
      deliveredLeads: numberFrom(totals, "delivered_leads"),
      leadsToday: numberFrom(totals, "leads_today"),
      totalViews: numberFrom(views, "total_views"),
      uniqueVisitors: numberFrom(views, "unique_visitors"),
      viewsToday: numberFrom(views, "views_today"),
      recentLeads: recentLeads.rows.map(mapLeadRow),
      dailyViews: dailyViews.rows.map((row) => ({
        day: row.day,
        views: Number(row.views),
      })),
      topPages: topPages.rows.map((row) => ({
        path: row.path,
        views: Number(row.views),
        uniqueVisitors: Number(row.unique_visitors),
      })),
    };
  });
}

type LeadRow = {
  id: string;
  created_at: Date | string;
  category: string;
  complexity: string;
  urgency: string;
  options: unknown;
  budget: string;
  timeline: string;
  contact_name: string;
  contact_channel: string;
  contact_value: string;
  contact_telegram: string;
  contact_email: string;
  comment: string;
  file_url: string;
  payload: unknown;
  telegram_delivered: boolean;
  telegram_error: string;
};

function mapLeadRow(row: LeadRow): DashboardLead {
  const payloadTelegram = textFromLeadPayload(row.payload, "contact.telegram");
  const payloadEmail = textFromLeadPayload(row.payload, "contact.email");
  const isOldTelegramOnlyRow = !row.contact_channel && row.contact_value === row.contact_telegram;

  return {
    id: Number(row.id),
    createdAt: new Date(row.created_at).toISOString(),
    category: row.category,
    complexity: row.complexity,
    urgency: row.urgency,
    options: Array.isArray(row.options)
      ? row.options.filter((item): item is string => typeof item === "string")
      : [],
    budget: row.budget,
    timeline: row.timeline,
    contactName: row.contact_name,
    contactChannel: row.contact_channel || (isOldTelegramOnlyRow ? "Telegram" : ""),
    contactValue: row.contact_value,
    contactTelegram: payloadTelegram || (isOldTelegramOnlyRow ? row.contact_telegram : ""),
    contactEmail: row.contact_email || payloadEmail,
    comment: row.comment,
    fileUrl: row.file_url,
    source: textFromLeadPayload(row.payload, "source"),
    telegramDelivered: row.telegram_delivered,
    telegramError: row.telegram_error,
  };
}

function numberFrom<T extends Record<string, string>>(
  result: QueryResult<T>,
  key: keyof T,
) {
  return Number(result.rows[0]?.[key] ?? 0);
}

function textFromLeadPayload(payload: unknown, path: "source" | "contact.telegram" | "contact.email") {
  const root = payload && typeof payload === "object" && !Array.isArray(payload)
    ? (payload as Record<string, unknown>)
    : null;

  if (!root) {
    return "";
  }

  if (path === "source") {
    return typeof root.source === "string" ? root.source.trim() : "";
  }

  const contact =
    root.contact && typeof root.contact === "object" && !Array.isArray(root.contact)
      ? (root.contact as Record<string, unknown>)
      : null;
  const key = path === "contact.telegram" ? "telegram" : "email";
  const value = contact?.[key];

  return typeof value === "string" ? value.trim() : "";
}
