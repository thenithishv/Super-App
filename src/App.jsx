
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
