import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [basePrice, setBasePrice] = useState(pizza.prices[0]);
  const [extrasCost, setExtrasCost] = useState(0);
  const [extrasArray, setExtrasArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(pizza.prices[0]);
  const [quantity, setQuantity] = useState(1);
  const [addToCart, setAddToCart] = useState(false);
  const [size, setSize] = useState("Small");

  const url = process.env.URL;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  // console.log(cart)

  const handleAddToCart = () => {
    dispatch(addProduct({ ...pizza, extrasArray, totalPrice, quantity, size }));
    setAddToCart(true);
    setTimeout(() => {
      setAddToCart(false);
    }, 1000);
  };

  //useEffect cleanup fn to prevent memory leak

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

  // console.log(size);

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
            className={`${styles.size} ${size === 'Small' ? `${styles.highlight}` : ""}`}
            onClick={() => setBasePrice(pizza.prices[0], setSize("Small"))}
          >
            <Image src="/images/size.png" alt="size" layout="fill" />
            <span className={styles.number}>Small</span>
            <span className={styles.basePrice}>
              ${pizza.prices[0].toFixed(2)}
            </span>
          </div>
          <div
            className={`${styles.size} ${size === 'Medium' ? `${styles.highlight}` : ""}`}
            onClick={() => setBasePrice(pizza.prices[1], setSize("Medium"))}
          >
            <Image src="/images/size.png" alt="size" layout="fill" />
            <span className={styles.number}>Medium</span>
            <span className={styles.basePrice}>
              ${pizza.prices[1].toFixed(2)}
            </span>
          </div>
          <div
            className={`${styles.size} ${size === 'Large' ? `${styles.highlight}` : ""}`}
            onClick={() => setBasePrice(pizza.prices[2], setSize("Large"))}
          >
            <Image src="/images/size.png" alt="size" layout="fill" />
            <span className={styles.number}>Large</span>
            <span className={styles.basePrice}>
              ${pizza.prices[2].toFixed(2)}
            </span>
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
        <div className={styles.buttonsContainer}>
          <div className={styles.add}>
            <input
              type="number"
              defaultValue={1}
              className={styles.quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <button className={styles.button} onClick={handleAddToCart}>
              Add to Cart
            </button>
            {/* <div className={styles.altNavButtons}> */}
            <Link href='/#pizza-list' passHref>
              <button className={styles.menuButton}>Menu</button>
            </Link>


            <Link href='/cart' passHref>
            <button className={styles.cartButton} disabled={cart.quantity < 1 ? true : false}>Cart</button>
            </Link>
            
              
          {/* </div> */}
          </div>
          
        </div>

        {addToCart && <div className={styles.addMessage}>Added to Cart</div>}
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const url = process.env.URL;
  const res = await axios.get(`${url}/api/products/${params.id}`);

  return {
    props: {
      pizza: res.data,
    },
  };
}

export async function getStaticPaths() {
  const url = process.env.URL;

  const res = await axios.get(`${url}/api/products`);
  const products = res.data.products
  const slugs = products.map(product => product._id)

  return {
      paths: slugs.map(slug => ({params: {id: slug}})),
      fallback: false
  }
}

export default Product;
