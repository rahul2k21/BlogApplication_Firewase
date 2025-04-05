import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import BlogDetails from "./components/Blog/BlogDetails/BlogDetails";
import AddBlog from "./components/Blog/AddBlog/AddBlog";
import EditBlog from "./components/Blog/EditBlog/EditBlog";
import Service from "./pages/Service/Service";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog-edit/:id" element={<EditBlog />} />
          <Route path="/blog-add" element={<AddBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
        </Routes>

    </Router>
  );
}

export default App;
