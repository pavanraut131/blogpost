import React, { useEffect, useState } from 'react'

const Blog = () => {
    const [blogs, setblog] = useState([])
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/blogs')
        .then(response=>response.json())
        .then(data=>setblog(data))
    },[])

    console.log(blogs)
  return (
    <div className='blog-container'>{blogs && blogs.map((blog)=>(
        <div  key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p></div>
    ))}</div>
  )
}

export default Blog