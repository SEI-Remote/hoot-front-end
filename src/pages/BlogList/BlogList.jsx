// css
import styles from './Bloglist.module.css'

const BlogList = (props) => {
  console.log(props);
  return (
    <main className={`${styles.container} ${styles.main}`}>
      {props.blogs.map(blog => (
        <p key={blog._id}>
          {blog.title}
        </p>
      ))}
    </main>
  )
}
 
export default BlogList