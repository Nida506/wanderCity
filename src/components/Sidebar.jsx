import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Logo from "../components/Logo.jsx";
import AppNav from "../components/AppNav.jsx";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* <div> */}
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.appNav}>
        <AppNav />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;
