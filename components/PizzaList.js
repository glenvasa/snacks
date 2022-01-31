import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";
import { useEffect, useState } from "react";
import Image from "next/image";

const PizzaList = ({ pizzaList }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState(pizzaList);

  const filteredPizzaList = (searchText) => {
    setFilteredList(
      pizzaList.filter((pizza) =>
        pizza.title.toLowerCase().includes(searchText.toLowerCase()) || pizza.desc.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    filteredPizzaList(searchText);
    // console.log(filteredList);
  }, [searchText]);

  return (
    <div className={styles.container} id="pizza-list">
      {/* <div className={styles.logo}>
        <Image src="/images/snacks.png" width={190} height={170} alt="logo" />
      </div> */}
      <div className={styles.titleContainer}>
        {" "}
        <h1 className={styles.title}>2021 BEST PIZZA IN BOSTON</h1>
        <p className={styles.desc}>
          Try our award-winning custom classic pizzas with
          your favorite toppings!
        </p>{" "}
      </div>
      <div className={styles.search}> 
         {/* <label htmlFor="search">Search</label> */}
        <input
          type="search"
          id="search"
          placeholder="Search for Pizzas..."
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        {/* <Image className={styles.search_icon} src='/images/search_icon.png' width={16} height={16} alt='search-icon'/> */}
      </div>

      <div className={styles.wrapper}>
        {filteredList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
