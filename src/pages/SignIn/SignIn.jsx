import { useState } from "react";
import styles from "./SignIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBaseConfig";

const SignIn = () => {
  // declaring state varibales
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  //   for redirection
  const navigate = useNavigate();
  //   retrinving form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  //   sigining users in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      navigate("/");
      console.log("User successfully signed in", user);
    } catch (error) {}
  };
  return (
    <div className={styles.signInContainer}>
      <form className={styles.signInForm}>
        <h1>Sign In ✍🏽</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
        </div>
        {/* ------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button className={styles.submitButton} onClick={handleSignIn}>
          Sign In
        </button>
        <p>
          Don't have ann account? Create one{" "}
          <NavLink to="/sign-up">here</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
