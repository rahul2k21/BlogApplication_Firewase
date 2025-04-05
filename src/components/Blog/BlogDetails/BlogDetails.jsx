import React from "react";
import { useParams } from "react-router-dom";
import {  useFirebase } from "../../../context/firebase";

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs } = useFirebase();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.coverImage} alt={blog.title} />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
