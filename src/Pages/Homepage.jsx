import { NavLink } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";
function Homepage() {
  return (
    <div className={styles.homepage}>
      <PageNav />

      <section>
        <div>
          <h1>
            You travel the world. <br /> WorldWise keeps track of your
            adventures.
          </h1>
          <h4>
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </h4>
          <NavLink to="/login">
            <button className={styles.button}>START TRACKING NOW</button>
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
