import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">Recipes</NavLink>
      <NavLink to="/add-recipe">Add Recipes</NavLink>
      <button className={styles.signOutButton}>Sign Out</button>
    </nav>
  );
};

export default Navbar;
