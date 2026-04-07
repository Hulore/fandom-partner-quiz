const CHARACTER_GUIDES = {
  zoro: {
    name: "Ророноа Зоро",
    flavor:
      "Сдержанный, надёжный, немногословный, очень верный. Показывает любовь делами, защищает без лишнего шума.",
  },
  sanji: {
    name: "Санджи",
    flavor:
      "Романтичный, заботливый, эмоциональный, умеет превращать повседневность в красивый жест любви.",
  },
  law: {
    name: "Трафальгар Ло",
    flavor:
      "Спокойный, умный, закрытый, глубоко чувствующий. Впускает в сердце не сразу, но очень серьёзно.",
  },
  ace: {
    name: "Портгас Д. Эйс",
    flavor:
      "Тёплый, харизматичный, смелый, импульсивный и очень искренний. Любовь с ним живая и яркая.",
  },
  shanks: {
    name: "Шанкс",
    flavor:
      "Обаятельный, взрослый, свободолюбивый и надёжный. Даёт много воздуха, смеха и спокойной уверенности.",
  },
  sabo: {
    name: "Сабо",
    flavor:
      "Мягкий, внимательный, умный и идеалистичный. Строит любовь на уважении, дружбе и общем движении вперёд.",
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.OPENAI_API_KEY) {
    return jsonResponse(
      {
        error:
          "На сервере не задан OPENAI_API_KEY. Добавь переменную окружения в Cloudflare Pages.",
      },
      500,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return jsonResponse({ error: "Некорректное тело запроса." }, 400);
  }

  const participantName = sanitizeName(body.participantName);
  const resultId = typeof body.resultId === "string" ? body.resultId : "";
  const answers = sanitizeAnswers(body.answers);
  const visitorId = sanitizeVisitorId(body.visitorId);
  const character = CHARACTER_GUIDES[resultId];

  if (!character) {
    return jsonResponse({ error: "Не удалось определить персонажа." }, 400);
  }

  if (!answers.length) {
    return jsonResponse({ error: "Для истории нужны ответы на тест." }, 400);
  }

  const protagonist = participantName || "ты";
  const answerSummary = answers
    .map(
      (entry, index) =>
        `${index + 1}. ${entry.question}\nОтвет: ${entry.answer}\nОттенок вайба: ${entry.vibe}`,
    )
    .join("\n\n");

  const promptContext = buildPromptContext(character, protagonist, answerSummary);
  const model = env.OPENAI_MODEL || "gpt-5-mini";

  const primaryAttempt = await requestStructuredStory({
    apiKey: env.OPENAI_API_KEY,
    model,
    visitorId,
    promptContext,
  });

  if (primaryAttempt.story) {
    return jsonResponse({ story: primaryAttempt.story }, 200);
  }

  const fallbackAttempt = await requestFallbackStory({
    apiKey: env.OPENAI_API_KEY,
    model,
    visitorId,
    promptContext,
  });

  if (fallbackAttempt.story) {
    return jsonResponse({ story: fallbackAttempt.story }, 200);
  }

  const finalError =
    fallbackAttempt.error ||
    primaryAttempt.error ||
    "Не удалось получить историю от OpenAI. Попробуй ещё раз через минуту.";

  return jsonResponse({ error: finalError }, 502);
}

function sanitizeName(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[^A-Za-zА-Яа-яЁё0-9\s\-'.]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function sanitizeVisitorId(value) {
  if (typeof value !== "string") {
    return "anonymous-visitor";
  }

  return value.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 64) || "anonymous-visitor";
}

function sanitizeAnswers(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .slice(0, 20)
    .map((entry) => {
      const source = entry && typeof entry === "object" ? entry : {};

      return {
        question: sanitizeLine(source.question),
        answer: sanitizeLine(source.answer),
        vibe: sanitizeLine(source.vibe),
      };
    })
    .filter((entry) => entry.question && entry.answer);
}

function sanitizeLine(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, 180);
}

function buildPromptContext(character, protagonist, answerSummary) {
  return `Создай историю для фановского опросника "Кто твой парень из One Piece?".

Главный романтический мэтч: ${character.name}
Описание его вайба: ${character.flavor}
Имя участницы или участника в истории: ${protagonist}
Это результат большого теста о социальных привычках, стиле общения, границах и том, как человек живёт рядом с другими людьми.

Ответы участника:
${answerSummary}

Требования:
- Напиши цельную историю на 400-600 слов.
- Начни с первой встречи.
- Покажи, как симпатия растёт в отношения.
- Дай 2-3 жизненных эпизода из более поздних лет.
- Заверши историю ощущением целой прожитой жизни.
- Пиши в основном во втором лице, если имени нет. Если имя есть, используй имя естественно.
- Тон должен быть романтичным, взрослым, нежным и атмосферным.
- Добавь конкретные чувственные детали мира: море, ветер, корабли, порт, огни, кухня, дерево палубы или что-то подобное.
- Не делай историю слишком сахарной: пусть будет живой и правдоподобной.
- Не включай других пейрингов, ревности и explicit-контента.`;
}

async function requestStructuredStory({ apiKey, model, visitorId, promptContext }) {
  const payload = {
    model,
    max_output_tokens: 1800,
    text: {
      verbosity: "medium",
      format: {
        type: "json_schema",
        name: "onepiece_romance_story",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            intro: { type: "string" },
            story: { type: "string" },
          },
          required: ["title", "intro", "story"],
        },
      },
    },
    safety_identifier: visitorId,
    input: buildBaseInput(promptContext),
  };

  const result = await callOpenAI(apiKey, payload);
  if (result.error || !result.data) {
    return { error: result.error };
  }

  const story = extractStoryObject(result.data);
  if (story) {
    return { story };
  }

  return {
    error:
      describeNonStoryResponse(result.data) ||
      "OpenAI не вернул историю в структурированном формате.",
  };
}

async function requestFallbackStory({ apiKey, model, visitorId, promptContext }) {
  const payload = {
    model,
    max_output_tokens: 1800,
    text: {
      verbosity: "medium",
    },
    safety_identifier: visitorId,
    input: [
      ...buildBaseInput(promptContext),
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              'Верни ответ строго в JSON без markdown и без пояснений. Формат: {"title":"...","intro":"...","story":"..."}',
          },
        ],
      },
    ],
  };

  const result = await callOpenAI(apiKey, payload);
  if (result.error || !result.data) {
    return { error: result.error };
  }

  const story = extractStoryObject(result.data);
  if (story) {
    return { story };
  }

  return {
    error:
      describeNonStoryResponse(result.data) ||
      "OpenAI ответил, но историю не удалось разобрать.",
  };
}

function buildBaseInput(promptContext) {
  return [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text:
            "Ты пишешь короткие романтические фан-истории по мотивам One Piece на русском языке. Пиши тепло, художественно и легко читаемо. Сюжет должен пройти путь от знакомства к отношениям, совместной жизни и тихому финалу в старости или в конце жизни. Финал может быть bittersweet, но без графичной смерти, жестокости и без трагедии ради трагедии. Никакой эротики: тон PG-13, чувственно, но без откровенных сцен. Сохраняй узнаваемый характер персонажа, но допускай мягкую романтическую AU-атмосферу. Не упоминай, что ты ИИ, не вставляй дисклеймеры, не используй списки.",
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: promptContext,
        },
      ],
    },
  ];
}

async function callOpenAI(apiKey, payload) {
  let openaiResponse;
  try {
    openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return { error: "Не удалось связаться с OpenAI API." };
  }

  const data = await openaiResponse.json().catch(() => null);

  if (!openaiResponse.ok || !data) {
    const message =
      (data && data.error && data.error.message) ||
      "OpenAI API вернул ошибку во время генерации истории.";

    return { error: message };
  }

  return { data };
}

function extractStoryObject(data) {
  const candidates = collectTextCandidates(data);

  for (const candidate of candidates) {
    const story = parseStoryCandidate(candidate);
    if (story) {
      return story;
    }
  }

  return null;
}

function collectTextCandidates(data) {
  const candidates = [];

  if (typeof data.output_text === "string" && data.output_text.trim()) {
    candidates.push(data.output_text.trim());
  }

  if (!Array.isArray(data.output)) {
    return candidates;
  }

  for (const item of data.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (typeof content.text === "string" && content.text.trim()) {
        candidates.push(content.text.trim());
      }

      if (content.parsed && typeof content.parsed === "object") {
        candidates.push(JSON.stringify(content.parsed));
      }

      if (content.json && typeof content.json === "object") {
        candidates.push(JSON.stringify(content.json));
      }
    }
  }

  return candidates;
}

function parseStoryCandidate(candidate) {
  const direct = tryParseJson(candidate);
  if (isValidStory(direct)) {
    return normalizeStory(direct);
  }

  const fenced = candidate.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    const fencedParsed = tryParseJson(fenced[1]);
    if (isValidStory(fencedParsed)) {
      return normalizeStory(fencedParsed);
    }
  }

  const objectLike = candidate.match(/\{[\s\S]*\}/);
  if (objectLike) {
    const objectParsed = tryParseJson(objectLike[0]);
    if (isValidStory(objectParsed)) {
      return normalizeStory(objectParsed);
    }
  }

  return null;
}

function tryParseJson(value) {
  if (typeof value !== "string") {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function isValidStory(story) {
  return Boolean(
    story &&
      typeof story.title === "string" &&
      typeof story.intro === "string" &&
      typeof story.story === "string",
  );
}

function normalizeStory(story) {
  return {
    title: story.title.trim(),
    intro: story.intro.trim(),
    story: story.story.trim(),
  };
}

function describeNonStoryResponse(data) {
  if (data && data.status === "incomplete") {
    const reason =
      data.incomplete_details &&
      typeof data.incomplete_details.reason === "string"
        ? data.incomplete_details.reason
        : "unknown";

    if (reason === "max_output_tokens") {
      return "OpenAI оборвал ответ из-за лимита длины. Попробуй снова.";
    }

    return `OpenAI не завершил ответ: ${reason}.`;
  }

  if (!Array.isArray(data && data.output)) {
    return "";
  }

  for (const item of data.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (content.type === "refusal" && typeof content.refusal === "string") {
        return content.refusal;
      }
    }
  }

  return "";
}

function jsonResponse(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders,
    },
  });
}
