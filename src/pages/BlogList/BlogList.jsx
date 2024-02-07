// css 
import styles from './BlogList.module.css'

// components
import BlogCard from '../../components/BlogCard/BlogCard'

const BlogList = (props) => {
  return (
    <main className={styles.container}>
      {props.blogs.map(blog =>
        <BlogCard key={blog._id} blog={blog} />
      )}
    </main>
  )
}

export default BlogList