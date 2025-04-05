import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useFirebase } from "../../context/firebase";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase.signupUserWithEmailPassword(email, password);
    console.log("Successful", result);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create an Account</h2>

        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>

        <p className={styles.loginText}>
          Already have an account?
          <Link to="/login" className={styles.loginLink}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
