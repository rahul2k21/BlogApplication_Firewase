import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../../../context/firebase";
import styles from "./BlogDetails.module.css";

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs } = useFirebase();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) return <p className={styles.notFound}>Blog not found</p>;

  return (
    <div className={styles.blogDetails}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h1 className={styles.title}>{blog.title}</h1>
      <img
        src={blog.coverImage}
        alt={blog.title}
        className={styles.coverImage}
      />
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: blog.description }}
      ></div>
    </div>
  );
};

export default BlogDetails;
