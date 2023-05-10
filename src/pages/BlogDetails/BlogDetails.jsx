// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// pages
import Loading from "../Loading/Loading"

// components
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'

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
  
  if (!blog) return <Loading />

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{blog.category.toUpperCase()}</h3>
          <h1>{blog.title}</h1>
        </header>
        <span>
          <AuthorInfo content={blog} />
        </span>
        <p>{blog.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
      </section>
    </main>
  )
}
 
export default BlogDetails