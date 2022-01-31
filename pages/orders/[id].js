import { useSelector } from "react-redux";
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  const url = process.env.URL;

  const cart = useSelector((state) => state.cart);
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  // const extras = order.

  // console.log(order);
  const addressHeight = (order.products.length * 20) + 5 + 'px'

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Customer</th>
                <th>Address</th>
                <th>Order</th>
                {/* <th>Quantity</th> */}
                <th>Price/Pizza</th>
                {/* <th>Total</th> */}
              </tr>
            </tbody>
            <tbody>
              <tr className={styles.tr}>
                <td className={styles.products}>
                  <span className={styles.customer}>{order.customer}</span>
                </td>

                <td >
                  <div className={styles.address} style={{height: addressHeight}}>
                    <span>{order.address[0]} </span>
                    <span>{`${order.address[1]}, ${order.address[2]}, ${order.address[3]}`}</span>
                  </div>
                </td>
                <td>
                  <td className={styles.products}>
                    {order.products.map((product) => (
                      <div key={product.index}>
                        <span>{`• ${product.quantity} ${product.size} ${product.title}${
                          product.quantity > 1 ? `s` : ""
                        } ${product.extrasArray.length === 0 ? '' : 'with'} `}</span>

                        {product.extrasArray.length !==0 
                        ? product.extrasArray.map((extra, index) => (
                          <span key={extra.index}>
                            {index === 0
                              ? null
                              : index === product.extrasArray.length - 1
                              ? ` and `
                              : `, `}
                            {extra.text}
                          </span>
                        )) : null}
                      </div>
                    ))}
                  </td>
                </td>
                {/* add list of pizzas ordered, extras on each, qty of each pizza */}
                <td>
                  <div className={styles.prices}>
                    {order.products.map((product) => (
                      <span key={product.index}>{`$${product.totalPrice.toFixed(
                        2
                      )}`}</span>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/images/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/images/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/images/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/images/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          {/* <h2 className={styles.title}>ORDER TOTAL</h2> */}
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$
            {order.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Sales Tax:</b>$
            {(order.total * 0.0625).toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={`${styles.totalTextTitle} ${styles.orderTotal}`}>
              Order Total:
            </b>
            ${(order.total * 1.0625).toFixed(2)}
          </div>
          {/* button should say Cash on Delivery if cash order */}
          <button disabled className={styles.button}>
            {order.method === 0 ? "CASH ON DELIVERY" : "PAID"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const url = process.env.URL;
  const res = await axios.get(`${url}/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;
