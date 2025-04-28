import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.rootContainer}>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
