import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder, setCashOpen }) => {
  const [customer, setCustomer] = useState("");
  // const [address, setAddress] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const address = [street, city, state, zip, phone, email];

  const totalTaxIncluded = (total * 1.0625).toFixed(2);

  const cart = useSelector((state) => state.cart);

  const handleClick = () => {
    createOrder({
      customer,
      address,
      products: cart.products,
      cart_qty: cart.quantity,
      total,
      method: 0,
    });
  };

  // console.log(address)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={() => setCashOpen(false)}>
          X
        </button>
        <h1 className={styles.title}>
          You will pay <span className={styles.total}>${totalTaxIncluded}</span> on delivery
        </h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            // placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            // placeholder="617-555-1212"
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Street Address</label>
          <input
            type="text"
            // placeholder="12345 Main St., Apt. 212"
            className={styles.input}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>City</label>
          <input
            type="text"
            // placeholder="Boston"
            className={styles.input}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>State</label>
          <input
            type="text"
            // placeholder="MA"
            className={styles.input}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Zip Code</label>
          <input
            type="text"
            // placeholder="02121"
            className={styles.input}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            // placeholder="john.doe@test.com"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
