// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Logout from './pages/Logout/Logout'
import BlogList from './pages/BlogList/BlogList'
import BlogDetails from './pages/BlogDetails/BlogDetails'
import NewBlog from './pages/NewBlog/NewBlog'
import EditBlog from './pages/EditBlog/EditBlog'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as blogService from './services/blogService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddBlog = async blogFormData => {
    const newBlog = await blogService.create(blogFormData)
    setBlogs([newBlog, ...blogs])
    navigate('/blogs')
  }

  const handleUpdateBlog = async blogFormData => {
    const updatedBlog = await blogService.update(blogFormData)
    setBlogs(blogs.map((b) => blogFormData._id === b._id ? updatedBlog : b))
    navigate('/blogs')
  }

  const handleDeleteBlog = async blogId => {
    const deletedBlog = await blogService.deleteBlog(blogId)
    setBlogs(blogs.filter(b => b._id !== deletedBlog._id))
    navigate('/blogs')
  }

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const data = await blogService.index()
      setBlogs(data)
    }
    if (user) fetchAllBlogs()
  }, [user])

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route 
          path='/blogs'
          element={
            <ProtectedRoute user={user} >
              <BlogList blogs={blogs} /> 
            </ProtectedRoute>
          }
        />
        <Route 
          path='/blogs/:blogId'
          element={
            <ProtectedRoute user={user}>
              <BlogDetails handleDeleteBlog={handleDeleteBlog} user={user} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/blogs/new'
          element={
            <ProtectedRoute user={user}>
              <NewBlog handleAddBlog={handleAddBlog} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/blogs/:blogId/edit'
          element={
            <ProtectedRoute user={user}>
              <EditBlog handleUpdateBlog={handleUpdateBlog} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
