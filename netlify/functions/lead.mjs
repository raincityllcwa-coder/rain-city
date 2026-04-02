// netlify/functions/lead.mjs
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { name, phone, email, details, source } = await req.json();

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

    // Send both in parallel
    const results = await Promise.allSettled([
      sendEmail({ name, phone, email, details, source, timestamp }),
      sendTelegram({ name, phone, email, details, source, timestamp }),
    ]);

    const emailResult = results[0];
    const telegramResult = results[1];

    console.log("Email:", emailResult.status, emailResult.reason?.message || "ok");
    console.log("Telegram:", telegramResult.status, telegramResult.reason?.message || "ok");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Lead function error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};

async function sendEmail({ name, phone, email, details, source, timestamp }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.LEAD_EMAIL || "info@raincityllc.com";

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email");
    return;
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
            <td style="padding: 10px; color: #333;">${name}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 10px;"><a href="tel:${phone}" style="color: #007ec5;">${phone}</a></td>
          </tr>
          ${email ? `<tr><td style="padding: 10px; font-weight: bold; color: #333;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}" style="color: #007ec5;">${email}</a></td></tr>` : ""}
          ${details ? `<tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Details:</td><td style="padding: 10px; color: #333;">${details}</td></tr>` : ""}
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #333;">Source:</td>
            <td style="padding: 10px; color: #666;">${source || "Website"}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Time:</td>
            <td style="padding: 10px; color: #666;">${timestamp}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 15px; text-align: center; color: #999; font-size: 12px;">
        Sent from raincitykb.com lead form
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
      from: "Rain City Leads <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `🏠 New Lead: ${name} — ${phone}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${res.status} ${err}`);
  }
}

async function sendTelegram({ name, phone, email, details, source, timestamp }) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram not configured, skipping");
    return;
  }

  const text = [
    `🏠 <b>New Lead</b>`,
    ``,
    `👤 <b>Name:</b> ${name}`,
    `📞 <b>Phone:</b> ${phone}`,
    email ? `📧 <b>Email:</b> ${email}` : null,
    details ? `📝 <b>Details:</b> ${details}` : null,
    ``,
    `📍 <b>Source:</b> ${source || "Website"}`,
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
}

function escapeMarkdown(text) {
  if (!text) return "";
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

export const config = {
  path: "/api/lead",
};
