"use server";

import {
  clearAdminSessionCookie,
  isAdminAuthConfigured,
  setAdminSessionCookie,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  if (!isAdminAuthConfigured()) {
    redirect("/admin/login?error=config");
  }

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(username, password)) {
    redirect("/admin/login?error=credentials");
  }

  await setAdminSessionCookie(username.trim());
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
