// npm modules
import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'

// components
import Loading from '../Loading/Loading'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'
import Icon from '../../components/Icon/Icon'
import NewComment from '../../components/NewComment/NewComment'
import Comments from '../../components/Comments/Comments'

// css
import styles from './BlogDetails.module.css'

// services
import * as blogService from '../../services/blogService'

const BlogDetails = (props) => {
  const [blog, setBlog] = useState(null)
  const { blogId } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await blogService.show(blogId)
      setBlog(blogData)
    }
    fetchBlog()
  }, [blogId])

  const handleAddComment = async commentFormData => {
    const newComment = await blogService.createComment(blogId, commentFormData)
    setBlog({...blog, comments: [...blog.comments, newComment]})
  }

  if (!blog) return <Loading />

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{blog.category.toUpperCase()}</h3>
          <h1>{blog.title}</h1>
          <span>
            <AuthorInfo content={blog} />
            {blog.author._id === props.user.profile &&
              <>
                <NavLink to='/blogs/edit' state={blog}>
                  <Icon category='Edit' />
                </NavLink>
                <button onClick={() => props.handleDeleteBlog(blog._id)}>
                  <Icon category='Trash' />
                </button>
              </>
            }
          </span>
        </header>
        <p>{blog.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
        <NewComment handleAddComment={handleAddComment} />
        <Comments comments={blog.comments} user={props.user}/>
      </section>
    </main>
  )
}

export default BlogDetails