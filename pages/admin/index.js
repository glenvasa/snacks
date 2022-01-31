import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin.module.css";

const Admin = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const url = process.env.URL;

  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.getItem("admin") === "true"
      ? null
      : router.push("/admin/login");
  }

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];

    const currentStatus = item.status;

    if (currentStatus === 2) {
      return;
    }

    try {
      const res = await axios.put(`/api/orders/` + id, {
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

  const handleDeleteOrder = async (id) => {
    const response = confirm("Are you sure you want to delete this order?");

    if (response === true) {
      try {
        await axios.delete(`/api/orders/` + id);
        alert("Order deleted");
        setOrderList([...orderList.filter((order) => order._id !== id)])
      } catch (err) {
        console.log(err.message || "Something went wrong");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

 

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Admin Page: Orders</h1>
          <Link href="/admin/update" passHref>
            <span className={styles.updatePageLink}>Products Page</span>
          </Link>
          <button className={styles.logout} onClick={() => logout()}>
            Admin Logout
          </button>
        </div>

        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Customer</th>
              <th>Address</th>
              <th>Order</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Order Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <>
              <tbody key={order._id}>
                <tr className={styles.trTitle}>
                  <td>{order.customer}</td>
                  <td>
                    <div className={styles.address}>
                      <span className={styles.address}>
                        {order.address[0]}{" "}<br/>
                      </span>
                      <span
                        className={styles.address}
                      >{`${order.address[1]}, ${order.address[2]}, ${order.address[3]}`}</span>
                    </div>
                  </td>

                  <td className={styles.products}>
                    {order.products.map((product) => (
                      <div key={product.index}>
                        <span>{`• ${product.quantity} ${product.size} ${
                          product.title
                        }${product.quantity > 1 ? `s` : ""} ${
                          product.extrasArray.length === 0 ? "" : "with"
                        } `}</span>

                        {product.extrasArray.length !== 0
                          ? product.extrasArray.map((extra, index) => (
                              <span key={extra.index}>
                                {index === 0
                                  ? null
                                  : index === product.extrasArray.length - 1
                                  ? ` and `
                                  : `, `}
                                {extra.text}
                              </span>
                            ))
                          : null}
                      </div>
                    ))}
                  </td>

                  <td>${(order.total * 1.0625).toFixed(2)}</td>
                  <td>
                    {order.method === 0 ? <span>CASH</span> : <span>PAID</span>}
                  </td>
                  <td>{status[order.status].toUpperCase()}</td>
                  <td>
                    <span className={styles.actionButtons}>
                      <button
                        className={styles.button_stage}
                        onClick={() => handleStatus(order._id)}
                      >
                        Next Stage
                      </button>
                      <button
                        className={styles.button_deleteOrder}
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              </tbody>
              <div className={styles.spacer} />
            </>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const url = process.env.URL;
  
  const orderRes = await axios.get(`${url}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      
    },
  };
};

export default Admin;
