import styles from "./ErrorMessage.module.css";
function ErrorMessage({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default ErrorMessage;
