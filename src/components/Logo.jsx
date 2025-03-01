import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
function Logo() {
  return (
    <>
      <span className={styles.logo}>
        <Link to="/" className={styles.small}>
          <h1>WorldWise</h1>
        </Link>
        <Link to="/" className={styles.large}>
          <img src="/logo.png" alt="WorldwiseImage" />
        </Link>
      </span>
    </>
  );
}

export default Logo;
