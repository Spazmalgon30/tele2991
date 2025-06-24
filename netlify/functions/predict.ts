
import { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GROQ_API_KEY is missing in environment' })
    }
  }

  const { teamA, teamB } = JSON.parse(event.body || '{}')
  if (!teamA || !teamB) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing team names' })
    }
  }

  const prompt = `Прогноз на матч между ${teamA} и ${teamB}. Кто победит и с каким счётом? Дай краткий анализ.`

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }]
    })
  })

  const data = await response.json()
  const aiReply = data.choices?.[0]?.message?.content || "Не удалось получить ответ от ИИ."

  return {
    statusCode: 200,
    body: JSON.stringify({ result: aiReply })
  }
}

export { handler }
