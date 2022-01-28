import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from 'next/router'
import styles from "../../styles/Admin.module.css";

const Admin = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const url = process.env.URL

  const router = useRouter()

  if (typeof window !== 'undefined') {
localStorage.getItem('admin') === 'true' ? null : router.push('/admin/login')
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

  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

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
          <button className={styles.logout} onClick={() => logout()}>Admin Logout</button>
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
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <>
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                {/* <td>
                  {order._id.slice(order._id.length - 5, order._id.length)}
                </td> */}
                <td>{order.customer}</td>
                <td>
                  <div className={styles.address}>
                    <span className={styles.address}>{order.address[0]} </span>
                    <span
                      className={styles.address}
                    >{`${order.address[1]}, ${order.address[2]}, ${order.address[3]}`}</span>
                  </div>
                
                
                </td>
                
                  <td className={styles.products}>
                    {order.products.map((product) => (
                      <div key={product.index}>
                        <span>{`${product.quantity} ${product.title}${product.quantity > 1 ? `s` : ''} with `}</span>

                        {product.extrasArray.map((extra, index) => (
                          <span key={extra.index}>
                            {index === 0
                              ? null
                              : index === product.extrasArray.length - 1
                              ? ` and `
                              : `, `}
                            {extra.text}
                          </span>
                        ))}
                      </div>
                    ))}
                  </td>
                
                <td>${(order.total * 1.0625).toFixed(2)}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button className={styles.button_stage} onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
            <div className={styles.spacer}/>
            </>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const url = process.env.URL
  // const myCookie = ctx.req?.cookies || "";

  // if (myCookie.token !== process.env.TOKEN) {
  //   return {
  //     redirect: {
  //       destination: "/admin/login",
  //       permanent: false,
  //     },
  //   };
  // }

  const productRes = await axios.get(`${url}/api/products`);
  const orderRes = await axios.get(`${url}/api/orders`);
  // console.log(orderRes.data);
  return {
    props: {
      orders: orderRes.data,
      products: productRes.data.products,
    },
  };
};

export default Admin;
