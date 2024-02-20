import { BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { Send } from './pages/Send'

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/send' element={<Send />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
