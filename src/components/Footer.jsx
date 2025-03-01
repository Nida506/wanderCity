import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
    </div>
  );
}

export default Footer;
