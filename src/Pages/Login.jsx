import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
function Login() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("nida@gmail.com");
  const [password, setPassword] = useState("nida123");

  //when login button click
  const loginClickHandler = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  // redirect the user if user is authenticated
  useEffect(() => {
    if (isAuthenticated)
      navigate("/app", {
        replace: true,
      });
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.login}>
      <PageNav />
      <form onSubmit={loginClickHandler}>
        <section>
          <div>
            <label htmlFor="">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="primary">Login</Button>
        </section>
      </form>
    </div>
  );
}

export default Login;
