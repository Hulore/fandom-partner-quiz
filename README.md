# Кто твой парень из One Piece?

Фановый квиз по мотивам `One Piece`: участник отвечает на `20` вопросов про социальные привычки, общение, границы и стиль жизни, получает романтический мэтч, а затем ИИ пишет короткую историю знакомства, отношений, совместной жизни и финала длиной примерно `400-600` слов.

## Что уже готово

- статический фронтенд без сборки: `index.html`, `styles.css`, `app.js`
- подбор персонажа прямо в браузере
- генерация истории через OpenAI Responses API
- серверная функция для Cloudflare Pages: `functions/api/story.js`

## Почему не один GitHub Pages

`GitHub Pages` подходит только для статических файлов. Для генерации истории нужен секретный `OPENAI_API_KEY`, а такой ключ нельзя хранить в браузере.

Поэтому рабочая схема такая:

1. код лежит в GitHub
2. Cloudflare Pages забирает репозиторий
3. Cloudflare публикует сайт по ссылке
4. Cloudflare Pages Functions вызывает OpenAI на сервере

## Что сделать тебе, чтобы всё работало

Ниже самый простой путь без локальной сборки.

### Шаг 1. Создай репозиторий на GitHub

1. Открой GitHub и нажми `New repository`.
2. Назови репозиторий, например `onepiece-boyfriend-quiz`.
3. Выбери `Public` или `Private`.
4. Нажми `Create repository`.

### Шаг 2. Залей файлы проекта

Если хочешь без терминала:

1. Открой созданный репозиторий.
2. Нажми `Add file` -> `Upload files`.
3. Перетащи в окно загрузки всё содержимое этой папки:
   `index.html`
   `styles.css`
   `app.js`
   папку `functions`
   `README.md`
4. Нажми `Commit changes`.

Если хочешь через git в терминале:

```bash
cd "путь-к-папке-проекта"
git init
git branch -M main
git add .
git commit -m "Initial quiz site"
git remote add origin https://github.com/ТВОЙ_ЛОГИН/onepiece-boyfriend-quiz.git
git push -u origin main
```

### Шаг 3. Создай ключ OpenAI

1. Зайди в OpenAI Platform.
2. Создай API key.
3. Сохрани его отдельно, он понадобится в Cloudflare.

### Шаг 4. Подключи проект к Cloudflare Pages

1. Открой `Cloudflare Dashboard`.
2. Перейди в `Workers & Pages`.
3. Нажми `Create application`.
4. Выбери `Pages`.
5. Выбери `Connect to Git`.
6. Подключи GitHub-аккаунт, если Cloudflare попросит доступ.
7. Выбери репозиторий `onepiece-boyfriend-quiz`.

### Шаг 5. Заполни настройки деплоя

Укажи такие значения:

- `Framework preset`: `None`
- `Build command`: оставить пустым
- `Build output directory`: `.`

### Шаг 6. Добавь секреты

В переменных окружения Cloudflare добавь:

```env
OPENAI_API_KEY=твой_реальный_ключ
OPENAI_MODEL=gpt-5-mini
```

`OPENAI_MODEL` можно не добавлять, но лучше добавить сразу.

### Шаг 7. Нажми Deploy

После этого Cloudflare соберёт сайт и выдаст ссылку вида:

```text
https://onepiece-boyfriend-quiz.pages.dev
```

## Как потом обновлять сайт

Каждый раз, когда ты меняешь файлы и пушишь их в GitHub, Cloudflare автоматически делает новый деплой.

То есть дальше схема очень простая:

1. меняешь тексты, вопросы или дизайн
2. загружаешь изменения в GitHub
3. Cloudflare сам обновляет публичную ссылку

## Что можно менять под себя

- в `app.js` можно менять вопросы, ответы и список персонажей
- в `functions/api/story.js` можно менять промпт, модель и стиль истории
- в `styles.css` можно менять внешний вид

## Полезная заметка

Если захочешь, чтобы истории были более красивые и литературные, можно заменить:

```env
OPENAI_MODEL=gpt-5-mini
```

на

```env
OPENAI_MODEL=gpt-5.4
```

Это обычно даст более сильный текст, но может стоить дороже.
