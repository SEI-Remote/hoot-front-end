// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// css
import styles from './BlogDetails.module.css'

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const { blogId } = useParams()
  
  useEffect(() => {
    const fetchBlog = async() => {
      const blogData = await blogService.show(blogId)
      setBlog(blogData)
    }
    fetchBlog()
  }, [blogId])
  
  return (
    <main className={styles.container}>
      BlogDetails
    </main>
  )
}

export default BlogDetails