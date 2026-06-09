export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startTelegramRetryScheduler } = await import("@/lib/telegram-retry");
    startTelegramRetryScheduler();
  }
}
