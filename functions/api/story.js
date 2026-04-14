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

const STORY_MAX_OUTPUT_TOKENS = 3200;
const COMPACT_STORY_MAX_OUTPUT_TOKENS = 2200;
const RANDOM_STYLE_REQUIREMENT_COUNT = 10;

const PROMPT_OPENINGS = [
  "Создай короткий романтический фанфик по выбранному мэтчу.",
  "Создай короткий шуточный романтический фанфик по выбранному мэтчу.",
  "Создай короткий экшен-романтический фанфик по выбранному мэтчу.",
  "Создай короткий уютный романтический фанфик по выбранному мэтчу.",
  "Создай короткий драматично-нежный романтический фанфик по выбранному мэтчу.",
  "Создай короткий slow burn фанфик по выбранному романтическому мэтчу.",
  "Создай короткий фанфик в настроении тёплого приключения по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой, юмором и лёгким хаосом по выбранному мэтчу.",
  "Создай короткий атмосферный романтический фанфик по выбранному мэтчу.",
  "Создай короткий фанфик о случайной встрече, которая меняет жизнь, по выбранному мэтчу.",
  "Создай короткий фанфик в стиле мягкого кинематографичного романа по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой на фоне опасного приключения по выбранному мэтчу.",
  "Создай короткий фанфик с нежной бытовой романтикой по выбранному мэтчу.",
  "Создай короткий фанфик с ироничной романтикой и живыми репликами по выбранному мэтчу.",
  "Создай короткий фанфик с вайбом ночного разговора и внезапной близости по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой через поступки, а не громкие признания, по выбранному мэтчу.",
  "Создай короткий фанфик с флиртом, приключением и тихим финалом по выбранному мэтчу.",
  "Создай короткий фанфик с мягкой грустью и светлым чувством по выбранному мэтчу.",
  "Создай короткий фанфик с комедийным началом и искренней романтикой по выбранному мэтчу.",
  "Создай короткий фанфик с напряжённой первой встречей и постепенным доверием по выбранному мэтчу.",
  "Создай короткий фанфик с ощущением большого пути и маленьких личных жестов по выбранному мэтчу.",
  "Создай короткий фанфик с романтическим приключением на один вечер, которое перерастает в жизнь, по выбранному мэтчу.",
  "Создай короткий фанфик с тёплой химией и лёгким словесным пинг-понгом по выбранному мэтчу.",
  "Создай короткий фанфик с вайбом спасения, благодарности и осторожной нежности по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой через совместную миссию по выбранному мэтчу.",
  "Создай короткий фанфик с камерной, почти дневниковой интонацией по выбранному мэтчу.",
  "Создай короткий фанфик с ярким первым кадром и спокойным зрелым финалом по выбранному мэтчу.",
  "Создай короткий фанфик с контрастом между опасным миром и мягкими чувствами по выбранному мэтчу.",
  "Создай короткий фанфик с уютной романтикой после трудного дня по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой, которая начинается с нелепости, по выбранному мэтчу.",
  "Создай короткий фанфик с атмосферой дороги, случайного разговора и симпатии, которая проявляется через поступки, по выбранному мэтчу.",
  "Создай короткий фанфик с лёгкой авантюрой и тихим признанием по выбранному мэтчу.",
  "Создай короткий фанфик с романтической историей взросления вместе по выбранному мэтчу.",
  "Создай короткий фанфик с настроением письма из будущего о прожитой любви по выбранному мэтчу.",
  "Создай короткий фанфик с нежной комедией характеров по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой, где доверие важнее эффектных слов, по выбранному мэтчу.",
  "Создай короткий фанфик с динамикой 'сначала спорили, потом стали домом' по выбранному мэтчу.",
  "Создай короткий фанфик с атмосферой тихого обещания и долгой дороги по выбранному мэтчу.",
  "Создай короткий фанфик с яркой сценой знакомства и мягким послевкусием по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой в стиле маленького приключенческого фильма по выбранному мэтчу.",
  "Создай короткий фанфик с внутренней нежностью под слоем шуток по выбранному мэтчу.",
  "Создай короткий фанфик с романтической историей о двух людях, которые учатся быть честными, по выбранному мэтчу.",
  "Создай короткий фанфик с живым темпом, тёплыми деталями и финалом на выдохе по выбранному мэтчу.",
  "Создай короткий фанфик с вайбом 'хаос вокруг, но рядом с ним спокойно' по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой, которая раскрывается через повторяющиеся маленькие ритуалы, по выбранному мэтчу.",
  "Создай короткий фанфик с лёгким приключенческим юмором и зрелой нежностью по выбранному мэтчу.",
  "Создай короткий фанфик с первой встречей на грани опасности и последующей тишиной доверия по выбранному мэтчу.",
  "Создай короткий фанфик с романтикой, где один жест говорит больше признания, по выбранному мэтчу.",
  "Создай короткий фанфик с настроением тёплого эпилога к большой жизни по выбранному мэтчу.",
  "Создай короткий фанфик с кинематографичной романтикой и запоминающейся последней сценой по выбранному мэтчу.",
];

const STYLE_REQUIREMENTS = [
  "Начни с конкретного действия, а не с объяснения чувств.",
  "Сделай первую сцену немного неловкой или смешной.",
  "Открой историю с маленькой опасности, которая быстро раскрывает характеры.",
  "Пусть первая встреча произойдёт из-за случайной ошибки или недоразумения.",
  "Сделай начало спокойным, почти бытовым, но с заметной химией.",
  "Начни с короткой реплики персонажа, после которой сразу чувствуется его характер.",
  "Пусть в первой сцене будет предмет, который потом вернётся в финале.",
  "Используй мотив дороги, порога или перехода в новую жизнь.",
  "Добавь один повторяющийся жест, который станет личным знаком пары.",
  "Сделай романтику заметной через заботу в мелочах.",
  "Сделай юмор мягким, без пародии на персонажа.",
  "Добавь одну сцену, где персонаж показывает чувства поступком.",
  "Добавь одну сцену тихого разговора после опасности или усталости.",
  "Пусть конфликт будет маленьким и человеческим, без большой мелодрамы.",
  "Пусть доверие растёт медленно, через несколько коротких эпизодов.",
  "Сделай эмоциональную дугу от настороженности к дому.",
  "Сделай эмоциональную дугу от смешной случайности к серьёзному выбору.",
  "Сделай эмоциональную дугу от спора к уважению.",
  "Сделай эмоциональную дугу от одиночества к спокойной близости.",
  "Сделай эмоциональную дугу от флирта к настоящей опоре.",
  "Добавь один чувственный образ мира фандома: звук, запах, свет или погоду.",
  "Добавь одну деталь, связанную с профессией, силой или привычками персонажа.",
  "Пусть мир фандома влияет на сюжет, но не превращает текст в пересказ канона.",
  "Не объясняй лор подробно, показывай его через детали сцены.",
  "Сделай одну сцену почти кинематографичной: движение, свет, пауза.",
  "Сделай одну сцену камерной: два человека и почти весь мир за дверью.",
  "Добавь 1 короткий диалог, который звучит естественно.",
  "Добавь 2 короткие реплики с лёгким флиртом.",
  "Пусть одна реплика станет эмоциональным поворотом.",
  "Пусть признание будет не прямым, а завуалированным.",
  "Пусть финал отзеркалит первую сцену.",
  "Сделай финал светлым, но не приторным.",
  "Сделай финал тихим, будто последняя страница старого письма.",
  "Сделай финал с ощущением прожитой жизни и благодарности.",
  "Сделай финал через маленький бытовой ритуал пары.",
  "Сделай финал bittersweet, но без жестокой трагедии.",
  "Пусть поздние годы будут показаны двумя быстрыми, яркими штрихами.",
  "Добавь один временной скачок через год или несколько лет.",
  "Добавь один эпизод совместного дома, лагеря, корабля, комнаты или привычного места.",
  "Добавь один эпизод, где они молча понимают друг друга.",
  "Добавь один эпизод, где участник делает выбор в пользу отношений.",
  "Добавь один эпизод, где персонаж меняется рядом с участником.",
  "Пусть участник не будет пассивным наблюдателем, а влияет на события.",
  "Пусть у участника будет собственная смелость или мягкая сила.",
  "Пусть персонаж уважает границы участника.",
  "Пусть близость выглядит зрелой, без ревности как доказательства любви.",
  "Пусть романтика не сводится к внешности.",
  "Пусть чувства проявляются через совместное дело.",
  "Пусть в тексте будет немного лёгкой самоиронии.",
  "Пусть одна сцена звучит почти как внутренняя шутка пары.",
  "Пусть темп будет живым: меньше объяснений, больше сцен.",
  "Пиши образно, но не перегружай метафорами.",
  "Пиши простым красивым языком, без канцелярита.",
  "Избегай сухих формул вроде 'они стали ближе' без сцены.",
  "Не перечисляй события подряд, связывай их причинно и эмоционально.",
  "Пусть у истории будет 3-4 заметных сцены, а не один длинный пересказ.",
  "Добавь маленькую деталь, которую можно представить визуально.",
  "Добавь один момент тишины, где чувства понятны без слов.",
  "Добавь один момент смешного контраста между опасным миром и бытовой нежностью.",
  "Пусть персонаж останется узнаваемым, но мягче раскрывается в романтическом AU.",
  "Пусть атмосфера будет немного приключенческой.",
  "Пусть атмосфера будет уютной и домашней.",
  "Пусть атмосфера будет ночной и доверительной.",
  "Пусть атмосфера будет солнечной и чуть комедийной.",
  "Пусть атмосфера будет дождливой и интимной.",
  "Пусть атмосфера будет дорожной: путь, остановка, разговор.",
  "Пусть атмосфера будет после битвы или трудного дня.",
  "Пусть атмосфера будет праздником, который внезапно становится личным.",
  "Пусть атмосфера будет тайной, которую знают только они.",
  "Пусть атмосфера будет медленным взрослением отношений.",
  "Добавь лёгкую напряжённость между желанием близости и страхом открыться.",
  "Добавь чувство надёжности, которое появляется не сразу.",
  "Добавь ощущение, что любовь становится привычкой выбирать друг друга.",
  "Пусть история не боится пауз и недосказанности.",
  "Пусть одна сцена будет построена вокруг еды, напитка, костра, кухни или отдыха.",
  "Пусть одна сцена будет построена вокруг дороги, миссии, патруля или путешествия.",
  "Пусть одна сцена будет построена вокруг подарка, ремонта, тренировки или помощи.",
  "Пусть одна сцена будет построена вокруг письма, заметки, шутки или обещания.",
  "Пусть одна сцена будет построена вокруг взгляда, который они понимают без объяснений.",
  "Пусть стиль будет ближе к романтической новелле.",
  "Пусть стиль будет ближе к приключенческому эпизоду с романтическим ядром.",
  "Пусть стиль будет ближе к лёгкой комедии с нежным финалом.",
  "Пусть стиль будет ближе к тихой драме с надеждой.",
  "Пусть стиль будет ближе к уютному slice of life.",
  "Пусть стиль будет ближе к кинематографичному эпилогу.",
  "Пусть история ощущается написанной специально для этого участника.",
  "Пусть текст держит баланс между фан-сервисом и правдоподобной близостью.",
  "Не используй громоздкие объяснения мотивации, показывай её через выборы.",
  "Не делай персонажа слишком идеальным: оставь ему живые привычки и шероховатости.",
  "Сделай одну сцену с лёгкой усталостью, после которой тепло чувствуется сильнее.",
  "Сделай одну сцену с неожиданной поддержкой.",
  "Сделай одну сцену, где участник смешит персонажа или сбивает его с привычного тона.",
  "Сделай одну сцену, где персонаж удивляет участника бережностью.",
  "Сделай одну сцену, где их отношения заметны окружающим без прямого объявления.",
  "Сделай одну сцену, где мир вокруг шумный, а между ними становится спокойно.",
  "Пусть последнее предложение оставляет мягкое послевкусие, а не ставит жирную точку.",
  "Пусть история звучит как законченная миниатюра, а не синопсис большого романа.",
];

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
      { story: primaryAttempt.story },
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
      { story: fallbackAttempt.story },
      200,
    );
  }

  let compactAttempt = null;
  if (isOutputLimitError(primaryAttempt.error) || isOutputLimitError(fallbackAttempt.error)) {
    const compactPromptContext = buildPromptContext(
      character,
      protagonist,
      answerProfile,
      fandomName,
      fandomWorld,
      { compact: true },
    );
    compactAttempt = await requestFallbackStory({
      apiKey: env.OPENAI_API_KEY,
      model,
      visitorId,
      promptContext: compactPromptContext,
      maxOutputTokens: COMPACT_STORY_MAX_OUTPUT_TOKENS,
    });

    if (compactAttempt.story) {
      return jsonResponse(
        { story: compactAttempt.story },
        200,
      );
    }
  }

  const finalError =
    (compactAttempt && compactAttempt.error) ||
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
  const gender = ["boy", "girl"].includes(value.gender) ? value.gender : "unknown";

  if (!name || !flavor) {
    return null;
  }

  return { name, flavor, gender };
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

function buildPromptContext(character, protagonist, answerProfile, fandomName, fandomWorld, options = {}) {
  const wordTarget = options.compact ? "320-430" : "400-520";
  const compactInstruction = options.compact
    ? "\n- Это короткая повторная попытка после обрыва по длине: держи текст плотным, без лишних пояснений и без длинных внутренних монологов."
    : "";
  const opening = pickRandom(PROMPT_OPENINGS);
  const randomRequirements = pickRandomItems(STYLE_REQUIREMENTS, RANDOM_STYLE_REQUIREMENT_COUNT)
    .map((requirement) => `- ${requirement}`)
    .join("\n");

  return `${opening}

Фандом: ${fandomName}
Атмосфера мира: ${fandomWorld}
Главный романтический мэтч: ${character.name}
Тип мэтча: ${describeCharacterGender(character.gender)}
Описание вайба персонажа: ${character.flavor}
Имя участницы или участника в истории: ${protagonist}

Скрытые ориентиры для автора:
${answerProfile}

Требования:
- Напиши цельную историю на ${wordTarget} слов.
- Обязательно используй имя участника "${protagonist}" в самой истории и не меньше трёх раз по ходу текста.
- Не упоминай тест, вопросы, ответы, шкалы, проценты, категории и любые формулировки из опросника.
- Не пересказывай ориентиры напрямую. Используй их только скрыто: через выбор сцен, реакции, диалоги и динамику отношений.
- Не начинай историю или intro с обобщений про совместимость, судьбу, совпадение ритма, "между ними сразу что-то возникло" и похожих клише. Начинай с конкретной сцены, действия, детали мира или живой реплики.
- Не включай других пейрингов, ревности и explicit-контента.
${randomRequirements}${compactInstruction}`;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickRandomItems(items, count) {
  const copy = [...items];
  const picked = [];

  while (copy.length && picked.length < count) {
    const index = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(index, 1)[0]);
  }

  return picked;
}

function describeCharacterGender(gender) {
  if (gender === "girl") {
    return "женский персонаж; романтическая история с ней";
  }

  if (gender === "boy") {
    return "мужской персонаж; романтическая история с ним";
  }

  return "персонаж; романтическая история с ним или с ней по контексту";
}

async function requestStructuredStory({
  apiKey,
  model,
  visitorId,
  promptContext,
  maxOutputTokens = STORY_MAX_OUTPUT_TOKENS,
}) {
  const payload = {
    model,
    max_output_tokens: maxOutputTokens,
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

async function requestFallbackStory({
  apiKey,
  model,
  visitorId,
  promptContext,
  maxOutputTokens = STORY_MAX_OUTPUT_TOKENS,
}) {
  const payload = {
    model,
    max_output_tokens: maxOutputTokens,
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

function isOutputLimitError(error) {
  return typeof error === "string" && error.includes("лимита длины");
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
