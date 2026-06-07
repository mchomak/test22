import "server-only";

import { createHash } from "node:crypto";

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip")?.trim();
  const cloudflareIp = headers.get("cf-connecting-ip")?.trim();

  return forwarded || realIp || cloudflareIp || "";
}

export function getCountry(headers: Headers) {
  return (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("cloudfront-viewer-country") ||
    headers.get("x-country-code") ||
    ""
  ).trim();
}

export function hashIp(ip: string) {
  const salt =
    process.env.ANALYTICS_SALT?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    "";

  if (!ip || !salt) {
    return "";
  }

  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function trimTo(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
