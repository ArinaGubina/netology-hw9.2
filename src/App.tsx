import './App.css'

import ViewList from './components/ViewList'
import View from './components/View'
import Create from './components/Create'
import Update from './components/Update'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([]);

  const exchangeItems = () => {
    fetch('https://localhost/backend/',{
      "method" : "GET",
      "headers": {
      'Content-Type': 'text/html; charset=UTF-8'
    }
    })
       .then((res) => res.json())
       .then((data) => {
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }

  useEffect(() => {
    exchangeItems();
  }, []);

  const deleteItem = (event : React.MouseEvent<HTMLElement>) => {
    const element = event.target;
    if (element instanceof Element) {  
      const id = element.getAttribute("data-uid");
      fetch('https://localhost/backend/?delete='+id,
      {
        "method" : "GET",
        "headers": {
        'Content-Type': 'text/html; charset=UTF-8'
        }
      })
       .then((res) => res.json())
       .then((data) => {
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
    }    
  }

  const sendItem = (id : string, content : string) => {
    fetch('https://localhost/backend/',
    {
      "method" : "POST",
      "headers": {
      'Content-Type': 'application/json'
      },
      "body" : JSON.stringify({
        id: id,
        content: content
      }),
    })
    .then((res) => res.json())
    .then((data) => {
        setPosts(data);
    })
    .catch((err) => {
        console.log(err.message);
    });
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewList items={posts} deleteItem={deleteItem}/>}/>
        <Route path="/posts/new" element={<Create sendItem={sendItem}/>}/>
        <Route path="/posts/:id" element={<View items={posts} deleteItem={deleteItem}/>}/>
        <Route path="/posts/update/:id" element={<Update items={posts} sendItem={sendItem}/>}/>
      </Routes>
    </Router>
  )
}

export default App
