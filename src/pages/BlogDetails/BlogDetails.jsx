// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// components
import Loading from '../Loading/Loading'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'

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
  
  if (!blog) return <Loading />

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{blog.category.toUpperCase()}</h3>
          <h1>{blog.title}</h1>
          <span>
            <AuthorInfo content={blog} />
          </span>
        </header>
        <p>{blog.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
      </section>
    </main>
  )
}

export default BlogDetails