
import { useParams } from 'react-router-dom'
import { matches } from '../data/matches'
import { useState } from 'react'

export default function MatchPage() {
  const { id } = useParams()
  const match = matches.find(m => m.id === id)
  const [tab, setTab] = useState<'overview' | 'predict'>('overview')
  const [prediction, setPrediction] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePredict = async () => {
    setLoading(true)
    const res = await fetch('/.netlify/functions/predict', {
      method: 'POST',
      body: JSON.stringify({ teamA: match?.teamA, teamB: match?.teamB }),
    })
    const data = await res.json()
    setPrediction(data.result)
    setLoading(false)
  }

  if (!match) return <div>Матч не найден</div>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{match.teamA} vs {match.teamB}</h2>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setTab('overview')} className={tab === 'overview' ? 'font-bold' : ''}>Обзор</button>
        <button onClick={() => setTab('predict')} className={tab === 'predict' ? 'font-bold' : ''}>Вероятные исходы</button>
      </div>

      {tab === 'overview' && (
        <div>
          <p>Дата и время: {new Date(match.time).toLocaleString()}</p>
          <p>Информация о матче будет позже...</p>
        </div>
      )}

      {tab === 'predict' && (
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? 'Запрос...' : 'Получить прогноз'}
          </button>
          {prediction && (
            <div className="mt-4 p-4 bg-gray-100 rounded">{prediction}</div>
          )}
        </div>
      )}
    </div>
  )
}
