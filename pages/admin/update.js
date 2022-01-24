import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddButton from '../../components/AddButton';
import AddProduct from '../../components/AddProduct';
import styles from "../../styles/Admin.module.css";

const AdminUpdate = ({ products }) => {
  const [pizzaList, setPizzaList] = useState(products);
const [close, setClose] = useState(true)

  const url = "http://localhost:3000" || "https://snacks-glenvasa.vercel.app";
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${url}/api/products/` + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Admin Page: Products</h1>
        <Link href='/admin' passHref>
        <button className={styles.updatePageLink}>Orders Page</button>
       
        </Link> 
        <AddButton setClose={setClose}/>
        </div>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Prices (small, medium, large)</th>
              <th>Extra Options</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td className={styles.prices}>
                  {product.prices.map((price) => `$${price.toFixed(2)}   `)}
                </td>
                <td className={styles.extras}>
                  {product.extraOptions.map((option) => (
                    <span key={option.index}>
                      {`${option.text}:   $${option.price.toFixed(2)}   `}{" "}
                    </span>
                  ))}
                </td>

                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
       {!close && <AddProduct setClose={setClose} />}
    </div>
  );
};

export default AdminUpdate;

export const getServerSideProps = async (ctx) => {
  const url = "http://localhost:3000" || "https://snacks-glenvasa.vercel.app";
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get(`${url}/api/products`);

  return {
    props: {
      products: productRes.data.products,
    },
  };
};