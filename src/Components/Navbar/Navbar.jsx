import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../fireBaseConfig";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
      console.log("user succsessfullt signed out");
    } catch (error) {
      console.log("error signing user out"), error.message;
    }
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">Recipes</NavLink>
      <NavLink to="/add-recipe">Add Recipes</NavLink>
      {isLoggedIn && (
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
