import { Routes, Route, Navigate } from 'react-router-dom'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="boards/68676bf998e8dcf8cb7e9d31" replace={true} />} />
      <Route path='/boards/:boardId' element={<Board/>} />

      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
