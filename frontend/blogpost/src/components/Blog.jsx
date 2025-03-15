import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setblog] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalpage, settotalpage] = useState(1);
  const navigate = useNavigate();
  function fetchblogs(page) {
    fetch(`http://127.0.0.1:8000/blogs/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setblog(data.results);
        }
        if (data.count) {
          settotalpage(Math.ceil(data.count / 3));
        }
      })
      .catch((error) => console.error("error fetching blogs ", error));
  }

  useEffect(() => {
    fetchblogs(currentpage);
  }, [currentpage]);

  function handleprev() {
    if (currentpage > 1) {
      setcurrentpage((prev) => prev - 1);
    }
  }
  function handlenext() {
    if (currentpage < totalpage) {
      setcurrentpage((prev) => prev + 1);
    }
  }

  return (
    <div className="blog-container">
      <p>
        <button onClick={() => navigate("blog/create")}>
          Create a new Blog
        </button>
      </p>
      <h1>Blogs of the Day</h1>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <button onClick={() => navigate(`blogs/${blog.id}`)}>
              Read Blog
            </button>
          </div>
        ))}

      <footer>
        <button onClick={handleprev} disabled={currentpage === 1}>
          prev
        </button>
        <p>{currentpage}</p>
        <button onClick={handlenext} disabled={currentpage >= totalpage}>
          next
        </button>
      </footer>
    </div>
  );
};

export default Blog;
