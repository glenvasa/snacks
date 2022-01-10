import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addProduct} from '../../redux/cartSlice'
import Link from 'next/link'

const Product = ({ pizza }) => {
  const [basePrice, setBasePrice] = useState(pizza.prices[0]);
  const [extrasCost, setExtrasCost] = useState(0);
  const [extrasArray, setExtrasArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(pizza.prices[0]);
  const [quantity, setQuantity] = useState(1)

const dispatch = useDispatch()

const handleAddToCart = () => {
    dispatch(addProduct({...pizza, extrasArray, totalPrice, quantity}))
  }


  const handleExtraOptions = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      setExtrasCost((prevExtrasCost) => prevExtrasCost + option.price);
      setExtrasArray((prev) => [...prev, option]);
    } else {
      setExtrasCost((prevExtrasCost) => prevExtrasCost - option.price);
      setExtrasArray(extrasArray.filter((extra) => extra._id !== option._id));
    }
  };

  // const handleChangeQuantity = (e) => {
  //   setQuantity(e.target.value)
  // }

  useEffect(() => {
    setTotalPrice(basePrice + extrasCost);
  }, [basePrice, extrasCost]);

  

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            objectFit="contain"
            layout="fill"
            alt="pizza"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${totalPrice.toFixed(2)}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div
            className={styles.size}
            onClick={() => setBasePrice(pizza.prices[0])}
          >
            <Image src="/images/size.png " alt="size" layout="fill" />
            <span className={styles.number}>Small</span>
           <span className={styles.basePrice}>${pizza.prices[0].toFixed(2)}</span> 
          </div>
          <div
            className={styles.size}
            onClick={() => setBasePrice(pizza.prices[1])}
          >
            <Image src="/images/size.png " alt="size" layout="fill" />
            <span className={styles.number}>Medium</span>
            <span className={styles.basePrice}>${pizza.prices[1].toFixed(2)}</span> 
          </div>
          <div
            className={styles.size}
            onClick={() => setBasePrice(pizza.prices[2])}
          >
            <Image src="/images/size.png " alt="size" layout="fill" />
            <span className={styles.number}>Large</span>
            <span className={styles.basePrice}>${pizza.prices[2].toFixed(2)}</span> 
          </div>
        </div>
        <h3 className={styles.additional}>Any extras?</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option, index) => (
            <div key={index} className={styles.option}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleExtraOptions(e, option)}
              />
              <label htmlFor={option.text}>
                {option.text} - add ${option.price.toFixed(2)}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} 
          onChange={(e) => {setQuantity(e.target.value)}} 
          />
          <button className={styles.button} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
}

export default Product;
