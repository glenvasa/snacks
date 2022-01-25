import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddButton from "../../components/AddButton";
import AddProduct from "../../components/AddProduct";
import EditProduct from "../../components/EditProduct";
import styles from "../../styles/Admin.module.css";

const AdminUpdate = ({ products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [close, setClose] = useState(true);
  const [editClose, setEditClose] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  const url = process.env.URL

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/products/` + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err.message || "Something went wrong");
    }
  };

  const handleEditButton = async (id) => {
    const res = await axios.get(`${url}/api/products/${id}`);

    setEditProduct(res.data);
    setEditClose(false);
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Admin Page: Products</h1>
          <Link href="/admin" passHref>
            <button className={styles.updatePageLink}>Orders Page</button>
          </Link>
          <AddButton setClose={setClose} />
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
                  {product.prices.map((price) => (
                    <span key={price.index}>${price.toFixed(2)} </span>
                  ))}
                </td>
                <td className={styles.extras}>
                  {product.extraOptions.map((option) => (
                    <span key={option.index}>
                      {`${option.text}:   $${option.price.toFixed(2)}   `}{" "}
                    </span>
                  ))}
                </td>

                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleEditButton(product._id)}
                  >
                    Edit
                  </button>
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
      {!editClose && (
        <EditProduct setEditClose={setEditClose} product={editProduct} />
      )}
    </div>
  );
};

export default AdminUpdate;

export const getServerSideProps = async (ctx) => {
  const url = process.env.URL
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
