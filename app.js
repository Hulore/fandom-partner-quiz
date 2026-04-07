const CHARACTERS = {
  zoro: {
    id: "zoro",
    name: "Ророноа Зоро",
    crest: "ZR",
    image: "/assets/characters/zoro.jpg",
    subtitle: "Тихая опора, которая любит не словами, а постоянством.",
    description:
      "Тебе подходит человек, рядом с которым шум мира затихает. С Зоро любовь выглядит как редкая, почти суровая преданность: мало лишних фраз, зато много поступков.",
    traits: ["верность", "сила", "спокойствие", "защита"],
    promptFlavor:
      "Сдержанный, надёжный, прямой, глубоко преданный. Показывает любовь поступками, а не долгими признаниями.",
  },
  sanji: {
    id: "sanji",
    name: "Санджи",
    crest: "SJ",
    image: "/assets/characters/sanji.jpg",
    subtitle: "Романтик, который превращает обычный вечер в событие.",
    description:
      "Тебе откликается яркая забота, внимание к мелочам и партнёр, который умеет делать каждый день чуть красивее. Санджи любит щедро, пылко и очень по-домашнему.",
    traits: ["романтика", "забота", "верность", "огонь"],
    promptFlavor:
      "Очень романтичный, внимательный, заботливый, умеет создавать уют и красивую повседневность. Эмоциональный, но искренний.",
  },
  law: {
    id: "law",
    name: "Трафальгар Ло",
    crest: "LW",
    image: "/assets/characters/law.jpg",
    subtitle: "Человек-тайна, который впускает в сердце только по-настоящему своего.",
    description:
      "Тебе подходит сложная, медленная и глубокая привязанность. Ло не раскрывается всем подряд, но если уж выбирает тебя, то это серьёзно, надолго и очень честно.",
    traits: ["интеллект", "глубина", "доверие", "медленный burn"],
    promptFlavor:
      "Спокойный, умный, закрытый, точный в словах. Любовь развивается медленно, но очень глубоко и надёжно.",
  },
  ace: {
    id: "ace",
    name: "Портгас Д. Эйс",
    crest: "AC",
    image: "/assets/characters/ace.jpg",
    subtitle: "Солнечный пожар, рядом с которым жизнь чувствуется ярче.",
    description:
      "Тебя тянет к людям, в которых много света, риска и щедрого сердца. С Эйсом история выходит живой, искренней и полной ощущения, что каждый день стоит проживать смело.",
    traits: ["страсть", "искренность", "смелость", "тепло"],
    promptFlavor:
      "Харизматичный, тёплый, смелый, импульсивный, но очень сердечный. Любовь с ним яркая, живая и честная.",
  },
  shanks: {
    id: "shanks",
    name: "Шанкс",
    crest: "SK",
    image: "/assets/characters/shanks.jpg",
    subtitle: "Свобода, смех и редкая уверенность, что рядом взрослый человек.",
    description:
      "Тебе подходит кто-то харизматичный и лёгкий, но по-настоящему надёжный в важные моменты. Шанкс умеет делать жизнь шире, веселее и при этом безопаснее.",
    traits: ["харизма", "надёжность", "свобода", "взрослость"],
    promptFlavor:
      "Уверенный, обаятельный, свободолюбивый, эмоционально зрелый. Даёт много воздуха, смеха и чувства надёжности.",
  },
  sabo: {
    id: "sabo",
    name: "Сабо",
    crest: "SB",
    image: "/assets/characters/sabo.jpg",
    subtitle: "Нежная интеллигентность, идеалы и чувство настоящего союза.",
    description:
      "Тебе важен партнёр, с которым можно и мечтать, и строить реальную жизнь. Сабо даёт чувство товарищества, уважения и любви, в которой вы оба становитесь сильнее.",
    traits: ["уважение", "идеализм", "нежность", "партнёрство"],
    promptFlavor:
      "Мягкий, внимательный, умный и идейный. Любовь строится на уважении, дружбе, общих ценностях и спокойной глубине.",
  },
};

const QUESTIONS = [
  {
    id: "q1",
    prompt: "Ты приходишь на большую вечеринку, где почти никого не знаешь. Что происходит дальше?",
    options: [
      {
        title: "Нахожу одного-двух близких по вайбу людей и держусь рядом с ними весь вечер",
        note: "Тебе важнее качество контакта, чем масштаб внимания.",
        scores: { law: 3, zoro: 2, sabo: 1 },
      },
      {
        title: "Через десять минут уже смеюсь с половиной комнаты и знакомлю людей друг с другом",
        note: "Ты быстро разогреваешь пространство вокруг себя.",
        scores: { shanks: 3, ace: 2, sanji: 1 },
      },
      {
        title: "Сначала наблюдаю, а потом мягко включаюсь через разговоры один на один",
        note: "Ты не холодный человек, просто любишь входить в контакт осознанно.",
        scores: { sabo: 3, law: 2, sanji: 1 },
      },
      {
        title: "Если я там, то по делу или ради своих. Без нужды центр сцены мне не нужен",
        note: "Уверенность без желания лишний раз светиться.",
        scores: { zoro: 3, ace: 1, shanks: 1 },
      },
    ],
  },
  {
    id: "q2",
    prompt: "Что для тебя важнее всего в общении с новым человеком?",
    options: [
      {
        title: "Чтобы разговор был лёгким, живым и с ощущением искры",
        note: "Химия и энергия для тебя значат многое.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Чтобы чувствовались уважение, такт и внимание к моим границам",
        note: "Нормальный контакт начинается с безопасности.",
        scores: { law: 2, sabo: 2, zoro: 2 },
      },
      {
        title: "Чтобы человек умел быть заботливым и замечал мелочи",
        note: "Тёплое отношение цепляет тебя сильнее эффектных слов.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "Чтобы за харизмой стоял настоящий характер, а не пустой образ",
        note: "Ты хорошо считываешь внутренний стержень.",
        scores: { zoro: 2, shanks: 2, law: 1, sabo: 1 },
      },
    ],
  },
  {
    id: "q3",
    prompt: "Когда ты сильно устаёшь от людей, что помогает восстановиться?",
    options: [
      {
        title: "Побыть в тишине рядом с кем-то своим, без обязательных разговоров",
        note: "Близость для тебя не требует постоянной вербальности.",
        scores: { zoro: 3, law: 2, sabo: 1 },
      },
      {
        title: "Сменить обстановку, выйти куда-то и снова почувствовать вкус к жизни",
        note: "Тебя лечат движение, ветер и новые впечатления.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Неспешный разговор с человеком, который умеет слушать по-настоящему",
        note: "Тебе важно быть услышанной, а не просто отвлечённой.",
        scores: { sabo: 3, law: 2, sanji: 1 },
      },
      {
        title: "Забота через действия: еда, уют, плед, вода, маленькие жесты",
        note: "Ты чувствуешь любовь через конкретную поддержку.",
        scores: { sanji: 3, zoro: 1, shanks: 1 },
      },
    ],
  },
  {
    id: "q4",
    prompt: "Как ты обычно ведёшь себя в конфликте?",
    options: [
      {
        title: "Молчу до тех пор, пока не смогу сказать всё коротко и по сути",
        note: "Ты не любишь шум, но умеешь быть предельно честной.",
        scores: { zoro: 3, law: 2, sabo: 1 },
      },
      {
        title: "Хочу сразу всё обсудить и понять, что чувствует другой человек",
        note: "Для тебя отношения важнее гордости.",
        scores: { sabo: 3, sanji: 2, ace: 1 },
      },
      {
        title: "Могу вспыхнуть, но так же быстро оттаиваю, если вижу искренность",
        note: "Эмоции живые, зато без долгой игры в холод.",
        scores: { ace: 3, sanji: 1, shanks: 1 },
      },
      {
        title: "Мне нужно время, анализ и спокойный разговор без давления",
        note: "Ты не избегаешь проблемы, а хочешь разобрать её точно.",
        scores: { law: 3, sabo: 2, zoro: 1 },
      },
    ],
  },
  {
    id: "q5",
    prompt: "Какой тип поддержки тебе особенно важен в отношениях?",
    options: [
      {
        title: "Чтобы человек был моей спокойной опорой, даже если говорит мало",
        note: "Надёжность для тебя звучит очень романтично.",
        scores: { zoro: 3, law: 1, shanks: 1 },
      },
      {
        title: "Чтобы он делал мою повседневность мягче и красивее",
        note: "Ты замечаешь бытовую нежность и дорожишь ею.",
        scores: { sanji: 3, sabo: 1, ace: 1 },
      },
      {
        title: "Чтобы рядом было чувство партнёрства и общей стороны в мире",
        note: "Ты ищешь не только любовь, но и союз.",
        scores: { sabo: 3, shanks: 2, law: 1 },
      },
      {
        title: "Чтобы со мной было легко смеяться, рисковать и снова выбирать жизнь",
        note: "Тебе нужен человек, который не тушит тебя, а разжигает.",
        scores: { ace: 2, shanks: 2, sanji: 1 },
      },
    ],
  },
  {
    id: "q6",
    prompt: "Что ты думаешь о переписке в течение дня?",
    options: [
      {
        title: "Не люблю сто сообщений подряд, лучше коротко, но по делу и с теплом",
        note: "Связь должна не утомлять, а поддерживать.",
        scores: { zoro: 2, law: 2, sabo: 1, shanks: 1 },
      },
      {
        title: "Обожаю живые сообщения, мемы, внезапные фото и ощущение присутствия",
        note: "Тебе нравится, когда контакт пульсирует.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Мне важно, чтобы человек писал внимательно и не пропадал без объяснения",
        note: "Для тебя регулярность связана с уважением.",
        scores: { sabo: 3, sanji: 2, law: 1 },
      },
      {
        title: "Пусть пишет мало, но чтобы в сообщениях чувствовалась настоящая глубина",
        note: "Смысл важнее потока.",
        scores: { law: 3, zoro: 1, sabo: 1 },
      },
    ],
  },
  {
    id: "q7",
    prompt: "Какой человек обычно становится для тебя “своим”?",
    options: [
      {
        title: "Тот, рядом с кем не надо играть социальную роль",
        note: "Ты ценишь редкое чувство простоты и покоя.",
        scores: { zoro: 3, law: 2, sabo: 1 },
      },
      {
        title: "Тот, кто умеет быть тёплым и внимательным в мелочах",
        note: "Твоё доверие часто открывается через заботу.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "Тот, с кем интересно спорить, говорить и постепенно раскрываться",
        note: "Тебе важна интеллектуальная и эмоциональная глубина.",
        scores: { law: 3, sabo: 2, zoro: 1 },
      },
      {
        title: "Тот, кто приносит в жизнь свет, смех и широкое дыхание",
        note: "Ты влюбляешься в энергию, которая делает мир просторнее.",
        scores: { shanks: 3, ace: 2, sanji: 1 },
      },
    ],
  },
  {
    id: "q8",
    prompt: "Как ты относишься к тому, чтобы смешивать отношения и круг друзей?",
    options: [
      {
        title: "Мне нравится, когда партнёр постепенно становится частью моего круга",
        note: "Для тебя близость включает интеграцию в жизнь друг друга.",
        scores: { sabo: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Пусть будет уважение, но не обязательно смешивать всё в одну компанию",
        note: "Ты различаешь личное пространство и общий быт.",
        scores: { law: 3, zoro: 2, shanks: 1 },
      },
      {
        title: "Обожаю, когда все ладят и вокруг много общего смеха",
        note: "Тебе важно чувство живой общей компании.",
        scores: { shanks: 3, ace: 2, sanji: 1 },
      },
      {
        title: "Мне достаточно, чтобы с уважением относились к моим людям и не усложняли",
        note: "Не нужен шоу-кейс отношений, нужна адекватность.",
        scores: { zoro: 3, sabo: 1, law: 1 },
      },
    ],
  },
  {
    id: "q9",
    prompt: "Если у твоего партнёра плохой день, как ты скорее проявишь любовь?",
    options: [
      {
        title: "Сделаю что-то полезное и тихо сниму часть нагрузки",
        note: "Любовь для тебя часто практична.",
        scores: { zoro: 2, sanji: 2, sabo: 1, law: 1 },
      },
      {
        title: "Окружу вниманием, приготовлю что-то приятное, создам уют",
        note: "Ты умеешь лечить теплом и деталями.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "Вытащу его из мрака смехом, прогулкой или чем-то ярким",
        note: "Ты возвращаешь жизнь через движение.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Сяду рядом и дам пространство, в котором можно честно открыться",
        note: "Ты не давишь, а создаёшь безопасную глубину.",
        scores: { law: 3, sabo: 2, zoro: 1 },
      },
    ],
  },
  {
    id: "q10",
    prompt: "Что в социальном поведении человека может тебя влюбить?",
    options: [
      {
        title: "Он спокоен, не рисуется и всё равно ощущается самым сильным",
        note: "Тебя цепляет собранность без показухи.",
        scores: { zoro: 3, law: 1, shanks: 1 },
      },
      {
        title: "Он умеет быть обаятельным, но не теряет уважения к людям вокруг",
        note: "Харизма для тебя ценна только вместе с взрослостью.",
        scores: { shanks: 3, sabo: 2, sanji: 1 },
      },
      {
        title: "Он замечает, кто устал, кому одиноко, кому нужна помощь",
        note: "Тебя трогает человечность в мелочах.",
        scores: { sanji: 3, sabo: 2, law: 1 },
      },
      {
        title: "Он говорит мало, но когда говорит, в этом есть вес и точность",
        note: "Ты любишь людей, за словами которых стоит содержание.",
        scores: { law: 3, zoro: 2, sabo: 1 },
      },
    ],
  },
  {
    id: "q11",
    prompt: "Какой формат выходных с любимым человеком тебе ближе?",
    options: [
      {
        title: "Остаться вдвоём, исчезнуть для мира и никому ничего не доказывать",
        note: "Интимность для тебя часто тише, чем у других.",
        scores: { law: 2, zoro: 2, sanji: 1, sabo: 1 },
      },
      {
        title: "Сходить куда-то красивое, вкусное или чуть праздничное даже без повода",
        note: "Ты любишь, когда жизнь делают чуть прекраснее намеренно.",
        scores: { sanji: 3, shanks: 1, ace: 1 },
      },
      {
        title: "Собраться с друзьями, смеяться, жить и потом уйти вдвоём в ночь",
        note: "Тебе нравится сочетание общего мира и личной близости.",
        scores: { shanks: 3, ace: 2, sanji: 1 },
      },
      {
        title: "Устроить день, где есть и смысл, и движение: разговоры, планы, дела",
        note: "Ты любишь отношения, встроенные в реальную жизнь.",
        scores: { sabo: 3, zoro: 1, law: 1 },
      },
    ],
  },
  {
    id: "q12",
    prompt: "Когда ты влюбляешься, что меняется в твоём поведении с людьми?",
    options: [
      {
        title: "Я становлюсь мягче, но это видно только самым близким",
        note: "Ты не выносишь чувства на площадь, но они сильные.",
        scores: { zoro: 3, law: 2, sabo: 1 },
      },
      {
        title: "Мне хочется заботиться, радовать и делать человеку красиво",
        note: "Твоя любовь сразу превращается в действие.",
        scores: { sanji: 3, sabo: 1, ace: 1 },
      },
      {
        title: "Я оживаю ещё сильнее, больше смеюсь и становлюсь смелее",
        note: "Любовь расширяет твою энергию.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Я дольше проверяю чувства, но потом открываюсь очень серьёзно",
        note: "Ты входишь в близость не быстро, зато глубоко.",
        scores: { law: 3, sabo: 2, zoro: 1 },
      },
    ],
  },
  {
    id: "q13",
    prompt: "Какой стиль юмора в отношениях тебе ближе?",
    options: [
      {
        title: "Тихие внутренние шутки, понятные только нам двоим",
        note: "Тебе нравится чувство собственного маленького мира.",
        scores: { law: 2, zoro: 2, sabo: 1, sanji: 1 },
      },
      {
        title: "Лёгкий флирт, красивые слова и игра в романтику",
        note: "Ты любишь, когда любовь умеет быть искусством.",
        scores: { sanji: 3, shanks: 1, ace: 1 },
      },
      {
        title: "Шумный смех, авантюры и ощущение, что с этим человеком невозможно заскучать",
        note: "Тебе подходит энергия, которая постоянно будит жизнь.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Умный, точный юмор и моменты, когда взгляда достаточно",
        note: "Тебе нравится неочевидная, взрослая химия.",
        scores: { sabo: 2, law: 2, zoro: 1, shanks: 1 },
      },
    ],
  },
  {
    id: "q14",
    prompt: "Что ты думаешь о личных границах в отношениях?",
    options: [
      {
        title: "Они обязательны: даже большая любовь не отменяет личное пространство",
        note: "Ты за зрелую близость без поглощения.",
        scores: { law: 3, sabo: 2, zoro: 1 },
      },
      {
        title: "Границы важны, но мне нравится сильное ощущение “мы”",
        note: "Ты хочешь близости, не теряя себя.",
        scores: { sabo: 3, sanji: 2, shanks: 1 },
      },
      {
        title: "Для меня главное не теория, а чтобы человек уважал мои ритмы",
        note: "Ты смотришь на поведение, а не на правильные слова.",
        scores: { zoro: 3, law: 1, shanks: 1 },
      },
      {
        title: "Мне важна свобода, воздух и отсутствие ощущения клетки",
        note: "Связь должна расширять жизнь, а не сужать её.",
        scores: { shanks: 3, ace: 2, sabo: 1 },
      },
    ],
  },
  {
    id: "q15",
    prompt: "Как ты относишься к публичному проявлению чувств?",
    options: [
      {
        title: "Мне ближе приватность: самое настоящее лучше оставлять своим",
        note: "Твоя нежность не нуждается в зрителях.",
        scores: { zoro: 3, law: 2, sabo: 1 },
      },
      {
        title: "Небольшие жесты в обществе приятны, если они красивые и уважительные",
        note: "Тебе нравится тонкая, элегантная романтика.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "Мне нравится, когда любовь не приходится прятать слишком сильно",
        note: "Тепло и открытость делают тебя счастливее.",
        scores: { ace: 2, shanks: 2, sanji: 1 },
      },
      {
        title: "Зависит от момента, но важнее всего естественность, а не показ",
        note: "Ты не за правила, а за органичность.",
        scores: { sabo: 3, law: 1, shanks: 1 },
      },
    ],
  },
  {
    id: "q16",
    prompt: "Если твой партнёр очень популярен среди людей, что для тебя главное?",
    options: [
      {
        title: "Чтобы он умел держать фокус и не заставлял меня сомневаться в его выборе",
        note: "Тебе важна ясность и устойчивость.",
        scores: { zoro: 2, sabo: 2, law: 1, shanks: 1 },
      },
      {
        title: "Чтобы за внешним вниманием он всё равно оставался особенно нежным со мной",
        note: "Личное качество связи важнее количества взглядов со стороны.",
        scores: { sanji: 3, shanks: 1, ace: 1 },
      },
      {
        title: "Чтобы он не играл в ревность и не создавал дешёвую драму",
        note: "Ты предпочитаешь взрослую уверенность.",
        scores: { law: 3, shanks: 2, sabo: 1 },
      },
      {
        title: "Чтобы мы просто смеялись над этим и шли дальше жить свою жизнь",
        note: "Ты не хочешь тратить любовь на лишнюю тревогу.",
        scores: { shanks: 3, ace: 2, sanji: 1 },
      },
    ],
  },
  {
    id: "q17",
    prompt: "Как тебе приятнее всего знакомить любимого человека со своими друзьями или семьёй?",
    options: [
      {
        title: "Постепенно, в спокойной обстановке, без давления и большого шоу",
        note: "Тебе важна мягкая адаптация, а не официальный ритуал.",
        scores: { law: 3, zoro: 2, sabo: 1 },
      },
      {
        title: "Через тёплый ужин или продуманный вечер, чтобы всем было хорошо",
        note: "Ты ценишь атмосферу и комфорт для всех.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "В живом общем движении: встреча, поездка, праздник, спонтанность",
        note: "Тебе нравится, когда люди просто естественно начинают жить рядом.",
        scores: { ace: 2, shanks: 2, sanji: 1 },
      },
      {
        title: "Когда я уже точно понимаю, что это серьёзно и человек правда мой",
        note: "Ты не любишь впускать в ближний круг случайных людей.",
        scores: { zoro: 3, law: 1, sabo: 1 },
      },
    ],
  },
  {
    id: "q18",
    prompt: "В совместной жизни тебя сильнее всего трогает...",
    options: [
      {
        title: "Когда человек стабилен, держит слово и на него можно опереться",
        note: "Ты влюбляешься в постоянство.",
        scores: { zoro: 3, sabo: 1, law: 1 },
      },
      {
        title: "Когда он делает рутину нежной и заботливой",
        note: "Любовь в быту для тебя очень реальна.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "Когда остаётся чувство дружбы, уважения и общей дороги",
        note: "Тебе нужен союз, который взрослеет вместе с вами.",
        scores: { sabo: 3, law: 2, shanks: 1 },
      },
      {
        title: "Когда даже спустя годы рядом всё ещё есть свобода, смех и воздух",
        note: "Ты не хочешь, чтобы любовь становилась клеткой.",
        scores: { shanks: 3, ace: 2, sanji: 1 },
      },
    ],
  },
  {
    id: "q19",
    prompt: "Какой тип общего будущего тебе кажется самым притягательным именно социально?",
    options: [
      {
        title: "Небольшой, но очень свой круг, где всем спокойно и хорошо",
        note: "Ты выбираешь глубину вместо количества.",
        scores: { zoro: 3, law: 2, sabo: 1 },
      },
      {
        title: "Дом, куда друзья и близкие приходят как в тёплую гавань",
        note: "Для тебя любовь может быть центром гостеприимного мира.",
        scores: { sanji: 3, sabo: 2, shanks: 1 },
      },
      {
        title: "Большая, шумная, живая жизнь с людьми, дорогами и историями",
        note: "Ты хочешь, чтобы чувства жили внутри приключения.",
        scores: { ace: 3, shanks: 2, sanji: 1 },
      },
      {
        title: "Сильное партнёрство, где вы вместе влияете на мир вокруг",
        note: "Тебя вдохновляет любовь как союз двух взрослых личностей.",
        scores: { sabo: 3, shanks: 1, law: 1 },
      },
    ],
  },
  {
    id: "q20",
    prompt: "Какая фраза про любовь и людей звучит для тебя наиболее верно?",
    options: [
      {
        title: "«Настоящий человек не шумит о любви, он просто остаётся.»",
        note: "Тебе близка тихая верность.",
        scores: { zoro: 3, law: 1, sabo: 1 },
      },
      {
        title: "«Любовь видно по тому, как с тобой обращаются каждый день.»",
        note: "Ты веришь в повседневную нежность больше, чем в декларации.",
        scores: { sanji: 3, sabo: 1, shanks: 1 },
      },
      {
        title: "«Любить — это доверять человеку своё настоящее лицо.»",
        note: "Для тебя близость равна глубине и уязвимости.",
        scores: { law: 3, sabo: 2, zoro: 1 },
      },
      {
        title: "«С правильным человеком мир становится шире, а не теснее.»",
        note: "Ты хочешь, чтобы любовь не уменьшала жизнь, а раскрывала её.",
        scores: { shanks: 3, ace: 2, sabo: 1 },
      },
    ],
  },
];

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

const state = {
  result: null,
  answers: {},
  story: null,
  questionOrder: [],
  currentQuestionIndex: 0,
};

initializeQuiz();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateProfile()) {
    return;
  }

  if (!persistCurrentAnswer({ showError: true })) {
    return;
  }

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

questionRoot.addEventListener("change", () => {
  persistCurrentAnswer({ showError: false });
  formMessage.textContent = "";
});

previousButton.addEventListener("click", () => {
  persistCurrentAnswer({ showError: false });

  if (state.currentQuestionIndex === 0) {
    return;
  }

  state.currentQuestionIndex -= 1;
  renderCurrentQuestion();
});

generateButton.addEventListener("click", async () => {
  if (!state.result) {
    return;
  }

  generateButton.disabled = true;
  storyStatus.textContent = "Генерирую историю... обычно это занимает 10-20 секунд.";
  storyBox.classList.add("hidden");

  const participantName = normalizeName(
    document.querySelector("#participantName").value.trim(),
  );

  try {
    const response = await fetch("./api/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participantName,
        resultId: state.result.id,
        answers: state.answers,
        visitorId: getVisitorId(),
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.error || "Не удалось получить историю.");
    }

    state.story = payload.story;
    storyTitle.textContent = payload.story.title;
    storyIntro.textContent = payload.story.intro;
    storyText.textContent = payload.story.story;
    storyBox.classList.remove("hidden");
    storyStatus.textContent = "История готова. Можно копировать или пройти тест ещё раз.";
    storyBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    storyStatus.textContent =
      error.message ||
      "С генерацией что-то пошло не так. Проверь настройку OpenAI API на сервере.";
  } finally {
    generateButton.disabled = false;
  }
});

restartButton.addEventListener("click", () => {
  form.reset();
  formMessage.textContent = "";
  state.result = null;
  state.answers = {};
  state.story = null;
  resultPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  contentGrid.classList.remove("result-mode");
  resetStoryUi();
  initializeQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

copyButton.addEventListener("click", async () => {
  if (!state.story) {
    return;
  }

  const textToCopy = `${state.story.title}\n\n${state.story.intro}\n\n${state.story.story}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    storyStatus.textContent = "История скопирована в буфер обмена.";
  } catch (error) {
    storyStatus.textContent = "Не получилось скопировать автоматически, но текст уже на экране.";
  }
});

function initializeQuiz() {
  state.questionOrder = shuffleArray([...QUESTIONS]);
  state.currentQuestionIndex = 0;
  state.answers = {};
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const question = state.questionOrder[state.currentQuestionIndex];
  const selectedValue = state.answers[question.id];
  const isLastQuestion = state.currentQuestionIndex === state.questionOrder.length - 1;

  const optionsHtml = question.options
    .map(
      (option, optionIndex) => `
        <label class="answer-card">
          <input
            type="radio"
            name="${question.id}"
            value="${optionIndex}"
            ${selectedValue === optionIndex ? "checked" : ""}
          />
          <span>
            <strong>${option.title}</strong>
            <small>${option.note}</small>
          </span>
        </label>
      `,
    )
    .join("");

  questionRoot.innerHTML = `
    <section class="question-card">
      <p class="question-number">Вопрос ${state.currentQuestionIndex + 1}</p>
      <h3>${question.prompt}</h3>
      <div class="answers-grid">${optionsHtml}</div>
    </section>
  `;

  const progressPercent = ((state.currentQuestionIndex + 1) / state.questionOrder.length) * 100;
  progressText.textContent = `${state.currentQuestionIndex + 1} / ${state.questionOrder.length}`;
  progressFill.style.width = `${progressPercent}%`;
  previousButton.disabled = state.currentQuestionIndex === 0;
  nextButton.textContent = isLastQuestion ? "Узнать результат" : "Дальше";
  formMessage.textContent = "";
}

function persistCurrentAnswer({ showError }) {
  const question = state.questionOrder[state.currentQuestionIndex];
  const selected = form.querySelector(`input[name="${question.id}"]:checked`);

  if (!selected) {
    if (showError) {
      formMessage.textContent = "Выбери один вариант ответа, чтобы двигаться дальше.";
    }

    return false;
  }

  state.answers[question.id] = Number(selected.value);
  return true;
}

function validateProfile() {
  const participantName = normalizeName(participantNameInput.value.trim());
  const ageConfirmed = ageConfirmedInput.checked;

  if (!participantName) {
    formMessage.textContent = "Впиши имя: оно обязательно появится в итоговой истории.";
    participantNameInput.focus();
    return false;
  }

  if (!ageConfirmed) {
    formMessage.textContent = "Нужно подтвердить 18+, чтобы сгенерировать романтическую историю.";
    return false;
  }

  participantNameInput.value = participantName;
  return true;
}

function calculateResult() {
  const participantName = normalizeName(participantNameInput.value.trim());

  const scores = Object.fromEntries(
    Object.keys(CHARACTERS).map((characterId) => [characterId, 0]),
  );

  const answers = [];

  for (const question of state.questionOrder) {
    const selectedValue = state.answers[question.id];

    if (typeof selectedValue !== "number") {
      return {
        ok: false,
        message: "Пожалуйста, ответь на все вопросы, чтобы я собрал точный мэтч.",
      };
    }

    const option = question.options[selectedValue];

    Object.entries(option.scores).forEach(([characterId, points]) => {
      scores[characterId] += points;
    });

    answers.push({
      question: question.prompt,
      answer: option.title,
      vibe: option.note,
    });
  }

  const sorted = Object.entries(scores).sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }

    return left[0].localeCompare(right[0], "ru");
  });

  const character = CHARACTERS[sorted[0][0]];

  return {
    ok: true,
    character,
    answers,
  };
}

function updateResultPanel(character, answers) {
  resultCrest.textContent = character.crest;
  document.querySelector("#result-name").textContent = character.name;
  document.querySelector("#result-subtitle").textContent = character.subtitle;
  document.querySelector("#result-description").textContent = character.description;
  document.querySelector("#result-traits").innerHTML = character.traits
    .map((trait) => `<span>${trait}</span>`)
    .join("");
  updateResultImage(character);

  const answerHighlights = answers
    .slice(0, 3)
    .map((entry) => entry.answer)
    .join(" • ");

  document.querySelector("#result-label").textContent = `Твой мэтч`;
  storyStatus.textContent = `Совпадение собрано по твоим ответам: ${answerHighlights}`;
}

function updateResultImage(character) {
  const embeddedImage =
    window.CHARACTER_IMAGE_DATA && window.CHARACTER_IMAGE_DATA[character.id]
      ? window.CHARACTER_IMAGE_DATA[character.id]
      : character.image;

  resultImage.classList.add("hidden");
  resultImageFallback.classList.add("hidden");
  resultCrest.classList.remove("hidden");
  resultImage.removeAttribute("src");
  resultImage.alt = "";
  resultImage.onload = null;
  resultImage.onerror = null;

  if (!embeddedImage) {
    resultImageFallback.classList.remove("hidden");
    return;
  }

  resultImage.onerror = () => {
    resultImage.classList.add("hidden");
    resultImageFallback.classList.remove("hidden");
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

function normalizeName(value) {
  return value
    .replace(/[^A-Za-zА-Яа-яЁё0-9\s\-'.]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function getVisitorId() {
  const storageKey = "onepiece-quiz-visitor-id";
  const existing = window.localStorage.getItem(storageKey);

  if (existing) {
    return existing;
  }

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
