import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import GenrePage from './pages/GenrePage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import CarouselPage from './pages/CarouselPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import MoviePage from './pages/MoviePage';


const ProtectedRoute = ({ children}) =>{
  const {user} = useContext(AppContext);
  return user ? children: <Navigate to='/register'/>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route 
        path='/home' 
        element={
          <ProtectedRoute>
            <RegisterPage/>
          </ProtectedRoute>
        }/>
        <Route path='/genres' element={
           <ProtectedRoute>
           <GenrePage/>
         </ProtectedRoute>
          }/>
        <Route path='/carousel' element={
           <ProtectedRoute>
           <CarouselPage/>
         </ProtectedRoute>
          
        }/>
        <Route path='/dashboard' element={
           <ProtectedRoute>
           <DashboardPage/>
         </ProtectedRoute>
        }/>
        <Route path='/movie' element={
           <ProtectedRoute>
           <MoviePage/>
         </ProtectedRoute>
        }/>
        <Route path='*' element={
           <ProtectedRoute>
          <NotFoundPage/>
         </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
