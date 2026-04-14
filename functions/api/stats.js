const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const allowedEvents = new Set(["start", "result", "story", "share"]);

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.STATS_KV) {
    return jsonResponse({ ok: true, enabled: false, reason: "STATS_KV binding is not configured." });
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return jsonResponse({ ok: false, error: "Invalid JSON." }, 400);
  }

  const eventName = cleanSegment(body.event);
  if (!allowedEvents.has(eventName)) {
    return jsonResponse({ ok: false, error: "Unknown stats event." }, 400);
  }

  const today = new Date().toISOString().slice(0, 10);
  const platform = cleanSegment(body.platform || "web") || "web";
  const fandomId = cleanSegment(body.fandomId || "unknown") || "unknown";
  const interest = cleanSegment(body.interest || "unknown") || "unknown";
  const characterId = cleanSegment(body.characterId || "");
  const rarity = cleanSegment(body.rarity || "");

  const keys = [
    `event:${eventName}:total`,
    `event:${eventName}:date:${today}`,
    `platform:${platform}:event:${eventName}`,
    `fandom:${fandomId}:event:${eventName}`,
    `interest:${interest}:event:${eventName}`,
  ];

  if (characterId) keys.push(`character:${characterId}:event:${eventName}`);
  if (rarity) keys.push(`rarity:${rarity.toLowerCase()}:event:${eventName}`);

  await Promise.all(keys.map((key) => increment(env.STATS_KV, key)));

  return jsonResponse({ ok: true, enabled: true });
}

export async function onRequestGet({ request, env }) {
  if (!env.STATS_KV) {
    return jsonResponse({ ok: false, enabled: false, error: "STATS_KV binding is not configured." }, 503);
  }

  const url = new URL(request.url);
  const expectedToken = env.STATS_ADMIN_TOKEN || "";
  if (expectedToken && url.searchParams.get("token") !== expectedToken) {
    return jsonResponse({ ok: false, error: "Forbidden." }, 403);
  }
  if (!expectedToken) {
    return jsonResponse({ ok: false, error: "Set STATS_ADMIN_TOKEN before reading stats." }, 403);
  }

  const prefix = cleanStatsPrefix(url.searchParams.get("prefix") || "");
  const listed = await env.STATS_KV.list({ prefix, limit: 1000 });
  const entries = await Promise.all(listed.keys.map(async ({ name }) => [name, Number(await env.STATS_KV.get(name) || "0")]));
  return jsonResponse({ ok: true, entries: Object.fromEntries(entries) });
}

async function increment(kv, key) {
  const current = Number(await kv.get(key) || "0");
  await kv.put(key, String(current + 1));
}

function cleanSegment(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 80);
}

function cleanStatsPrefix(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9_:-]/g, "").slice(0, 120);
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
