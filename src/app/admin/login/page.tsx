import { getAdminSession, isAdminAuthConfigured } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { loginAdmin } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const isConfigured = isAdminAuthConfigured();

  return (
    <main className="grid min-h-screen place-items-center bg-[#050607] px-4 py-12 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0d0c]/90 p-6 shadow-2xl shadow-black/50">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-300/80">
          Portfolio admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Вход в админку
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Заявки и аналитика доступны только после авторизации.
        </p>

        {!isConfigured ? (
          <div className="mt-5 rounded-2xl border border-amber-200/25 bg-amber-200/10 p-4 text-sm leading-6 text-amber-50">
            Задайте `ADMIN_USERNAME`, `ADMIN_PASSWORD` и
            `ADMIN_SESSION_SECRET` в окружении сервера.
          </div>
        ) : null}

        {error === "credentials" ? (
          <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm leading-6 text-red-50">
            Неверный логин или пароль.
          </div>
        ) : null}

        {error === "config" ? (
          <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm leading-6 text-red-50">
            Авторизация не настроена на сервере.
          </div>
        ) : null}

        <form action={loginAdmin} className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Логин</span>
            <input
              name="username"
              autoComplete="username"
              required
              className="h-12 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
              placeholder="admin"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-300">Пароль</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/55"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            disabled={!isConfigured}
            className="mt-2 inline-flex h-12 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
