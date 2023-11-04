import { Link } from 'react-router-dom';
import PostView from './PostView';
import type { PostsList } from './PostsList';

export default function ViewList( props : PostsList)
{
  const posts = props.items.map((item, key) => {
    return(
      <PostView id={item.id} content={item.content} created={item.created} key={`post_item_key${key}`}/>
    )
  });
  return(
    <>
      <Link to={`/posts/new`} className="post_btn">Создать пост</Link>
      <div className='posts'>{posts}</div>
    </>    
  )
}