import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface CreateData{
  sendItem : (id: string, content: string) => void;
}

export default function Create( props : CreateData)
{
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  
  const setValue = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }

  const handleSave = () => {
    props.sendItem('0', content);
    navigate('/');
  };
  
  return(
    <div className="update-post">
    <h1>Новая публикация:</h1>
    <label className='send'>
      <textarea className='note-textarea' value={content} onChange={setValue}/>
      <button onClick={handleSave} className='post_btn'>Опубликовать</button>
    </label>
  </div>
  )
}