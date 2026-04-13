const DIMENSIONS = ["stability", "romance", "chaos", "depth", "humor", "ambition", "freedom", "care", "drama", "nerd"];
const profile = (values) => Object.fromEntries(DIMENSIONS.map((key, index) => [key, values[index] || 0]));
const ch = (id, name, crest, imageKey, subtitle, flavor, traits, values) => ({ id, name, crest, imageKey, subtitle, description: flavor, promptFlavor: flavor, traits, profile: profile(values) });
const fandom = (id, label, note, storyWorld, characters) => ({ id, label, note, storyWorld, characters });

const FANDOMS = {
  one_piece: fandom("one_piece", "One Piece", "Пираты, море, верность и приключения.", "море, корабли, порты, ветер, закаты на палубе и чувство большой дороги", [
    ch("one_piece_zoro", "Ророноа Зоро", "ZR", "zoro", "Тихая опора, которая любит поступками.", "Сдержанный, надёжный, прямой и глубоко преданный.", ["верность", "сила", "спокойствие"], [0.9,-0.2,-0.3,0.5,-0.1,0.8,0.2,0.2,-0.6,-0.4]),
    ch("one_piece_sanji", "Санджи", "SJ", "sanji", "Романтик, который превращает обычный вечер в событие.", "Очень романтичный, заботливый, внимательный и эмоциональный.", ["романтика", "забота", "огонь"], [0.3,1,0.2,0.2,0.4,0.4,0.1,1,0.2,-0.3]),
    ch("one_piece_law", "Трафальгар Ло", "LW", "law", "Человек-тайна для slow burn истории.", "Спокойный, умный, закрытый и точный в словах.", ["интеллект", "глубина", "доверие"], [0.6,0.1,-0.5,1,-0.2,0.7,0.2,0.4,-0.2,0.9]),
    ch("one_piece_ace", "Портгас Д. Эйс", "AC", "ace", "Солнечный пожар, рядом с которым жизнь ярче.", "Тёплый, харизматичный, смелый, импульсивный и сердечный.", ["страсть", "искренность", "тепло"], [-0.1,0.5,0.8,0.3,0.6,0.5,0.8,0.6,0.3,-0.5]),
    ch("one_piece_shanks", "Шанкс", "SK", "shanks", "Свобода, смех и взрослая уверенность.", "Обаятельный, свободолюбивый и эмоционально зрелый.", ["харизма", "надёжность", "свобода"], [0.5,0.3,0.5,0.4,0.8,0.4,1,0.5,-0.3,-0.2]),
    ch("one_piece_sabo", "Сабо", "SB", "sabo", "Нежная интеллигентность и чувство союза.", "Мягкий, внимательный, умный и идейный.", ["уважение", "идеализм", "партнёрство"], [0.6,0.5,-0.1,0.7,0.2,0.8,0.5,0.8,-0.2,0.5]),
  ]),
  jjk: fandom("jjk", "Магическая битва", "Проклятия, риск, юмор на грани и сильные характеры.", "Токио, школа магов, ночные миссии, проклятая энергия и разговоры после опасности", [
    ch("jjk_gojo", "Сатору Годжо", "GO", "jjk_gojo", "Невозможный флирт, сила и хаос.", "Яркий, дерзкий, смешной, сильный и неожиданно внимательный.", ["харизма", "хаос", "флирт"], [-0.1,0.5,1,0.4,1,0.8,0.8,0.4,0.2,0.5]),
    ch("jjk_nanami", "Кэнто Нанами", "NA", "jjk_nanami", "Стабильность, взрослость и любовь без цирка.", "Собранный, надёжный, усталый в лучшем смысле, уважает границы.", ["стабильность", "границы", "забота"], [1,0.2,-0.9,0.6,-0.2,0.3,-0.2,0.8,-0.8,0.2]),
    ch("jjk_geto", "Сугуру Гето", "GE", "jjk_geto", "Красивый slow burn с опасной глубиной.", "Спокойный, харизматичный, идейный и сложный в мягком AU.", ["глубина", "эстетика", "тайна"], [0.2,0.4,0.1,1,-0.3,0.9,0.3,0.2,0.7,0.5]),
    ch("jjk_toji", "Тодзи Фушигуро", "TO", "jjk_toji", "Опасный вайб и никаких лишних слов.", "Резкий, независимый, саркастичный и надёжный в опасности.", ["опасность", "свобода", "сарказм"], [-0.3,-0.2,0.8,0.1,0.2,0.2,1,-0.1,0.5,-0.8]),
    ch("jjk_choso", "Чосо", "CH", "jjk_choso", "Тихая привязанность и честная нежность.", "Верный, эмоционально глубокий, странный и искренний.", ["верность", "нежность", "семья"], [0.7,0.4,-0.1,0.8,0.1,0.1,-0.1,0.9,0.4,-0.1]),
    ch("jjk_higuruma", "Хироми Хигурума", "HI", "jjk_higuruma", "Ум, усталость от мира и честность.", "Интеллектуальный, морально сложный и мягкий в доверии.", ["ум", "честность", "глубина"], [0.5,0.1,-0.6,0.9,-0.4,0.4,-0.1,0.4,0.1,1]),
  ]),
  mha: fandom("mha", "Моя геройская академия", "Только взрослые герои и AU без школьной романтики.", "город героев, агентства, ночные патрули и редкие спокойные выходные", [
    ch("mha_aizawa", "Шота Айзава", "AI", "mha_aizawa", "Сонный кот, который на деле опора.", "Сдержанный, прямой, заботливый без показухи.", ["стабильность", "ирония", "границы"], [0.9,-0.1,-0.7,0.6,0.1,0.2,0.1,0.7,-0.6,0.2]),
    ch("mha_hawks", "Хоукс", "HK", "mha_hawks", "Флирт, скорость и улыбка с секретами.", "Лёгкий на словах, умный, свободолюбивый, с глубиной под шутками.", ["харизма", "свобода", "флирт"], [0.1,0.5,0.6,0.5,0.8,0.7,1,0.4,0.3,0.3]),
    ch("mha_best_jeanist", "Бест Джинист", "BJ", "mha_best_jeanist", "Элегантность, контроль и детали.", "Собранный, стильный, дисциплинированный и внимательный.", ["стиль", "контроль", "уважение"], [0.8,0.4,-0.8,0.3,-0.1,0.7,-0.3,0.5,-0.4,0.4]),
    ch("mha_present_mic", "Презент Майк", "PM", "mha_present_mic", "Громкий смех, музыка и человек-праздник.", "Шумный, смешной, эмоциональный и тёплый.", ["юмор", "музыка", "энергия"], [0.2,0.4,0.7,0.1,1,0.4,0.6,0.5,-0.2,0.1]),
    ch("mha_fatgum", "Фэт Гам", "FG", "mha_fatgum", "Большое сердце, еда и безопасное тепло.", "Открытый, добрый, заботливый, домашний и сильный.", ["забота", "еда", "тепло"], [0.8,0.5,-0.2,0.2,0.6,0.3,0,1,-0.5,-0.2]),
    ch("mha_nighteye", "Сэр Нighteye", "SN", "mha_nighteye", "Строгость, интеллект и сухой юмор.", "Точный, требовательный, умный и глубоко преданный.", ["ум", "строгость", "планы"], [0.8,0,-0.8,0.6,0.2,0.8,-0.5,0.3,-0.2,1]),
  ]),
  naruto: fandom("naruto", "Наруто", "Взрослые версии персонажей и спокойный романтический AU-тон.", "Коноха, крыши после миссий, чайные, дороги между деревнями и вечерние огни шиноби", [
    ch("naruto_kakashi", "Какаши Хатаке", "KA", "naruto_kakashi", "Маска, книжка и человек, который всё замечает.", "Спокойный, умный, травмированный, но тёплый в доверии.", ["тайна", "ум", "верность"], [0.6,0.1,-0.3,0.9,0.3,0.3,0.4,0.5,0.2,0.7]),
    ch("naruto_iruka", "Ирука Умино", "IR", "naruto_iruka", "Тёплый дом, честность и возможность выдохнуть.", "Добрый, зрелый, заботливый и эмоционально безопасный.", ["дом", "забота", "безопасность"], [0.9,0.5,-0.8,0.4,0.2,0.1,-0.1,1,-0.7,0.1]),
    ch("naruto_shikamaru", "Шикамару Нара", "SH", "naruto_shikamaru", "Лень, гениальность и отношения без суеты.", "Умный, саркастичный, надёжный и ценящий спокойствие.", ["ум", "спокойствие", "сарказм"], [0.8,0,-0.9,0.5,0.4,-0.1,0.1,0.4,-0.8,1]),
    ch("naruto_gaara", "Гаара", "GA", "naruto_gaara", "Тихая нежность и доверие заново.", "Сдержанный, глубокий, ответственный и очень бережный.", ["нежность", "ответственность", "доверие"], [0.9,0.2,-0.7,0.9,-0.4,0.8,-0.2,0.7,0.1,0.2]),
    ch("naruto_yamato", "Ямато", "YA", "naruto_yamato", "Стабильность, сухой юмор и деревянный дом мечты.", "Практичный, спокойный, сдержанно смешной и надёжный.", ["стабильность", "дом", "практичность"], [1,0.1,-0.9,0.3,0.3,0.3,-0.2,0.6,-0.7,0.4]),
    ch("naruto_itachi", "Итачи Учиха", "IT", "naruto_itachi", "Печальная красота, глубина и тихий выбор.", "Сложный, нежный, трагичный, умный в безопасном взрослом AU.", ["глубина", "тайна", "драма"], [0.3,0.3,-0.3,1,-0.6,0.5,-0.2,0.7,0.9,0.7]),
  ]),
  persona5: fandom("persona5", "Persona 5", "Романтический AU с взрослыми версиями персонажей, без школьной романтики.", "ночной Токио, джаз-бар, метро, дождливые улицы и кафе Leblanc", [
    ch("p5_ren", "Рэн Амамия", "RA", "p5_ren", "Стильный молчун и центр истории.", "Взрослая AU-версия: спокойный, загадочный, смелый и внимательный.", ["стиль", "тайна", "смелость"], [0.4,0.5,0.4,0.7,0.2,0.7,0.7,0.5,0.2,0.6]),
    ch("p5_ryuji", "Рюдзи Сакамото", "RY", "p5_ryuji", "Громкий, честный и живой солнечный хаос.", "Взрослая AU-версия: прямой, смешной, импульсивный и верный.", ["честность", "хаос", "смех"], [0.1,0.3,0.9,0.2,0.9,0.4,0.8,0.6,0.1,-0.5]),
    ch("p5_yusuke", "Юске Китагава", "YU", "p5_yusuke", "Искусство, странные фразы и непрактичность.", "Взрослая AU-версия: эстетичный, глубокий, странноватый и искренний.", ["искусство", "странность", "глубина"], [-0.1,0.5,0.3,0.8,0.4,0.5,0.6,0.3,0.2,0.7]),
    ch("p5_akechi", "Горо Акечи", "AK", "p5_akechi", "Идеальная улыбка, шахматы и опасный интеллект.", "Взрослая AU-версия: умный, напряжённый, сложный, slow burn.", ["интеллект", "драма", "контроль"], [-0.2,0.2,0.4,0.9,0.1,1,0.2,0,1,1]),
    ch("p5_iwai", "Мунэхиса Ивай", "IW", "p5_iwai", "Суровый вид, тёплое сердце и никакой ерунды.", "Взрослый, прямой, надёжный, с грубоватой заботой.", ["защита", "ответственность", "тепло"], [0.8,0.1,-0.2,0.5,-0.1,0.2,0.2,0.8,0.2,-0.4]),
    ch("p5_maruki", "Такуто Маруки", "MA", "p5_maruki", "Мягкость, разговоры и желание всё исправить.", "Взрослый, внимательный, заботливый, интеллектуальный и немного драматичный.", ["эмпатия", "разговоры", "ум"], [0.4,0.4,-0.4,0.8,0,0.6,-0.4,1,0.5,0.9]),
  ]),
  bg3: fandom("bg3", "Baldur's Gate 3", "Фэнтези, костёр, опасные дороги и романтический вайб.", "Фаэрун, лагерь у костра, таверны, руины, магия и ночи под звёздами", [
    ch("bg3_astarion", "Астарион", "AS", "bg3_astarion", "Флирт, сарказм и нежность, которой страшно доверять.", "Острый, театральный, свободолюбивый, драматичный и ранимый.", ["флирт", "сарказм", "свобода"], [-0.4,0.7,0.5,0.8,0.7,0.4,1,0.2,1,0.2]),
    ch("bg3_gale", "Гейл", "GA", "bg3_gale", "Магия, умные разговоры и переусложнённый ужин.", "Тёплый, книжный, романтичный, немного драматичный и разговорчивый.", ["магия", "романтика", "книги"], [0.3,0.8,0.1,0.8,0.4,0.8,0.1,0.7,0.5,1]),
    ch("bg3_wyll", "Уилл", "WY", "bg3_wyll", "Рыцарство, честь и танец у костра.", "Благородный, добрый, романтичный, ответственный и чуть сказочный.", ["честь", "романтика", "доброта"], [0.7,0.9,-0.1,0.4,0.2,0.7,0.2,0.8,0.2,0.1]),
    ch("bg3_halsin", "Хальсин", "HA", "bg3_halsin", "Лес, спокойствие и объятия размером с медведя.", "Спокойный, природный, свободный, зрелый и бережный.", ["природа", "зрелость", "забота"], [0.7,0.5,-0.3,0.5,0.1,0.1,1,0.9,-0.4,0.2]),
    ch("bg3_rolan", "Ролан", "RO", "bg3_rolan", "Сарказм, амбиции и маг, который растёт рядом.", "Колкий, гордый, умный, амбициозный, но способный на преданность.", ["сарказм", "амбиции", "магия"], [0.2,0.2,0.1,0.5,0.4,1,0.2,0.4,0.4,0.9]),
    ch("bg3_dammon", "Даммон", "DA", "bg3_dammon", "Кузница, доброе сердце и любовь через заботливые руки.", "Тёплый, практичный, честный, спокойный и поддерживающий.", ["тепло", "ремесло", "дом"], [0.9,0.5,-0.6,0.3,0.1,0.3,0.1,1,-0.5,0.3]),
  ]),
};

const QUESTION_CATEGORIES = [
  { id: "fun", label: "Приколы" },
  { id: "relationship", label: "Отношения" },
  { id: "memes", label: "Шутки и мемы" },
  { id: "interests", label: "Интересы" },
  { id: "social", label: "Жизнь и общение" },
];
const CATEGORY_WEIGHTS = {
  fun: { chaos: 0.8, humor: 0.8, freedom: 0.3 },
  relationship: { stability: 0.7, romance: 0.5, care: 0.6, drama: -0.4 },
  memes: { humor: 1, nerd: 0.4, chaos: 0.2 },
  interests: { nerd: 0.6, depth: 0.5, ambition: 0.3, romance: 0.2 },
  social: { stability: 0.4, care: 0.5, depth: 0.4, freedom: 0.2 },
};
const QUESTION_BANK = buildQuestionBank();
const form = document.querySelector("#quiz-form");
const questionRoot = document.querySelector("#quiz-questions");
const formMessage = document.querySelector("#form-message");
const quizPanel = document.querySelector("#quiz-panel");
const contentGrid = document.querySelector("#content-grid");
const resultPanel = document.querySelector("#result-panel");
const generateButton = document.querySelector("#generate-button");
const restartButton = document.querySelector("#restart-button");
const copyButton = document.querySelector("#copy-button");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const storyBox = document.querySelector("#story-box");
const storyStatus = document.querySelector("#story-status");
const storyTitle = document.querySelector("#story-title");
const storyIntro = document.querySelector("#story-intro");
const storyText = document.querySelector("#story-text");
const resultImage = document.querySelector("#result-image");
const resultImageFallback = document.querySelector("#result-image-fallback");
const resultCrest = document.querySelector("#result-crest");
const progressText = document.querySelector("#question-progress-text");
const progressFill = document.querySelector("#question-progress-fill");
const participantNameInput = document.querySelector("#participantName");
const ageConfirmedInput = document.querySelector("#ageConfirmed");
const fandomRoot = document.querySelector("#fandom-options");
const state = { fandom: FANDOMS.one_piece, result: null, answers: {}, story: null, questionOrder: [], currentQuestionIndex: 0 };

renderFandomOptions();
initializeQuiz();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateProfile()) return;
  persistCurrentAnswer();
  if (state.currentQuestionIndex < state.questionOrder.length - 1) {
    state.currentQuestionIndex += 1;
    renderCurrentQuestion();
    return;
  }
  const result = calculateResult();
  if (!result.ok) {
    formMessage.textContent = result.message;
    return;
  }
  formMessage.textContent = "";
  state.result = result.character;
  state.answers = result.answers;
  state.story = null;
  resetStoryUi();
  updateResultPanel(result.character, result.answers);
  quizPanel.classList.add("hidden");
  contentGrid.classList.add("result-mode");
  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

questionRoot.addEventListener("input", (event) => {
  if (event.target.matches('input[type="range"]')) {
    persistCurrentAnswer();
    updateSliderLabel(event.target);
  }
});

previousButton.addEventListener("click", () => {
  persistCurrentAnswer();
  if (state.currentQuestionIndex === 0) return;
  state.currentQuestionIndex -= 1;
  renderCurrentQuestion();
});

generateButton.addEventListener("click", async () => {
  if (!state.result) return;
  generateButton.disabled = true;
  storyStatus.textContent = "Генерирую историю... обычно это занимает 10-20 секунд.";
  storyBox.classList.add("hidden");
  const participantName = normalizeName(participantNameInput.value.trim());
  try {
    const response = await fetch("./api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participantName,
        fandomId: state.fandom.id,
        fandomName: state.fandom.label,
        fandomWorld: state.fandom.storyWorld,
        result: { id: state.result.id, name: state.result.name, subtitle: state.result.subtitle, promptFlavor: state.result.promptFlavor, traits: state.result.traits },
        answers: state.answers,
        visitorId: getVisitorId(),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Не удалось получить историю.");
    state.story = payload.story;
    storyTitle.textContent = payload.story.title;
    storyIntro.textContent = payload.story.intro;
    storyText.textContent = payload.story.story;
    storyBox.classList.remove("hidden");
    storyStatus.textContent = "История готова. Можно копировать или пройти тест ещё раз.";
    storyBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    storyStatus.textContent = error.message || "С генерацией что-то пошло не так. Проверь настройку OpenAI API на сервере.";
  } finally {
    generateButton.disabled = false;
  }
});

restartButton.addEventListener("click", () => {
  form.reset();
  formMessage.textContent = "";
  state.result = null;
  state.story = null;
  resultPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  contentGrid.classList.remove("result-mode");
  resetStoryUi();
  renderFandomOptions();
  initializeQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

copyButton.addEventListener("click", async () => {
  if (!state.story) return;
  const textToCopy = `${state.story.title}\n\n${state.story.intro}\n\n${state.story.story}`;
  try {
    await navigator.clipboard.writeText(textToCopy);
    storyStatus.textContent = "История скопирована в буфер обмена.";
  } catch (error) {
    storyStatus.textContent = "Не получилось скопировать автоматически, но текст уже на экране.";
  }
});

function renderFandomOptions() {
  fandomRoot.innerHTML = Object.values(FANDOMS).map((fandom) => `
    <label class="fandom-card">
      <input type="radio" name="fandom" value="${fandom.id}" ${fandom.id === state.fandom.id ? "checked" : ""} />
      <span><strong>${fandom.label}</strong><small>${fandom.note}</small></span>
    </label>
  `).join("");
  fandomRoot.onchange = (event) => {
    const selected = event.target.closest('input[name="fandom"]');
    if (!selected) return;
    state.fandom = FANDOMS[selected.value] || FANDOMS.one_piece;
    resetStoryUi();
    initializeQuiz();
    renderFandomOptions();
  };
}

function initializeQuiz() {
  state.questionOrder = selectQuestionsForRun();
  state.currentQuestionIndex = 0;
  state.answers = {};
  renderCurrentQuestion();
}

function selectQuestionsForRun() {
  return shuffleArray(QUESTION_CATEGORIES.flatMap((category) => {
    const pool = QUESTION_BANK.filter((question) => question.category === category.id);
    return shuffleArray(pool).slice(0, 2);
  }));
}

function renderCurrentQuestion() {
  const question = state.questionOrder[state.currentQuestionIndex];
  const answer = state.answers[question.id];
  const value = answer ? answer.percent : 50;
  const category = QUESTION_CATEGORIES.find((item) => item.id === question.category);
  const isLastQuestion = state.currentQuestionIndex === state.questionOrder.length - 1;
  questionRoot.innerHTML = `
    <section class="question-card slider-question-card">
      <p class="question-number">Вопрос ${state.currentQuestionIndex + 1} · ${category.label}</p>
      <h3>${question.statement}</h3>
      <div class="slider-answer">
        <div class="slider-scale"><span>0% · вообще нет</span><strong id="slider-value">${value}%</strong><span>100% · это я</span></div>
        <input id="current-slider" type="range" min="0" max="100" step="1" value="${value}" />
      </div>
    </section>
  `;
  const progressPercent = ((state.currentQuestionIndex + 1) / state.questionOrder.length) * 100;
  progressText.textContent = `${state.currentQuestionIndex + 1} / ${state.questionOrder.length}`;
  progressFill.style.width = `${progressPercent}%`;
  previousButton.disabled = state.currentQuestionIndex === 0;
  nextButton.textContent = isLastQuestion ? "Узнать результат" : "Дальше";
  formMessage.textContent = "";
}

function persistCurrentAnswer() {
  const question = state.questionOrder[state.currentQuestionIndex];
  const slider = form.querySelector("#current-slider");
  const percent = slider ? Number(slider.value) : 50;
  state.answers[question.id] = { id: question.id, category: question.category, statement: question.statement, percent, meaning: describePercent(percent), weights: question.weights };
}

function updateSliderLabel(slider) {
  const label = document.querySelector("#slider-value");
  if (label) label.textContent = `${slider.value}%`;
}
function validateProfile() {
  const participantName = normalizeName(participantNameInput.value.trim());
  if (!participantName) {
    formMessage.textContent = "Впиши имя: оно обязательно появится в итоговой истории.";
    participantNameInput.focus();
    return false;
  }
  if (!ageConfirmedInput.checked) {
    formMessage.textContent = "Нужно подтвердить 18+, чтобы сгенерировать романтическую историю.";
    return false;
  }
  participantNameInput.value = participantName;
  return true;
}

function calculateResult() {
  const vector = Object.fromEntries(DIMENSIONS.map((dimension) => [dimension, 0]));
  const answers = state.questionOrder.map((question) => state.answers[question.id]).filter(Boolean);
  for (const answer of answers) {
    const normalized = (answer.percent - 50) / 50;
    Object.entries(answer.weights).forEach(([dimension, weight]) => { vector[dimension] += normalized * weight; });
  }
  const scored = state.fandom.characters.map((candidate) => ({ character: candidate, score: scoreCharacter(vector, candidate.profile) })).sort((left, right) => right.score - left.score);
  return { ok: true, character: scored[0].character, answers };
}

function scoreCharacter(vector, profile) {
  return DIMENSIONS.reduce((sum, dimension) => sum + vector[dimension] * (profile[dimension] || 0), 0);
}

function updateResultPanel(character, answers) {
  resultCrest.textContent = character.crest;
  document.querySelector("#result-name").textContent = character.name;
  document.querySelector("#result-subtitle").textContent = character.subtitle;
  document.querySelector("#result-description").textContent = character.description;
  document.querySelector("#result-traits").innerHTML = character.traits.map((trait) => `<span>${trait}</span>`).join("");
  updateResultImage(character);
  const answerHighlights = answers.slice(0, 3).map((entry) => `${entry.percent}% · ${entry.statement}`).join(" • ");
  document.querySelector("#result-label").textContent = `Твой мэтч · ${state.fandom.label}`;
  storyStatus.textContent = `Совпадение собрано по шкалам: ${answerHighlights}`;
}

function updateResultImage(character) {
  const embeddedImage = character.imageKey && window.CHARACTER_IMAGE_DATA && window.CHARACTER_IMAGE_DATA[character.imageKey] ? window.CHARACTER_IMAGE_DATA[character.imageKey] : "";
  resultImage.classList.add("hidden");
  resultImageFallback.classList.add("hidden");
  resultCrest.classList.remove("hidden");
  resultImage.removeAttribute("src");
  resultImage.alt = "";
  resultImage.onload = null;
  resultImage.onerror = null;
  if (!embeddedImage) return;
  resultImage.onerror = () => {
    resultImage.classList.add("hidden");
    resultCrest.classList.remove("hidden");
  };
  resultImage.classList.remove("hidden");
  resultCrest.classList.add("hidden");
  resultImage.src = embeddedImage;
  resultImage.alt = `Портрет персонажа ${character.name}`;
}

function resetStoryUi() {
  storyTitle.textContent = "Ваша история";
  storyIntro.textContent = "";
  storyText.textContent = "";
  storyBox.classList.add("hidden");
  storyStatus.textContent = "";
}

function buildQuestionBank() {
  const rows = {
    fun: ["Я бы выжил(а) в приключении только за счёт харизмы и перекусов.", "Если план звучит тупо, но весело, я минимум на 30% уже согласен(на).", "В компании я иногда превращаюсь в человека, который сказал: 'ну ладно, погнали'.", "Я могу серьёзно обсуждать, кого брать в команду на апокалипсис.", "Если у человека смешной смех, я уже немного на его стороне.", "Мне важно, чтобы партнёр понимал мой внутренний цирк.", "Я иногда драматизирую бытовые мелочи ради атмосферы.", "Я могу привязаться к человеку из-за одной идеально тупой шутки.", "В споре 'пойти домой или ещё на одну авантюру' я опасно часто выбираю авантюру.", "Мне нравится, когда отношения ощущаются как наш маленький заговор против скуки.", "Если партнёр умеет готовить, чинить или колдовать чай из ничего, это почти магия.", "Я бы дал(а) название нашей команде даже для похода в магазин.", "Я люблю людей, которые могут быть эффектными без попытки выглядеть нормальными.", "Мне нравится, когда партнёр слегка странный, но с добрым сердцем.", "Моя социальная батарейка иногда заряжается от чистого абсурда.", "Я бы пошёл/пошла на свидание в место с сомнительными отзывами ради истории.", "Мне важнее вайб, чем идеальный план.", "Я могу влюбиться в человека, который красиво злится на мелкую несправедливость.", "Я верю, что совместная глупость сближает быстрее, чем идеальное свидание.", "Если рядом со мной можно быть немного кринжовым, это плюс."],
    relationship: ["В отношениях мне важнее стабильность, чем постоянные эмоциональные качели.", "Я хочу, чтобы партнёр прямо говорил о чувствах, а не заставлял угадывать.", "Мне нужно личное пространство даже в очень близких отношениях.", "Я ценю slow burn больше, чем мгновенный фейерверк.", "Меня цепляют поступки больше, чем громкие признания.", "Я хочу отношений, где мы оба растём, а не просто мило смотримся вместе.", "Мне трудно доверять быстро, даже если человек очень нравится.", "Я не люблю ревность как способ 'доказать любовь'.", "Мне важно, чтобы партнёр был эмоционально взрослым.", "Я хочу, чтобы любовь ощущалась и в быту, а не только на красивых моментах.", "Если конфликт случился, я предпочту честный разговор, а не молчаливую войну.", "Мне нравится, когда партнёр защищает мои границы перед другими.", "Я хочу быть с человеком, который уважает моих друзей и мой круг.", "Мне важна нежность, даже если она выражается очень тихо.", "Я скорее выберу надёжного человека, чем самого яркого в комнате.", "Мне нравится, когда в отношениях есть ощущение команды.", "Я могу долго терпеть, но если доверие сломано, вернуть его сложно.", "Мне нужно, чтобы партнёр принимал мои странности без попытки 'исправить'.", "Я хочу романтики, но без ощущения, что меня душат вниманием.", "Мне важно строить будущее, а не только ловить момент."],
    memes: ["Мои мемы иногда объясняют моё состояние точнее, чем слова.", "Если человек не понимает мой юмор, мне становится чуть грустнее.", "Я могу отправить мем вместо признания в любви.", "Мне нравятся люди, которые умеют шутить без злости.", "Внутренние шутки пары для меня почти отдельный язык любви.", "Я легко заражаюсь чужим смехом.", "Сарказм мне ок, если под ним не прячется жестокость.", "Я люблю, когда человек может пошутить над собой.", "Мемный хаос в переписке для меня может быть флиртом.", "Я иногда сохраняю мемы 'на случай важного разговора'.", "Если партнёр поддерживает тупую шутку, я чувствую себя принятой/принятым.", "Я люблю драматично цитировать что-то не к месту.", "Мой идеальный флирт может начинаться с 'смотри, какая фигня'.", "Я ценю людей, которые понимают, когда надо пошутить, а когда замолчать.", "Я могу переслать 12 мемов подряд и считать это заботой.", "Мне нравится сухой юмор, который доходит через три секунды.", "Я люблю партнёров с эффектом 'с виду серьёзный, внутри мем'.", "У меня есть любимые шутки, которые я повторяю слишком часто.", "Если человек не смеётся над моим лучшим мемом, я проведу внутреннее расследование.", "Я считаю, что совместный кринж может быть романтичным."],
    interests: ["Мне нравится обсуждать лор, теории и странные детали мира.", "Я лучше выберу вечер дома с едой и историей, чем шумный выход.", "Мне важно, чтобы у партнёра были свои увлечения и огонь в глазах.", "Я люблю эстетичные места: кафе, крыши, музеи, красивые улицы.", "Меня легко увлечь поездкой, если там будет новая атмосфера.", "Я скорее книжный/игровой/сериальный человек, чем тусовочный.", "Мне нравятся люди, с которыми можно молчать и всё равно не скучно.", "Я люблю, когда человек умеет делать что-то руками.", "Музыка сильно влияет на мой вайб и настроение.", "Я люблю строить планы, даже если потом жизнь всё переиграет.", "Мне интересны люди, у которых есть немного странная специализация.", "Я люблю уютные ритуалы: чай, прогулка, любимое место, повторяемые мелочи.", "Мне нравится, когда партнёр может научить меня чему-то новому.", "Я могу залипнуть в разговор о морали персонажей на час.", "Я люблю активность, где есть немного риска и история на потом.", "Еда как часть свидания для меня реально важна.", "Мне нравится, когда отношения вдохновляют делать что-то своё.", "Я люблю тёмную эстетику, тайны и персонажей с секретами.", "Мне важны добрые бытовые мелочи больше, чем большие жесты.", "Я легко привязываюсь к местам, где было эмоционально хорошо."],
    social: ["В большой компании я сначала наблюдаю, а потом включаюсь.", "Я быстро устаю от поверхностного общения.", "Мне проще быть собой рядом с людьми, которые не давят.", "Я часто замечаю настроение других людей.", "Мне важно, чтобы человек был вежлив с теми, от кого ему ничего не нужно.", "Я не люблю, когда кто-то делает отношения публичным спектаклем.", "Я могу быть очень общительным/общительной, если рядом безопасные люди.", "Мне нужно время, чтобы подпустить человека ближе.", "Я ценю людей, которые держат слово.", "Я не люблю, когда мои границы проверяют 'на прочность'.", "В дружбе и любви я предпочитаю честность даже неловкому комфорту.", "Я могу быть душой компании, если настроение совпало.", "Мне нравятся люди, которые умеют не заполнять каждую паузу.", "Я часто беру на себя роль человека, который всех мирит или собирает.", "Я не против спонтанности, если есть хотя бы базовый план выживания.", "Мне важно, чтобы партнёр уважал мою социальную батарейку.", "Я выбираю близкий круг тщательно.", "Мне нравится, когда человек не боится выглядеть искренним.", "В людях меня цепляет не статус, а то, как они ведут себя в мелочах.", "Я хочу, чтобы рядом с партнёром мир становился спокойнее, а не шумнее."],
  };
  return Object.entries(rows).flatMap(([category, statements]) => statements.map((statement, index) => ({ id: `${category}-${index + 1}`, category, statement, weights: CATEGORY_WEIGHTS[category] })));
}

function describePercent(percent) {
  if (percent <= 15) return "совсем не согласна/не согласен";
  if (percent <= 40) return "скорее не про меня";
  if (percent < 60) return "примерно посередине";
  if (percent < 85) return "скорее про меня";
  return "это очень про меня";
}
function normalizeName(value) { return value.replace(/[^A-Za-zА-Яа-яЁё0-9\s\-'.]/g, "").replace(/\s+/g, " ").trim().slice(0, 40); }
function getVisitorId() {
  const storageKey = "fandom-quiz-visitor-id";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;
  const created = `visitor-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  window.localStorage.setItem(storageKey, created);
  return created;
}
function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
