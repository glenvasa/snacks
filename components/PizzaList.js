import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";
import Image from "next/image";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/images/snacks.png" width={190} height={170} alt="logo" />
      </div>

      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat libero
        atque odio quia doloribus, distinctio quos reiciendis sapiente quod
        natus facere voluptatem eius quis consequuntur?
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map(pizza => <PizzaCard key={pizza._id} pizza={pizza}/>)};   
      </div>
    </div>
  );
};

export default PizzaList;
