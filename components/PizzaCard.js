import Image from "next/image";
import Link from 'next/link'
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = () => {
  return (
    <Link href='/product/1'>
     
 <div className={styles.container}>
      <Image src="/images/pizza.png" width={500} height={500} alt="pizza" />
      <h1 className={styles.title}>SPECIALE DI SNACKS</h1>
      <span className={styles.price}>$14.99</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>

     
   
    </Link>
    
  );
};

export default PizzaCard;
