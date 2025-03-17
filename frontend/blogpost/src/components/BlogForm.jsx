import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
  });
  async function handlesubmit(e) {
    e.preventDefault();
    const resposne = await fetch("http://127.0.0.1:8000/blogs/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (resposne.ok) {
      setformdata({ title: "", author: "", content: "", image: "" });
      navigate("/");
    } else {
      alert("Failed to create the Blog");
    }
  }
  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <h1>Create the New Blog</h1>

      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="title"
          required
          value={formdata.title}
          placeholder="Enter the Title"
          onChange={handlechange}
        />
        <input
          type="text"
          required
          name="author"
          value={formdata.author}
          placeholder="Enter the Name of the Author"
          onChange={handlechange}
        />
        <textarea
          name="content"
          placeholder="Enter The Content"
          onChange={handlechange}
          value={formdata.content}
        />
        <input
          type="file"
          required
          placeholder="select a image"
          value={image}
          onChange={handlechange}
          accept="image/*"
        />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
