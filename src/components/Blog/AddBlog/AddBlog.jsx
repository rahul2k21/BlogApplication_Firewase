import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../../context/firebase";
import { toast } from "react-toastify";
import styles from "./AddBlog.module.css";

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const firebase = useFirebase();
  const navigate = useNavigate();

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!firebase.isLoggedIn) {
      toast.warning("Please log in to add a blog.");
      navigate("/login");
    }
  }, [firebase.isLoggedIn, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    if (!coverImage) {
      toast.error("Please select a cover image");
      return;
    }

    const newBlog = {
      title: data.title,
      description,
      coverImage: imagePreview,
    };

    firebase.addBlog(newBlog);
    toast.success("Blog added successfully!");
    reset();
    setDescription("");
    setCoverImage(null);
    setImagePreview(null);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Blog</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Blog Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className={styles.input}
          placeholder="Enter blog title"
        />

        <label>Blog Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className={styles.editor}
          theme="snow"
        />

        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.input}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Cover Preview"
            style={{ width: "100%", marginTop: "12px", borderRadius: "8px" }}
          />
        )}

        <button type="submit" className={styles.submitButton}>
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
