import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BlogCard.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { useFirebase } from "../../../context/firebase";
import { toast } from "react-toastify";

// Utility to remove HTML tags
const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

const BlogCard = ({ blog }) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (firebase.isLoggedIn) {
      firebase.deleteBlog(blog.id);
    } else {
      toast.error("Please log in to delete a blog.");
      navigate("/login");
    }
  };

  const handleEdit = () => {
    if (firebase.isLoggedIn) {
      navigate(`/blog-edit/${blog.id}`);
    } else {
      toast.error("Please log in to edit a blog.");
      navigate("/login");
    }
  };

  const plainDescription = stripHtml(blog.description);

  return (
    <div className={styles.card}>
      <img src={blog.coverImage} alt={blog.title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{blog.title}</h2>
        <p className={styles.description}>
          {plainDescription.length > 100
            ? plainDescription.substring(0, 100) + "..."
            : plainDescription}
        </p>
        <div className={styles.cardflex}>
          <Link to={`/blog-details/${blog.id}`} className={styles.readMore}>
            Read More →
          </Link>
          <div className={styles.iconGroup}>
            <MdDeleteOutline
              onClick={handleDelete}
              className={styles.icon}
              title="Delete"
            />
            <GoPencil
              onClick={handleEdit}
              className={styles.icon}
              title="Edit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
