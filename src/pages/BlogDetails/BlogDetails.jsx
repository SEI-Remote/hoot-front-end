// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// css
import styles from './BlogDetails.module.css'

const BlogDetails = (props) => {
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.show(blogId)
      setBlog(data)
    }
    fetchBlog()
  }, [blogId])

  console.log('Blog state:', blog);
  
  return (
    <main className={styles.container}>
      Details
    </main>
  )
}
 
export default BlogDetails