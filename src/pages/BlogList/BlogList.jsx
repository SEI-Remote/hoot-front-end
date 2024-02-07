// css 
import styles from './BlogList.module.css'

const BlogList = (props) => {
  return (
    <main className={styles.container}>
      {props.blogs.map(blog =>
        <p key={blog._id}>{blog.title}</p>  
      )}
    </main>
  )
}

export default BlogList