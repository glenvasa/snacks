// import {useEffect} from 'react'
import axios from 'axios'
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({pizzaList}) {

// client side data fetching if not using Next
//  const getProducts = async () => {
//    const products = await fetch('api/products')
//    const data = await products.json()
//    console.log(data)
//     return data
//  }

//   useEffect(() => {
//     getProducts()
//     }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>SNACKS! - Food Ordering App</title>
        <meta
          name="description"
          content="Customize and order your favorite snacks!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList}/>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/api/products')
  

  return {
    props: {
      pizzaList: res.data.products
    }
  }
}
