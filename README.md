
# Telegram Flashscore Mini App

## 🛠 Установка

```bash
npm install
```

## 🚀 Запуск локально

```bash
npm run dev
```

## ⚙️ Переменные окружения

Создайте файл `.env` в корне проекта и добавьте:

```
GROQ_API_KEY=your_real_groq_api_key
```

## 📡 Backend-функции (Netlify)

Функция `netlify/functions/predict.ts`:
- Использует модель Groq `mixtral-8x7b-32768`
- Генерирует краткий прогноз на основе названий команд
