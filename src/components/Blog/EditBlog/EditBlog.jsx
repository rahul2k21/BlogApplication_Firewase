import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../../context/firebase";
import styles from "./EditBlog.module.css";

const EditBlog = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { blogs, updateBlog } = useFirebase(); // Custom hook from context
  const { id } = useParams(); // Get blog ID from route
  const navigate = useNavigate();

  const blogId = parseInt(id); // Assuming ID is numeric
  const blogToEdit = blogs.find((blog) => blog.id === blogId);

  // Prefill form when blog loads
  useEffect(() => {
    if (blogToEdit) {
      setValue("title", blogToEdit.title);
      setDescription(blogToEdit.description);
      setImagePreview(blogToEdit.coverImage); // use existing image
    }
  }, [blogToEdit, setValue]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    if (!imagePreview) {
      alert("Please select a cover image");
      return;
    }

    const updatedBlog = {
      id: blogId,
      title: data.title,
      description,
      coverImage: imagePreview,
    };

    updateBlog(updatedBlog);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Blog</h2>
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
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
