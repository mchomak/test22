import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const sessionCookieName = "portfolio_admin_session";
const sessionMaxAge = 60 * 60 * 12;

type AdminSession = {
  username: string;
  expiresAt: number;
};

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME?.trim() &&
      process.env.ADMIN_PASSWORD?.trim() &&
      process.env.ADMIN_SESSION_SECRET?.trim(),
  );
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME?.trim() ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim() ?? "";

  if (!isAdminAuthConfigured()) {
    return false;
  }

  return (
    secureCompare(username.trim(), expectedUsername) &&
    secureCompare(password, expectedPassword)
  );
}

export async function setAdminSessionCookie(username: string) {
  const cookieStore = await cookies();
  const token = signSession({
    username,
    expiresAt: Date.now() + sessionMaxAge * 1000,
  });

  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getAdminSession() {
  const token = (await cookies()).get(sessionCookieName)?.value;
  return verifySessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

function signSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

function verifySessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !secureCompare(sign(payload), signature)) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<AdminSession>;

    if (
      typeof session.username !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }

    return {
      username: session.username,
      expiresAt: session.expiresAt,
    };
  } catch {
    return null;
  }
}

function sign(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";

  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function secureCompare(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}
