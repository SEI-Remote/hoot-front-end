import { useState } from 'react'

// css
import styles from './NewComment.module.css'

// components
import Icon from '../Icon/Icon'

const NewComment = (props) => {
  const [formData, setFormData] = useState({
    text: ''
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddComment(formData)
    setFormData({ text: '' })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>New Comment</h1>
      <textarea 
        required
        name="text"
        value={formData.text}
        placeholder='Add a Comment'
        onChange={handleChange}
      />
      <button type="submit"><Icon category='Create' /></button>
    </form>  
  )
}

export default NewComment