import { Link } from "react-router-dom"
import type { Post } from "./Post"
import viteLogo from '/vite.svg'

export default function PostView( props : Post)
{
  return(
    <Link className="post_item" key={props.id} to={`/posts/${props.id}`}>
      <div className="post_info">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <div className="post_info-block">
          <div className="post_user-name">Ilnaz Gilyazov</div>
          <div className="post_info-text">Основатель группы ~ {props.created}</div>
        </div>
      </div>
      <div className="post_content">{props.content}</div>
    </Link>
  )
}