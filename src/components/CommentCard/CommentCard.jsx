// npm modules
import { NavLink } from "react-router-dom"

// components
import AuthorInfo from "../AuthorInfo/AuthorInfo"
import Icon from "../Icon/Icon"

const CommentCard = ({ comment, user, blogId }) => {
  return (
    <article>
      <header>
        <span>
          <AuthorInfo content={comment} />
          {comment.author._id === user.profile &&
            <>
              <NavLink 
                to={`/blogs/${blogId}/comments/edit`}
                state={comment}
              >
                <Icon category="Edit" />
              </NavLink>
              <button>
                <Icon category="Trash" />
              </button>
            </>
          }
        </span>
      </header>
      <p>{comment.text}</p>
    </article>
  )
}

export default CommentCard