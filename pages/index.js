import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
// import AddButton from '../components/AddButton';
import styles from "../styles/Home.module.css";
// import AddProduct from '../components/AddProduct';
// import {useRouter} from 'next/router';

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SNACKS PIZZA - Order Online</title>
        <meta
          name="description"
          content="Customize and order your favorite snacks!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {/* {admin && <AddButton setClose={setClose}/>} */}
      <PizzaList pizzaList={pizzaList} />
      {/* {!close && <AddProduct setClose={setClose} />} */}
    </div>
  );
}

export async function getStaticProps() {
  const url = process.env.URL;

  const res = await axios.get(`${url}/api/products`);

  return {
    props: {
      pizzaList: res.data.products,
    },
  };
}
