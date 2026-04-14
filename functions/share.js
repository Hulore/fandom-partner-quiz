const allowedImagePattern = /^[a-z0-9_]+\.(jpg|jpeg|png|webp)$/i;

export function onRequestGet({ request }) {
  const url = new URL(request.url);
  const name = cleanText(url.searchParams.get("name") || "твой мэтч");
  const fandom = cleanText(url.searchParams.get("fandom") || "фандома");
  const rarity = cleanText(url.searchParams.get("rarity") || "");
  const image = url.searchParams.get("image") || "";
  const appUrl = `${url.origin}/?platform=telegram`;
  const imageUrl = allowedImagePattern.test(image) ? `${url.origin}/assets/characters/${image}` : "";
  const title = `Мне выпал(а) ${name}`;
  const description = `Мой результат в квизе: ${name} из ${fandom}${rarity ? ` · редкость ${rarity}` : ""}. Пройди тоже и узнай своего партнёра из фандома.`;

  return new Response(`<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url.toString())}" />
    ${imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />` : ""}
    ${imageUrl ? `<meta property="twitter:card" content="summary_large_image" />` : ""}
    ${imageUrl ? `<meta property="twitter:image" content="${escapeHtml(imageUrl)}" />` : ""}
    <style>
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        color: #14212d;
        background: linear-gradient(180deg, #07131f, #15374d);
        font-family: system-ui, sans-serif;
      }
      main {
        width: min(520px, 100%);
        padding: 28px;
        border-radius: 28px;
        background: #fff8ee;
        box-shadow: 0 24px 70px rgba(6, 19, 31, 0.28);
        text-align: center;
      }
      img {
        width: min(260px, 78vw);
        aspect-ratio: 4 / 5;
        object-fit: contain;
        border-radius: 24px;
        background: #f4ead6;
      }
      h1 {
        margin: 18px 0 10px;
        font-size: clamp(2rem, 9vw, 3.4rem);
        line-height: 0.95;
      }
      p {
        color: #52606b;
        line-height: 1.6;
      }
      a {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        justify-content: center;
        margin-top: 14px;
        padding: 0 22px;
        border-radius: 999px;
        background: linear-gradient(135deg, #d86f45, #a8422e);
        color: #fff9f4;
        font-weight: 700;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <main>
      ${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(name)}" />` : ""}
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
      <a href="${escapeHtml(appUrl)}">Пройти квиз</a>
    </main>
  </body>
</html>`, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

function cleanText(value) {
  return value.replace(/[<>{}[\]\\]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
