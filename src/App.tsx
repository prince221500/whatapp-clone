import { Routes, Route } from 'react-router-dom'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-whatsapp-dark">
      <Routes>
        <Route path="/*" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App