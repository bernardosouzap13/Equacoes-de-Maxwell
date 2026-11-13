import { BrowserRouter, Route, Routes } from 'react-router'
import { ProvedorApp } from './providers/ProvedorApp'
import { Inicio } from './pages/Inicio'
import { NaoEncontrada } from './pages/NaoEncontrada'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ProvedorApp>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </ProvedorApp>
    </BrowserRouter>
  )
}

export default App
