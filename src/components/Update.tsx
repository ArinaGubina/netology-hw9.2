import { Navigate, useMatch, useNavigate } from "react-router-dom";
import type { UpdateData } from "./UpdateData";
import { useEffect, useState } from "react";


export default function Update( props : UpdateData)
{
  const [content, setContent] = useState("");
  const match = useMatch('/posts/update/:id');
  const id = (match)? match.params.id : 'ID не найден';
  const items = props.items;
  const post = items.find((item) => {
    if (item.id == Number(id))
    return item;
  });
  const navigate = useNavigate();

  useEffect(function ifUpdate() {
    if (typeof(post) != 'undefined') {
      setContent(post.content);
    }
  }, [post]);
  
  if (typeof(post) != 'undefined') {
    const setValue = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    }

    const handleSave = () => {
      props.sendItem(String(id), content);
      navigate('/');
    };
    
    return(
      <div className="update-post">
      <h1>Редактировать публикацию</h1>
      <label className='send'>
        <textarea className='note-textarea' value={content} onChange={setValue}/>
        <button onClick={handleSave} className='post_btn'>Сохранить</button>
      </label>
    </div>
    )
  } else
    return(
      <Navigate to="/" />
    )
}