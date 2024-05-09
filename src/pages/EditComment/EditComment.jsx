// npm modules
import { useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"

// css
import styles from './EditComment.module.css'

// services
import * as blogService from '../../services/blogService'

const EditComment = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { blogId } = useParams()
  const [formData, setFormData] = useState(state)

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await blogService.updateComment(blogId, formData)
    navigate(`/blogs/${blogId}`)
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          placeholder="Text"
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default EditComment