# Кто твой партнёр из фандома?

Фановый мультифандомный квиз: участник выбирает фандом, интерес `Парни / Девушки / Все`, отвечает на 10 случайных вопросов из банка 300, получает романтический мэтч, а затем ИИ пишет короткую историю по результату.

## Что готово

- Статический фронтенд без сборки: `public/index.html`, `public/styles.css`, `public/app.js`
- Cloudflare Pages Function для генерации истории: `functions/api/story.js`
- 72 персонажа из 6 фандомов со встроенными картинками
- Слайдовый сценарий прохождения без длинного скролла
- Редкость персонажей и светящиеся рамки результата
- Генерация истории через OpenAI Responses API

## Название проекта

Рекомендуемое новое имя репозитория и Cloudflare Pages-проекта:

```text
fandom-partner-quiz
```

Тогда будущая ссылка Cloudflare Pages будет выглядеть примерно так:

```text
https://fandom-partner-quiz.pages.dev
```

Если это имя уже занято в Cloudflare, можно взять вариант:

```text
fandom-romance-quiz
partner-fandom-quiz
fandom-match-quiz
```

## Почему не только GitHub Pages

GitHub Pages подходит только для статических файлов. Для генерации истории нужен секретный `OPENAI_API_KEY`, а такой ключ нельзя хранить в браузере.

Рабочая схема такая:

1. Код лежит в GitHub.
2. Cloudflare Pages забирает репозиторий.
3. Cloudflare публикует сайт по ссылке.
4. Cloudflare Pages Functions вызывает OpenAI на сервере.

## Локальное обновление после переименования GitHub

Если репозиторий в GitHub будет переименован в `fandom-partner-quiz`, локальный remote можно обновить так:

```bash
git remote set-url origin https://github.com/Hulore/fandom-partner-quiz.git
```

После этого обычные обновления остаются такими же:

```bash
git add .
git commit -m "Update quiz"
git push
```

## Настройки Cloudflare Pages

Проект теперь деплоится как Cloudflare Worker со Static Assets. В настройках билда должны быть такие значения:

- `Build command`: оставить пустым или `None`
- `Deploy command`: `npx wrangler deploy`
- `Root directory`: `/`

В переменных окружения Cloudflare должны быть:

```env
OPENAI_API_KEY=твой_реальный_ключ
OPENAI_MODEL=gpt-5-mini
STATS_ADMIN_TOKEN=любой_длинный_секрет_для_просмотра_статистики
```

`OPENAI_MODEL` можно не добавлять, но лучше добавить явно.

Для сбора статистики добавь в Cloudflare KV namespace binding с именем:

```text
STATS_KV
```

Статистика не отправляет имя участника, Telegram ID или конкретные ответы. Сохраняются только агрегаты: старт теста, результат, генерация истории, шаринг, фандом, интерес, персонаж, редкость и платформа.

Посмотреть сырые счётчики можно по ссылке:

```text
https://fandom-partner-quiz.hulore.workers.dev/api/stats?token=ТВОЙ_STATS_ADMIN_TOKEN
```

## Telegram Mini App

Обычная веб-версия открывается по базовой ссылке проекта:

```text
https://fandom-partner-quiz.hulore.workers.dev/
```

Для Telegram Mini App используй ту же ссылку, но с параметром:

```text
https://fandom-partner-quiz.hulore.workers.dev/?platform=telegram
```

Этот параметр включает Telegram-режим: компактные отступы, поддержку кнопки назад внутри Telegram, автоподстановку имени пользователя Telegram и кнопку “Поделиться результатом”.

## Что можно менять под себя

- В `public/app.js` можно менять фандомы, персонажей, вопросы и логику мэтча.
- В `functions/api/story.js` можно менять промпт, модель и стиль истории.
- В `public/styles.css` можно менять внешний вид, анимации и рамки редкости.
