import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Blog.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.header}>Blogs of the Day</h1>
      <div className={styles.blog}>
        {blogs &&
          blogs.map((blog) => (
            <div className={styles.blogItem} key={blog.id}>
              <p className={styles.blogTitle}>{blog.title}</p>
              <p className={styles.author}>{blog.author}</p>
              <button
                className={styles.readbutton}
                onClick={() => navigate(`blogs/${blog.id}`)}
              >
                Read Blog
              </button>
            </div>
          ))}
      </div>
      <p className={styles.buttonpara}>
        <button
          className={styles.buttoncreate}
          onClick={() => navigate("blog/create")}
        >
          Create a new Blog
        </button>
      </p>

      <footer>
        <button
          className={styles.pagebutton}
          onClick={handleprev}
          disabled={currentpage === 1}
        >
          prev
        </button>
        <p className={styles.currentpage}>{currentpage}</p>
        <button
          className={styles.pagebutton}
          onClick={handlenext}
          disabled={currentpage >= totalpage}
        >
          next
        </button>
      </footer>
    </div>
  );
};

export default Blog;
