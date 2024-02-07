// npm modules
import { useState } from "react"

// css
import styles from './NewBlog.module.css'

const NewBlog = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News'
  })
  return (
    <main className={styles.container}>
      
    </main>
  )
}

export default NewBlog