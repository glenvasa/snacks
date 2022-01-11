import {useState} from 'react'
import axios from 'axios'
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import AddButton from '../components/AddButton';
import styles from "../styles/Home.module.css";
import AddProduct from '../components/AddProduct';

export default function Home({pizzaList, admin}) {
  const [close, setClose] = useState(true)

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
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <AddProduct setClose={setClose} />}
    </div>
  );
}

export async function getServerSideProps(ctx) {

  const myCookie = ctx.req?.cookies || ''
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }

  const res = await axios.get('http://localhost:3000/api/products')
  

  return {
    props: {
      pizzaList: res.data.products,
      admin
    }
  }
}
