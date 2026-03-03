import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/create" element={<CreateBlog/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
