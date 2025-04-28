import { useState } from "react";
import styles from "./SignUp.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBaseConfig";

const SignUp = () => {
  // declaring state variables
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState(null);
  //   retriving input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSignUp = async (e, email, password) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("password dont match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user has been successfully created", user);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className={styles.signUpContainer}>
      <form
        className={styles.signUpForm}
        onSubmit={(e) => handleSignUp(e, formData.email, formData.password)}
      >
        <h1>SignUp 🆙</h1>
        {/* -------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="firstname">FirstName:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleChange}
            value={formData.firstname}
          />
        </div>
        {/* -------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="lastname">LastName::</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        {/* -------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        {/* -------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        {/* -------------- */}
        <div className={styles.inputGroup}>
          <label htmlFor="cinfirm-password">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>
        {/* -------------- */}
        <div className={styles.term}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={handleCheckboxChange}
            value={formData.terms}
          />
          <label htmlFor="terms">agree to the terms and conditions:</label>
        </div>
        {error && <p>{setError}</p>}
        <button className={styles.submitButton}>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
