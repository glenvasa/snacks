import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";
import Image from "next/image";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container} id="pizza-list">
      <div className={styles.logo}>
        <Image src="/images/snacks.png" width={190} height={170} alt="logo" />
      </div>

      <h1 className={styles.title} >THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
       Try one of our award-winning custom classic pizzas with any one of your favorite toppings! 
      </p>
      <div className={styles.wrapper} >
        {pizzaList.map(pizza => <PizzaCard key={pizza._id} pizza={pizza}/>)};   
      </div>
    </div>
  );
};

export default PizzaList;
