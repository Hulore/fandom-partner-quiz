const DIMENSIONS = ["stability", "romance", "chaos", "depth", "humor", "ambition", "freedom", "care", "drama", "nerd"];
const PARTNER_INTERESTS = [
  { id: "boy", label: "Парни", note: "Результат будет только из мужских персонажей." },
  { id: "girl", label: "Девушки", note: "Результат будет только из женских персонажей." },
  { id: "all", label: "Все", note: "Результат может выпасть из всех персонажей фандома." },
];
const profile = (values) => Object.fromEntries(DIMENSIONS.map((key, index) => [key, values[index] || 0]));
const CHARACTER_RARITIES = {
  one_piece_zoro: "SSS",
  one_piece_sanji: "SSS",
  one_piece_law: "SSS",
  one_piece_ace: "S",
  one_piece_shanks: "S",
  one_piece_sabo: "S",
  jjk_gojo: "SSS",
  jjk_geto: "S",
  jjk_choso: "A",
  jjk_nanami: "A",
  jjk_toji: "A",
  jjk_higuruma: "B",
  mha_aizawa: "SSS",
  mha_hawks: "S",
  mha_best_jeanist: "B",
  mha_present_mic: "B",
  mha_fatgum: "C",
  mha_nighteye: "C",
  naruto_itachi: "SSS",
  naruto_kakashi: "SSS",
  naruto_shikamaru: "S",
  naruto_gaara: "S",
  naruto_iruka: "B",
  naruto_yamato: "C",
  p5_ren: "SSS",
  p5_akechi: "SSS",
  p5_yusuke: "S",
  p5_ryuji: "A",
  p5_maruki: "A",
  p5_iwai: "B",
  bg3_astarion: "SSS",
  bg3_gale: "SSS",
  bg3_halsin: "A",
  bg3_wyll: "A",
  bg3_rolan: "B",
  bg3_dammon: "B",
  one_piece_nami: "SSS",
  one_piece_robin: "SSS",
  one_piece_hancock: "S",
  one_piece_vivi: "A",
  one_piece_perona: "A",
  one_piece_tashigi: "B",
  jjk_nobara: "SSS",
  jjk_maki: "SSS",
  jjk_shoko: "A",
  jjk_yuki: "A",
  jjk_utahime: "B",
  jjk_mei_mei: "B",
  mha_mirko: "SSS",
  mha_midnight: "S",
  mha_mt_lady: "S",
  mha_ryukyu: "B",
  mha_lady_nagant: "A",
  mha_ms_joke: "C",
  naruto_hinata: "SSS",
  naruto_sakura: "SSS",
  naruto_tsunade: "S",
  naruto_temari: "A",
  naruto_ino: "A",
  naruto_mei: "B",
  p5_ann: "S",
  p5_makoto: "SSS",
  p5_futaba: "SSS",
  p5_haru: "A",
  p5_takemi: "A",
  p5_sae: "B",
  bg3_shadowheart: "SSS",
  bg3_karlach: "SSS",
  bg3_lae_zel: "S",
  bg3_minthara: "A",
  bg3_jaheira: "B",
  bg3_alfira: "B",
};
const RARITY_CLASSES = ["rarity-sss", "rarity-s", "rarity-a", "rarity-b", "rarity-c"];
const ch = (id, name, crest, imageKey, subtitle, flavor, traits, values, gender = "boy") => ({ id, name, crest, imageKey, gender, rarity: CHARACTER_RARITIES[id] || "C", subtitle, description: flavor, promptFlavor: flavor, traits, profile: profile(values) });
const fandom = (id, label, note, storyWorld, characters) => ({ id, label, note, storyWorld, characters });

const FANDOMS = {
  one_piece: fandom("one_piece", "One Piece", "Пираты, море, верность и приключения.", "море, корабли, порты, ветер, закаты на палубе и чувство большой дороги", [
    ch("one_piece_zoro", "Ророноа Зоро", "ZR", "zoro", "Тихая опора, которая любит поступками.", "Сдержанный, надёжный, прямой и глубоко преданный.", ["верность", "сила", "спокойствие"], [0.9,-0.2,-0.3,0.5,-0.1,0.8,0.2,0.2,-0.6,-0.4]),
    ch("one_piece_sanji", "Санджи", "SJ", "sanji", "Романтик, который превращает обычный вечер в событие.", "Очень романтичный, заботливый, внимательный и эмоциональный.", ["романтика", "забота", "огонь"], [0.3,1,0.2,0.2,0.4,0.4,0.1,1,0.2,-0.3]),
    ch("one_piece_law", "Трафальгар Ло", "LW", "law", "Человек-тайна для slow burn истории.", "Спокойный, умный, закрытый и точный в словах.", ["интеллект", "глубина", "доверие"], [0.6,0.1,-0.5,1,-0.2,0.7,0.2,0.4,-0.2,0.9]),
    ch("one_piece_ace", "Портгас Д. Эйс", "AC", "ace", "Солнечный пожар, рядом с которым жизнь ярче.", "Тёплый, харизматичный, смелый, импульсивный и сердечный.", ["страсть", "искренность", "тепло"], [-0.1,0.5,0.8,0.3,0.6,0.5,0.8,0.6,0.3,-0.5]),
    ch("one_piece_shanks", "Шанкс", "SK", "shanks", "Свобода, смех и взрослая уверенность.", "Обаятельный, свободолюбивый и эмоционально зрелый.", ["харизма", "надёжность", "свобода"], [0.5,0.3,0.5,0.4,0.8,0.4,1,0.5,-0.3,-0.2]),
    ch("one_piece_sabo", "Сабо", "SB", "sabo", "Нежная интеллигентность и чувство союза.", "Мягкий, внимательный, умный и идейный.", ["уважение", "идеализм", "партнёрство"], [0.6,0.5,-0.1,0.7,0.2,0.8,0.5,0.8,-0.2,0.5]),
    ch("one_piece_nami", "Нами", "NM", "one_piece_nami", "Шторм, карта и сердце, которое выбирает своих.", "Умная, дерзкая, практичная, заботливая и любит свободу.", ["хитрость", "свобода", "забота"], [0.4,0.3,0.5,0.5,0.6,0.8,1,0.6,-0.1,0.4], "girl"),
    ch("one_piece_robin", "Нико Робин", "RB", "one_piece_robin", "Тихая элегантность, тайны и взрослая нежность.", "Спокойная, интеллектуальная, глубокая, ироничная и очень внимательная.", ["глубина", "тайна", "спокойствие"], [0.7,0.4,-0.4,1,0.3,0.5,0.4,0.7,-0.1,1], "girl"),
    ch("one_piece_hancock", "Боа Хэнкок", "BH", "one_piece_hancock", "Королева драмы, гордости и внезапной мягкости.", "Яркая, царственная, страстная, требовательная и преданная выбранному человеку.", ["харизма", "страсть", "гордость"], [0.2,1,0.4,0.4,0.1,0.9,0.5,0.5,0.8,0.1], "girl"),
    ch("one_piece_vivi", "Нефертари Виви", "VV", "one_piece_vivi", "Доброта, ответственность и романтика большого пути.", "Тёплая, смелая, дипломатичная, честная и очень верная.", ["доброта", "честь", "партнёрство"], [0.8,0.6,-0.2,0.6,0.2,0.7,0.4,0.9,-0.3,0.3], "girl"),
    ch("one_piece_perona", "Перона", "PR", "one_piece_perona", "Готичная милота, ехидство и уютный хаос.", "Капризная в смешном смысле, эстетичная, странная и неожиданно нежная.", ["готика", "хаос", "милота"], [0,0.5,0.8,0.5,0.8,0.2,0.7,0.4,0.4,0.2], "girl"),
    ch("one_piece_tashigi", "Ташиги", "TS", "one_piece_tashigi", "Честность, неловкая решимость и верность принципам.", "Серьёзная, добрая, немного неуклюжая, принципиальная и надёжная.", ["честность", "принципы", "надёжность"], [0.9,0.2,-0.5,0.4,0.1,0.7,0,0.8,-0.4,0.5], "girl"),
  ]),
  jjk: fandom("jjk", "Магическая битва", "Проклятия, риск, юмор на грани и сильные характеры.", "Токио, школа магов, ночные миссии, проклятая энергия и разговоры после опасности", [
    ch("jjk_gojo", "Сатору Годжо", "GO", "jjk_gojo", "Невозможный флирт, сила и хаос.", "Яркий, дерзкий, смешной, сильный и неожиданно внимательный.", ["харизма", "хаос", "флирт"], [-0.1,0.5,1,0.4,1,0.8,0.8,0.4,0.2,0.5]),
    ch("jjk_nanami", "Кэнто Нанами", "NA", "jjk_nanami", "Стабильность, взрослость и любовь без цирка.", "Собранный, надёжный, усталый в лучшем смысле, уважает границы.", ["стабильность", "границы", "забота"], [1,0.2,-0.9,0.6,-0.2,0.3,-0.2,0.8,-0.8,0.2]),
    ch("jjk_geto", "Сугуру Гето", "GE", "jjk_geto", "Красивый slow burn с опасной глубиной.", "Спокойный, харизматичный, идейный и сложный в мягком AU.", ["глубина", "эстетика", "тайна"], [0.2,0.4,0.1,1,-0.3,0.9,0.3,0.2,0.7,0.5]),
    ch("jjk_toji", "Тодзи Фушигуро", "TO", "jjk_toji", "Опасный вайб и никаких лишних слов.", "Резкий, независимый, саркастичный и надёжный в опасности.", ["опасность", "свобода", "сарказм"], [-0.3,-0.2,0.8,0.1,0.2,0.2,1,-0.1,0.5,-0.8]),
    ch("jjk_choso", "Чосо", "CH", "jjk_choso", "Тихая привязанность и честная нежность.", "Верный, эмоционально глубокий, странный и искренний.", ["верность", "нежность", "семья"], [0.7,0.4,-0.1,0.8,0.1,0.1,-0.1,0.9,0.4,-0.1]),
    ch("jjk_higuruma", "Хироми Хигурума", "HI", "jjk_higuruma", "Ум, усталость от мира и честность.", "Интеллектуальный, морально сложный и мягкий в доверии.", ["ум", "честность", "глубина"], [0.5,0.1,-0.6,0.9,-0.4,0.4,-0.1,0.4,0.1,1]),
    ch("jjk_nobara", "Нобара Кугисаки", "NK", "jjk_nobara", "Острота, стиль и любовь без самоунижения.", "Взрослая AU-версия: дерзкая, честная, смешная, смелая и очень живая.", ["дерзость", "стиль", "искренность"], [0.2,0.4,0.8,0.3,0.8,0.7,0.7,0.4,0.3,0.1], "girl"),
    ch("jjk_maki", "Маки Зенин", "MZ", "jjk_maki", "Сила, прямота и уважение через поступки.", "Взрослая AU-версия: волевая, надёжная, саркастичная и не терпит фальши.", ["сила", "честность", "границы"], [0.7,0.1,-0.3,0.6,0.2,0.9,0.4,0.5,-0.5,0.3], "girl"),
    ch("jjk_shoko", "Шоко Иэйри", "SI", "jjk_shoko", "Усталый юмор, сигаретный вайб и тихая забота.", "Умная, спокойная, ироничная, взрослая и лечит не только раны.", ["ирония", "спокойствие", "забота"], [0.8,0.2,-0.6,0.7,0.5,0.3,0.1,0.8,-0.2,0.8], "girl"),
    ch("jjk_yuki", "Юки Цукумо", "YT", "jjk_yuki", "Свобода, флирт и вопрос, который сбивает с ног.", "Яркая, независимая, смелая, философская и любит людей с характером.", ["свобода", "флирт", "философия"], [0.1,0.6,0.7,0.8,0.6,0.8,1,0.4,0.2,0.7], "girl"),
    ch("jjk_utahime", "Утахиме Иори", "UI", "jjk_utahime", "Ответственность, вспыльчивость и забота без сахарной ваты.", "Собранная, принципиальная, эмоциональная и надёжная в важных вещах.", ["ответственность", "принципы", "забота"], [0.9,0.3,-0.4,0.5,0.3,0.6,0,0.8,-0.3,0.4], "girl"),
    ch("jjk_mei_mei", "Мэй Мэй", "MM", "jjk_mei_mei", "Опасная элегантность и холодная уверенность.", "Расчётливая, стильная, уверенная, взрослая и любит контроль.", ["контроль", "стиль", "амбиции"], [0.3,0.2,-0.1,0.4,-0.2,1,0.6,0,0.5,0.6], "girl"),
  ]),
  mha: fandom("mha", "Моя геройская академия", "Только взрослые герои и AU без школьной романтики.", "город героев, агентства, ночные патрули и редкие спокойные выходные", [
    ch("mha_aizawa", "Шота Айзава", "AI", "mha_aizawa", "Сонный кот, который на деле опора.", "Сдержанный, прямой, заботливый без показухи.", ["стабильность", "ирония", "границы"], [0.9,-0.1,-0.7,0.6,0.1,0.2,0.1,0.7,-0.6,0.2]),
    ch("mha_hawks", "Хоукс", "HK", "mha_hawks", "Флирт, скорость и улыбка с секретами.", "Лёгкий на словах, умный, свободолюбивый, с глубиной под шутками.", ["харизма", "свобода", "флирт"], [0.1,0.5,0.6,0.5,0.8,0.7,1,0.4,0.3,0.3]),
    ch("mha_best_jeanist", "Бест Джинист", "BJ", "mha_best_jeanist", "Элегантность, контроль и детали.", "Собранный, стильный, дисциплинированный и внимательный.", ["стиль", "контроль", "уважение"], [0.8,0.4,-0.8,0.3,-0.1,0.7,-0.3,0.5,-0.4,0.4]),
    ch("mha_present_mic", "Презент Майк", "PM", "mha_present_mic", "Громкий смех, музыка и человек-праздник.", "Шумный, смешной, эмоциональный и тёплый.", ["юмор", "музыка", "энергия"], [0.2,0.4,0.7,0.1,1,0.4,0.6,0.5,-0.2,0.1]),
    ch("mha_fatgum", "Фэт Гам", "FG", "mha_fatgum", "Большое сердце, еда и безопасное тепло.", "Открытый, добрый, заботливый, домашний и сильный.", ["забота", "еда", "тепло"], [0.8,0.5,-0.2,0.2,0.6,0.3,0,1,-0.5,-0.2]),
    ch("mha_nighteye", "Сэр Нighteye", "SN", "mha_nighteye", "Строгость, интеллект и сухой юмор.", "Точный, требовательный, умный и глубоко преданный.", ["ум", "строгость", "планы"], [0.8,0,-0.8,0.6,0.2,0.8,-0.5,0.3,-0.2,1]),
    ch("mha_mirko", "Мирко", "MR", "mha_mirko", "Адреналин, сила и улыбка перед дракой.", "Смелая, независимая, прямая, азартная и выбирает поступки.", ["сила", "азарт", "свобода"], [0.2,0.3,0.9,0.3,0.5,0.9,1,0.3,0.1,-0.1], "girl"),
    ch("mha_midnight", "Миднайт", "MN", "mha_midnight", "Театральность, уверенность и взрослый флирт.", "Яркая, уверенная, заботливая, драматичная и любит красивую игру.", ["флирт", "уверенность", "драма"], [0.4,0.9,0.5,0.4,0.6,0.6,0.5,0.6,0.5,0.2], "girl"),
    ch("mha_mt_lady", "Маунт Леди", "ML", "mha_mt_lady", "Шоу, харизма и неожиданная преданность.", "Эффектная, смешная, амбициозная, тёплая и любит внимание.", ["харизма", "юмор", "амбиции"], [0.2,0.5,0.7,0.2,0.8,0.8,0.7,0.5,0.2,-0.1], "girl"),
    ch("mha_ryukyu", "Рюку", "RY", "mha_ryukyu", "Спокойная сила и достоинство без лишнего шума.", "Зрелая, благородная, ответственная, мягкая и очень надёжная.", ["достоинство", "забота", "спокойствие"], [1,0.4,-0.6,0.5,0.1,0.5,-0.1,0.9,-0.5,0.3], "girl"),
    ch("mha_lady_nagant", "Леди Наган", "LN", "mha_lady_nagant", "Тёмный slow burn и доверие после бурь.", "Сложная, точная, травмированная, честная и мягкая в безопасном AU.", ["тайна", "точность", "доверие"], [0.4,0.2,-0.3,1,-0.3,0.8,0.5,0.4,0.8,0.8], "girl"),
    ch("mha_ms_joke", "Мисс Джоук", "MJ", "mha_ms_joke", "Смех, напор и свидание как комедийная сцена.", "Весёлая, открытая, настойчивая, тёплая и не боится быть громкой.", ["юмор", "тепло", "напор"], [0.4,0.5,0.6,0.2,1,0.4,0.5,0.7,-0.2,0.1], "girl"),
  ]),
  naruto: fandom("naruto", "Наруто", "Взрослые версии персонажей и спокойный романтический AU-тон.", "Коноха, крыши после миссий, чайные, дороги между деревнями и вечерние огни шиноби", [
    ch("naruto_kakashi", "Какаши Хатаке", "KA", "naruto_kakashi", "Маска, книжка и человек, который всё замечает.", "Спокойный, умный, травмированный, но тёплый в доверии.", ["тайна", "ум", "верность"], [0.6,0.1,-0.3,0.9,0.3,0.3,0.4,0.5,0.2,0.7]),
    ch("naruto_iruka", "Ирука Умино", "IR", "naruto_iruka", "Тёплый дом, честность и возможность выдохнуть.", "Добрый, зрелый, заботливый и эмоционально безопасный.", ["дом", "забота", "безопасность"], [0.9,0.5,-0.8,0.4,0.2,0.1,-0.1,1,-0.7,0.1]),
    ch("naruto_shikamaru", "Шикамару Нара", "SH", "naruto_shikamaru", "Лень, гениальность и отношения без суеты.", "Умный, саркастичный, надёжный и ценящий спокойствие.", ["ум", "спокойствие", "сарказм"], [0.8,0,-0.9,0.5,0.4,-0.1,0.1,0.4,-0.8,1]),
    ch("naruto_gaara", "Гаара", "GA", "naruto_gaara", "Тихая нежность и доверие заново.", "Сдержанный, глубокий, ответственный и очень бережный.", ["нежность", "ответственность", "доверие"], [0.9,0.2,-0.7,0.9,-0.4,0.8,-0.2,0.7,0.1,0.2]),
    ch("naruto_yamato", "Ямато", "YA", "naruto_yamato", "Стабильность, сухой юмор и деревянный дом мечты.", "Практичный, спокойный, сдержанно смешной и надёжный.", ["стабильность", "дом", "практичность"], [1,0.1,-0.9,0.3,0.3,0.3,-0.2,0.6,-0.7,0.4]),
    ch("naruto_itachi", "Итачи Учиха", "IT", "naruto_itachi", "Печальная красота, глубина и тихий выбор.", "Сложный, нежный, трагичный, умный в безопасном взрослом AU.", ["глубина", "тайна", "драма"], [0.3,0.3,-0.3,1,-0.6,0.5,-0.2,0.7,0.9,0.7]),
    ch("naruto_hinata", "Хината Хьюга", "HH", "naruto_hinata", "Тихая сила, нежность и верность без громких слов.", "Взрослая AU-версия: мягкая, смелая, бережная и очень преданная.", ["нежность", "верность", "тихая сила"], [0.9,0.7,-0.6,0.7,0.1,0.5,0,1,-0.4,0.3], "girl"),
    ch("naruto_sakura", "Сакура Харуно", "SA", "naruto_sakura", "Сила, ум и любовь, которая держит удар.", "Взрослая AU-версия: решительная, заботливая, умная, вспыльчивая и надёжная.", ["сила", "забота", "решимость"], [0.7,0.5,0.1,0.5,0.3,0.9,0.1,0.9,-0.2,0.7], "girl"),
    ch("naruto_tsunade", "Цунаде", "TS", "naruto_tsunade", "Легендарная женщина, азарт и усталое доброе сердце.", "Сильная, прямая, ироничная, взрослая и защищает тех, кого любит.", ["сила", "азарт", "защита"], [0.6,0.3,0.5,0.6,0.5,0.8,0.6,0.8,0.2,0.5], "girl"),
    ch("naruto_temari", "Темари", "TM", "naruto_temari", "Сарказм, ветер и отношения без сюсюканья.", "Уверенная, практичная, колкая, умная и очень верная в команде.", ["сарказм", "практичность", "верность"], [0.8,0.2,-0.2,0.5,0.6,0.7,0.3,0.5,-0.5,0.6], "girl"),
    ch("naruto_ino", "Ино Яманака", "IN", "naruto_ino", "Яркость, честность и эмоциональный интеллект.", "Взрослая AU-версия: общительная, стильная, смелая, заботливая и прямая.", ["стиль", "общение", "забота"], [0.5,0.6,0.4,0.4,0.7,0.6,0.5,0.7,-0.2,0.3], "girl"),
    ch("naruto_mei", "Мэй Теруми", "ME", "naruto_mei", "Опасная элегантность и взрослая уверенность.", "Дипломатичная, сильная, харизматичная, романтичная и не любит игры в холодность.", ["харизма", "элегантность", "уверенность"], [0.6,0.8,0.1,0.5,0.3,0.8,0.4,0.6,0.2,0.5], "girl"),
  ]),
  persona5: fandom("persona5", "Persona 5", "Романтический AU с взрослыми версиями персонажей, без школьной романтики.", "ночной Токио, джаз-бар, метро, дождливые улицы и кафе Leblanc", [
    ch("p5_ren", "Рэн Амамия", "RA", "p5_ren", "Стильный молчун и центр истории.", "Взрослая AU-версия: спокойный, загадочный, смелый и внимательный.", ["стиль", "тайна", "смелость"], [0.4,0.5,0.4,0.7,0.2,0.7,0.7,0.5,0.2,0.6]),
    ch("p5_ryuji", "Рюдзи Сакамото", "RY", "p5_ryuji", "Громкий, честный и живой солнечный хаос.", "Взрослая AU-версия: прямой, смешной, импульсивный и верный.", ["честность", "хаос", "смех"], [0.1,0.3,0.9,0.2,0.9,0.4,0.8,0.6,0.1,-0.5]),
    ch("p5_yusuke", "Юске Китагава", "YU", "p5_yusuke", "Искусство, странные фразы и непрактичность.", "Взрослая AU-версия: эстетичный, глубокий, странноватый и искренний.", ["искусство", "странность", "глубина"], [-0.1,0.5,0.3,0.8,0.4,0.5,0.6,0.3,0.2,0.7]),
    ch("p5_akechi", "Горо Акечи", "AK", "p5_akechi", "Идеальная улыбка, шахматы и опасный интеллект.", "Взрослая AU-версия: умный, напряжённый, сложный, slow burn.", ["интеллект", "драма", "контроль"], [-0.2,0.2,0.4,0.9,0.1,1,0.2,0,1,1]),
    ch("p5_iwai", "Мунэхиса Ивай", "IW", "p5_iwai", "Суровый вид, тёплое сердце и никакой ерунды.", "Взрослый, прямой, надёжный, с грубоватой заботой.", ["защита", "ответственность", "тепло"], [0.8,0.1,-0.2,0.5,-0.1,0.2,0.2,0.8,0.2,-0.4]),
    ch("p5_maruki", "Такуто Маруки", "MA", "p5_maruki", "Мягкость, разговоры и желание всё исправить.", "Взрослый, внимательный, заботливый, интеллектуальный и немного драматичный.", ["эмпатия", "разговоры", "ум"], [0.4,0.4,-0.4,0.8,0,0.6,-0.4,1,0.5,0.9]),
    ch("p5_ann", "Энн Такамаки", "AT", "p5_ann", "Свет, смелость и сердце, которое не терпит фальши.", "Взрослая AU-версия: яркая, добрая, эмоциональная, смелая и очень тёплая.", ["смелость", "тепло", "искренность"], [0.4,0.7,0.5,0.4,0.7,0.6,0.7,0.8,0.1,0.2], "girl"),
    ch("p5_makoto", "Макото Ниидзима", "MN", "p5_makoto", "Стальная собранность и нежность под бронёй.", "Взрослая AU-версия: умная, ответственная, принципиальная и заботливая.", ["ум", "ответственность", "нежность"], [0.9,0.4,-0.5,0.7,0,0.9,-0.2,0.8,-0.3,0.9], "girl"),
    ch("p5_futaba", "Футаба Сакура", "FS", "p5_futaba", "Нердовая химия, мемы и доверие маленькими шагами.", "Взрослая AU-версия: смешная, тревожная, умная, странная и очень искренняя.", ["мемы", "доверие", "нердство"], [0.1,0.3,0.5,0.8,1,0.4,0.4,0.5,0.3,1], "girl"),
    ch("p5_haru", "Хару Окумура", "HO", "p5_haru", "Мягкий голос, чай и неожиданная сталь.", "Взрослая AU-версия: нежная, эстетичная, самостоятельная и сильнее, чем кажется.", ["нежность", "эстетика", "сталь"], [0.7,0.8,-0.2,0.6,0.2,0.8,0.3,0.9,-0.2,0.5], "girl"),
    ch("p5_takemi", "Таэ Такэми", "TT", "p5_takemi", "Готичный кабинет, сухой юмор и взрослая забота.", "Умная, независимая, ироничная, спокойная и опасно обаятельная.", ["готика", "ирония", "забота"], [0.6,0.4,-0.2,0.8,0.5,0.7,0.6,0.7,0.2,0.9], "girl"),
    ch("p5_sae", "Саэ Ниидзима", "SN", "p5_sae", "Контроль, амбиции и уважение к сильному партнёрству.", "Взрослая, собранная, требовательная, честная и ценит равных.", ["контроль", "амбиции", "уважение"], [0.8,0.2,-0.5,0.6,-0.1,1,-0.2,0.4,-0.2,0.8], "girl"),
  ]),
  bg3: fandom("bg3", "Baldur's Gate 3", "Фэнтези, костёр, опасные дороги и романтический вайб.", "Фаэрун, лагерь у костра, таверны, руины, магия и ночи под звёздами", [
    ch("bg3_astarion", "Астарион", "AS", "bg3_astarion", "Флирт, сарказм и нежность, которой страшно доверять.", "Острый, театральный, свободолюбивый, драматичный и ранимый.", ["флирт", "сарказм", "свобода"], [-0.4,0.7,0.5,0.8,0.7,0.4,1,0.2,1,0.2]),
    ch("bg3_gale", "Гейл", "GA", "bg3_gale", "Магия, умные разговоры и переусложнённый ужин.", "Тёплый, книжный, романтичный, немного драматичный и разговорчивый.", ["магия", "романтика", "книги"], [0.3,0.8,0.1,0.8,0.4,0.8,0.1,0.7,0.5,1]),
    ch("bg3_wyll", "Уилл", "WY", "bg3_wyll", "Рыцарство, честь и танец у костра.", "Благородный, добрый, романтичный, ответственный и чуть сказочный.", ["честь", "романтика", "доброта"], [0.7,0.9,-0.1,0.4,0.2,0.7,0.2,0.8,0.2,0.1]),
    ch("bg3_halsin", "Хальсин", "HA", "bg3_halsin", "Лес, спокойствие и объятия размером с медведя.", "Спокойный, природный, свободный, зрелый и бережный.", ["природа", "зрелость", "забота"], [0.7,0.5,-0.3,0.5,0.1,0.1,1,0.9,-0.4,0.2]),
    ch("bg3_rolan", "Ролан", "RO", "bg3_rolan", "Сарказм, амбиции и маг, который растёт рядом.", "Колкий, гордый, умный, амбициозный, но способный на преданность.", ["сарказм", "амбиции", "магия"], [0.2,0.2,0.1,0.5,0.4,1,0.2,0.4,0.4,0.9]),
    ch("bg3_dammon", "Даммон", "DA", "bg3_dammon", "Кузница, доброе сердце и любовь через заботливые руки.", "Тёплый, практичный, честный, спокойный и поддерживающий.", ["тепло", "ремесло", "дом"], [0.9,0.5,-0.6,0.3,0.1,0.3,0.1,1,-0.5,0.3]),
    ch("bg3_shadowheart", "Шэдоухарт", "SH", "bg3_shadowheart", "Тайны, колкость и нежность, которую надо заслужить.", "Саркастичная, закрытая, глубокая, верная и мягкая в доверии.", ["тайна", "доверие", "сарказм"], [0.4,0.4,-0.1,1,0.4,0.4,0.3,0.7,0.6,0.7], "girl"),
    ch("bg3_karlach", "Карлах", "KL", "bg3_karlach", "Огонь, объятия и радость жить прямо сейчас.", "Горячая, добрая, смешная, смелая, очень телесно-тёплая без explicit.", ["тепло", "радость", "сила"], [0.3,0.8,0.9,0.4,0.9,0.5,0.9,1,0.2,-0.2], "girl"),
    ch("bg3_lae_zel", "Лаэзель", "LZ", "bg3_lae_zel", "Острота клинка и уважение, завоёванное делом.", "Прямая, воинственная, честная, требовательная и учится мягкости.", ["сила", "честность", "рост"], [0.5,0.1,0.3,0.5,-0.4,1,0.4,0.2,0.2,0.2], "girl"),
    ch("bg3_minthara", "Минтара", "MT", "bg3_minthara", "Опасная власть и редкая преданность избранному.", "Жёсткая, стратегичная, взрослая, властная и сложная в мягком AU.", ["власть", "стратегия", "драма"], [0.2,0.3,0.2,0.7,-0.5,1,0.3,0.1,0.9,0.7], "girl"),
    ch("bg3_jaheira", "Джахейра", "JH", "bg3_jaheira", "Мудрость, колкий юмор и тепло старого костра.", "Зрелая, ироничная, надёжная, сильная и умеет быть домом в дороге.", ["мудрость", "ирония", "дом"], [1,0.4,-0.4,0.8,0.6,0.6,0.3,0.9,-0.4,0.7], "girl"),
    ch("bg3_alfira", "Альфира", "AL", "bg3_alfira", "Песня у костра, мягкость и вера в свет.", "Творческая, нежная, ранимая, добрая и вдохновляющая.", ["музыка", "нежность", "свет"], [0.5,0.8,-0.2,0.7,0.4,0.3,0.4,0.9,0.1,0.5], "girl"),
  ]),
};

const FANDOM_CHARACTER_TARGETS = {
  one_piece: { total: 80, label: "крупная база" },
  jjk: { total: 28, label: "средняя база" },
  mha: { total: 50, label: "крупная база" },
  naruto: { total: 60, label: "крупная база" },
  persona5: { total: 24, label: "компактная база" },
  bg3: { total: 22, label: "компактная база" },
};

const QUESTION_CATEGORIES = [
  { id: "fun", label: "Приколы" },
  { id: "relationship", label: "Отношения" },
  { id: "memes", label: "Шутки и мемы" },
  { id: "interests", label: "Интересы" },
  { id: "social", label: "Жизнь и общение" },
  { id: "boundaries", label: "Границы и конфликты" },
  { id: "adventure", label: "Приключения" },
  { id: "comfort", label: "Быт и уют" },
  { id: "values", label: "Ценности" },
  { id: "attention", label: "Флирт и внимание" },
];
const CATEGORY_WEIGHTS = {
  fun: { chaos: 0.8, humor: 0.8, freedom: 0.3 },
  relationship: { stability: 0.7, romance: 0.5, care: 0.6, drama: -0.4 },
  memes: { humor: 1, nerd: 0.4, chaos: 0.2 },
  interests: { nerd: 0.6, depth: 0.5, ambition: 0.3, romance: 0.2 },
  social: { stability: 0.4, care: 0.5, depth: 0.4, freedom: 0.2 },
  boundaries: { stability: 0.7, care: 0.5, depth: 0.5, drama: -0.6 },
  adventure: { chaos: 0.8, freedom: 0.8, humor: 0.3, ambition: 0.3 },
  comfort: { stability: 0.8, care: 0.8, romance: 0.4, chaos: -0.4 },
  values: { depth: 0.7, ambition: 0.5, stability: 0.4, care: 0.4 },
  attention: { romance: 0.8, care: 0.5, humor: 0.4, drama: 0.2 },
};
const QUESTION_BANK = buildQuestionBank();
const form = document.querySelector("#quiz-form");
const questionRoot = document.querySelector("#quiz-questions");
const formMessage = document.querySelector("#form-message");
const slides = Array.from(document.querySelectorAll(".slide"));
const slideDots = Array.from(document.querySelectorAll(".slide-dot"));
const introNextButton = document.querySelector("#intro-next-button");
const fandomBackButton = document.querySelector("#fandom-back-button");
const fandomNextButton = document.querySelector("#fandom-next-button");
const profileBackButton = document.querySelector("#profile-back-button");
const profileNextButton = document.querySelector("#profile-next-button");
const profileMessage = document.querySelector("#profile-message");
const generateButton = document.querySelector("#generate-button");
const restartButton = document.querySelector("#restart-button");
const copyButton = document.querySelector("#copy-button");
const telegramShareButton = document.querySelector("#telegram-share-button");
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
const resultCard = document.querySelector("#result-card");
const revealCard = document.querySelector("#reveal-card");
const revealImage = document.querySelector("#reveal-image");
const revealCrest = document.querySelector("#reveal-crest");
const revealName = document.querySelector("#reveal-name");
const revealNextButton = document.querySelector("#reveal-next-button");
const storyBackButton = document.querySelector("#story-back-button");
const storyRestartButton = document.querySelector("#story-restart-button");
const progressText = document.querySelector("#question-progress-text");
const progressFill = document.querySelector("#question-progress-fill");
const participantNameInput = document.querySelector("#participantName");
const fandomRoot = document.querySelector("#fandom-options");
const interestRoot = document.querySelector("#interest-options");
const SLIDE_ORDER = ["intro", "fandom", "profile", "questions", "reveal", "result", "story"];
const urlParams = new URLSearchParams(window.location.search);
const telegramApp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
const isTelegramMode = urlParams.get("platform") === "telegram" || Boolean(telegramApp && telegramApp.initData);
const state = { fandom: FANDOMS.one_piece, interest: "boy", result: null, answers: {}, story: null, questionOrder: [], currentQuestionIndex: 0, currentSlide: "intro", telegramMode: isTelegramMode };

renderFandomOptions();
renderInterestOptions();
initializeQuiz();
setupTelegramMode();

introNextButton.addEventListener("click", () => showSlide("fandom"));
fandomBackButton.addEventListener("click", () => showSlide("intro", -1));
fandomNextButton.addEventListener("click", () => showSlide("profile"));
profileBackButton.addEventListener("click", () => showSlide("fandom", -1));
profileNextButton.addEventListener("click", () => {
  if (!validateProfile(profileMessage)) return;
  initializeQuiz();
  showSlide("questions");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (state.currentSlide !== "questions") {
    if (!validateProfile(profileMessage)) return;
    initializeQuiz();
    showSlide("questions");
    return;
  }
  if (!validateProfile(formMessage)) return;
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
  updateRevealPanel(result.character);
  showSlide("reveal");
  playRevealAnimation();
});

questionRoot.addEventListener("input", (event) => {
  if (event.target.matches('input[type="range"]')) {
    persistCurrentAnswer();
    updateSliderLabel(event.target);
  }
});

previousButton.addEventListener("click", () => {
  persistCurrentAnswer();
  if (state.currentQuestionIndex === 0) {
    showSlide("profile", -1);
    return;
  }
  state.currentQuestionIndex -= 1;
  renderCurrentQuestion();
});

revealNextButton.addEventListener("click", () => showSlide("result"));
telegramShareButton.addEventListener("click", shareTelegramResult);

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
        result: { id: state.result.id, name: state.result.name, gender: state.result.gender, subtitle: state.result.subtitle, promptFlavor: state.result.promptFlavor, traits: state.result.traits },
        answers: buildStoryAnswers(state.answers),
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
    showSlide("story");
  } catch (error) {
    storyStatus.textContent = error.message || "С генерацией что-то пошло не так. Проверь настройку OpenAI API на сервере.";
  } finally {
    generateButton.disabled = false;
  }
});

restartButton.addEventListener("click", restartQuiz);
storyBackButton.addEventListener("click", () => showSlide("result", -1));
storyRestartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  form.reset();
  formMessage.textContent = "";
  profileMessage.textContent = "";
  state.result = null;
  state.story = null;
  state.interest = "boy";
  resetStoryUi();
  renderFandomOptions();
  renderInterestOptions();
  initializeQuiz();
  showSlide("intro", -1);
}

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

function setupTelegramMode() {
  if (!state.telegramMode) return;
  document.body.classList.add("telegram-mode");
  telegramShareButton.classList.remove("hidden");
  autofillTelegramName();
  if (!telegramApp) return;
  telegramApp.ready();
  telegramApp.expand();
  try {
    telegramApp.setHeaderColor("#07131f");
    telegramApp.setBackgroundColor("#07131f");
  } catch (error) {
    // Older Telegram clients can ignore theme methods.
  }
  if (telegramApp.BackButton) {
    telegramApp.BackButton.onClick(handleTelegramBack);
    updateTelegramBackButton();
  }
}

function autofillTelegramName() {
  const user = telegramApp && telegramApp.initDataUnsafe ? telegramApp.initDataUnsafe.user : null;
  if (!user || participantNameInput.value.trim()) return;
  const telegramName = normalizeName([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "");
  if (telegramName) participantNameInput.value = telegramName;
}

function handleTelegramBack() {
  if (state.currentSlide === "intro") {
    if (telegramApp && telegramApp.close) telegramApp.close();
    return;
  }
  if (state.currentSlide === "questions") {
    persistCurrentAnswer();
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex -= 1;
      renderCurrentQuestion();
      return;
    }
    showSlide("profile", -1);
    return;
  }
  const previousSlide = getPreviousSlideName();
  if (previousSlide) showSlide(previousSlide, -1);
}

function getPreviousSlideName() {
  const currentIndex = SLIDE_ORDER.indexOf(state.currentSlide);
  if (currentIndex <= 0) return "";
  return SLIDE_ORDER[currentIndex - 1];
}

function updateTelegramBackButton() {
  if (!telegramApp || !telegramApp.BackButton) return;
  if (state.currentSlide === "intro") {
    telegramApp.BackButton.hide();
    return;
  }
  telegramApp.BackButton.show();
}

function shareTelegramResult() {
  const url = new URL(window.location.href);
  url.searchParams.set("platform", "telegram");
  const resultText = state.result
    ? `Мне выпал(а) ${state.result.name} из ${state.fandom.label}. Пройди тоже квиз "Кто твой партнёр из фандома?"`
    : `Пройди квиз "Кто твой партнёр из фандома?"`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url.toString())}&text=${encodeURIComponent(resultText)}`;
  if (telegramApp && telegramApp.openTelegramLink) {
    telegramApp.openTelegramLink(shareUrl);
    return;
  }
  window.open(shareUrl, "_blank", "noopener");
}

function showSlide(slideName, direction = 1) {
  const nextSlide = slides.find((slide) => slide.dataset.slide === slideName);
  if (!nextSlide || state.currentSlide === slideName) return;
  const currentSlide = slides.find((slide) => slide.classList.contains("active"));
  const forward = direction >= 0;
  if (currentSlide) {
    currentSlide.classList.remove("active", "slide-in-forward", "slide-in-back");
    currentSlide.classList.add(forward ? "slide-out-forward" : "slide-out-back");
    window.setTimeout(() => {
      currentSlide.classList.remove("slide-out-forward", "slide-out-back");
    }, 460);
  }
  nextSlide.classList.remove("slide-out-forward", "slide-out-back");
  nextSlide.classList.add("active", forward ? "slide-in-forward" : "slide-in-back");
  state.currentSlide = slideName;
  updateSlideDots(slideName);
  updateTelegramBackButton();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateSlideDots(slideName) {
  const activeIndex = SLIDE_ORDER.indexOf(slideName);
  slideDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
    dot.classList.toggle("completed", index < activeIndex);
  });
}

function playRevealAnimation() {
  revealNextButton.classList.remove("is-visible");
  revealCard.classList.remove("is-spinning");
  void revealCard.offsetWidth;
  revealCard.classList.add("is-spinning");
  window.setTimeout(() => {
    revealNextButton.classList.add("is-visible");
  }, 1250);
}

function renderFandomOptions() {
  const fandoms = Object.values(FANDOMS);
  fandomRoot.innerHTML = fandoms.map((fandom) => {
    const target = FANDOM_CHARACTER_TARGETS[fandom.id] || { total: fandom.characters.length, label: "текущая база" };
    const percent = Math.min(100, Math.round((fandom.characters.length / target.total) * 100));
    return `
    <label class="fandom-card">
      <input type="radio" name="fandom" value="${fandom.id}" ${fandom.id === state.fandom.id ? "checked" : ""} />
      <span class="fandom-card-body">
        <strong>${fandom.label}</strong>
        <small>${fandom.note}</small>
        <span class="fandom-progress-meta">${fandom.characters.length} из ~${target.total} значимых кандидатов · ${percent}% · ${target.label}</span>
        <span class="fandom-progress-bar"><span style="width: ${percent}%"></span></span>
      </span>
    </label>
  `;
  }).join("");
  fandomRoot.onchange = (event) => {
    const selected = event.target.closest('input[name="fandom"]');
    if (!selected) return;
    state.fandom = FANDOMS[selected.value] || FANDOMS.one_piece;
    resetStoryUi();
    initializeQuiz();
    renderFandomOptions();
  };
}

function renderInterestOptions() {
  interestRoot.innerHTML = PARTNER_INTERESTS.map((interest) => `
    <label class="fandom-card">
      <input type="radio" name="interest" value="${interest.id}" ${interest.id === state.interest ? "checked" : ""} />
      <span><strong>${interest.label}</strong><small>${interest.note}</small></span>
    </label>
  `).join("");
  interestRoot.onchange = (event) => {
    const selected = event.target.closest('input[name="interest"]');
    if (!selected) return;
    state.interest = selected.value;
    resetStoryUi();
    initializeQuiz();
    renderInterestOptions();
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
    return shuffleArray(pool).slice(0, 1);
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
  previousButton.disabled = false;
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
function validateProfile(messageRoot = formMessage) {
  const participantName = normalizeName(participantNameInput.value.trim());
  if (!participantName) {
    messageRoot.textContent = "Впиши имя: оно обязательно появится в итоговой истории.";
    participantNameInput.focus();
    return false;
  }
  participantNameInput.value = participantName;
  formMessage.textContent = "";
  profileMessage.textContent = "";
  return true;
}

function calculateResult() {
  const vector = Object.fromEntries(DIMENSIONS.map((dimension) => [dimension, 0]));
  const answers = state.questionOrder.map((question) => state.answers[question.id]).filter(Boolean);
  for (const answer of answers) {
    const normalized = (answer.percent - 50) / 50;
    Object.entries(answer.weights).forEach(([dimension, weight]) => { vector[dimension] += normalized * weight; });
  }
  const candidates = getCandidatePool();
  const scored = candidates.map((candidate) => ({ character: candidate, score: scoreCharacter(vector, candidate.profile) })).sort((left, right) => right.score - left.score);
  return { ok: true, character: scored[0].character, answers };
}

function getCandidatePool() {
  const filtered = state.fandom.characters.filter((candidate) => state.interest === "all" || candidate.gender === state.interest);
  return filtered.length ? filtered : state.fandom.characters;
}

function scoreCharacter(vector, profile) {
  return DIMENSIONS.reduce((sum, dimension) => sum + vector[dimension] * (profile[dimension] || 0), 0);
}

function buildStoryAnswers(answersById) {
  return Object.values(answersById).map((answer) => ({
    id: answer.id,
    category: answer.category,
    percent: answer.percent,
    meaning: answer.meaning,
  }));
}

function updateResultPanel(character, answers) {
  applyResultRarity(character);
  resultCrest.textContent = character.crest;
  document.querySelector("#result-name").textContent = character.name;
  document.querySelector("#result-subtitle").textContent = character.subtitle;
  document.querySelector("#result-description").textContent = character.description;
  document.querySelector("#result-traits").innerHTML = character.traits.map((trait) => `<span>${trait}</span>`).join("");
  updateResultImage(character);
  document.querySelector("#result-label").textContent = `Твой мэтч · ${state.fandom.label} · Редкость ${character.rarity}`;
  storyStatus.textContent = "Совпадение собрано. Можно сгенерировать личную историю по твоему вайбу.";
}

function updateRevealPanel(character) {
  applyResultRarity(character);
  revealName.textContent = `${character.name} · ${state.fandom.label} · ${character.rarity}`;
  revealCrest.textContent = character.crest;
  updateCharacterPortrait(character, revealImage, revealCrest);
}

function applyResultRarity(character) {
  const rarity = CHARACTER_RARITIES[character.id] || "C";
  applyRarityClass(resultCard, rarity);
  applyRarityClass(revealCard, rarity);
}

function applyRarityClass(element, rarity) {
  if (!element) return;
  element.classList.remove(...RARITY_CLASSES);
  element.classList.add(`rarity-${rarity.toLowerCase()}`);
  element.dataset.rarity = rarity;
}

function updateResultImage(character) {
  resultImage.classList.add("hidden");
  resultImageFallback.classList.add("hidden");
  resultCrest.classList.remove("hidden");
  updateCharacterPortrait(character, resultImage, resultCrest);
}

function updateCharacterPortrait(character, imageElement, crestElement) {
  const embeddedImage = character.imageKey && window.CHARACTER_IMAGE_DATA && window.CHARACTER_IMAGE_DATA[character.imageKey] ? window.CHARACTER_IMAGE_DATA[character.imageKey] : "";
  imageElement.classList.add("hidden");
  crestElement.classList.remove("hidden");
  imageElement.removeAttribute("src");
  imageElement.alt = "";
  imageElement.onload = null;
  imageElement.onerror = null;
  if (!embeddedImage) return;
  imageElement.onerror = () => {
    imageElement.classList.add("hidden");
    crestElement.classList.remove("hidden");
  };
  imageElement.classList.remove("hidden");
  crestElement.classList.add("hidden");
  imageElement.src = embeddedImage;
  imageElement.alt = `Портрет персонажа ${character.name}`;
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
    fun: ["Я бы выжил(а) в приключении только за счёт харизмы и перекусов.", "Если план звучит тупо, но весело, я минимум на 30% уже согласен(на).", "В компании я иногда превращаюсь в человека, который сказал: 'ну ладно, погнали'.", "Я могу серьёзно обсуждать, кого брать в команду на апокалипсис.", "Если у человека смешной смех, я уже немного на его стороне.", "Мне важно, чтобы партнёр понимал мой внутренний цирк.", "Я иногда драматизирую бытовые мелочи ради атмосферы.", "Я могу привязаться к человеку из-за одной идеально тупой шутки.", "В споре 'пойти домой или ещё на одну авантюру' я опасно часто выбираю авантюру.", "Мне нравится, когда отношения ощущаются как наш маленький заговор против скуки.", "Если партнёр умеет готовить, чинить или колдовать чай из ничего, это почти магия.", "Я бы дал(а) название нашей команде даже для похода в магазин.", "Я люблю людей, которые могут быть эффектными без попытки выглядеть нормальными.", "Мне нравится, когда партнёр слегка странный, но с добрым сердцем.", "Моя социальная батарейка иногда заряжается от чистого абсурда.", "Я бы пошёл/пошла на свидание в место с сомнительными отзывами ради истории.", "Мне важнее вайб, чем идеальный план.", "Я могу влюбиться в человека, который красиво злится на мелкую несправедливость.", "Я верю, что совместная глупость сближает быстрее, чем идеальное свидание.", "Если рядом со мной можно быть немного кринжовым, это плюс.", "Я могу устроить мини-квест из самой обычной прогулки.", "Если день стал слишком нормальным, мне хочется добавить туда маленькую нелепость.", "Я люблю людей, рядом с которыми можно смеяться над собственными провалами.", "Я бы оценил(а) свидание, которое начинается словами 'у меня есть странная идея'.", "Мне нравится, когда партнёр умеет быть серьёзным, но не застревает в серьёзности.", "Я могу придумать драматичный саундтрек к походу за хлебом.", "Если в отношениях нет места дурацким прозвищам, мне чуть грустно.", "Я люблю, когда человек не боится выглядеть смешно ради хорошего момента.", "Я бы скорее выбрал(а) спонтанную фотку с кривым лицом, чем идеальную постановку.", "Иногда лучший способ поддержать меня - сказать что-то абсолютно абсурдное."],
    relationship: ["В отношениях мне важнее стабильность, чем постоянные эмоциональные качели.", "Я хочу, чтобы партнёр прямо говорил о чувствах, а не заставлял угадывать.", "Мне нужно личное пространство даже в очень близких отношениях.", "Я ценю slow burn больше, чем мгновенный фейерверк.", "Меня цепляют поступки больше, чем громкие признания.", "Я хочу отношений, где мы оба растём, а не просто мило смотримся вместе.", "Мне трудно доверять быстро, даже если человек очень нравится.", "Я не люблю ревность как способ 'доказать любовь'.", "Мне важно, чтобы партнёр был эмоционально взрослым.", "Я хочу, чтобы любовь ощущалась и в быту, а не только на красивых моментах.", "Если конфликт случился, я предпочту честный разговор, а не молчаливую войну.", "Мне нравится, когда партнёр защищает мои границы перед другими.", "Я хочу быть с человеком, который уважает моих друзей и мой круг.", "Мне важна нежность, даже если она выражается очень тихо.", "Я скорее выберу надёжного человека, чем самого яркого в комнате.", "Мне нравится, когда в отношениях есть ощущение команды.", "Я могу долго терпеть, но если доверие сломано, вернуть его сложно.", "Мне нужно, чтобы партнёр принимал мои странности без попытки 'исправить'.", "Я хочу романтики, но без ощущения, что меня душат вниманием.", "Мне важно строить будущее, а не только ловить момент.", "Я ценю, когда человек умеет извиняться без театральной сцены.", "Мне важно понимать, что мы выбираем друг друга не только в лёгкие дни.", "Я не хочу угадывать настроение партнёра по загадочным намёкам.", "Мне нравится, когда любовь проявляется в маленькой ежедневной ответственности.", "Я могу влюбиться сильнее после честного сложного разговора.", "Мне важно, чтобы партнёр не обесценивал мои переживания шуткой.", "Я хочу отношений, где можно быть уязвимым человеком, а не вечным героем.", "Мне спокойнее, когда у пары есть общие правила, но без ощущения клетки.", "Я верю, что нежность в долгую важнее яркого старта.", "Мне важно, чтобы партнёр видел во мне отдельного человека, а не роль в своей истории."],
    memes: ["Мои мемы иногда объясняют моё состояние точнее, чем слова.", "Если человек не понимает мой юмор, мне становится чуть грустнее.", "Я могу отправить мем вместо признания в любви.", "Мне нравятся люди, которые умеют шутить без злости.", "Внутренние шутки пары для меня почти отдельный язык любви.", "Я легко заражаюсь чужим смехом.", "Сарказм мне ок, если под ним не прячется жестокость.", "Я люблю, когда человек может пошутить над собой.", "Мемный хаос в переписке для меня может быть флиртом.", "Я иногда сохраняю мемы 'на случай важного разговора'.", "Если партнёр поддерживает тупую шутку, я чувствую себя принятой/принятым.", "Я люблю драматично цитировать что-то не к месту.", "Мой идеальный флирт может начинаться с 'смотри, какая фигня'.", "Я ценю людей, которые понимают, когда надо пошутить, а когда замолчать.", "Я могу переслать 12 мемов подряд и считать это заботой.", "Мне нравится сухой юмор, который доходит через три секунды.", "Я люблю партнёров с эффектом 'с виду серьёзный, внутри мем'.", "У меня есть любимые шутки, которые я повторяю слишком часто.", "Если человек не смеётся над моим лучшим мемом, я проведу внутреннее расследование.", "Я считаю, что совместный кринж может быть романтичным.", "Я могу понять, что человек свой, по тому, как он реагирует на странную картинку без контекста.", "Мне нравится, когда флирт похож на обмен тупыми доказательствами симпатии.", "Я умею смеяться в стрессовый момент, если это не ранит других.", "Если партнёр запоминает мой любимый мем, это почти как цветы.", "Я люблю юмор, где под шуткой есть нежность, а не соревнование в колкости.", "Мне важно, чтобы человек не стыдил меня за мои фанатские приколы.", "Я могу назвать отношения успешными, если у нас появился свой локальный лор.", "Мне нравится, когда партнёр умеет подхватить шутку одним взглядом.", "Иногда я флиртую так неловко, что это уже отдельный жанр.", "Я люблю людей, рядом с которыми можно быть немного мультяшным персонажем."],
    interests: ["Мне нравится обсуждать лор, теории и странные детали мира.", "Я лучше выберу вечер дома с едой и историей, чем шумный выход.", "Мне важно, чтобы у партнёра были свои увлечения и огонь в глазах.", "Я люблю эстетичные места: кафе, крыши, музеи, красивые улицы.", "Меня легко увлечь поездкой, если там будет новая атмосфера.", "Я скорее книжный/игровой/сериальный человек, чем тусовочный.", "Мне нравятся люди, с которыми можно молчать и всё равно не скучно.", "Я люблю, когда человек умеет делать что-то руками.", "Музыка сильно влияет на мой вайб и настроение.", "Я люблю строить планы, даже если потом жизнь всё переиграет.", "Мне интересны люди, у которых есть немного странная специализация.", "Я люблю уютные ритуалы: чай, прогулка, любимое место, повторяемые мелочи.", "Мне нравится, когда партнёр может научить меня чему-то новому.", "Я могу залипнуть в разговор о морали персонажей на час.", "Я люблю активность, где есть немного риска и история на потом.", "Еда как часть свидания для меня реально важна.", "Мне нравится, когда отношения вдохновляют делать что-то своё.", "Я люблю тёмную эстетику, тайны и персонажей с секретами.", "Мне важны добрые бытовые мелочи больше, чем большие жесты.", "Я легко привязываюсь к местам, где было эмоционально хорошо.", "Я люблю людей, которые рассказывают о своём деле так, будто открывают портал.", "Мне интересно пробовать хобби партнёра, даже если я в этом полный ноль.", "Мне нравится, когда свидание можно запомнить по атмосфере, а не по цене.", "Я могу часами выбирать музыку под настроение нашей вымышленной сцены.", "Мне важно, чтобы партнёр уважал моё время на игры, книги, сериалы или творчество.", "Я люблю маленькие коллекции, заметки, плейлисты и прочие личные артефакты.", "Мне нравится, когда человек видит красоту в странных деталях.", "Я бы хотел(а), чтобы у нас были свои любимые места, куда мы возвращаемся.", "Меня цепляют люди, которые умеют быть увлечёнными без высокомерия.", "Я люблю обсуждать не только что произошло, но и почему это было важно."],
    social: ["В большой компании я сначала наблюдаю, а потом включаюсь.", "Я быстро устаю от поверхностного общения.", "Мне проще быть собой рядом с людьми, которые не давят.", "Я часто замечаю настроение других людей.", "Мне важно, чтобы человек был вежлив с теми, от кого ему ничего не нужно.", "Я не люблю, когда кто-то делает отношения публичным спектаклем.", "Я могу быть очень общительным/общительной, если рядом безопасные люди.", "Мне нужно время, чтобы подпустить человека ближе.", "Я ценю людей, которые держат слово.", "Я не люблю, когда мои границы проверяют 'на прочность'.", "В дружбе и любви я предпочитаю честность даже неловкому комфорту.", "Я могу быть душой компании, если настроение совпало.", "Мне нравятся люди, которые умеют не заполнять каждую паузу.", "Я часто беру на себя роль человека, который всех мирит или собирает.", "Я не против спонтанности, если есть хотя бы базовый план выживания.", "Мне важно, чтобы партнёр уважал мою социальную батарейку.", "Я выбираю близкий круг тщательно.", "Мне нравится, когда человек не боится выглядеть искренним.", "В людях меня цепляет не статус, а то, как они ведут себя в мелочах.", "Я хочу, чтобы рядом с партнёром мир становился спокойнее, а не шумнее.", "Мне легче доверять человеку, который одинаково уважителен при друзьях и наедине.", "Я ценю, когда партнёр не заставляет меня быть удобной версией себя.", "Я могу резко закрыться, если чувствую давление со стороны компании.", "Мне нравится, когда человек умеет знакомить меня со своим миром постепенно.", "Я люблю камерные встречи больше, чем шумные события ради галочки.", "Мне важно, чтобы партнёр не высмеивал мои социальные неловкости.", "Я могу долго присматриваться, но потом быть очень преданным человеком.", "Мне нравится, когда в паре можно уйти с вечеринки без долгих объяснений.", "Я ценю людей, которые помнят, что мне важно после одного разговора.", "Мне хочется быть рядом с человеком, с которым не нужно постоянно выступать."],
    boundaries: ["Я спокойно отношусь к слову 'нет', если его говорят честно и без унижения.", "Мне важно, чтобы конфликт не превращался в соревнование, кто больнее ударит словами.", "Я предпочту паузу в разговоре, если понимаю, что сейчас могу сказать лишнее.", "Мне трудно доверять человеку, который игнорирует мои просьбы о личном пространстве.", "Я ценю партнёров, которые умеют признавать ошибку без оправданий на десять минут.", "Мне важно, чтобы мои слабые места не использовали как аргумент в споре.", "Я не люблю проверки любви через провокации.", "Если человек давит на жалость, я начинаю отдаляться.", "Мне легче мириться, когда партнёр сначала слышит меня, а не сразу защищается.", "Я хочу, чтобы в отношениях можно было обсуждать деньги, время и планы без стыда.", "Мне важно, чтобы партнёр не требовал доступ ко всему моему личному миру.", "Я могу простить резкость, если человек правда берёт ответственность за последствия.", "Мне нравится, когда мы умеем говорить о проблеме раньше, чем она стала катастрофой.", "Я не хочу быть единственным человеком, который чинит отношения после ссоры.", "Мне нужно, чтобы партнёр уважал моё молчание, если я беру время остыть.", "Я ценю прямоту, если она не превращается в грубость ради грубости.", "Мне важно, чтобы ревность не подавалась как романтика.", "Я не люблю, когда мои эмоции называют драмой только потому, что они неудобны.", "Мне спокойнее с человеком, который умеет договариваться о границах заранее.", "Я хочу, чтобы после конфликта мы делали выводы, а не просто делали вид, что всё прошло.", "Мне сложно быть рядом с человеком, который всегда переводит разговор в шутку.", "Я ценю, когда партнёр спрашивает, можно ли дать совет, а не врывается с решением.", "Мне важно иметь право на плохой день без немедленного объяснения.", "Я не хочу, чтобы отношения становились местом постоянной проверки на прочность.", "Мне нравится, когда человек спокойно говорит о своих потребностях.", "Я могу быть очень мягким человеком, но не люблю, когда мягкость принимают за слабость.", "Мне важны извинения, после которых поведение правда меняется.", "Я предпочитаю честное 'я не готов(а) говорить', а не исчезновение без следа.", "Мне нужно, чтобы партнёр не конкурировал с моими друзьями за внимание.", "Я ценю любовь, в которой есть уважение даже во время несогласия."],
    adventure: ["Меня тянет к людям, с которыми обычный день может стать историей.", "Я люблю спонтанные планы, если они не ломают всё вокруг.", "Мне нравится идея свидания, где есть дорога, ветер и немного неизвестности.", "Если появляется шанс на маленькое приключение, мне трудно сказать нет.", "Я могу вдохновиться человеком, который не боится менять маршрут.", "Мне нравится ощущение, что мы команда в странной миссии.", "Я не против риска, если рядом есть человек, который думает головой.", "Меня цепляют люди, рядом с которыми мир кажется шире.", "Я бы выбрал(а) поездку без идеального плана, если там есть сильный вайб.", "Мне нравится, когда партнёр умеет действовать быстро в неожиданной ситуации.", "Я люблю истории, которые потом можно пересказывать с фразой 'а помнишь'.", "Мне важна свобода движения, даже если я люблю уют.", "Я могу влюбиться в человека, который спокойно ведёт нас через хаос.", "Меня радуют люди, которые не паникуют, когда план слегка горит.", "Я люблю пробовать новое, если меня не торопят и не высмеивают.", "Мне нравится, когда отношения не превращаются в расписание без воздуха.", "Я бы пошёл/пошла на ночную прогулку ради красивого вида.", "Мне интересны люди, у которых есть смелость начинать сначала.", "Я люблю, когда партнёр может сказать 'держись, я придумал(а)' и правда придумать.", "Я хочу, чтобы рядом с человеком у меня появлялось больше жизни, а не меньше.", "Я не против внезапных перемен, если чувствую доверие к партнёру.", "Мне нравится лёгкое чувство опасности в истории, но не в реальной безопасности отношений.", "Я люблю персонажей и людей, которые выбирают путь, а не сидят в ожидании знака.", "Мне важно, чтобы партнёр уважал мою потребность иногда исчезать в свой мир.", "Я могу кайфовать от дороги больше, чем от пункта назначения.", "Мне нравятся люди, которые умеют быть смелыми без показухи.", "Я бы выбрал(а) приключение с грязными ботинками вместо стерильного идеального вечера.", "Меня вдохновляет человек, который умеет видеть шанс там, где другие видят проблему.", "Я люблю, когда у пары есть ощущение общей карты сокровищ.", "Мне хочется, чтобы любовь иногда вытаскивала меня из слишком привычной жизни."],
    comfort: ["Мне важны совместные маленькие ритуалы больше, чем редкие грандиозные жесты.", "Я люблю, когда рядом с человеком можно просто выдохнуть.", "Идеальный вечер для меня может быть очень тихим и домашним.", "Мне нравится, когда партнёр помнит, какой чай, еду или плед я люблю.", "Я ценю заботу, которая выглядит как 'я уже всё подготовил(а)'.", "Мне важно, чтобы в отношениях было место усталости, а не только красивым сценам.", "Я люблю уют, но не хочу, чтобы он превращался в болото.", "Мне нравится готовить, заказывать еду или просто делить перекус с близким человеком.", "Я могу влюбиться сильнее из-за спокойного утра рядом.", "Мне важно, чтобы дом с партнёром ощущался безопасным местом.", "Я люблю, когда человек замечает, что я замёрз(ла), устал(а) или голоден(на).", "Мне нравится бытовая романтика: дорога домой, покупки, общие мелочи.", "Я хочу, чтобы рядом с партнёром можно было молчать без неловкости.", "Мне важно, чтобы человек не обесценивал мои потребности в отдыхе.", "Я люблю, когда партнёр умеет создавать атмосферу из ничего.", "Мне нравится идея своих мест, своих кружек, своих привычек.", "Я ценю спокойную поддержку больше, чем эффектные обещания.", "Мне важно, чтобы в отношениях было тепло даже в обычный вторник.", "Я люблю людей, которые умеют заботиться руками: приготовить, починить, укрыть, донести.", "Мне хочется, чтобы любовь была не только приключением, но и возвращением домой.", "Я могу быть очень счастлив(а), если рядом просто спокойно сидят и не требуют объяснений.", "Мне нравится, когда партнёр не смеётся над моими маленькими уютными странностями.", "Я ценю человека, который умеет превращать хаос дня в нормальный вечер.", "Мне важно иметь общие привычки, которые держат нас вместе в долгую.", "Я люблю, когда забота не выглядит как долг, а как естественное внимание.", "Мне нравится ощущение 'мы справимся', даже если день был плохой.", "Я хочу, чтобы в отношениях было место лени без чувства вины.", "Меня цепляют люди, рядом с которыми сон становится спокойнее.", "Я люблю, когда партнёр умеет быть тихим союзником в бытовых делах.", "Мне важно, чтобы любовь была видна в том, как человек относится к моему повседневному состоянию."],
    values: ["Мне важно, чтобы партнёр имел принципы, даже если они не всегда удобные.", "Я обращаю внимание на то, как человек поступает, когда его никто не хвалит.", "Мне сложно уважать человека, который красиво говорит, но не держит слово.", "Я ценю доброту, если она не превращается в желание всем понравиться.", "Мне важно, чтобы партнёр был честен с собой, а не только со мной.", "Меня цепляют люди, которые могут признать сложность мира без цинизма.", "Я не люблю, когда сила используется для унижения слабых.", "Мне важно, чтобы человек уважал мои мечты, даже если они странные.", "Я ценю амбиции, если они не требуют растоптать всех вокруг.", "Мне нравится, когда партнёр умеет выбирать, за что он борется.", "Я могу влюбиться в человека из-за одного честного поступка.", "Мне важно, чтобы любовь не отменяла личные цели каждого из нас.", "Я уважаю людей, которые умеют менять мнение, когда узнают больше.", "Мне сложно быть рядом с человеком, который постоянно играет роль.", "Я хочу, чтобы партнёр не боялся говорить правду мягко.", "Мне важно, чтобы в отношениях были не только чувства, но и смысл.", "Я ценю людей, которые заботятся о своих близких без показухи.", "Меня привлекают персонажи с внутренним кодексом, даже если они сложные.", "Я не хочу быть с человеком, который считает эмпатию слабостью.", "Мне нравится, когда партнёр вдохновляет меня становиться честнее.", "Я верю, что выбор человека в мелочах показывает его больше, чем громкие слова.", "Мне важно, чтобы рядом со мной не смеялись над чужой болью.", "Я ценю свободу, но не как оправдание безответственности.", "Мне нравится, когда человек умеет быть сильным и бережным одновременно.", "Я хочу отношений, где мы поддерживаем лучшее друг в друге, а не худшее.", "Мне важно, чтобы партнёр не предавал себя ради красивой картинки.", "Я могу уважать человека за спокойную стойкость больше, чем за эффектную победу.", "Мне нравится, когда любовь делает людей смелее, а не меньше.", "Я ценю способность защищать своё, не превращаясь в жестокость.", "Мне хочется быть рядом с человеком, у которого есть сердце и позвоночник."],
    attention: ["Мне нравится, когда партнёр флиртует так, будто это наш маленький секрет.", "Я замечаю, когда человек запоминает детали обо мне.", "Мне важны комплименты, если они звучат конкретно, а не как шаблон.", "Я люблю, когда внимание проявляется в действиях, а не только в словах.", "Мне нравится лёгкая игра взглядов и намёков без давления.", "Я могу смутиться от маленького жеста сильнее, чем от громкого признания.", "Мне важно, чтобы партнёр показывал симпатию так, чтобы я не чувствовал(а) себя объектом.", "Я люблю переписки, где есть тепло, юмор и немного искры.", "Мне нравится, когда человек умеет красиво заметить моё настроение.", "Я ценю прикосновения и близость только когда они уместны и желанны.", "Мне важно, чтобы партнёр не стеснялся радоваться мне.", "Я люблю флирт, который не превращается в соревнование за власть.", "Мне нравится, когда человек может сказать нежность без пафоса.", "Я замечаю, если партнёр выбирает место, музыку или момент специально для меня.", "Мне важно чувствовать, что меня выбирают не по инерции.", "Я люблю, когда забота выглядит как внимательность к моим мелким привычкам.", "Меня цепляет человек, который умеет быть обаятельным без давления.", "Я могу долго помнить одну фразу, сказанную в правильный момент.", "Мне нравится, когда романтика появляется неожиданно, но не нарушает границы.", "Я ценю партнёров, которые умеют быть нежными наедине и уважительными при людях.", "Мне важно, чтобы флирт не исчезал полностью после начала отношений.", "Я люблю, когда человек замечает мои усилия, а не только результат.", "Мне нравится, когда партнёр умеет поддержать меня так, что я чувствую себя увиденным(ой).", "Я могу растаять от сообщения, которое показывает, что обо мне думали заранее.", "Мне важна искра, но без эмоционального аттракциона каждый день.", "Я люблю, когда человек умеет быть мягко настойчивым, но слышит отказ.", "Мне нравится, когда романтика строится из деталей, а не из дорогих жестов.", "Я хочу чувствовать себя желанным человеком, но не трофеем.", "Мне важно, чтобы внимание партнёра было живым, а не автоматическим.", "Я ценю флирт, после которого становится спокойнее, а не тревожнее."],
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
