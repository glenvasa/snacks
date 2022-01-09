import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = ({ pizza }) => {
  return (
    <Link href={`/product/${pizza._id}`} passHref>
      <div className={styles.container}>
        <Image src={pizza.img} width={500} height={500} alt="pizza" />
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${pizza.prices[0]}.00</span>
        <p className={styles.desc}>{pizza.desc}</p>
      </div>
    </Link>
  );
};

export default PizzaCard;
