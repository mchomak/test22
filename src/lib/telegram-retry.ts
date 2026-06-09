import "server-only";

import { getUndeliveredLeads, updateLeadTelegramStatus } from "@/lib/database";
import { formatLeadMessage } from "@/lib/lead-message";
import { sendTelegramMessage } from "@/lib/telegram";

const RETRY_INTERVAL_MS = 5 * 60 * 1000;

export function startTelegramRetryScheduler() {
  setInterval(async () => {
    if (!process.env.TELEGRAM_BOT_TOKEN?.trim() || !process.env.TELEGRAM_CHAT_ID?.trim()) {
      return;
    }

    let leads;
    try {
      leads = await getUndeliveredLeads();
    } catch (err) {
      console.error("[telegram-retry:fetch]", err);
      return;
    }

    for (const lead of leads) {
      try {
        const message = formatLeadMessage(lead);
        const result = await sendTelegramMessage(message);

        if (!result.skipped) {
          const error = result.ok ? "" : result.error;
          await updateLeadTelegramStatus(lead.id, result.delivered, error).catch((err) =>
            console.error("[telegram-retry:db-status]", lead.id, err),
          );
        }
      } catch (err) {
        console.error("[telegram-retry:lead]", lead.id, err);
        await updateLeadTelegramStatus(
          lead.id,
          false,
          err instanceof Error ? err.message : String(err),
        ).catch((dbErr) => console.error("[telegram-retry:db-status]", lead.id, dbErr));
      }
    }
  }, RETRY_INTERVAL_MS);
}
