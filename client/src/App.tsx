import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blogs" element={<Blog />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
