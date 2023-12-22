import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Detail from './Pages/Detail/Detail'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/detail/:globe' element={<Detail/>} />
      </Routes>
    </div>
  )
}
