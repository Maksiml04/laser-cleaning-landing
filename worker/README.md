# LZR Telegram Worker

Worker принимает заявку с сайта, проверяет поля и фотографии, отправляет текст и вложения в Telegram, затем проксирует заявку в Formspree для email.

## Первичная настройка

Из корня проекта:

```bash
npx wrangler login
npx wrangler secret put TELEGRAM_BOT_TOKEN --config worker/wrangler.toml
npx wrangler deploy --config worker/wrangler.toml
```

Команды `secret put` запрашивают значения интерактивно. Токен бота не нужно добавлять в Git, HTML или JavaScript.

## Telegram

1. Создать бота через `@BotFather` командой `/newbot`.
2. Написать созданному боту `/start` с аккаунта-получателя.
3. Оставить `TELEGRAM_USERNAME` в `worker/wrangler.toml` равным username получателя.
4. Worker автоматически найдёт числовой `chat_id` после первой заявки.

Для автоопределения получатель должен сначала отправить боту `/start`. Если обновления Telegram уже забирает другой webhook или процесс, автоопределение не сработает.

## Подключение сайта

После `wrangler deploy` `action` в `index.html` и `contacts/index.html` должен указывать на URL Worker:

```html
action="https://lzr-leads.lzr-leads.workers.dev"
```

Worker сам пересылает заявку в Formspree и Telegram.
