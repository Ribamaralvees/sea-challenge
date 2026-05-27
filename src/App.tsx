import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Step1Page from './pages/Step1Page'
import EmBrevePage from './pages/EmBrevePage'

const SIDEBAR = ['dashboard','formularios','equipes','buscar','notificacoes','historico','config','perfil']

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/step/1" replace />} />
      <Route path="/step/1" element={<Step1Page />} />
      {[2,3,4,5,6,7,8,9].map(n =>
        <Route key={n} path={`/step/${n}`} element={<EmBrevePage />} />
      )}
      {SIDEBAR.map(s =>
        <Route key={s} path={`/sidebar/${s}`} element={<EmBrevePage />} />
      )}
      <Route path="*" element={<Navigate to="/step/1" replace />} />
    </Routes>
  </BrowserRouter>
)
export default App
