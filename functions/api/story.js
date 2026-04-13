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
  const fandomName = sanitizeLine(body.fandomName) || "выбранного фандома";
  const fandomWorld = sanitizeLine(body.fandomWorld) || "атмосфера выбранного фандома";
  const bodyResult = sanitizeResult(body.result);
  const answers = sanitizeAnswers(body.answers);
  const visitorId = sanitizeVisitorId(body.visitorId);
  const character = bodyResult || CHARACTER_GUIDES[resultId];

  if (!character) {
    return jsonResponse({ error: "Не удалось определить персонажа." }, 400);
  }

  if (!answers.length) {
    return jsonResponse({ error: "Для истории нужны ответы на тест." }, 400);
  }

  if (!participantName) {
    return jsonResponse(
      { error: "Для генерации истории нужно имя участника." },
      400,
    );
  }

  const protagonist = participantName;
  const answerProfile = buildAnswerProfile(answers);

  const promptContext = buildPromptContext(character, protagonist, answerProfile, fandomName, fandomWorld);
  const model = env.OPENAI_MODEL || "gpt-5-mini";

  const primaryAttempt = await requestStructuredStory({
    apiKey: env.OPENAI_API_KEY,
    model,
    visitorId,
    promptContext,
  });

  if (primaryAttempt.story) {
    return jsonResponse(
      { story: ensureNamePresence(primaryAttempt.story, participantName, character.name) },
      200,
    );
  }

  const fallbackAttempt = await requestFallbackStory({
    apiKey: env.OPENAI_API_KEY,
    model,
    visitorId,
    promptContext,
  });

  if (fallbackAttempt.story) {
    return jsonResponse(
      { story: ensureNamePresence(fallbackAttempt.story, participantName, character.name) },
      200,
    );
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

function sanitizeResult(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const name = sanitizeLine(value.name);
  const flavor = sanitizeLine(value.promptFlavor || value.subtitle);

  if (!name || !flavor) {
    return null;
  }

  return { name, flavor };
}

function sanitizeAnswers(value) {
  const rawAnswers = Array.isArray(value)
    ? value
    : value && typeof value === "object"
      ? Object.values(value)
      : [];

  return rawAnswers
    .slice(0, 10)
    .map((entry) => {
      const source = entry && typeof entry === "object" ? entry : {};
      const percent = Number(source.percent);
      const normalizedPercent = Number.isFinite(percent)
        ? Math.max(0, Math.min(100, Math.round(percent)))
        : null;

      return {
        category: sanitizeLine(source.category),
        percent: normalizedPercent,
        vibe: sanitizeLine(source.meaning || source.vibe || source.category),
      };
    })
    .filter((entry) => entry.percent !== null);
}

function sanitizeLine(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, 180);
}

function buildAnswerProfile(answers) {
  const categoryGuides = {
    fun: {
      high: "легко впускает в жизнь игривый хаос, забавные авантюры и совместные глупости",
      mid: "любит юмор, но без постоянного цирка вокруг отношений",
      low: "скорее тянется к спокойному ритму и шуткам, которые не ломают ощущение безопасности",
    },
    relationship: {
      high: "хочет зрелой близости: честных разговоров, уважения границ и поступков вместо пустой драмы",
      mid: "ищет баланс между романтикой, свободой и бытовой надёжностью",
      low: "не любит давление и раскрывается медленно, когда рядом достаточно бережности",
    },
    memes: {
      high: "воспринимает юмор и внутренние шутки как один из языков нежности",
      mid: "ценит лёгкость в общении, если за ней остаётся настоящая внимательность",
      low: "скорее верит в тихие жесты и прямые слова, чем в постоянную мемную переписку",
    },
    interests: {
      high: "оживает от общих интересов, атмосферных мест, маленьких ритуалов и любопытства друг к другу",
      mid: "любит, когда отношения растут из обычных разговоров, дел и совпавших вкусов",
      low: "больше ценит простую человеческую близость, чем яркие увлечения или эффектные жесты",
    },
    social: {
      high: "хорошо чувствует себя в партнёрстве, где есть команда, друзья и живой обмен с миром",
      mid: "держит баланс между общением и личным пространством",
      low: "бережёт внутренний круг и сильнее раскрывается в тихой приватной близости",
    },
  };

  const buckets = answers.reduce((acc, answer) => {
    const category = categoryGuides[answer.category] ? answer.category : "social";
    acc[category] = acc[category] || [];
    acc[category].push(answer.percent);
    return acc;
  }, {});

  return Object.entries(categoryGuides)
    .map(([category, guide]) => {
      const values = buckets[category] || [];
      const average = values.length
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : 50;

      if (average >= 65) return guide.high;
      if (average <= 35) return guide.low;
      return guide.mid;
    })
    .join("; ");
}

function buildPromptContext(character, protagonist, answerProfile, fandomName, fandomWorld) {
  return `Создай короткий романтический фанфик по выбранному мэтчу.

Фандом: ${fandomName}
Атмосфера мира: ${fandomWorld}
Главный романтический мэтч: ${character.name}
Описание его вайба: ${character.flavor}
Имя участницы или участника в истории: ${protagonist}

Скрытые ориентиры для автора:
${answerProfile}

Требования:
- Напиши цельную историю на 400-600 слов.
- Обязательно используй имя участника "${protagonist}" в самой истории и не меньше трёх раз по ходу текста.
- Начни с первой встречи.
- Покажи, как симпатия растёт в отношения.
- Дай 2-3 жизненных эпизода из более поздних лет.
- Заверши историю ощущением целой прожитой жизни.
- Используй имя естественно, без сухого перечисления.
- Тон должен быть романтичным, взрослым, нежным и атмосферным.
- Добавь конкретные чувственные детали именно выбранного фандома и его мира.
- Не делай историю слишком сахарной: пусть будет живой и правдоподобной.
- Не упоминай тест, вопросы, ответы, шкалы, проценты, категории и любые формулировки из опросника.
- Не пересказывай ориентиры напрямую. Используй их только скрыто: через выбор сцен, реакции, диалоги и динамику отношений.
- Пиши как личный фанфик с плавным сюжетом, а не как психологический отчёт или набор фактов.
- Добавь 1-2 коротких диалога или реплики, чтобы история звучала живее.
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
        name: "fandom_romance_story",
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
    if (storyHasTestArtifacts(story)) {
      return { error: "История получилась слишком похожей на пересказ теста, пробую перегенерировать." };
    }

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
              'Верни ответ строго в JSON без markdown и без пояснений. Формат: {"title":"...","intro":"...","story":"..."}. Это повторная попытка: не упоминай тест, вопросы, ответы, шкалы, проценты, категории и не пересказывай входные ориентиры напрямую.',
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
    if (storyHasTestArtifacts(story)) {
      return { error: "OpenAI снова вернул историю с прямыми следами теста. Попробуй сгенерировать ещё раз." };
    }

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
            "Ты пишешь короткие романтические фан-истории на русском языке. Пиши художественно: сцены, действия, детали, немного диалога и плавная эмоциональная дуга. Это должен быть личный фанфик, а не анкета, отчёт или пересказ входных данных. Сюжет проходит путь от знакомства к отношениям, совместной жизни и тихому финалу в старости или в конце жизни. Финал может быть bittersweet, но без графичной смерти, жестокости и без трагедии ради трагедии. Никакой эротики: тон PG-13, чувственно, но без откровенных сцен. Сохраняй узнаваемый характер персонажа, но допускай мягкую романтическую AU-атмосферу. Не упоминай тесты, вопросы, ответы, проценты, категории, ИИ, дисклеймеры и не используй списки.",
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

function storyHasTestArtifacts(story) {
  const text = `${story.title}\n${story.intro}\n${story.story}`.toLocaleLowerCase("ru");
  return /(\d{1,3}\s?%|процент|шкал|опросник|анкет|результат тест|(?:^|[^а-яё])тест(?:[^а-яё]|$)|вопрос[а-яё\s-]{0,24}тест|ответ[а-яё\s-]{0,24}участник|согласия с утвержден)/iu.test(text);
}

function ensureNamePresence(story, participantName, characterName) {
  if (!participantName) {
    return story;
  }

  const safeName = participantName.trim();
  const lowerName = safeName.toLocaleLowerCase("ru");
  const introHasName = story.intro.toLocaleLowerCase("ru").includes(lowerName);
  const storyHasName = story.story.toLocaleLowerCase("ru").includes(lowerName);

  return {
    title: story.title,
    intro: introHasName
      ? story.intro
      : `${safeName} и ${characterName} удивительно легко совпали по ритму чувств. ${story.intro}`,
    story: storyHasName
      ? story.story
      : `Для ${safeName} всё началось с моря, ветра и той самой встречи, после которой жизнь уже не осталась прежней.\n\n${story.story}`,
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
