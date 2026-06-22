import "server-only";

import { request, type RequestOptions } from "node:https";
import { ProxyAgent } from "proxy-agent";

type TelegramResult =
  | {
      ok: true;
      delivered: true;
      skipped: false;
      proxyUsed: boolean;
    }
  | {
      ok: true;
      delivered: false;
      skipped: true;
      proxyUsed: boolean;
    }
  | {
      ok: false;
      delivered: false;
      skipped: false;
      proxyUsed: boolean;
      error: string;
    };

type HttpJsonResponse = {
  statusCode: number;
  body: string;
};

export async function sendTelegramMessage(text: string): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const proxyUrl = process.env.TELEGRAM_PROXY_URL?.trim();
  const proxyUsed = Boolean(proxyUrl);

  if (!token || !chatId) {
    console.info("[project-lead:telegram-stub]\n%s", text);
    return {
      ok: true,
      delivered: false,
      skipped: true,
      proxyUsed,
    };
  }

  const response = await postJson(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    },
    proxyUrl,
  );

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return {
      ok: true,
      delivered: true,
      skipped: false,
      proxyUsed,
    };
  }

  return {
    ok: false,
    delivered: false,
    skipped: false,
    proxyUsed,
    error: getTelegramError(response),
  };
}

function postJson(
  url: string,
  payload: Record<string, unknown>,
  proxyUrl: string | undefined,
) {
  const body = JSON.stringify(payload);
  const agent = proxyUrl
    ? new ProxyAgent({ getProxyForUrl: () => proxyUrl })
    : undefined;
  const timeout = Number(process.env.TELEGRAM_REQUEST_TIMEOUT_MS ?? 15000);

  return new Promise<HttpJsonResponse>((resolve, reject) => {
    const options: RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
      timeout,
    };

    if (agent) {
      options.agent = agent;
    }

    const req = request(url, options, (res) => {
      const chunks: Buffer[] = [];

      res.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode ?? 0,
          body: Buffer.concat(chunks).toString("utf8"),
        });
      });
    });

    req.on("timeout", () => {
      req.destroy(new Error("Telegram request timeout."));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function getTelegramError(response: HttpJsonResponse) {
  try {
    const data = JSON.parse(response.body) as {
      description?: unknown;
      error_code?: unknown;
    };
    const description =
      typeof data.description === "string" ? data.description : response.body;

    return `Telegram Bot API ${response.statusCode}: ${description}`;
  } catch {
    return `Telegram Bot API ${response.statusCode}: ${response.body}`;
  }
}
