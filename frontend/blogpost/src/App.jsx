import Blog from "./components/Blog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";
import BlogForm from "./components/BlogForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/blog/create" element={<BlogForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
