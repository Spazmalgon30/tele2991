
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import MatchPage from './pages/MatchPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/match/:id" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
