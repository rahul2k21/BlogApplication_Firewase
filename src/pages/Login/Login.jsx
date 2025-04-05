import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useFirebase } from "../../context/firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
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
    const result = await firebase.signinUserWithEmailPassword(email, password);
    console.log("Login successful", result);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>

        <div className={styles.orText}>Or</div>

        <button
          type="button"
          onClick={firebase.signinWithGoogle}
          className={styles.googleButton}
        >
          Sign in with Google
        </button>

        <div className={styles.registerText}>
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
