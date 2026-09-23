const DEFAULT_MAX_FILES = 3;
const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;

const corsHeaders = (origin) => ({
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": origin || "*",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const json = (body, status, origin) => new Response(JSON.stringify(body), {
  status,
  headers: {
    ...corsHeaders(origin),
    "Content-Type": "application/json; charset=utf-8",
  },
});

const textField = (formData, name) => String(formData.get(name) || "").trim();

const isFile = (value) => value && typeof value === "object" && typeof value.arrayBuffer === "function";

const getPhotos = (formData) => formData
  .getAll("photos")
  .filter((value) => isFile(value) && value.size > 0);

const validateLead = (lead, photos, maxFiles, maxFileSize) => {
  if (lead.name.length < 2 || lead.name.length > 100) return "Укажите имя или название компании.";
  if (!/^(?=.*\d)[+()\d\s-]{7,25}$/.test(lead.phone)) return "Некорректный телефон.";
  if (lead.message.length < 10 || lead.message.length > 2000) return "Некорректное описание задачи.";
  if (photos.length > maxFiles) return `Можно прикрепить не более ${maxFiles} фотографий.`;

  for (const photo of photos) {
    if (!photo.type.startsWith("image/")) return "Разрешены только изображения.";
    if (photo.size > maxFileSize) return "Размер каждой фотографии не должен превышать 10 МБ.";
  }

  return "";
};

const telegramUrl = (token, method) => `https://api.telegram.org/bot${encodeURIComponent(token)}/${method}`;

const callTelegram = async (token, method, body) => {
  const response = await fetch(telegramUrl(token, method), {
    method: "POST",
    body,
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.ok) {
    throw new Error(`Telegram ${method} failed`);
  }

  return result;
};

const resolveTelegramChatId = async (env) => {
  if (env.TELEGRAM_CHAT_ID) return env.TELEGRAM_CHAT_ID;

  const targetUsername = String(env.TELEGRAM_USERNAME || "")
    .replace(/^@/, "")
    .toLowerCase();
  if (!targetUsername) throw new Error("Telegram recipient is not configured");

  const response = await fetch(telegramUrl(env.TELEGRAM_BOT_TOKEN, "getUpdates"));
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) throw new Error("Telegram updates request failed");

  for (const update of [...result.result].reverse()) {
    const message = update.message || update.edited_message;
    const chat = message?.chat;
    const username = message?.from?.username || chat?.username || "";
    if (chat?.type === "private" && username.toLowerCase() === targetUsername) {
      return String(chat.id);
    }
  }

  throw new Error("Telegram chat was not discovered; recipient must send /start to the bot");
};

const sendTelegramLead = async (env, lead, photos) => {
  if (!env.TELEGRAM_BOT_TOKEN) throw new Error("Telegram bot token is not configured");
  const chatId = await resolveTelegramChatId(env);

  const message = [
    "Новая заявка LZR",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Задача: ${lead.message}`,
    `Фото: ${photos.length ? photos.length : "нет"}`,
  ].join("\n");

  const textBody = new URLSearchParams({
    chat_id: chatId,
    text: message,
  });
  await callTelegram(env.TELEGRAM_BOT_TOKEN, "sendMessage", textBody);

  if (!photos.length) return { attachmentsSent: true };

  try {
    if (photos.length === 1) {
      const body = new FormData();
      body.set("chat_id", chatId);
      body.append("document", photos[0], photos[0].name || "photo-1");
      await callTelegram(env.TELEGRAM_BOT_TOKEN, "sendDocument", body);
    } else {
      const body = new FormData();
      const media = photos.map((photo, index) => {
        const fieldName = `photo${index + 1}`;
        body.append(fieldName, photo, photo.name || `${fieldName}.jpg`);
        return { type: "document", media: `attach://${fieldName}` };
      });
      body.set("chat_id", chatId);
      body.set("media", JSON.stringify(media));
      await callTelegram(env.TELEGRAM_BOT_TOKEN, "sendMediaGroup", body);
    }
  } catch (error) {
    console.error("Telegram attachment delivery failed", error);
    return { attachmentsSent: false };
  }

  return { attachmentsSent: true };
};

const forwardToFormspree = async (env, formData, photos) => {
  if (!env.FORMSPREE_ENDPOINT) return false;

  const outgoing = new FormData();
  for (const [name, value] of formData.entries()) {
    if (name !== "photos" && typeof value === "string") outgoing.append(name, value);
  }
  for (const photo of photos) {
    outgoing.append("photos", photo, photo.name || "photo");
  }

  const response = await fetch(env.FORMSPREE_ENDPOINT, {
    method: "POST",
    body: outgoing,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error("Formspree forwarding failed");
  return true;
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";

    if (request.method === "OPTIONS") {
      if (allowedOrigin && origin && origin !== allowedOrigin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin || origin) });
    }

    if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405, origin);
    if (allowedOrigin && origin && origin !== allowedOrigin) return json({ ok: false, error: "Origin not allowed" }, 403, origin);

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return json({ ok: false, error: "Expected multipart form data" }, 400, origin);
    }

    if (textField(formData, "_gotcha")) return json({ ok: true }, 200, origin);

    const lead = {
      name: textField(formData, "name"),
      phone: textField(formData, "phone"),
      message: textField(formData, "message"),
    };
    const photos = getPhotos(formData);
    const maxFiles = Number(env.MAX_FILES || DEFAULT_MAX_FILES);
    const maxFileSize = Number(env.MAX_FILE_SIZE || DEFAULT_MAX_FILE_SIZE);
    const validationError = validateLead(lead, photos, maxFiles, maxFileSize);

    if (validationError) return json({ ok: false, error: validationError }, 422, origin);

    const [telegramResult, formspreeResult] = await Promise.allSettled([
      sendTelegramLead(env, lead, photos),
      forwardToFormspree(env, formData, photos),
    ]);

    if (telegramResult.status === "rejected") {
      console.error("Lead delivery to Telegram failed", telegramResult.reason);
      return json({ ok: false, error: "Не удалось принять заявку. Попробуйте еще раз." }, 502, origin);
    }

    if (formspreeResult.status === "rejected") {
      console.error("Lead email forwarding failed", formspreeResult.reason);
    }

    return json({
      ok: true,
      emailForwarded: formspreeResult.status === "fulfilled" && formspreeResult.value === true,
      attachmentsSent: telegramResult.value.attachmentsSent,
    }, 200, origin);
  },
};
