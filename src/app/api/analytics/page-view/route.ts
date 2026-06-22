import { insertSiteVisit } from "@/lib/database";
import { getClientIp, getCountry, hashIp, trimTo } from "@/lib/request";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const visitorCookieName = "portfolio_visitor_id";
const visitorMaxAge = 60 * 60 * 24 * 365;
const locales = new Set(["ru", "en"]);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  let visitorId = cookieStore.get(visitorCookieName)?.value ?? "";

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    cookieStore.set(visitorCookieName, visitorId, {
      httpOnly: true,
      maxAge: visitorMaxAge,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  let payload: Record<string, unknown> = {};

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid analytics payload." }, { status: 400 });
  }

  const path = normalizePath(trimTo(payload.path, 1200));

  if (!path || path.startsWith("/admin")) {
    return Response.json({ ok: true, recorded: false });
  }

  const locale = normalizeLocale(trimTo(payload.locale, 16), path);

  try {
    const recorded = await insertSiteVisit({
      visitorId,
      path,
      locale,
      referrer: trimTo(payload.referrer, 1200),
      userAgent: trimTo(request.headers.get("user-agent"), 600),
      language: trimTo(payload.language, 80),
      timezone: trimTo(payload.timezone, 80),
      viewport: trimTo(payload.viewport, 40),
      country: getCountry(request.headers).slice(0, 12),
      ipHash: hashIp(getClientIp(request.headers)),
    });

    return Response.json({ ok: true, recorded });
  } catch (error) {
    console.error("[analytics:page-view]", error);
    return Response.json({ ok: true, recorded: false });
  }
}

function normalizePath(path: string) {
  if (!path.startsWith("/")) {
    return "";
  }

  return path.replace(/[\u0000-\u001f\u007f]/g, "");
}

function normalizeLocale(locale: string, path: string) {
  if (locales.has(locale)) {
    return locale;
  }

  const pathLocale = path.split("/")[1];
  return locales.has(pathLocale) ? pathLocale : "";
}
