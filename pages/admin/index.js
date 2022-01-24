import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Admin = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const url = "http://localhost:3000" || "https://snacks-glenvasa.vercel.app";

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];

    const currentStatus = item.status;

    if (currentStatus === 2) {
      return;
    }

    try {
      const res = await axios.put(`${url}/api/orders/` + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Admin Page: Orders</h1>
          <Link href="/admin/update" passHref>
            <span className={styles.updatePageLink}>
              Products Page
            </span>
          </Link>
        </div>

        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id (last 5)</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>
                  {order._id.slice(order._id.length - 5, order._id.length)}
                </td>
                <td>{order.customer}</td>
                <td>${(order.total * 1.0625).toFixed(2)}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

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
  const orderRes = await axios.get(`${url}/api/orders`);
  console.log(orderRes.data);
  return {
    props: {
      orders: orderRes.data,
      products: productRes.data.products,
    },
  };
};

export default Admin;
