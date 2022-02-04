import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import AddButton from "../../components/AddButton";
import AddProduct from "../../components/AddProduct";
import EditProduct from "../../components/EditProduct";
import styles from "../../styles/Admin.module.css";

const AdminUpdate = ({ products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [close, setClose] = useState(true);
  const [editClose, setEditClose] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.getItem("admin") === "true"
      ? null
      : router.push("/admin/login");
  }

  const url = process.env.URL;

  const handleDelete = async (id) => {
    const response = confirm("Are you sure you want to delete this pizza?");

    if (response === true) {
      try {
        const res = await axios.delete(`/api/products/` + id);
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      } catch (err) {
        console.log(err.message || "Something went wrong");
      }
    }
  };

  const handleEditButton = async (id) => {
    const res = await axios.get(`/api/products/${id}`);

    setEditProduct(res.data);
    setEditClose(false);
  };

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className={styles.updateContainer}>
      <div className={styles.item}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Admin Page: Products</h1>
          <Link href="/admin" passHref>
            <button className={styles.updatePageLink}>Orders Page</button>
          </Link>
          <button className={styles.logout} onClick={() => logout()}>
            Admin Logout
          </button>
          <AddButton setClose={setClose} />
        </div>
        <table className={`${styles.table} ${styles.updateTable}`}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Prices (small, medium, large)</th>
              <th>Extra Options</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.updateTrTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.desc}</td>
                <td className={styles.prices}>
                  {product.prices.map((price, index) => (
                    <span key={price.index}>
                      {`$${price.toFixed(2)}${index === 0 ? ',' : index === 1 ? ' and' : ''} `}</span>
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
      {!close && <AddProduct setClose={setClose} pizzaList={pizzaList} setPizzaList={setPizzaList}  />}
      {!editClose && (
        <EditProduct setEditClose={setEditClose} product={editProduct} pizzaList={pizzaList} setPizzaList={setPizzaList} />
      )}
    </div>
  );
};

export default AdminUpdate;

export const getServerSideProps = async () => {
  const url = process.env.URL;
  
  const productRes = await axios.get(`${url}/api/products`);

  return {
    props: {
      products: productRes.data.products,
    },
  };
};
