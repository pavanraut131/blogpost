import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setblog] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setblog(data));
  }, []);

  async function handledelete(id) {
    const response = await fetch(`http://127.0.0.1:8000/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Blog deleted succesfully");
      navigate("/");
    } else {
      alert("Not able to delete the blog ");
    }
  }

  return (
    <>
      <div>BlogDetails</div>
      <div>
        <h1>{blog.title}</h1>
        <h2>{blog.author}</h2>
        <p>{blog.content}</p>
        <p>
          {blog.image && <img src={`http://127.0.0.1:8000/${blog.image}`} />}
        </p>
        <p>{blog.created_at}</p>
        <button onClick={() => handledelete(blog.id)}>Delete blog</button>
      </div>
    </>
  );
};

export default BlogDetails;
