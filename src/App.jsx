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
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogsData = await blogService.index()
      setBlogs(blogsData)
    }
    if (user) fetchAllBlogs()
  }, [user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddBlog = async (blogFormData) => {
    const newBlog = await blogService.create(blogFormData)
    setBlogs([newBlog, ...blogs])
    navigate('/blogs')
  }

  const handleUpdateBlog = async (blogFormData) => {
    const updatedBlog = await blogService.update(blogFormData)
    setBlogs(blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog))
    navigate('/blogs')
  }

  const handleDeleteBlog = async (blogId) => {
    const deletedBlog = await blogService.delete(blogId)
    setBlogs(blogs.filter(blog => blog._id !== deletedBlog._id))
    navigate('/blogs')
  }

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
            <ProtectedRoute user={user} >
              <BlogDetails 
                user={user} 
                handleDeleteBlog={handleDeleteBlog} 
              />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/blogs/edit'
          element={
            <ProtectedRoute user={user} >
              <EditBlog handleUpdateBlog={handleUpdateBlog} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/blogs/new'
          element={
            <ProtectedRoute user={user} >
              <NewBlog handleAddBlog={handleAddBlog} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
