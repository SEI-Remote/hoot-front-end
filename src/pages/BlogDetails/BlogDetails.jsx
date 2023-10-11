import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styles from './BlogDetails.module.css'

import * as blogService from '../../services/blogService'

const BlogDetails = (props) => {
  const [blog, setBlog] = useState(null)
  const { blogId } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.show(blogId)
      setBlog(data)
    }
    fetchBlog()
  }, [blogId])

  return (
    <main className={styles.container}>
      Details
    </main>
  )
}

export default BlogDetails