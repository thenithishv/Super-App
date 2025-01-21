import GenrePage from './pages/GenrePage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import CarouselPage from './pages/CarouselPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/home' element={<RegisterPage/>}/>
        <Route path='/genres' element={<GenrePage/>}/>
        <Route path='/carousel' element={<CarouselPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/movie' element={<RegisterPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
