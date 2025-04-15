import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import BlockList from './pages/BlockList.jsx'
import EntityList from './pages/EntityList.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blocks/:id" element={<BlockList />} />
      <Route path='/blocks/:id/entities' element={<EntityList />} />
    </Routes>
  )
}

export default App
