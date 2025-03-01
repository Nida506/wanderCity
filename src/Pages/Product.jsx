import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";
function Product() {
  return (
    <div className={styles.pricing}>
      <PageNav />
      <div className={styles.container}>
        <section className={styles.section1}>
          <div>
            <h1>About WorldWide.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo et
              molestias reiciendis ipsam possimus sapiente ipsa laudantium
              voluptas laborum quo.
            </p>
          </div>
        </section>
        <section className={styles.section2}>
          <div>
            <img src="img-1.jpg" alt="" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Product;
