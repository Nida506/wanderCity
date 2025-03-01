import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav
      className={`container-fluid navbar navbar-expand-md fixed-top ${styles.nav}`}
    >
      <span className={styles.logo}>
        <Logo />
      </span>

      <button
        className={`navbar-toggler me-4  ${styles.icon}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse p-0 ${styles.dropdown} `}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav justify-content-md-end  mt-0 w-100">
          <li className="nav-item">
            <NavLink className="nav-link" to="/pricing">
              PRICING
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/product">
              PRODUCT
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${styles.ctaLink} `} to="/login">
              LOGIN
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
