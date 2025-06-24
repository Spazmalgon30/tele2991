
import { matches } from './data/matches'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Матчи</h1>
      <ul className="space-y-4">
        {matches.map((match) => (
          <li
            key={match.id}
            className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/match/${match.id}`)}
          >
            <div className="text-lg font-medium">{match.teamA} vs {match.teamB}</div>
            <div className="text-sm text-gray-500">{new Date(match.time).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
