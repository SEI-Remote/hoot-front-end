// npm modules
import { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

// css
import styles from './EditComment.module.css'

// services
import * as blogService from '../../services/blogService'

const EditComment = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { blogId } = useParams()
  const [formData, setFormData] = useState(state)

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    blogService.updateComment(blogId, formData)
    navigate(`/blogs/${blogId}`)
  }


  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <textarea 
          required
          name="text" 
          value={formData.text}
          placeholder='Add a Comment'
          onChange={handleChange}
        />
      <button type="submit">SUBMIT</button>
    </form>
    </main>
  )
}

export default EditComment