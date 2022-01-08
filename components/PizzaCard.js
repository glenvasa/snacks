import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/images/pizza.png" width={500} height={500} alt="pizza" />
      <h1 className={styles.title}>SPECIALE DI SNACKS</h1>
      <span className={styles.price}>$14.99</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};

export default PizzaCard;
