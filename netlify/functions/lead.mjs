// Escape user-supplied text for HTML contexts (email body, Telegram HTML parse mode).
// Telegram rejects the whole message with a 400 ("can't parse entities") if a raw
// "<" from a user (e.g. "budget <10k") reaches parse_mode: "HTML", which silently
// kills the notification. Every interpolated field must go through this.
const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Basic abuse guard: cap field lengths so a bot can't ship megabytes into
// the email/Telegram pipeline.
const clip = (value, max) => String(value ?? "").trim().slice(0, max);

// Best-effort in-memory rate limit, per warm function instance. Not a hard
// guarantee across instances or cold starts, but it blunts bot bursts without
// any external storage: max 5 submissions per IP per 10 minutes.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 5;
const rlHits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (rlHits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS);
  if (recent.length >= RL_MAX) {
    rlHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  rlHits.set(ip, recent);
  if (rlHits.size > 5000) rlHits.clear(); // memory guard
  return false;
}

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const ip =
    context?.ip ||
    req.headers.get("x-nf-client-connection-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";
  if (rateLimited(ip)) {
    console.warn("Rate limited:", ip);
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    // Honeypot: humans never see the _gotcha field, bots auto-fill it.
    // Answer with a normal-looking success so the bot learns nothing,
    // but send nothing.
    if (clip(body._gotcha, 100)) {
      console.warn("Honeypot triggered, dropping submission from", ip);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Raw values: for plain-text contexts (email subject).
    const raw = {
      name: clip(body.name, 200),
      phone: clip(body.phone, 50),
      email: clip(body.email, 200),
      details: clip(body.details, 3000),
      bestTime: clip(body.bestTime, 50),
      source: clip(body.source, 100),
    };

    if (!raw.name || !raw.phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), { status: 400 });
    }

    // Escaped values: for HTML contexts (email body, Telegram HTML).
    const safe = {
      name: escapeHtml(raw.name),
      phone: escapeHtml(raw.phone),
      email: escapeHtml(raw.email),
      details: escapeHtml(raw.details),
      bestTime: escapeHtml(raw.bestTime),
      source: escapeHtml(raw.source),
    };

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

    // Send both in parallel. Each sender resolves to "sent" or "skipped"
    // (channel not configured) and throws on a real delivery error.
    const results = await Promise.allSettled([
      sendEmail({ raw, safe, timestamp }),
      sendTelegram({ safe, timestamp }),
    ]);

    const [emailResult, telegramResult] = results;
    console.log("Email:", emailResult.status, emailResult.value || emailResult.reason?.message || "");
    console.log("Telegram:", telegramResult.status, telegramResult.value || telegramResult.reason?.message || "");

    const delivered = results.filter(
      (r) => r.status === "fulfilled" && r.value === "sent"
    ).length;

    // If nothing actually went out (every channel failed or is unconfigured),
    // report an error so the site can tell the visitor instead of showing a
    // false "Thank you" while the lead evaporates.
    if (delivered === 0) {
      return new Response(JSON.stringify({ error: "Lead delivery failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Lead function error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};

async function sendEmail({ raw, safe, timestamp }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.LEAD_EMAIL || "info@raincityllc.com";
  // Sender must belong to a domain verified in Resend. Until raincityllc.com
  // is verified there, the resend.dev sandbox sender only delivers to the
  // Resend account owner's own email address.
  const FROM = process.env.LEAD_FROM || "Rain City Leads <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email");
    return "skipped";
  }
  if (!process.env.LEAD_FROM) {
    console.warn("LEAD_FROM not set, using resend.dev sandbox sender (delivers only to the Resend account owner)");
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #051e2a; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Rain City Kitchen & Bath</h1>
        <p style="color: #89b4d4; margin: 5px 0 0;">New Lead Received</p>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #333; width: 120px;">Name:</td>
            <td style="padding: 10px; color: #333;">${safe.name}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 10px;"><a href="tel:${safe.phone}" style="color: #007ec5;">${safe.phone}</a></td>
          </tr>
          ${safe.bestTime ? `<tr><td style="padding: 10px; font-weight: bold; color: #333;">Best time:</td><td style="padding: 10px; color: #333;">${safe.bestTime}</td></tr>` : ""}
          ${safe.email ? `<tr><td style="padding: 10px; font-weight: bold; color: #333;">Email:</td><td style="padding: 10px;"><a href="mailto:${safe.email}" style="color: #007ec5;">${safe.email}</a></td></tr>` : ""}
          ${safe.details ? `<tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Details:</td><td style="padding: 10px; color: #333;">${safe.details}</td></tr>` : ""}
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #333;">Source:</td>
            <td style="padding: 10px; color: #666;">${safe.source || "Website"}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Time:</td>
            <td style="padding: 10px; color: #666;">${timestamp}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 15px; text-align: center; color: #999; font-size: 12px;">
        Sent from raincityllc.com lead form
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO_EMAIL],
      subject: `🏠 New Lead: ${raw.name} - ${raw.phone}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${res.status} ${err}`);
  }
  return "sent";
}

async function sendTelegram({ safe, timestamp }) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram not configured, skipping");
    return "skipped";
  }

  const text = [
    `🏠 <b>New Lead</b>`,
    ``,
    `👤 <b>Name:</b> ${safe.name}`,
    `📞 <b>Phone:</b> ${safe.phone}`,
    safe.bestTime ? `🕒 <b>Best time:</b> ${safe.bestTime}` : null,
    safe.email ? `📧 <b>Email:</b> ${safe.email}` : null,
    safe.details ? `📝 <b>Details:</b> ${safe.details}` : null,
    ``,
    `📍 <b>Source:</b> ${safe.source || "Website"}`,
    `🕐 ${timestamp}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram error: ${res.status} ${err}`);
  }
  return "sent";
}

export const config = {
  path: "/api/lead",
};
