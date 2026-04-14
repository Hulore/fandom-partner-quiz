import { onRequestOptions as storyOptions, onRequestPost as storyPost } from "../functions/api/story.js";
import { onRequestGet as statsGet, onRequestOptions as statsOptions, onRequestPost as statsPost } from "../functions/api/stats.js";
import { onRequestGet as shareGet } from "../functions/share.js";

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const context = { request, env, ctx };

      if (url.pathname === "/api/story") {
        if (request.method === "OPTIONS") return storyOptions(context);
        if (request.method === "POST") return storyPost(context);
        return methodNotAllowed();
      }

      if (url.pathname === "/api/health") {
        if (request.method !== "GET") return methodNotAllowed();
        return new Response(JSON.stringify({
          ok: true,
          worker: "fandom-partner-quiz",
          hasOpenAIKey: Boolean(env.OPENAI_API_KEY),
          hasOpenAIModel: Boolean(env.OPENAI_MODEL),
          hasStatsKv: Boolean(env.STATS_KV),
          hasStatsAdminToken: Boolean(env.STATS_ADMIN_TOKEN),
        }), {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        });
      }

      if (url.pathname === "/api/stats") {
        if (request.method === "OPTIONS") return statsOptions(context);
        if (request.method === "POST") return statsPost(context);
        if (request.method === "GET") return statsGet(context);
        return methodNotAllowed();
      }

      if (url.pathname === "/share") {
        if (request.method === "GET") return shareGet(context);
        return methodNotAllowed();
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message || "Worker error." }), {
        status: 500,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
    }
  },
};

function methodNotAllowed() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET, POST, OPTIONS" },
  });
}
