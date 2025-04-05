import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../BlogCard/BlogCard";
import { useFirebase } from "../../../context/firebase";
import styles from "./BlogList.module.css";

const BlogList = () => {
  const { blogs, deleteBlog } = useFirebase();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil((blogs?.length || 0) / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.blogListWrapper}>
      <div className={styles.header}>
        <Link to="/blog-add" className={styles.addButton}>
          + Add Blog
        </Link>
      </div>

      <div className={styles.blogList}>
        {currentBlogs && currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onDelete={deleteBlog} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No blog data available.</h3>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.active : ""
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
