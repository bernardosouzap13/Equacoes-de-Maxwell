import { BrowserRouter, Route, Routes } from 'react-router'
import { AppProvider } from './providers/AppProvider'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
