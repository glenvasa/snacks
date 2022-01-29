import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Track = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [error, setError] = useState(false);
  
  const router = useRouter();

  const url = process.env.URL

  const handleClick = async () => {
   
    try {
      const res = await axios.post(`/api/track`, {
        firstName,
        lastName,
        zipCode
      });
      if (res.status === 200) {
        // dispatch(reset());
        console.log(res)
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      setError(true);
      console.log(err.message)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Track Your Order</h1>
        <input
          placeholder="First Name"
          type='text'
          className={styles.input}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          type='text'
          className={styles.input}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Zip Code"
         
          className={styles.input}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Track Order
        </button>
        {error && <span className={styles.error}>Wrong Information Entered!</span>}
      </div>
    </div>
  );
};



export default Track;

