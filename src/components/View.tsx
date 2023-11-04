import { Link, Navigate, useMatch } from "react-router-dom"
import PostView from "./PostView";
import type { PostsList } from "./PostsList";

export default function View( props : PostsList )
{
  const match = useMatch('/posts/:id');
  const id = (match)? match.params.id : 'ID не найден'
  const items = props.items;
  const post = items.find((item) => {
    if (item.id == Number(id))
    return item;
  });
  if (typeof(post) != 'undefined') 
    return(
      <div className='post'>
        <PostView id={post.id} content={post.content} created={post.created}/>
        <div className="btns_row">
          <Link to={`/posts/update/${post.id}`} className="post_btn post_btn-change">Изменить</Link>
          <div data-uid={post.id} onClick={props.deleteItem} className="post_btn post_btn-delete">Удалить</div>
        </div>
      </div>
    )
  else
    return(
      <Navigate to="/" />
    )
}